import Component from '../Component/index'

class CascaderInput extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'input',
      attrs: {
        type: 'text',
        autocomplete: 'off',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.capsLock = false
  }

  _config() {
    this.setProps({
      attrs: {
        ...this.props.attrs,
        value: this.props.value,
        placeholder: this.props.placeholder,
        oninput: () => {
          this._callHandler(this.props.onInput, { text: this.getText() })
        },
        onblur: () => {
          this._callHandler(this.props.onBlur, { text: this.getText() })
        },
        onfocus: () => {
          this._callHandler(this.props.onFocus)
        },
      },
    })
  }

  _rendered() {
    if (this.props.autofocus === true) {
      this.focus()
    }
  }

  getText() {
    return this.element.value
  }

  setPlaceholder(text) {
    this.element.setAttribute('placeholder', text)
  }

  setText(text) {
    this.element.value = text
  }

  clear() {
    this.element.value = ''
    this.element.setAttribute('placeholder', this.props.placeholder)
  }

  focus() {
    this.element.focus()
  }

  blur() {
    this.element.blur()
  }

  disable() {
    this.element.setAttribute('disabled', 'disabled')
  }

  enable() {
    this.element.removeAttribute('disabled', 'disabled')
  }
}

export default CascaderInput
