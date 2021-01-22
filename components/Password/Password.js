import Component from '../Component/index'
import Control from '../Control/index'

class Password extends Control {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.realValue = ''
  }

  _config() {
    const that = this

    this.setProps({
      children: {
        component: 'Textbox',
        ref: (c) => {
          that.text = c
        },
        // rightIcon: 'eye',
        onValueChange: () => {
          const pass = that.text.getValue()

          const start = that.text.input.element.selectionStart // 光标位置

          const fake = pass ? pass.split('') : []
          let real = that.realValue.split('')
          const clen = fake.length - real.length

          // 处理Value
          if (!pass) {
            that.realValue = null
          } else {
            if (clen > 0) {
              const inArr = fake.join('').replace(/\*/g, '').split('')
              const right = fake.length - start > 0 ? real.slice(-(fake.length - start)) : []
              real = [].concat(real.slice(0, start - inArr.length), inArr, right)
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

          that.text.setValue(pass.replace(/./g, '*'))

          // 让光标回到正确位置

          if (start < pass.length) {
            that.text.input.element.selectionStart = start
            that.text.input.element.selectionEnd = start
          }
        },
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
