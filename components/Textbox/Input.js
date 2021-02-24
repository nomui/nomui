import Component from '../Component/index'

class Input extends Component {
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
        value: this.props.value,
        oninput: () => {
          if (!this.capsLock) {
            this.textbox._onValueChange()
          }
        },
        onblur: () => {
          this.textbox.trigger('blur')
        },
        oncompositionstart: () => {
          this.capsLock = true
        },
        oncompositionend: () => {
          this.capsLock = false
          this.element.dispatchEvent(new Event('input'))
        },
      },
    })
  }

  _rendered() {
    if (this.textbox.props.autofocus === true) {
      this.focus()
    }
  }

  getText() {
    return this.element.value
  }

  setText(text) {
    this.element.value = text
  }

  focus() {
    this.element.focus()
  }

  blur() {
    this.element.blur()
  }

  disable(){
    this.element.setAttribute('disabled', 'disabled')
  }

  enable(){
    this.element.removeAttribute('disabled', 'disabled')
  }
}

export default Input
