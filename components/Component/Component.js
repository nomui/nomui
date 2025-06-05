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

import {
  cleanupStaleContexts,
  nomComponentStack,
  nomGlobalContexts,
  nomuiContextWatchers,
  registerComponentContext,
} from '../util/context-manager'
import ComponentDescriptor from './ComponentDescriptor'

const components = {}
const MIXINS = []
let keySeq = 0

class Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      reference: document.body,
      placement: 'append',
      autoRender: true,
      renderIf: true,
      animate: true,

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
        indicator: null,
        byIndicator: false,
        expandedProps: false,
        collapsedProps: false,
      },
      prefixClass: 'nom-',
    }
    this.props = Component.extendProps(defaults, props)

    this.parent = null
    this.root = null
    this.rendered = false
    this.mixins = []
    this.firstRender = true

    this._propStyleClasses = []

    mixins && this._mixin(mixins)

    this._setKey()

    this._componentContext = {}
    this._handleContext(props)

    isFunction(this._create) && this._create()

    this.referenceComponent =
      this.props.reference instanceof Component
        ? this.props.reference
        : this.props.reference.component
    if (this.referenceComponent) {
      if (this.props.placement === 'append' || this.props.placement === 'prepend') {
        this.parent = this.referenceComponent
      } else {
        this.parent = this.referenceComponent.parent
      }
    }
    this.referenceElement =
      this.props.reference instanceof Component
        ? this.props.reference.element
        : this.props.reference

    if (this.parent === null) {
      this.root = this
    } else {
      this.root = this.parent.root
    }

    if (this.props.placement === 'replace') {
      if (this.referenceComponent) {
        this.referenceElement = this.referenceComponent._removeCore()
      }
    }

    if (this.props.ref) {
      this.props.ref(this)
    }

    this.componentType = this.__proto__.constructor.name

    const ret = this.create()
    if (Array.isArray(ret)) {
      Promise.all(ret).then(() => {
        if (this.props.autoRender === true) {
          this.config()
          this.render()
        }
      })
      this._mountPlaceHolder()
    } else if (this.props.autoRender === true) {
      this.config()
      this.render()
    } else {
      this._mountPlaceHolder()
    }

    // 检查当前组件有无context监听器，有则注册
    if (this.props && this.props.contextListeners && isPlainObject(this.props.contextListeners)) {
      Object.entries(this.props.contextListeners).forEach(([key, callback]) => {
        if (isFunction(callback)) {
          this.addContextListener(key, callback)
        }
      })
    }
  }

  create() {
    const promises = []
    this.__handleClick = this.__handleClick.bind(this)
    this.__handleMouseEnter = this.__handleMouseEnter.bind(this)
    this.__handleMouseLeave = this.__handleMouseLeave.bind(this)
    if (isFunction(this._created)) {
      const ret = this._created()
      if (ret && isFunction(ret.then)) {
        promises.push(ret)
      }
    }
    this._callMixin('_created')
    this.props._created && this.props._created.call(this, this)
    if (isFunction(this.props.onCreated)) {
      const ret = this.props.onCreated({ inst: this, props: this.props })
      if (ret && isFunction(ret.then)) {
        promises.push(ret)
      }
    }
    if (promises.length) {
      return promises
    }
  }

  _created() {}

  _setKey() {
    if (this.props.key) {
      this.key = this.props.key
      if (isFunction(this.props.key)) {
        this.key = this.props.key.call(this, this)
      }
    }

    if (this.key === undefined || this.key === null) {
      this.key = `__key${++keySeq}`
    }
  }

  config() {
    this._setExpandableProps()
    this._setSelectableProps()

    this.props._config && this.props._config.call(this, this)
    isFunction(this.props.onConfig) && this.props.onConfig({ inst: this, props: this.props })

    if (this._callMixin('_config') !== false) {
      isFunction(this._config) && this._config()
    }

    this._setExpandableProps()
    this._setSelectableProps()
    this._setStatusProps()
  }

  _config() {}

  render() {
    try {
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
      this.props.expanded === true && isFunction(this._expand) && this._expand()

      this.props.selected === true && this._triggerSelectOnInit()

      this._callRendered()
    } catch (error) {
      console.error('Render failed for component', this, error)
    }
  }

  _triggerSelectOnInit() {
    if (this.props.selectable.triggerOnInit === true) {
      this._callHandler(this.props.onSelect, null)
      this._callHandler(this.props.onSelectionChange)
    }
  }

  _callRendered() {
    this.rendered = true
    isFunction(this._rendered) && this._rendered()
    this._callMixin('_rendered')
    isFunction(this.props._rendered) && this.props._rendered.call(this, this)
    isFunction(this.props.onRendered) &&
      this.props.onRendered({ inst: this, props: this.props, isUpdate: this.firstRender === false })
    this.firstRender = false
  }

  _rendered() {}

  // todo: 需要优化，现在循环删除节点，太耗时，计划改成只移除本节点，子节点只做清理操作
  remove() {
    if (!this.props) {
      return
    }
    const el = this._removeCore()
    this.parent && this.parent.hasOwnProperty('removeChild') && this.parent.removeChild(this)
    el.parentNode && el.parentNode.removeChild(el)
  }

  update(props) {
    isFunction(this._update) && this._update(props)
    this._propStyleClasses.length = 0
    this.setProps(props)
    this._off()
    this.off()
    this.config()
    this.render()
  }

  replace(props) {
    let newProps = props
    let newMixins = []
    if (props instanceof ComponentDescriptor) {
      newProps = props.getProps()
      newMixins = props.mixins
    }

    this.__inReplace = true
    if (!newProps.component) {
      newProps.component = this.props.component
    }
    if (!newProps.ref) {
      newProps.ref = this.props.ref
    }
    return Component.create(
      Component.extendProps(newProps, { placement: 'replace', reference: this }),
      ...newMixins,
    )
  }

  emptyChildren() {
    while (this.element.firstChild) {
      const el = this.element.firstChild
      if (el.component && el.component.props) {
        el.component.remove()
      } else {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  }

  offsetWidth() {
    return this.element.offsetWidth
  }

  _mountPlaceHolder() {
    const { placement } = this.props

    this._placeHolderElement = document.createElement('div')
    this._placeHolderElement.classList.add('placeholder')
    const { placeholderProps } = this.props
    if (isPlainObject(placeholderProps)) {
      const { width, height, loading } = placeholderProps
      if (width) {
        this._placeHolderElement.style.width = isNumeric(width) ? `${width}px` : width
      }
      if (height) {
        this._placeHolderElement.style.height = isNumeric(height) ? `${height}px` : height
      }
      if (loading) {
        this._placeHolderElement.classList.add('nom-placeholder-element-loading')
      }
    }

    if (placement === 'append') {
      this.referenceElement.appendChild(this._placeHolderElement)
    } else if (placement === 'prepend') {
      this.referenceElement.insertBefore(this._placeHolderElement, this.referenceElement.firstChild)
    } else if (placement === 'after') {
      this.referenceElement.insertAdjacentElement('afterend', this._placeHolderElement)
    } else if (placement === 'before') {
      this.referenceElement.insertAdjacentElement('beforebegin', this._placeHolderElement)
    } else if (placement === 'replace') {
      this._placeHolderElement = this.referenceElement
    }
  }

  _mountElement() {
    const { placement } = this.props

    this.element = document.createElement(this.props.tag)
    this.element.component = this

    if (this._placeHolderElement) {
      this._placeHolderElement.parentNode &&
        this._placeHolderElement.parentNode.replaceChild(this.element, this._placeHolderElement)
      return
    }

    if (placement === 'append') {
      this.referenceElement.appendChild(this.element)
    } else if (placement === 'prepend') {
      this.referenceElement.insertBefore(this.element, this.referenceElement.firstChild)
    } else if (placement === 'replace') {
      this.referenceElement.parentNode.replaceChild(this.element, this.referenceElement)
    } else if (placement === 'after') {
      this.referenceElement.insertAdjacentElement('afterend', this.element)
    } else if (placement === 'before') {
      this.referenceElement.insertAdjacentElement('beforebegin', this.element)
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
        if (children[i] && children[i].renderIf !== false) {
          this.appendChild(children[i])
        }
      }
    } else if (children === 0) {
      this.appendChild(`${children}`)
    } else if (children && children.renderIf !== false) {
      this.appendChild(children)
    }
  }

  _cleanupUnusedContexts() {
    // 清理当前组件的context
    if (this._componentContext) {
      nomGlobalContexts.delete(this)
      const index = nomComponentStack.findIndex((ref) => ref.deref() === this)
      if (index !== -1) {
        nomComponentStack.splice(index, 1)
      }
    }
    cleanupStaleContexts() // 清理全局context当中组件元素已经不存在于文档上的部分
  }

  _removeCore() {
    this._removeContextWatcher() // 清理context watcher
    this._cleanupUnusedContexts() // 清理context

    this.props && isFunction(this.props._remove) && this.props._remove.call(this, this)

    let el = this.element
    if (el) {
      this.emptyChildren()
    } else {
      el = this._placeHolderElement
    }

    this.props &&
      isFunction(this.props.onRemove) &&
      this.props.onRemove({ inst: this, props: this.props })
    this._callMixin('_remove')
    isFunction(this._remove) && this._remove()
    this.trigger('remove')
    this._off()
    this.off()

    if (!this.__inReplace) {
      this.props.ref && this.props.ref(null)
    }

    for (const p in this) {
      if (this.hasOwnProperty(p)) {
        delete this[p]
      }
    }

    return el
  }

  _remove() {}

  _callMixin(hookType) {
    const mixinsList = [...MIXINS, ...this.mixins]
    let abort = false

    // 钩子函数执行完如果return false则判定跳过后续代码
    for (let i = 0; i < mixinsList.length; i++) {
      const mixin = mixinsList[i]
      const hookContinue = mixin[hookType] && mixin[hookType].call(this, this)
      if (hookContinue === false) {
        abort = true
      }
    }

    if (abort) {
      return false
    }
  }

  setProps(newProps) {
    this.props = Component.extendProps(this.props, newProps)
  }

  assignProps(newProps) {
    this.props = { ...this.props, ...newProps }
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
      } else if (child[0] === '#') {
        this.element.innerHTML = child.slice(1)
        return
      } else {
        this.element.textContent = child
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

    const compt = Component.create(props, ...mixins)

    return compt
  }

  prependChild(child) {
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
      } else if (child[0] === '#') {
        this.element.innerHTML = child.slice(1)
        return
      } else {
        this.element.textContent = child
        return
      }
    } else if (child instanceof DocumentFragment) {
      this.referenceElement.insertBefore(child, this.referenceElement.firstChild)
      return
    }

    props = Component.extendProps({}, childDefaultsProps, childProps, {
      reference: this.element,
      placement: 'prepend',
    })

    mixins = [...childDefaultsMixins, ...childMixins]

    const compt = Component.create(props, ...mixins)

    return compt
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

    return Component.create(extNormalizedProps, ...mixins)
  }

  after(props) {
    if (!props) {
      return
    }

    let { normalizedProps, mixins } = this._normalizeProps(props)

    normalizedProps = Component.extendProps({}, normalizedProps, {
      reference: this.element,
      placement: 'after',
    })

    if (this.parent && this.parent.props.childDefaults) {
      const {
        normalizedProps: childDefaultsProps,
        mixins: childDefaultsMixins,
      } = this._normalizeProps(this.parent.props.childDefaults)
      normalizedProps = Component.extendProps(childDefaultsProps, normalizedProps)
      mixins = [...childDefaultsMixins, ...mixins]
    }

    return Component.create(normalizedProps, ...mixins)
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
  }

  hide() {
    if (!this.rendered || this.props.hidden === true) {
      return
    }

    this.props.hidden = true
    this.addClass('s-hidden')
    this._callHandler(this.props.onHide)
    isFunction(this._hide) && this._hide()
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
      const { selectedProps } = this.props.selectable
      if (selectedProps) {
        this.update(selectedProps)
      }
      isFunction(this._select) && this._select()
      selectOption.triggerSelect === true &&
        this._callHandler(this.props.onSelect, null, selectOption.event)

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
      const { unselectedProps } = this.props.selectable
      if (unselectedProps) {
        this.update(unselectedProps)
      }
      isFunction(this._unselect) && this._unselect()

      if (unselectOption.triggerUnselect === true && this.props) {
        this._callHandler(this.props.onUnselect, null, unselectOption.event)
      }

      if (unselectOption.triggerSelectionChange === true && this.props) {
        this._callHandler(this.props.onSelectionChange)
      }

      return true
    }

    return false
  }

  toggleSelect(event) {
    if (!this.rendered) return
    const { selected, selectable } = this.props
    if (selectable && selectable.canRevert === false && selected === true) {
      return
    }
    this.props.selected === true ? this.unselect({ event: event }) : this.select({ event })
  }

  expand() {
    if (!this.rendered) return
    if (this.props.expanded === true) return

    this.props.expanded = true
    this.addClass('s-expanded')
    const expandTarget = this._getExpandTarget()
    if (expandTarget !== null && expandTarget !== undefined) {
      if (Array.isArray(expandTarget)) {
        expandTarget.forEach((t) => {
          // t.addClass('nom-expandable-animate-show')
          t.show && t.show()
        })
      } else {
        // expandTarget.addClass('nom-expandable-animate-show')
        expandTarget.show && expandTarget.show()
      }
    }
    this._expandIndicator && this._expandIndicator.expand()
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
      if (Array.isArray(expandTarget)) {
        expandTarget.forEach((t) => {
          t.hide && t.hide()
          // t.addClass('nom-expandable-animate-hide')
          // setTimeout(() => {
          //   t.hide && t.hide()
          //   t.removeClass('nom-expandable-animate-show')
          //   t.removeClass('nom-expandable-animate-hide')
          // }, 120)
        })
      } else {
        expandTarget.hide && expandTarget.hide()
        // expandTarget.addClass('nom-expandable-animate-hide')
        // setTimeout(() => {
        //   expandTarget.hide && expandTarget.hide()
        //   expandTarget.removeClass('nom-expandable-animate-show')
        //   expandTarget.removeClass('nom-expandable-animate-hide')
        // }, 120)
      }
    }
    this._expandIndicator && this._expandIndicator.collapse()
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
    const that = this
    const { expandable, expanded } = this.props
    if (isPlainObject(expandable)) {
      if (isPlainObject(expandable.indicator)) {
        this.setProps({
          expandable: {
            indicator: {
              expanded: expanded,
              _created: function () {
                that._expandIndicator = this
              },
            },
          },
        })
      }

      if (this.props.expanded) {
        if (expandable.expandedProps) {
          this.setProps(expandable.expandedProps)
        }
      } else if (expandable.collapsedProps) {
        this.setProps(expandable.collapsedProps)
      }
    }
  }

  _setSelectableProps() {
    const { selectable, selected } = this.props
    if (isPlainObject(selectable)) {
      if (selected) {
        if (selectable.selectedProps) {
          this.setProps(selectable.selectedProps)
        }
      } else if (selectable.unselectedProps) {
        this.setProps(selectable.unselectedProps)
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
      return target.call(this, this)
    }
  }

  getExpandableIndicatorProps(expanded = null) {
    const that = this
    const { indicator, byIndicator, byClick, byHover } = this.props.expandable
    if (expanded == null) {
      expanded = this.props.expanded
    }

    if (indicator === undefined || indicator === null) {
      return null
    }
    if (isPlainObject(indicator)) {
      this.setProps({
        expandable: {
          indicator: {
            expanded: expanded,
            _created: function () {
              that._expandIndicator = this
            },
          },
        },
      })

      if (byIndicator === true) {
        if (byClick === true) {
          this.setProps({
            expandable: {
              indicator: {
                attrs: {
                  onclick: (event) => {
                    that.toggleExpand()
                    event.stopPropagation()
                  },
                },
              },
            },
          })
        }
        if (byHover === true) {
          this.setProps({
            expandable: {
              indicator: {
                attrs: {
                  onmouseenter: (event) => {
                    that.expand()
                    event.stopPropagation()
                  },
                  onmouseleave: (event) => {
                    that.collapse()
                    event.stopPropagation()
                  },
                },
              },
            },
          })
        }
      }
    }
    return this.props.expandable.indicator
  }

  getChildren() {
    const children = []
    for (let i = 0; i < this.element.childNodes.length; i++) {
      children.push(this.element.childNodes[i].component)
    }
    return children
  }

  findChild(key) {
    let find = null
    for (let i = 0; i < this.element.childNodes.length; i++) {
      const child = this.element.childNodes[i].component
      if (child.key === key) {
        find = child
        break
      }
    }
    return find
  }

  _handleAttrs() {
    this._processClick()
    this._processHover()
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
      classes.push(`${props.prefixClass}${hyphenate(componentTypeClass)}`)
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
      (expandable && expandable.byClick && !expandable.byIndicator)
    ) {
      this.setProps({
        attrs: {
          onclick: this.__handleClick,
        },
      })
    }
  }

  __handleClick(event) {
    if (this.props._shouldHandleClick && this.props._shouldHandleClick.call(this, this) === false) {
      return
    }
    if (this.props.disabled === true) {
      return
    }
    const { onClick, selectable, expandable } = this.props
    onClick && this._callHandler(onClick, null, event)
    if (selectable && selectable.byClick === true) {
      this.toggleSelect(event)
    }
    if (expandable && expandable.byClick === true && !expandable.byIndicator) {
      this.toggleExpand()
    }
  }

  _processHover() {
    const { onClick, selectable, expandable } = this.props
    if (
      onClick ||
      (selectable && selectable.byHover === true) ||
      (expandable && expandable.byHover && !expandable.byIndicator)
    ) {
      this.setProps({
        attrs: {
          onmouseenter: this.__handleMouseEnter,
          onmouseleave: this.__handleMouseLeave,
        },
      })
    }
  }

  __handleMouseEnter() {
    const { _shouldHandleClick, disabled, selectable, expandable } = this.props
    if (_shouldHandleClick && _shouldHandleClick.call(this, this) === false) {
      return
    }
    if (disabled === true) {
      return
    }
    if (selectable && selectable.byHover === true) {
      this.select()
    }
    if (expandable && expandable.byHover === true) {
      this.expand()
    }
  }

  __handleMouseLeave() {
    const { _shouldHandleClick, disabled, selectable, expandable } = this.props
    if (_shouldHandleClick && _shouldHandleClick.call(this, this) === false) {
      return
    }
    if (disabled === true) {
      return
    }
    if (selectable && selectable.byHover === true) {
      this.unselect()
    }
    if (expandable && expandable.byHover === true) {
      this.collapse()
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

  // 处理 context 相关逻辑
  _handleContext(props) {
    if (props.context) {
      this._componentContext = isFunction(props.context)
        ? props.context.call(this, this)
        : props.context

      // 使用新的注册方法
      registerComponentContext(this, this._componentContext)
    }
  }

  /**
   * 获取指定context值（支持多字段查询）
   * @param {string|string[]} contextKeys 要查询的字段（单个字符串或数组）
   * @returns {any|Object} 单个字段返回对应值，多个字段返回键值对对象
   */
  getContext(contextKeys) {
    // 标准化输入参数（支持字符串或数组）
    const keys = Array.isArray(contextKeys) ? contextKeys : [contextKeys]
    const result = {}

    // 1. 检查自身Context
    for (const key of keys) {
      if (this._componentContext && this._componentContext[key] !== undefined) {
        result[key] = this._componentContext[key]
      }
    }

    // 如果已经找到全部需要的key，提前返回
    if (Object.keys(result).length === keys.length) {
      return Array.isArray(contextKeys) ? result : result[contextKeys]
    }

    const visited = new Set() // 防止循环引用
    let current = this.parent

    while (current && !visited.has(current)) {
      visited.add(current)

      // 检查当前组件的context
      const context = nomGlobalContexts.get(current)
      if (context) {
        for (const key of keys) {
          if (result[key] === undefined && context[key] !== undefined) {
            result[key] = context[key]

            // 如果已经找到全部需要的key，提前返回
            if (Object.keys(result).length === keys.length) {
              return Array.isArray(contextKeys) ? result : result[contextKeys]
            }
          }
        }
      }

      // Popup以及其派生组件，向上查找其opener
      current = current.opener || current.parent
    }

    return Array.isArray(contextKeys) ? result : result[contextKeys]
  }

  /**
   * 设置指定 context 值（支持多个键值对）
   * @param {Object} contextData 要设置的 context 键值对
   */
  setContext(contextData) {
    if (!isPlainObject(contextData)) {
      throw new Error('setContext 参数必须是一个对象')
    }

    const visited = new Set() // 防止循环引用
    let current = this

    // 遍历 contextData 中的每个 key
    for (const [key, value] of Object.entries(contextData)) {
      let contextSet = false
      let targetRef = null // 记录被修改的组件实例

      // 从当前组件开始向上查找
      while (current && !visited.has(current)) {
        visited.add(current)

        if (current._componentContext && current._componentContext[key] !== undefined) {
          current._componentContext[key] = value
          contextSet = true
          targetRef = current
          break
        }

        const globalContext = nomGlobalContexts.get(current)
        if (globalContext && globalContext[key] !== undefined) {
          globalContext[key] = value
          contextSet = true
          targetRef = current
          break
        }

        current = current.opener || current.parent
      }

      if (!contextSet) {
        console.warn(`未找到可以设置 key 为 "${key}" 的 context`)
      }

      // 只触发与 targetRef 匹配的监听
      if (nomuiContextWatchers[key]) {
        nomuiContextWatchers[key].forEach(({ callback, ref }) => {
          if (ref === targetRef) {
            try {
              callback({ key, value, ref: targetRef })
            } catch (e) {
              console.error('contextChange global listener error:', e)
            }
          }
        })
      }

      current = this
    }
  }

  /**
   * 在组件树自身或祖先（含popup穿透）找到存在该key的context组件后，添加全局context监听
   * @param {string|string[]} contextKeys
   * @param {function} callback
   */
  addContextListener(contextKeys, callback) {
    const keys = Array.isArray(contextKeys) ? contextKeys : [contextKeys]
    keys.forEach((key) => {
      let current = this
      const visited = new Set()
      let foundRef = null
      while (current && !visited.has(current)) {
        visited.add(current)
        if (current._componentContext && current._componentContext[key] !== undefined) {
          foundRef = current
          break
        }
        const globalContext = nomGlobalContexts.get(current)
        if (globalContext && globalContext[key] !== undefined) {
          foundRef = current
          break
        }
        current = current.opener || current.parent
      }
      if (foundRef) {
        if (!nomuiContextWatchers[key]) {
          nomuiContextWatchers[key] = []
        }
        nomuiContextWatchers[key].push({ watcher: this, callback, ref: foundRef })
      }
    })
  }

  /**
   * 移除全局context监听
   * @param {string|string[]} contextKeys
   * @param {function} callback
   */
  removeContextListener(contextKeys, callback) {
    const keys = Array.isArray(contextKeys) ? contextKeys : [contextKeys]
    keys.forEach((key) => {
      if (nomuiContextWatchers[key]) {
        nomuiContextWatchers[key] = nomuiContextWatchers[key].filter(
          (item) => item.watcher !== this || item.callback !== callback,
        )
      }
    })
  }

  _removeContextWatcher() {
    // 清理context监听关系
    // 1. 如果当前组件是监听端，则移除所有以this为watcher的监听
    for (const key in nomuiContextWatchers) {
      if (!Array.isArray(nomuiContextWatchers[key])) continue
      // 移除当前组件作为监听端的监听
      nomuiContextWatchers[key] = nomuiContextWatchers[key].filter((item) => item.watcher !== this)
      // 如果当前组件是被监听端（即targetRef），也移除所有相关监听
      nomuiContextWatchers[key] = nomuiContextWatchers[key].filter((item) => item.ref !== this)
      // 如果该key下没有监听了，清理掉
      if (nomuiContextWatchers[key].length === 0) {
        delete nomuiContextWatchers[key]
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
    for (let i = 0; i < mixins.length; i++) {
      const mixin = mixins[i]
      if (isPlainObject(mixin) && isPlainObject(mixin.methods)) {
        for (const key in mixin.methods) {
          if (mixin.methods.hasOwnProperty(key)) {
            if (!this[key]) {
              this[key] = mixin.methods[key]
            }
          }
        }
      }
    }

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

  static register(component, name) {
    if (name !== undefined) {
      components[name] = component
    } else {
      components[component.name] = component
    }
  }

  static extendProps(...args) {
    return extend(true, {}, ...args)
  }

  static mixin(mixin) {
    MIXINS.push(mixin)
  }

  // 静态方法：根据 key 获取组件 context
  static getContextByKey(key) {
    return nomGlobalContexts.get(key)
  }

  // 静态方法：获取当前组件栈
  static getComponentStack() {
    return [...nomComponentStack]
  }

  // 静态方法：查找最近的包含指定 context 的组件
  static findNearestContext(key) {
    for (let i = nomComponentStack.length - 1; i >= 0; i--) {
      const componentRef = nomComponentStack[i]
      const component = componentRef.deref()
      if (!component) {
        nomComponentStack.splice(i, 1) // 自动清理无效引用
        continue
      }
      const context = nomGlobalContexts.get(component)
      if (context && context[key]) {
        return context[key]
      }
    }
    return null
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

Object.defineProperty(Component.prototype, 'children', {
  get: function () {
    return this.getChildren()
  },
})

export function n(tagOrComponent, props, children, mixins) {
  if (arguments.length === 2) {
    return new ComponentDescriptor(null, tagOrComponent, null, props)
  }
  return new ComponentDescriptor(tagOrComponent, props, children, mixins)
}

export default Component
