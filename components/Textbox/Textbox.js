import Component from '../Component/index'
import Field from '../Field/index'
import {} from '../Icon/index'
import Input from './Input'

class Textbox extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      leftIcon: null,
      rightIcon: null,
      autofocus: false,
      placeholder: null,
      value: null,
      htmlType: 'text',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { leftIcon, rightIcon, placeholder, value, htmlType } = this.props

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

    const inputProps = {
      component: Input,
      name: 'input',
      attrs: {
        value: value,
        placeholder: placeholder,
        type: htmlType,
      },
      _created: function () {
        this.textbox = that
        this.textbox.input = this
      },
    }

    this.setProps({
      classes: {
        'p-with-left-icon': !!leftIcon,
        'p-with-right-icon': !!rightIcon,
      },
      control: {
        children: [inputProps, leftIcon && leftIconProps, rightIcon && rightIconProps],
      },
    })

    super._config()
  }

  getText() {
    return this.input.getText()
  }

  _getValue() {
    const inputText = this.getText()
    if (inputText === '') {
      return null
    }
    return inputText
  }

  _setValue(value) {
    this.input.setText(value)
    const newValue = this.getValue()
    if (newValue !== this.oldValue) {
      super._onValueChange()
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

  _disable() {
    this.input.disable()
  }

  _enable() {
    this.input.enable()
  }
}

Component.register(Textbox)

export default Textbox
