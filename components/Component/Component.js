import { Events } from '../util/events'
import {
  extend,
  hyphenate,
  isFunction,
  isNumeric,
  isPlainObject,
  isString,
  normalizeKey,
} from '../util/index'
import ComponentDescriptor from './ComponentDescriptor'

const components = {}
const MIXINS = []

class Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      reference: document.body,
      placement: 'append',
      autoRender: true,

      hidden: false,
      disabled: false,
      selected: false,
      expanded: false,

      selectable: {
        byClick: false,
        byHover: false,
        canRevert: false,
        selectedProps: null,
        unselectedProps: null,
      },
      expandable: {
        byClick: false,
        byHover: false,
        target: null,
        expandedProps: false,
        collapsedProps: false,
      },
    }
    this.props = Component.extendProps(defaults, props)

    this.parent = null
    this.children = []
    this.root = null
    this.rendered = false
    this.mixins = []
    this.firstRender = true

    this._propStyleClasses = []

    mixins && this._mixin(mixins)

    if (this.props.key) {
      this.key = this.props.key
      if (isFunction(this.props.key)) {
        this.key = this.props.key.call(this)
      }
    }

    this.referenceComponent =
      this.props.reference instanceof Component
        ? this.props.reference
        : this.props.reference.component
    if (this.referenceComponent) {
      if (this.props.placement === 'append') {
        this.parent = this.referenceComponent
      } else {
        this.parent = this.referenceComponent.parent
      }
    }

    if (this.parent === null) {
      this.root = this
    } else {
      this.root = this.parent.root
    }

    if (this.props.ref) {
      this.props.ref(this)
    }

    this.componentType = this.__proto__.constructor.name
    this.referenceElement =
      this.props.reference instanceof Component
        ? this.props.reference.element
        : this.props.reference

    this.create()
    if (this.props.autoRender === true) {
      this.config()
      this.render()
    }
  }

  create() {
    this.__handleClick = this.__handleClick.bind(this)
    isFunction(this._created) && this._created()
    this._callMixin('_created')
    this.props._created && this.props._created.call(this)
  }

  config() {
    this.props._config && this.props._config.call(this)
    this._callMixin('_config')
    isFunction(this._config) && this._config()
    this._setExpandableProps()
    this._setStatusProps()
  }

  render() {
    if (this.rendered === true) {
      this.emptyChildren()
    } else {
      this._mountElement()
    }

    this._handleAttrs()
    this._handleStyles()

    this._renderChildren()

    this.props.disabled === true && isFunction(this._disable) && this._disable()
    this.props.selected === true && isFunction(this._select) && this._select()
    this.props.hidden === false && isFunction(this._show) && this._show()

    this._callRendered()
  }

  _callRendered() {
    this.rendered = true
    isFunction(this._rendered) && this._rendered()
    this._callMixin('_rendered')
    isFunction(this.props._rendered) && this.props._rendered.call(this)
    this.firstRender = false
  }

  // todo: 需要优化，现在循环删除节点，太耗时，计划改成只移除本节点，子节点只做清理操作
  remove() {
    const el = this._removeCore()
    this.parent && this.parent.removeChild(this)
    el.parentNode.removeChild(el)
  }

  update(props) {
    this._propStyleClasses.length = 0
    this.setProps(props)
    this._off()
    this.off()
    this.config()
    this.render()
  }

  emptyChildren() {
    while (this.element.firstChild) {
      if (this.element.firstChild.component) {
        this.element.firstChild.component.remove()
      } else {
        this.element.removeChild(this.element.firstChild)
      }
    }
  }

  offsetWidth() {
    return this.element.offsetWidth
  }

  _mountElement() {
    const { placement } = this.props
    this.referenceElement =
      this.props.reference instanceof Component
        ? this.props.reference.element
        : this.props.reference
    this.element = document.createElement(this.props.tag)
    this.element.component = this
    if (placement === 'append') {
      this.referenceElement.appendChild(this.element)
    }
    else if (placement === 'prepend') {
      this.referenceElement.insertBefore(this.element, this.referenceElement.firstChild);
    }
    else if (placement === 'replace') {
      if (this.referenceComponent) {
        this.referenceComponent._removeCore()
        this.parent && this.parent.replaceChild(this.referenceComponent, this)
      }
      this.referenceElement.parentNode.replaceChild(this.element, this.referenceElement)
    }
    else if (placement === 'after') {
      this.referenceElement.insertAdjacentElement('afterend', this.element);
    }
    else if (placement === 'before') {
      this.referenceElement.insertAdjacentElement('beforebegin', this.element);
    }
  }

  getComponent(componentOrElement) {
    return componentOrElement instanceof Component
      ? componentOrElement
      : componentOrElement.component
  }

  getElement(componentOrElement) {
    return componentOrElement instanceof Component ? componentOrElement.element : componentOrElement
  }

  _renderChildren() {
    const { children } = this.props
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i++) {
        this.appendChild(children[i])
      }
    } else {
      this.appendChild(children)
    }
  }

  _removeCore() {
    this.emptyChildren()
    const el = this.element
    isFunction(this.props._remove) && this.props._remove.call(this)
    this._callMixin('_remove')
    isFunction(this._remove) && this._remove()
    this._off()
    this.off()
    this.props.ref && this.props.ref(null)

    for (const p in this) {
      if (this.hasOwnProperty(p)) {
        delete this[p]
      }
    }

    return el
  }

  _callMixin(hookType) {
    for (let i = 0; i < MIXINS.length; i++) {
      const mixin = MIXINS[i]
      mixin[hookType] && mixin[hookType].call(this)
    }
    for (let i = 0; i < this.mixins.length; i++) {
      const mixin = this.mixins[i]
      mixin[hookType] && mixin[hookType].call(this)
    }
  }

  removeChild(childInstance) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === childInstance) {
        delete this.children[i]
        this.children.splice(i, 1)
      }
    }
  }

  replaceChild(oldChild, newChild) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] === oldChild) {
        delete this.children[i]
        this.children[i] = newChild
      }
    }
  }

  setProps(newProps) {
    this.props = Component.extendProps(this.props, newProps)
  }

  appendChild(child) {
    if (!child) {
      return
    }

    const childDefaults = this.props.childDefaults
    let childDefaultsProps = {}
    let childDefaultsMixins = []
    let childProps = {}
    let childMixins = []
    let props = {}
    let mixins = []

    if (childDefaults) {
      if (isPlainObject(childDefaults)) {
        childDefaultsProps = childDefaults
      } else if (childDefaults instanceof ComponentDescriptor) {
        childDefaultsProps = childDefaults.getProps()
        childDefaultsMixins = childDefaults.mixins
      }
    }

    if (isPlainObject(child)) {
      childProps = child
    } else if (child instanceof ComponentDescriptor) {
      childProps = child.getProps()
      childMixins = child.mixins
    } else if (isString(child) || isNumeric(child)) {
      if (isPlainObject(childDefaults)) {
        childProps = { children: child }
      } else if (child[0] === '<') {
        this.element.innerHTML = child
        return
      } else {
        this.element.appendChild(document.createTextNode(child))
        return
      }
    } else if (child instanceof DocumentFragment) {
      this.element.appendChild(child)
      return
    }

    props = Component.extendProps({}, childDefaultsProps, childProps, {
      reference: this.element,
      placement: 'append',
    })

    mixins = [...childDefaultsMixins, ...childMixins]

    this.children.push(Component.create(props, ...mixins))
  }

  before(props) {
    if (!props) {
      return
    }

    const { normalizedProps, mixins } = this._normalizeProps(props)

    const extNormalizedProps = Component.extendProps({}, normalizedProps, {
      reference: this.element,
      placement: 'before',
    })

    // todo:需要改为插到正确的位置
    this.parent.children.push(Component.create(extNormalizedProps, ...mixins))
  }

  after(props) {
    if (!props) {
      return
    }

    const { normalizedProps, mixins } = this._normalizeProps(props)

    const extNormalizedProps = Component.extendProps({}, normalizedProps, {
      reference: this.element,
      placement: 'after',
    })

    this.parent.children.push(Component.create(extNormalizedProps, ...mixins))
  }

  _normalizeProps(props) {
    let normalizedProps = {}
    let mixins = []

    if (isPlainObject(props)) {
      normalizedProps = props
    } else if (props instanceof ComponentDescriptor) {
      normalizedProps = props.getProps()
      mixins = props.mixins
    } else if (isString(props) || isNumeric(props)) {
      normalizedProps = { children: props }
    }
    return { normalizedProps, mixins }
  }

  disable() {
    if (!this.rendered || this.props.disabled === true) {
      return
    }

    this.props.disabled = true
    this.addClass('s-disabled')
    isFunction(this._disable) && this._disable()
  }

  enable() {
    if (!this.rendered || this.props.disabled === false) {
      return
    }

    this.props.disabled = false
    this.removeClass('s-disabled')
    isFunction(this._enable) && this._enable()
  }

  show() {
    if (!this.rendered) {
      this.setProps({ hidden: false })
      this.config()
      this.render()
      return
    }

    if (this.props.hidden === false) {
      return
    }

    this.props.hidden = false
    this.removeClass('s-hidden')
    isFunction(this._show) && this._show()
    this._callHandler(this.props.onShow)
  }

  hide() {
    if (!this.rendered || this.props.hidden === true) {
      return
    }

    this.props.hidden = true
    this.addClass('s-hidden')
    isFunction(this._hide) && this._hide()
    this._callHandler(this.props.onHide)
  }

  select(selectOption) {
    if (!this.rendered) {
      return
    }

    selectOption = extend(
      {
        triggerSelect: true,
        triggerSelectionChange: true,
      },
      selectOption,
    )
    if (this.props.selected === false) {
      this.props.selected = true
      this.addClass('s-selected')
      isFunction(this._select) && this._select()
      selectOption.triggerSelect === true && this._callHandler(this.props.onSelect)
      selectOption.triggerSelectionChange === true &&
        this._callHandler(this.props.onSelectionChange)

      return true
    }

    return false
  }

  unselect(unselectOption) {
    if (!this.rendered) {
      return
    }

    unselectOption = extend(
      {
        triggerUnselect: true,
        triggerSelectionChange: true,
      },
      unselectOption,
    )
    if (this.props.selected === true) {
      this.props.selected = false
      this.removeClass('s-selected')
      isFunction(this._unselect) && this._unselect()

      if (unselectOption.triggerUnselect === true) {
        this._callHandler(this.props.onUnselect)
      }

      if (unselectOption.triggerSelectionChange === true) {
        this._callHandler(this.props.onSelectionChange)
      }

      return true
    }

    return false
  }

  toggleSelect() {
    if (!this.rendered) return
    const { selected, selectable } = this.props
    if (selectable && selectable.canRevert === false && selected === true) {
      return
    }
    this.props.selected === true ? this.unselect() : this.select()
  }

  expand() {
    if (!this.rendered) return
    if (this.props.expanded === true) return

    this.props.expanded = true
    this.addClass('s-expanded')
    const expandTarget = this._getExpandTarget()
    if (expandTarget !== null && expandTarget !== undefined) {
      expandTarget.show()
    }
    const { expandedProps } = this.props.expandable
    if (expandedProps) {
      this.update(expandedProps)
    }
    isFunction(this._expand) && this._expand()
  }

  collapse() {
    if (!this.rendered) return
    if (this.props.expanded === false) return
    this.props.expanded = false
    this.removeClass('s-expanded')
    const expandTarget = this._getExpandTarget()
    if (expandTarget !== null && expandTarget !== undefined) {
      expandTarget.hide()
    }
    isFunction(this._collapse) && this._collapse()
    const { collapsedProps } = this.props.expandable
    if (collapsedProps) {
      this.update(collapsedProps)
    }
  }

  toggleExpand() {
    this.props.expanded === true ? this.collapse() : this.expand()
  }

  toggleHidden() {
    this.props.hidden === true ? this.show() : this.hide()
  }

  addClass(className) {
    this.element.classList.add(className)
  }

  removeClass(className) {
    this.element.classList.remove(className)
  }

  _setExpandableProps() {
    const { expandable } = this.props
    if (isPlainObject(expandable)) {
      if (this.props.expanded) {
        if (expandable.expandedProps) {
          this.setProps(expandable.expandedProps)
        }
      } else if (expandable.collapsedProps) {
        this.setProps(expandable.collapsedProps)
      }
    }
  }

  _setStatusProps() {
    const { props } = this

    this.setProps({
      classes: {
        's-disabled': props.disabled,
        's-selected': props.selected,
        's-hidden': props.hidden,
        's-expanded': props.expanded,
      },
    })
  }

  _getExpandTarget() {
    const { target } = this.props.expandable
    if (target === undefined || target === null) {
      return null
    }
    if (target instanceof Component) {
      return target
    }
    if (isFunction(target)) {
      return target.call(this)
    }
  }

  getChildren() {
    const children = []
    for (let i = 0; i < this.element.childNodes.length; i++) {
      children.push(this.element.childNodes[i].component)
    }
    return children
  }

  _handleAttrs() {
    this._processClick()
    for (const name in this.props.attrs) {
      const value = this.props.attrs[name]
      if (value == null) continue
      if (name === 'style') {
        this._setStyle(value)
      } else if (name[0] === 'o' && name[1] === 'n') {
        this._on(name.slice(2), value)
      } else if (
        name !== 'list' &&
        name !== 'tagName' &&
        name !== 'form' &&
        name !== 'type' &&
        name !== 'size' &&
        name in this.element
      ) {
        this.element[name] = value == null ? '' : value
      } else {
        this.element.setAttribute(name, value)
      }
    }
  }

  _handleStyles() {
    const { props } = this

    const classes = []
    let propClasses = []

    const componentTypeClasses = this._getComponentTypeClasses(this)
    for (let i = 0; i < componentTypeClasses.length; i++) {
      const componentTypeClass = componentTypeClasses[i]
      classes.push(`nom-${hyphenate(componentTypeClass)}`)
    }

    propClasses = propClasses.concat(this._propStyleClasses)
    if (props.type) {
      propClasses.push('type')
    }

    if (props.uistyle) {
      propClasses.push('uistyle')
    }

    for (let i = 0; i < propClasses.length; i++) {
      const modifier = propClasses[i]
      const modifierVal = this.props[modifier]
      if (modifierVal !== null && modifierVal !== undefined) {
        if (modifierVal === true) {
          classes.push(`p-${hyphenate(modifier)}`)
        } else if (typeof modifierVal === 'string' || typeof modifierVal === 'number') {
          classes.push(`p-${hyphenate(modifier)}-${hyphenate(String(modifierVal))}`)
        }
      }
    }

    if (isPlainObject(props.classes)) {
      for (const className in props.classes) {
        if (props.classes.hasOwnProperty(className) && props.classes[className] === true) {
          classes.push(className)
        }
      }
    }

    const { styles } = props
    if (isPlainObject(styles)) {
      addStylesClass(styles)
    }

    function addStylesClass(_styles, className) {
      className = className || ''
      if (isPlainObject(_styles)) {
        for (const style in _styles) {
          if (_styles.hasOwnProperty(style)) {
            addStylesClass(_styles[style], `${className}-${style}`)
          }
        }
      } else if (Array.isArray(_styles)) {
        for (let i = 0; i < _styles.length; i++) {
          if (isString(_styles[i]) || isNumeric(_styles)) {
            classes.push(`u${className}-${_styles[i]}`)
          } else if (_styles[i] === true) {
            classes.push(`u${className}`)
          }
        }
      } else if (isString(_styles) || isNumeric(_styles)) {
        classes.push(`u${className}-${_styles}`)
      } else if (_styles === true) {
        classes.push(`u${className}`)
      }
    }

    if (classes.length) {
      const classNames = classes.join(' ')
      this.element.setAttribute('class', classNames)
    }
  }

  _processClick() {
    const { onClick, selectable, expandable } = this.props
    if (
      onClick ||
      (selectable && selectable.byClick === true) ||
      (expandable && expandable.byClick)
    )
      this.setProps({
        attrs: {
          onclick: this.__handleClick,
        },
      })
  }

  __handleClick(event) {
    const { onClick, selectable, expandable } = this.props
    onClick && this._callHandler(onClick, null, event)
    if (selectable && selectable.byClick === true) {
      this.toggleSelect()
    }
    if (expandable && expandable.byClick === true) {
      this.toggleExpand()
    }
  }

  _callHandler(handler, argObj, event) {
    argObj = isPlainObject(argObj) ? argObj : {}
    event && (argObj.event = event)
    argObj.sender = this
    if (handler) {
      if (isFunction(handler)) {
        return handler(argObj)
      }
      if (isString(handler) && isFunction(this.props[handler])) {
        return this.props[handler](argObj)
      }
    }
  }

  _setStyle(style) {
    const { element } = this
    if (typeof style !== 'object') {
      // New style is a string, let engine deal with patching.
      element.style.cssText = style
    } else {
      // `old` is missing or a string, `style` is an object.
      element.style.cssText = ''
      // Add new style properties
      for (const key in style) {
        const value = style[key]
        if (value != null) element.style.setProperty(normalizeKey(key), String(value))
      }
    }
  }

  _getComponentTypeClasses(instance) {
    const classArray = []
    let ctor = instance.constructor

    while (ctor && ctor.name !== 'Component') {
      classArray.unshift(ctor.name)
      ctor = ctor.__proto__.prototype.constructor
    }

    return classArray
  }

  _on(event, callback) {
    /* if (context) {
            callback = callback.bind(context)
        }
        else {
            callback = callback.bind(this)
        } */
    const cache = this.__htmlEvents || (this.__htmlEvents = {})
    const list = cache[event] || (cache[event] = [])
    list.push(callback)

    this.element.addEventListener(event, callback, false)
  }

  _off(event, callback) {
    let cache
    let i

    // No events, or removing *all* events.
    if (!(cache = this.__htmlEvents)) return this
    if (!(event || callback)) {
      for (const key in this.__htmlEvents) {
        if (this.__htmlEvents.hasOwnProperty(key)) {
          const _list = this.__htmlEvents[key]
          if (!_list) continue
          for (i = _list.length - 1; i >= 0; i -= 1) {
            this.element.removeEventListener(key, _list[i], false)
          }
        }
      }
      delete this.__htmlEvents
      return this
    }

    const list = cache[event]
    if (!list) return

    if (!callback) {
      delete cache[event]
      return
    }

    for (i = list.length - 1; i >= 0; i -= 1) {
      if (list[i] === callback) {
        list.splice(i, 1)
        this.element.removeEventListener(event, callback, false)
      }
    }
  }

  _trigger(eventName) {
    const event = new Event(eventName)
    this.element.dispatchEvent(event)
  }

  _addPropStyle(...props) {
    props.forEach((value) => {
      this._propStyleClasses.push(value)
    })
  }

  _mixin(mixins) {
    this.mixins = [...this.mixins, ...mixins]
  }

  static create(componentProps, ...mixins) {
    let componentType = componentProps.component
    if (isString(componentType)) {
      componentType = components[componentType]
    }

    if (componentType === undefined || componentType === null) {
      componentType = Component
    }

    return new componentType(componentProps, ...mixins)
  }

  static register(component) {
    components[component.name] = component
  }

  static extendProps(...args) {
    return extend(true, {}, ...args)
  }

  static mixin(mixin) {
    MIXINS.push(mixin)
  }
}

Component.normalizeTemplateProps = function (props) {
  if (props === null || props === undefined) {
    return null
  }
  let templateProps = {}
  if (isString(props)) {
    templateProps.children = props
  } else {
    templateProps = props
  }

  return templateProps
}

Component.components = components
Component.mixins = MIXINS

Object.assign(Component.prototype, Events.prototype)

export function n(tagOrComponent, props, children, mixins) {
  return new ComponentDescriptor(tagOrComponent, props, children, mixins)
}

export default Component
