import Component from '../Component/index'
import Control from '../Control/index'
import Textarea from './Textarea'

class MultilineTextbox extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      autofocus: false,
      placeholder: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    super._config()

    this.setProps({
      tag: 'div',
      textarea: {
        component: Textarea,
        attrs: {
          placeholder: this.props.placeholder,
        },
      },
    })

    this.setProps({
      children: this.props.textarea,
    })
  }

  getText() {
    return this.textarea.getText()
  }

  _getValue() {
    const inputText = this.getText()
    if (inputText === '') {
      return null
    }
    return inputText
  }

  _setValue(value) {
    this.textarea.setText(value)
  }

  focus() {
    this.textarea.focus()
  }
}

Component.register(MultilineTextbox)

export default MultilineTextbox
