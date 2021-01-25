import Component from '../Component/index'
import Textbox from '../Textbox/index'

class Password extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.realValue = ''
  }

  _config() {
    const that = this
    const { onValueChange } = this.props

    this.setProps({
      onValueChange: () => {
        const pass = that.getText()

        const start = that.input.element.selectionStart // 光标位置

        const fake = pass ? pass.split('') : []
        let real = that.realValue ? that.realValue.split('') : []
        const clen = fake.length - real.length

        // 处理Value
        if (!pass) {
          that.realValue = null
        } else {
          if (clen > 0) {
            const middle = fake.join('').replace(/\*/g, '').split('')
            const right = fake.length - start > 0 ? real.slice(-(fake.length - start)) : []
            real = [].concat(real.slice(0, start - middle.length), middle, right)
          }

          if (clen < 0) {
            real.splice(start, Math.abs(clen))
          }
          fake.forEach(function (value, index) {
            if (value !== '*') {
              real[index] = value
            }
          })
          that.realValue = real.join('')
        }

        that.setValue(pass ? pass.replace(/./g, '*') : null)

        // 让光标回到正确位置

        if (pass && start < pass.length) {
          that.input.element.selectionStart = start
          that.input.element.selectionEnd = start
        }

        that._callHandler(onValueChange)
      },
    })

    super._config()
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }

  _getValue() {
    if (!this.realValue || this.realValue === '') {
      return null
    }
    return this.realValue
  }
}

Component.register(Password)

export default Password
