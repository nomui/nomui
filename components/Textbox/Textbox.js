import Component from '../Component/index'
import Control from '../Control/index'
import {} from '../Icon/index'
import Input from './Input'

class Textbox extends Control {
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
    const { leftIcon, rightIcon, placeholder, value, htmlType } = this.props

    const leftIconProps = Component.normalizeIconProps(leftIcon)
    if (leftIconProps != null) {
      Component.extendProps(leftIconProps, { classes: { 'nom-textbox-left-icon': true } })
    }

    const rightIconProps = Component.normalizeIconProps(rightIcon)
    if (rightIconProps != null) {
      Component.extendProps(rightIconProps, { classes: { 'nom-textbox-right-icon': true } })
    }

    const inputProps = {
      component: Input,
      name: 'input',
      attrs: {
        value: value,
        placeholder: placeholder,
        type: htmlType,
      },
    }

    this.setProps({
      tag: 'div',
      classes: {
        'p-with-left-icon': !!leftIcon,
        'p-with-right-icon': !!rightIcon,
      },
      children: [inputProps, leftIcon && leftIconProps, rightIcon && rightIconProps],
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
}

Component.register(Textbox)

export default Textbox
