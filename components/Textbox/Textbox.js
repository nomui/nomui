import Button from '../Button/index'
import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import { extend, isPlainObject, isString } from '../util/index'
import Input from './Input'

class Textbox extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Textbox.defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const {
      allowClear,
      clearProps,
      leftIcon,
      prefix,
      rightIcon,
      suffix,
      minlength,
      maxlength,
      showWordLimit,
      placeholder,
      value,
      htmlType,
      button,
      readonly,
      disabled,
      restrictInput,
    } = this.props

    if (
      minlength &&
      minlength > 0 &&
      this.rules.findIndex((rule) => rule.type === 'minlength') === -1
    ) {
      this.setProps({
        rules: [{ type: 'minlength', value: minlength }, ...this.props.rules],
      })
    }

    // 左侧icon
    let leftIconProps = Component.normalizeIconProps(leftIcon)
    if (leftIconProps != null) {
      leftIconProps = Component.extendProps(leftIconProps, {
        classes: { 'nom-textbox-left-icon': true },
      })
    }

    // 右侧icon
    let rightIconProps = Component.normalizeIconProps(rightIcon)
    if (rightIconProps != null) {
      rightIconProps = Component.extendProps(rightIconProps, {
        classes: { 'nom-textbox-right-icon': true },
      })
    }

    const buttonProps = isPlainObject(button)
      ? Component.extendProps(
          { component: Button, classes: { 'nom-textbox-button': true } },
          button,
        )
      : null

    const inputProps = {
      component: Input,
      name: 'input',
      // readonly: restrictInput,
      attrs: {
        value: value,
        placeholder: placeholder,
        maxlength,
        minlength,
        type: htmlType,
        readonly: readonly || restrictInput ? 'readonly' : null,
      },
      _created: function () {
        this.textbox = that
        this.textbox.input = this
      },
    }

    const selfClearProps = {
      component: Icon,
      type: 'times',
      classes: {
        'nom-textbox-clear': true,
        'nom-field-clear-handler': true,
      },
      hidden: !this.props.value,
      ref: (c) => {
        this.clearIcon = c
      },
      onClick: (args) => {
        this.setValue(null)
        this.props.onClear && this._callHandler(this.props.onClear)
        this.props.allowClear && this.clearIcon.hide()
        args.event && args.event.stopPropagation()
      },
    }

    // 前缀或后缀文案
    const getAffixSpan = (affix, type = 'prefix') => ({
      tag: 'span',
      classes: {
        'nom-input-affix': true,
        [`nom-input-${type}`]: true,
      },
      children: affix,
    })
    const getSuffix = () => {
      const child = []
      // 优先取外部传入的
      if (allowClear && !disabled) {
        if (this._ignoreReadonlyClear()) {
          child.push(clearProps || selfClearProps)
        } else if (!readonly) {
          child.push(clearProps || selfClearProps)
        }
      }
      if (rightIcon) {
        child.push(rightIconProps)
      } else if (suffix && isString(suffix)) {
        child.push(suffix)
      }

      return {
        tag: 'div',
        classes: {
          'nom-input-affix': true,
          'nom-input-suffix': true,
        },
        children: child,
      }
    }

    // 输入长度限制
    const getWordLimitSpan = () => ({
      tag: 'span',
      classes: {
        'nom-input-affix': true,
        [`nom-input-count`]: true,
      },
      ref: (c) => {
        this.wordLimitRef = c
      },
      children: `${(value || '').length}/${maxlength}`,
    })
    this.hasWordLimit = htmlType === 'text' && showWordLimit && maxlength && !readonly && !disabled

    // 无左icon 有prefixx || 无右icon 有suffix
    const affixWrapper =
      allowClear || leftIcon || prefix || rightIcon || suffix || this.hasWordLimit

    const baseTextProps = [
      leftIcon && leftIconProps,
      !leftIcon && prefix && isString(prefix) && getAffixSpan(prefix),
      inputProps,
      getSuffix(),
      this.hasWordLimit && getWordLimitSpan(),
    ]

    this.setProps({
      attrs: { readonly: readonly || null },
      classes: {
        'p-with-button': buttonProps !== null,
      },
      control: {
        disabled: disabled,
        children: affixWrapper
          ? [
              {
                // 有左右图标，则再用 wrapper包一层，为了展示
                classes: { 'nom-textbox-affix-wrapper': true },
                children: baseTextProps,
              },
              buttonProps,
            ]
          : [...baseTextProps, buttonProps],
      },
    })

    super._config()
  }

  // 以下组件在 readonly时，还是需要展示 清除按钮
  _ignoreReadonlyClear() {
    return ['DatePicker', 'TimePicker', 'PartialDatePicker'].includes(this.componentType)
  }

  _rendered() {
    const that = this

    if (this.props.onEnter) {
      this.input._on('keydown', function (event) {
        if (event.keyCode && event.keyCode === 13) {
          that._callHandler(that.props.onEnter, { value: that.getValue() })
        }
      })
    }
  }

  _updateWodLimit() {
    this.wordLimitRef.update({
      children: `${this.getText().length}/${this.props.maxlength}`,
    })
  }

  getText() {
    return this.input.getText()
  }

  _getValue() {
    const { trimValue } = this.props
    let inputText = this.getText()
    inputText = trimValue ? inputText.trimLeft().trimRight() : inputText
    if (inputText === '') {
      return null
    }
    return inputText
  }

  _valueChange(changed) {
    if (!this.props || !this.clearIcon) return
    changed.newValue
      ? this.props.allowClear && this.clearIcon.show()
      : this.props.allowClear && this.clearIcon.hide()
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }

    this.input.setText(value)
    const newValue = this.getValue()
    this.oldValue = this.currentValue

    if (options.triggerChange) {
      if (newValue !== this.oldValue) {
        super._onValueChange()
      }
    }
    this.currentValue = newValue
  }

  focus() {
    this.input.focus()
  }

  blur() {
    this.input.blur()
  }

  _onInput() {
    if (this.hasWordLimit) {
      this._updateWodLimit()
    }
  }

  _onBlur() {
    this._callHandler(this.props.onBlur)
  }

  _disable() {
    this.input.disable()
  }

  _enable() {
    this.input.enable()
  }
}

Textbox.defaults = {
  leftIcon: null,
  prefix: null, // 前缀
  rightIcon: null,
  suffix: null, // 后缀
  maxlength: null,
  minlength: null,
  showWordLimit: false,
  autofocus: false,
  restrictInput: false,
  placeholder: null,
  value: null,
  htmlType: 'text',
  onEnter: null,
  allowClear: true,
  trimValue: true, // getValue时 默认去除首位的空格
}

Component.register(Textbox)

export default Textbox
