import Button from '../Button/index'
import Component from '../Component/index'
import Field from '../Field/index'
import {} from '../Icon/index'
import { extend, isPlainObject, isString } from '../util/index'
import Input from './Input'

class Textbox extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      leftIcon: null,
      prefix: null, // 前缀
      rightIcon: null,
      suffix: null, // 后缀
      autofocus: false,
      placeholder: null,
      value: null,
      htmlType: 'text',
      onEnter: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const {
      leftIcon,
      prefix,
      rightIcon,
      suffix,
      placeholder,
      value,
      htmlType,
      button,
      readonly,
      disabled,
    } = this.props

    let leftIconProps = Component.normalizeIconProps(leftIcon)
    if (leftIconProps != null) {
      leftIconProps = Component.extendProps(leftIconProps, {
        classes: { 'nom-textbox-left-icon': true },
      })
    }

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
      attrs: {
        value: value,
        placeholder: placeholder,
        type: htmlType,
        readonly: readonly ? 'readonly' : null,
      },
      _created: function () {
        this.textbox = that
        this.textbox.input = this
      },
    }

    const getAffixSpan = (affix, type = 'prefix') => ({
      tag: 'span',
      classes: {
        'nom-input-affix': true,
        [`nom-input-${type}`]: true,
      },
      children: affix,
    })

    // 无左icon 有prefixx || 无右icon 有suffix
    const affixWrapper = leftIcon || prefix || rightIcon || suffix

    this.setProps({
      classes: {
        'nom-textbox-affix-wrapper': !!affixWrapper,
        'p-with-button': buttonProps !== null,
      },
      control: {
        disabled: disabled,
        children: [
          leftIcon && leftIconProps,
          !leftIcon && prefix && isString(prefix) && getAffixSpan(prefix),
          inputProps,
          rightIcon && rightIconProps,
          !rightIcon && suffix && isString(suffix) && getAffixSpan(suffix, 'suffix'),
          buttonProps,
        ],
      },
    })

    super._config()
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

  getText() {
    return this.input.getText()
  }

  _getValue() {
    let inputText = this.getText()
    inputText = inputText.trim(' ')
    if (inputText === '') {
      return null
    }
    return inputText
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }

    this.input.setText(value)
    const newValue = this.getValue()
    if (options.triggerChange) {
      if (newValue !== this.oldValue) {
        super._onValueChange()
      }
    }
    this.oldValue = this.currentValue
    this.currentValue = newValue
  }

  focus() {
    this.input.focus()
  }

  blur() {
    this.input.blur()
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

Component.register(Textbox)

export default Textbox
