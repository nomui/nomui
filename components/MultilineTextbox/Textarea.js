import Component from '../Component/index'
import { calculateNodeHeight } from './utils.js'

class Textarea extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'textarea',
      attrs: {
        autocomplete: 'off',
      },
      autoSize: false, // boolean|{minRows:number,maxRows:number}
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.multilineTextbox = this.parent
    this.multilineTextbox.textarea = this

    this.capsLock = false
  }

  _config() {
    this.setProps({
      attrs: {
        oninput: () => {
          if (!this.capsLock) {
            this.multilineTextbox._onValueChange()
          }
          this.resizeTextarea()
        },
        oncompositionstart: () => {
          this.capsLock = true
        },
        oncompositionend: () => {
          this.capsLock = false
          this.multilineTextbox.trigger('input')
        },
        onblur: () => {
          this.multilineTextbox.trigger('blur')
        },
      },
    })
  }

  _rendered() {
    if (this.multilineTextbox.props.autofocus === true) {
      this.focus()
    }
    this.resizeTextarea()
  }

  _remove() {
    cancelAnimationFrame && cancelAnimationFrame(this.resizeFrameId)
  }

  resizeTextarea() {
    const { autoSize } = this.props
    if (!autoSize && this.element) {
      return
    }
    cancelAnimationFrame && cancelAnimationFrame(this.resizeFrameId)
    this.resizeFrameId = requestAnimationFrame(() => {
      // TODO 需要修改为  updateStyles
      this._setStyle({
        overflow: 'hidden',
      })
      const { minRows, maxRows } = autoSize
      const textareaStyles = calculateNodeHeight(this.element, minRows, maxRows)
      // TODO 需要修改为  updateStyles
      this._setStyle({
        overflow: 'inherit',
        ...textareaStyles,
      })
      this.fixFirefoxAutoScroll()
    })
  }

  // https://github.com/ant-design/ant-design/issues/21870
  fixFirefoxAutoScroll() {
    try {
      if (document.activeElement === this.element) {
        const currentStart = this.element.selectionStart
        const currentEnd = this.element.selectionEnd
        this.element.setSelectionRange(currentStart, currentEnd)
      }
    } catch (e) {
      // Fix error in Chrome:
      // Failed to read the 'selectionStart' property from 'HTMLInputElement'
      // http://stackoverflow.com/q/21177489/3040605
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

  disable() {
    this.element.setAttribute('disabled', 'disabled')
  }

  enable() {
    this.element.removeAttribute('disabled', 'disabled')
  }
}

Component.register(Textarea)

export default Textarea
