import Component from '../Component/index'
import Control from '../Control/index'
import Textarea from './Textarea'

class MultilineTextbox extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      autofocus: false,
      autoSize: false, // boolean|{minRows:number,maxRows:number}
      placeholder: null,
      value: null,
      maxLength: null,
      rows: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    super._config()
    const { autofocus, autoSize, ...textProps } = this.props

    this.setProps({
      tag: 'div',
      textarea: {
        component: Textarea,
        autoSize,
        attrs: textProps,
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

  blur() {
    this.textarea.blur()
  }
}

Component.register(MultilineTextbox)

export default MultilineTextbox
