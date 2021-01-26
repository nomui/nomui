import Component from '../Component/index'
import Field from '../Field/index'
import Textarea from './Textarea'

class MultilineTextbox extends Field {
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
    const that = this
    const { autoSize, attrs } = this.props

    this.setProps({
      control: {
        children: {
          component: Textarea,
          autoSize,
          attrs,
          _created: function () {
            this.multilineTextbox = that
            this.multilineTextbox.textarea = this
          },
        },
      },
    })
    super._config()
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
