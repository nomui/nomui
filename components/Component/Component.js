import { isPlainObject, isString, hyphenate, htmlEncode, isFunction, extend, normalizeKey } from '../util/index'
import { Events } from '../util/events'

let components = {}
let mixins = []

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
                unselectedProps: null
            },
            expandable: {
                byClick: false,
                byHover: false,
                target: null,
                expandedProps: false,
                collapsedProps: false
            }
        }
        this.props = Component.extendProps(defaults, props)

        this.parent = null
        this.children = []
        this.root = null
        this.rendered = false
        this.scope = null
        this.refs = {}
        this.mixins = []
        this._scoped = false

        this._propStyleClasses = []

        mixins && this._mixin(mixins)

        if (this.props.key) {
            this.key = this.props.key
            if (isFunction(this.props.key)) {
                this.key = this.props.key.call(this)
            }
        }

        this.referenceComponent = this.props.reference instanceof Component ? this.props.reference : this.props.reference.component
        if (this.referenceComponent) {
            if (this.props.placement === 'append') {
                this.parent = this.referenceComponent
            }
            else {
                this.parent = this.referenceComponent.parent
            }
        }

        if (this.parent === null) {
            this.root = this
            this.scope = this.root
        }
        else {
            this.root = this.parent.root
            this.scope = this.parent._scoped ? this.parent : this.parent.scope

        }

        if (this.props.ref && this.scope) {
            this.scope.refs[this.props.ref] = this
        }

        if (this.props.methods) {
            for (var method in this.props.methods) {
                if (this.props.methods.hasOwnProperty(method)) {
                    this[method] = this.props.methods[method]
                }
            }
        }

        this.componentType = this.__proto__.constructor.name
        this.referenceElement = this.props.reference instanceof Component ? this.props.reference.element : this.props.reference
        this.element = document.createElement(this.props.tag)
        this._mountElement()
        this.element.component = this

        this.create()
        if (this.props.autoRender) {
            this.config()
            this.render()
        }
    }

    create() {
        isFunction(this._create) && this._create()
        this._callMixin('_create')
        this.props._create && this.props._create.call(this)
    }

    config() {
        this.props._config && this.props._config.call(this)
        this._callMixin('_config')
        isFunction(this._config) && this._config()
        this._setExpandableProps()
        this._setStatusProps()
    }

    render() {
        if (this.rendered) {
            this.emptyChildren()
        }

        this._handleAttrs()
        this._handleStyles()
        this._handleEvents()

        this._renderChildren()

        this.props.disabled === true && isFunction(this._disable) && this._disable()
        this.props.selected === true && isFunction(this._select) && this._select()
        this.props.hidden === false && isFunction(this._show) && this._show()

        isFunction(this._render) && this._render()
        this._callMixin('_render')
        isFunction(this.props._render) && this.props._render.call(this)

        this.rendered = true
    }

    // todo: 需要优化，现在循环删除节点，太耗时，计划改成只移除本节点，子节点只做清理操作
    remove() {
        let el = this._removeCore()
        this.parent && this.parent.removeChild(this)
        el.parentNode.removeChild(el)
    }

    update(props) {
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
            }
            else {
                this.element.removeChild(this.element.firstChild)
            }
        }
    }

    offsetWidth() {
        return this.element.offsetWidth
    }

    _mountElement() {
        var placement = this.props.placement

        if (placement === 'append') {
            this.referenceElement.appendChild(this.element)
        }
        else if (placement === 'replace') {
            if (this.referenceComponent) {
                this.referenceComponent._removeCore()
                this.parent && this.parent.replaceChild(this.referenceComponent, this)
            }
            this.referenceElement.parentNode.replaceChild(this.element, this.referenceElement)
        }
    }

    _renderChildren() {
        var children = this.props.children
        if (Array.isArray(children)) {
            for (var i = 0; i < children.length; i++) {
                var child = children[i]
                this.appendChild(child, this.props.childDefaults)
            }
        }
        else if (isPlainObject(children)) {
            this.appendChild(children)
        }
        else if (isString(children)) {
            this.element.innerHTML = children
        }
        else if (isString(this.props.template)) {
            var parsedTemplate = this._parseTemplate(this.props.template)
            this.element.innerHTML = parsedTemplate
        }
    }

    _removeCore() {
        this.emptyChildren()
        let el = this.element
        isFunction(this._remove) && this._remove()
        this._callMixin('_remove')
        this._off()
        this.off()

        for (var p in this) {
            if (this.hasOwnProperty(p)) {
                delete this[p]
            }
        }

        return el
    }

    _callMixin(hookType) {
        for (let i = 0; i < mixins.length; i++) {
            let mixin = mixins[i]
            mixin[hookType] && mixin[hookType].call(this)
        }
        for (let i = 0; i < this.mixins.length; i++) {
            let mixin = this.mixins[i]
            mixin[hookType] && mixin[hookType].call(this)
        }
    }

    removeChild(childInstance) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] === childInstance) {
                delete this.children[i]
                this.children.splice(i, 1)
            }
        }
    }

    replaceChild(oldChild, newChild) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i] === oldChild) {
                delete this.children[i]
                this.children[i] = newChild
            }
        }
    }

    setProps(newProps) {
        this.props = Component.extendProps(this.props, newProps)
    }

    appendChild(childProps, childDefaults) {
        if (!childProps) {
            return
        }
        var props = childProps
        if (isString(props)) {
            this.element.innerHTML = props
            return
        }
        if (isFunction(props)) { // todo 处理混入 mixin

        }
        if (childDefaults !== null && childDefaults !== undefined) {
            props = Component.extendProps({}, childDefaults, props)
        }
        if (props) {
            props.component = props.component || Component
            props.reference = this.element
            props.placement = 'append'

            this.children.push(Component.create(props))
        }
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
        this.trigger('show')
    }

    _triggerShow() {
        isFunction(this._show) && this._show()
        this.trigger('show')
    }

    hide() {
        if (!this.rendered || this.props.hidden === true) {
            return
        }

        this.props.hidden = true
        this.addClass('s-hidden')
        isFunction(this._hide) && this._hide()
        this.trigger('hide')
    }

    select(selectOption) {
        if (!this.rendered) {
            return
        }

        selectOption = extend(
            {
                triggerSelect: true,
                triggerSelectionChange: true
            },
            selectOption
        )
        if (this.props.selected === false) {
            this.props.selected = true
            this.addClass('s-selected')
            isFunction(this._select) && this._select()
            selectOption.triggerSelect === true && this.trigger('select', selectOption.isInit === true)
            selectOption.triggerSelectionChange === true && this.trigger('selectionChange', selectOption.isInit === true)

            return true
        }
        else {
            return false
        }
    }

    unselect(unselectOption) {
        if (!this.rendered) {
            return
        }

        unselectOption = extend(
            {
                triggerUnselect: true,
                triggerSelectionChange: true
            },
            unselectOption
        )
        if (this.props.selected === true) {
            this.props.selected = false
            this.removeClass('s-selected')
            isFunction(this._unselect) && this._unselect()

            if (unselectOption.triggerUnselect === true) {
                this.trigger('unselect')
            }

            if (unselectOption.triggerSelectionChange === true) {
                this.trigger('selectionChange')
            }

            return true
        }
        else {
            return false
        }
    }

    toggleSelect() {
        if (!this.rendered) return
        this.props.selected === true ? this.unselect() : this.select()
    }

    expand() {
        if (!this.rendered) return
        if (this.props.expanded === true) return

        this.props.expanded = true
        this.addClass('s-expanded')
        var expandTarget = this._getExpandTarget()
        if (expandTarget !== null && expandTarget !== undefined) {
            expandTarget.show()
        }
        var expandedProps = this.props.expandable.expandedProps
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
        var expandTarget = this._getExpandTarget()
        if (expandTarget !== null && expandTarget !== undefined) {
            expandTarget.hide()
        }
        isFunction(this._collapse) && this._collapse()
        var collapsedProps = this.props.expandable.collapsedProps
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
        var expandable = this.props.expandable
        if (isPlainObject(expandable)) {
            if (this.props.expanded) {
                if (expandable.expandedProps) {
                    this.setProps(expandable.expandedProps)
                }
            }
            else {
                if (expandable.collapsedProps) {
                    this.setProps(expandable.collapsedProps)
                }
            }
        }
    }

    _setStatusProps() {
        var props = this.props

        this.setProps({
            classes: {
                's-disabled': props.disabled,
                's-selected': props.selected,
                's-hidden': props.hidden,
                's-expanded': props.expanded,
            }
        })
    }

    _getExpandTarget() {
        var target = this.props.expandable.target
        if (target === undefined || target === null) {
            return null
        }
        if (target instanceof Component) {
            return target
        }
        else if (isString(target)) {
            return this.getScopedComponent(target)
        }
        else if (isFunction(target)) {
            return target.call(this)
        }
    }

    getScopedComponent(name) {
        var scope = scope
        if (scope) {
            return scope.refs[name]
        }
    }

    getRef(refs, componentTypes) {
        var retComponent = null
        componentTypes = componentTypes || Component
        if (isFunction(refs)) {
            retComponent = refs.call(this)
        }
        else if (isString(refs)) {
            retComponent = this.getScopedComponent(refs)
        }
        if (retComponent instanceof componentTypes) {
            return retComponent
        }

        return retComponent
    }

    getChildren() {
        var children = []
        for (var i = 0; i < this.element.childNodes.length; i++) {
            children.push(this.element.childNodes[i].component)
        }
        return children
    }

    _handleAttrs() {
        for (var name in this.props.attrs) {
            var value = this.props.attrs[name]
            if (value == null) continue
            if (name === 'style') {
                this._setStyle(value)
            }
            else if (name[0] === "o" && name[1] === "n") {
                this._on(name.slice(2), value)
            }
            else if (name !== 'list' && name !== 'tagName' && name !== 'form' && name !== 'type' && name !== 'size' && name in this.element) {
                this.element[name] = value == null ? '' : value
            }
            else {
                this.element.setAttribute(name, value)
            }
        }
    }

    _handleStyles() {
        var props = this.props

        var classes = []

        var componentTypeClasses = this._getComponentTypeClasses(this)
        for (var i = 0; i < componentTypeClasses.length; i++) {
            var componentTypeClass = componentTypeClasses[i]
            classes.push('nom-' + hyphenate(componentTypeClass))
        }

        if (props.type) {
            this._propStyleClasses.push('type')
        }
        for (var i = 0; i < this._propStyleClasses.length; i++) {
            var modifier = this._propStyleClasses[i]
            var modifierVal = this.props[modifier]
            if (modifierVal !== null && modifierVal !== undefined) {
                if (modifierVal === true) {
                    classes.push('p-' + modifier)
                }
                else if (typeof modifierVal === 'string') {
                    classes.push('p-' + hyphenate(modifier) + '-' + modifierVal)
                }
            }
        }

        if (isPlainObject(props.classes)) {
            for (var className in props.classes) {
                if (props.classes.hasOwnProperty(className) && props.classes[className] == true) {
                    classes.push(className)
                }
            }
        }

        var styles = props.styles
        if (isPlainObject(styles)) {
            addStylesClass(styles)
        }

        function addStylesClass(styles, className) {
            className = className || ''
            if (isPlainObject(styles)) {
                for (var style in styles) {
                    if (styles.hasOwnProperty(style)) {
                        addStylesClass(styles[style], className + '-' + style)
                    }
                }
            }
            else if (Array.isArray(styles)) {
                for (var i = 0; i < styles.length; i++) {
                    if (isString(styles[i])) {
                        classes.push('u' + className + '-' + styles[i])
                    }
                }
            }
            else if (isString(styles)) {
                classes.push('u' + className + '-' + styles)
            }
        }

        if (classes.length) {
            var classNames = classes.join(' ')
            this.element.setAttribute('class', classNames)
        }
    }

    _handleEvents() {
        var props = this.props
        var events = this.props.events
        for (var event in events) {
            if (events.hasOwnProperty(event)) {
                this.on(event, events[event])
            }
        }

        if (props.selectable && props.selectable.byClick) {
            this._on('click', this.toggleSelect)
        }

        if (props.expandable && props.expandable.byClick) {
            this._on('click', this.toggleExpand)
        }
    }

    _setStyle(style) {
        var element = this.element
        if (typeof style !== "object") {
            // New style is a string, let engine deal with patching.
            element.style.cssText = style
        } else {
            // `old` is missing or a string, `style` is an object.
            element.style.cssText = ""
            // Add new style properties
            for (var key in style) {
                var value = style[key]
                if (value != null) element.style.setProperty(normalizeKey(key), String(value))
            }
        }
    }

    _getComponentTypeClasses(instance) {
        var classArray = []
        var ctor = instance.constructor

        while (ctor && ctor.name != 'Component') {
            classArray.unshift(ctor.name)
            ctor = ctor.__proto__.prototype.constructor
        }

        return classArray
    }

    _parseTemplate(template) {
        var that = this

        return template.replace(/\{\{([^\}]*)\}\}/g, function (str, key) {
            var fn = new Function('return (' + key + ');')
            var val = fn.call(that)

            return (typeof val !== "undefined" && val !== null) ? htmlEncode(val) : ""
        })
    }

    _on(element, event, callback) {
        if (!callback) {
            callback = event
            event = element
            element = this.element
        }
        var cache, list
        callback = callback.bind(this)
        cache = this.__htmlEvents || (this.__htmlEvents = {})
        list = cache[event] || (cache[event] = [])
        list.push(callback)

        element.addEventListener(event, callback, false)
    }

    _off(event, callback) {
        var that = this
        var cache, list, i

        // No events, or removing *all* events.
        if (!(cache = this.__htmlEvents)) return this
        if (!(event || callback)) {
            for (var key in this.__htmlEvents) {
                if (this.__htmlEvents.hasOwnProperty(key)) {
                    var list = this.__htmlEvents[key]
                    if (!list) continue
                    for (i = list.length - 1; i >= 0; i -= 1) {
                        that.element.removeEventListener(key, list[i], false)
                    }
                }
            }
            delete this.__htmlEvents
            return this
        }

        list = cache[event]
        if (!list) return

        if (!callback) {
            delete cache[event]
            return
        }

        for (i = list.length - 1; i >= 0; i -= 1) {
            if (list[i] === callback) {
                list.splice(i, 1)
                that.element.removeEventListener(event, callback, false)
            }
        }
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

    static extendProps(out) {
        out = out || {}

        for (var i = 1; i < arguments.length; i++) {
            var obj = arguments[i]

            if (!obj) continue

            for (var key in obj) {
                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if (key === "__proto__" || out === obj[key]) {
                    continue
                }
                if (obj.hasOwnProperty(key) && isPlainObject(obj[key])) {
                    out[key] = Component.extendProps(out[key], obj[key])
                }
                else if (obj[key] !== undefined) {
                    out[key] = obj[key]
                }
            }
        }

        return out
    }

    static mixin(mixin) {
        mixins.push(mixin)
    }
}
Component.normalizeTemplateProps = function (props) {
    if (props === null || props === undefined) {
        return null
    }
    var templateProps = {}
    if (isString(props)) {
        templateProps.children = props
    }
    else {
        templateProps = props
    }

    return templateProps
}

Component.components = components
Component.mixins = mixins

Object.assign(Component.prototype, Events.prototype)

export default Component