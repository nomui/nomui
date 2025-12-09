import Component, { n } from '../Component/index'
import Tooltip from '../Tooltip/index'
import {
  clone,
  extend,
  isFunction,
  isNullish,
  isPlainObject,
  isTargetInViewport,
} from '../util/index'
import RuleManager from '../util/rule-manager'
import FieldActionMixin from './FieldActionMixin'
import FieldContent from './FieldContent'
import FieldLabel from './FieldLabel'

let nameSeq = 0

class Field extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Field.defaults, props), ...mixins)
  }

  _created() {
    const { name, defaultValue } = this.props
    if (isNullish(this.props.value) && !isNullish(defaultValue)) {
      this.props.value = defaultValue
    } else if (
      isPlainObject(this.props.value) &&
      !isNullish(defaultValue) &&
      isPlainObject(defaultValue)
    ) {
      this.props.value = { ...defaultValue, ...this.props.value }
    }
    this.oldValue = null
    this.currentValue = this.props.value
    this.initValue = clone(this.currentValue) || null

    if (name) {
      this.name = name
      this._autoName = false
    } else {
      this._autoName = true
      this.name = `__field${++nameSeq}`
    }
    this.group = this.props.__group || null
    if (this.parent && this.parent.__isControl === true) {
      this.group = this.parent.field
    }
    this.rootField = this.group === null ? this : this.group.rootField
    this.rules = []
    if (this.props.enableReadMode) {
      this.isReadMode = true
    }
  }

  _config() {
    delete this.errorTip

    this._addPropStyle('required', 'requiredMark', 'labelAlign', 'controlWidth', 'plain', 'variant')

    if (this.props.labelAlign !== 'top' || !this.props.label) {
      this.props.labelExpandable = false
    }

    if (this.props.readonly) {
      this.props.enableReadMode = false
    }

    const {
      label,
      labelAlign,
      labelWidth,
      span,
      notShowLabel,
      required,
      requiredMessage,
      rules = [],
      action,
      labelActions,
      labelExpandable,
      labelUiStyle,
      actionAlign,
      enableReadMode,
    } = this.props
    const showLabel = notShowLabel === false && label !== undefined && label !== null

    // 处理关联字段
    if (Array.isArray(this.props.dependencies) && this.props.dependencies.length) {
      this._handleDependencies()
    }

    this.rules = this.rules.concat(rules)

    if (required === true) {
      this.rules.unshift({ type: 'required', message: requiredMessage })
    }

    if (span) {
      this.setProps({
        styles: {
          col: span,
        },
      })
    }

    let labelProps = showLabel
      ? {
          component: FieldLabel,
          labelActions: labelActions,
          labelExpandable: labelExpandable,
          uistyle: labelUiStyle,
        }
      : null
    if (labelProps && labelWidth && labelAlign !== 'top') {
      if (labelWidth === 'auto') {
        labelProps = Component.extendProps(labelProps, {
          attrs: {
            style: {
              maxWidth: `unset`,
              flexBasis: `auto`,
            },
          },
        })
      } else {
        labelProps = Component.extendProps(labelProps, {
          attrs: {
            style: {
              width: `${labelWidth}px`,
              maxWidth: `${labelWidth}px`,
              flexBasis: `${labelWidth}px`,
            },
          },
        })
      }
    }

    let actionProps = null
    if (action) {
      actionProps = { component: 'List', classes: { 'nom-field-action': true }, gutter: 'sm' }
      if (Array.isArray(action)) {
        actionProps = Component.extendProps(actionProps, { items: action })
      } else {
        actionProps = Component.extendProps(actionProps, action)
      }
    }

    let toggleReadonlyProps = null

    if (enableReadMode) {
      toggleReadonlyProps = {
        classes: { 'nom-field-read-mode-btns': true },
        children: [
          {
            component: 'Button',
            ref: (c) => {
              this.enableReadModeBtnRef = c
            },
            icon: this.isReadMode ? 'edit' : 'check',
            type: 'text',
            onClick: () => {
              if (this.isReadMode) {
                this._setReadMode(false)
              } else {
                this._setReadMode(true)
                if (this.props.enableReadMode.onChange) {
                  this._callHandler(this.props.enableReadMode.onChange, {
                    newValue: this.currentValue,
                    oldValue: this.oldValue,
                  })
                }
              }
            },
          },
          {
            component: 'Button',
            type: 'text',
            icon: 'close',
            classes: {
              'nom-field-read-mode-btns-reset': true,
            },
            onClick: () => {
              this.reset()
              this._setReadMode(true)
            },
          },
        ],
      }
    }

    this.setProps({
      attrs: {
        'data-field-name': this.name,
      },
      classes: {
        's-readonly': this.props.readonly,
        's-compact': this.props.compact,
        [`nom-field-action-align-${actionAlign || 'default'}`]: true,
        'nom-field-with-action': !!actionProps,
        's-read-mode': !!enableReadMode && this.isReadMode === true,
        's-allow-read-mode': !!enableReadMode,
        's-allow-read-mode-hover': enableReadMode && enableReadMode.hover === true,
      },
      children: [
        labelProps,
        {
          component: FieldContent,
          value: this.props.value,
          hidden: this.props.labelExpandable && this.props.labelExpandable.expanded === false,
        },
        toggleReadonlyProps,
        actionProps && n(actionProps, [FieldActionMixin]),
      ],
    })
  }

  _rendered() {
    if (this.props.readonly) {
      const postion = this.element.style.position
      if (!postion || !postion.length || postion === 'static') {
        this.element.style.position = 'relative'
      }
    }
  }

  _setReadMode(isReadMode) {
    if (isReadMode) {
      this.enableReadModeBtnRef.update({ icon: 'edit' })
      this.isReadMode = true
      this.element.classList.add('s-read-mode')
    } else {
      this.enableReadModeBtnRef.update({ icon: 'check' })
      this.isReadMode = false
      this.element.classList.remove('s-read-mode')
    }
  }

  _handleDependencies() {
    const { dependencies } = this.props

    dependencies.forEach((item) => {
      const field = this.rootField.getField(item)

      if (field) {
        field._addRelatedField(this)
      }
    })
  }

  _onSourceValueChange(args) {
    for (const item in this._relatedFields) {
      const field = this._relatedFields[item]

      if (field) {
        field._onDependencyValueChange(args, this)
      }
    }
  }

  _onDependencyValueChange(args, field) {
    this._callHandler(this.props.onDependencyValueChange, {
      ...args,
      ...{ source: field },
    })
  }

  _addRelatedField(field) {
    if (!this._relatedFields) {
      this._relatedFields = {}
    }
    this._relatedFields[field.name] = field
  }

  _update() {
    this.rules = []
  }

  toggleReadonly(param) {
    if (this.element.classList.contains('s-readonly')) {
      if (param !== true) {
        this.element.classList.remove('s-readonly')
      }
    } else if (param !== false) {
      this.element.classList.add('s-readonly')
    }
  }

  expand() {
    if (this.expandBtnRef) {
      this.expandBtnRef.expand()
    }
  }

  collapse() {
    if (this.expandBtnRef) {
      this.expandBtnRef.collapse()
    }
  }

  toggleExpand() {
    if (!this.props.labelExpandable) {
      return
    }
    this.expandBtnRef.props.expanded === true ? this.collapse() : this.expand()
  }

  getValue(options) {
    const value = isFunction(this._getValue) ? this._getValue(options) : null
    return value
  }

  setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }
    isFunction(this._setValue) && this._setValue(value, options)
  }

  getValueText(options, value) {
    return isFunction(this._getValueText) ? this._getValueText(options, value) : this.getValue()
  }

  validate(options) {
    this.validateTriggered = true
    const valid = this._validate(options)
    if (this.expandBtnRef && !valid) {
      this.expand()
    }
    return valid
  }

  softValidate(options = { showInvalidTip: true }) {
    // 如果组件自定义了_validate，那么直接调 validate 返回结果
    if (this._validate !== Field.prototype._validate) {
      return this.validate(options)
    }
    // 否则进行软校验
    this.softValidateTriggered = true
    const valid = this._softValidate(options)
    if (this.expandBtnRef && !valid) {
      this.expand()
    }
    return valid
  }

  // 软校验，配置了soft:true的规则将不会影响校验结果，但会返回校验失败的信息
  _softValidate(options = { showInvalidTip: true }) {
    const { disabled, hidden } = this.props
    if (disabled || hidden) {
      return { valid: true, errors: [] }
    }

    const value = this._getRawValue ? this._getRawValue() : this.getValue()
    const rules = this.rules || []

    // 拆分阻断规则和非阻断规则
    const softRules = rules.filter((r) => r.soft === true)
    const hardRules = rules.filter((r) => r.soft !== true)

    // 1️⃣ 阻断规则交给 _validate 处理，决定最终 valid
    let valid = true
    if (hardRules.length > 0) {
      valid = this._validate({ showInvalidTip: options.showInvalidTip, rules: hardRules })
    }

    // 2️⃣ 非阻断规则单独校验，显示 tooltip，但不影响 valid
    let errors = []

    if (softRules.length > 0) {
      const softResult = RuleManager.validate(softRules, value, true)

      // 硬规则不通过返回false
      if (valid !== true) {
        return false
      }

      // 硬规则通过但存在软规则
      if (Array.isArray(softResult) && softResult.length > 0) {
        // 构建返回的 errors
        errors = softResult.map((item) => ({
          rule: item.rule,
          message: item.message,
        }))

        const firstError = softResult[0]
        this._invalid(firstError.message, true)
        if (!this.element.classList.contains('s-invalid-warning')) {
          this.addClass('s-invalid-warning')
        }

        // 硬规则通过且软规则存在不通过的，返回对象结果
        return { valid, errors }
      }

      this.removeClass('s-invalid-warning')
      this.trigger('valid')
      if (this.errorTip) {
        this.errorTip.remove()
        delete this.errorTip
      }

      // 硬规则通过且软规则通过返回true
      return true
    }

    if (valid) {
      this.removeClass('s-invalid')
      this.removeClass('s-invalid-warning')
      this.trigger('valid')
      if (this.errorTip) {
        this.errorTip.remove()
        delete this.errorTip
      }
    }
    // 没有软规则且硬规则通过，返回valid布尔值
    return valid
  }

  _validate(options) {
    options = options || {}
    const { disabled, hidden } = this.props
    if (disabled || hidden) {
      return true
    }
    let rules = options.rules || this.rules
    const value = this._getRawValue ? this._getRawValue() : this.getValue()

    if (Array.isArray(rules) && rules.length > 0) {
      if (options.ignoreRequired) {
        rules = rules.filter((item) => {
          return item.type !== 'required'
        })
      }
      const validationResult = RuleManager.validate(rules, value)

      if (validationResult === true) {
        this.removeClass('s-invalid')
        this.trigger('valid')
        if (this.errorTip) {
          this.errorTip.remove()
          delete this.errorTip
        }
        return true
      }

      this.addClass('s-invalid')
      this.trigger('invalid', validationResult)
      this._invalid(validationResult)
      return false
    }

    return true
  }

  _invalid(message, warning) {
    if (!this.errorTip) {
      this.errorTip = new Tooltip(
        extend(
          {},
          {
            trigger: this,
            classes: {
              'nom-field-invalid-tooltip': true,
              'nom-field-invalid-tooltip-warning': warning,
            },
            isInvalidTip: true,
            reference: this.content,
            alignTo: this.content,
            hidden: true,
            offset:
              !this.props.invalidTip.align || this.props.invalidTip.align === 'top'
                ? [0, 10]
                : null,
            styles: {
              color: warning ? 'warning' : 'danger',
            },
            children: message,
          },
          this.props.invalidTip,
        ),
      )

      if (this.element.contains(document.activeElement)) {
        this.errorTip.show()
      }
    } else {
      this.errorTip.update({
        children: message,
      })
    }
  }

  // 添加防抖，确保同一个rootField同一时间只会聚焦一个field(优先子层级聚焦)
  focusField(target) {
    if (!this._debounceTimer) {
      target.focus()
      if (!isTargetInViewport(target)) {
        target.element.scrollIntoView({ block: 'center' })
      }
    }

    clearTimeout(this._debounceTimer)

    this._debounceTimer = setTimeout(() => {
      this._debounceTimer = null
    }, 100)
  }

  focus() {
    isFunction(this._focus) && this._focus()
    this.element.focus()
  }

  blur() {
    isFunction(this._blur) && this._blur()
  }

  reset() {
    isFunction(this._reset) && this._reset()
  }

  clear() {
    isFunction(this._clear) && this._clear()
  }

  after(props) {
    if (props) {
      props.__group = this.group
    }
    return super.after(props)
  }

  _reset() {
    this._resetValidStatus()
    this.setValue(this.initValue)
  }

  _clear() {
    this._resetValidStatus()
    this.setValue(null)
  }

  _resetValidStatus() {
    this.removeClass('s-invalid')
    this.removeClass('s-invalid-warning')
    if (this.errorTip) {
      this.errorTip.remove()
      delete this.errorTip
    }
    this.validateTriggered = false
    this.softValidateTriggered = false
    if (this.fields && this.fields.length) {
      for (let i = 0; i < this.fields.length; i++) {
        this.fields[i]._resetValidStatus && this.fields[i]._resetValidStatus()
      }
    }
  }

  triggerEdit() {
    const element = this.control.element
    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
    })
    element.dispatchEvent(event)
    this.focus()
  }

  _remove() {
    if (this.group && Array.isArray(this.group.fields)) {
      const fields = this.group.fields

      for (let i = 0; i < fields.length; i++) {
        if (fields[i] === this) {
          delete fields[i]
          fields.splice(i, 1)
        }
      }
    }
  }

  _triggerDependencyValueChange() {
    const args = { name: this.props.name, oldValue: this.oldValue, newValue: this.currentValue }
    this._onSourceValueChange(args)
  }

  // 派生的控件子类内部适当位置调用
  _onValueChange(args) {
    const that = this
    this.oldValue = clone(this.currentValue)

    this.currentValue = clone(this.getValue())
    this.props.value = this.currentValue

    args = extend(true, args, {
      name: this.props.name,
      oldValue: this.oldValue,
      newValue: this.currentValue,
    })

    setTimeout(function () {
      that.props && that.props.onValueChange && that._callHandler(that.props.onValueChange, args)
      that.group && that.group._onValueChange({ changedField: args.changedField || that })
      isFunction(that._valueChange) && that._valueChange(args)
      if (that.validateTriggered) {
        that._validate()
      }
      if (that.softValidateTriggered) {
        that._softValidate()
      }
    }, 0)

    this._triggerDependencyValueChange()
  }
}

Field.defaults = {
  label: null,
  labelAlign: 'right',
  invalidTip: {},
  uistyle: 'default',
  value: null,
  defaultValue: null,
  flatValue: false,
  span: null,
  notShowLabel: false,
  rules: [],
  extra: null,
  tabindex: null,
  compact: false,
  labelExpanded: true,
}

Object.defineProperty(Field.prototype, 'fields', {
  get: function () {
    if (!this.control) return []
    return this.control.getChildren().filter((x) => {
      return !!x
    })
  },
})

Component.register(Field)

export default Field
