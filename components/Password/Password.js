import Component from '../Component/index'
import Textbox from '../Textbox/index'
import PasswordPopup from './PasswordPopup'

class Password extends Textbox {
  constructor(props, ...mixins) {
    super(Component.extendProps(Password.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.realValue = ''
    this.hasDefaultValue = false
    this.capsLock = false
    this.firstWrite = false
    if (this.props.value) {
      this.realValue = this.props.value

      this.hasDefaultValue = true
    }
  }

  _config() {
    const that = this
    const { onValueChange } = this.props
    if (that.tooltip) {
      that.tooltip.remove()
      delete that.tooltip
    }
    this.setProps({
      type: 'password',
      rightIcon: {
        type: this.props.rightIconType,
        hidden: !this.props.value || this.props.disabled || !this.props.visibilityToggle,
        ref: (c) => {
          this.rightIconRef = c
        },
        onClick: function () {
          if (!that.props.value) {
            return
          }
          that.update({
            rightIconType: that.props.rightIconType === 'eye-invisible' ? 'eye' : 'eye-invisible',
          })
          that.setValue(that.props.value)
        },
      },
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
            // const middle = fake.join('').replace(/\*/g, '').split('')
            const middle = fake.slice(start - clen, start)

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
        that.setValue(that.realValue)

        // 让光标回到正确位置

        if (pass && start < pass.length) {
          that.input.element.selectionStart = start
          that.input.element.selectionEnd = start
        }

        if (that.props.visibilityToggle) {
          pass ? that.rightIconRef.show() : that.rightIconRef.hide()
        }

        that._callHandler(onValueChange)
      },
    })

    super._config()
  }

  _rendered() {
    const that = this
    if (this.hasDefaultValue && this.firstRender) {
      this.setValue(this.realValue)
    }
    this.popup = new PasswordPopup({
      trigger: this.control,
      animate: false,
      triggerAction: 'click',
      PasswordPopupHidden: true,
    })

    this.input.element.addEventListener('keyup', (event) => {
      // 判断是否按键为caps Lock
      if (event.keyCode === 20) {
        that.capsLock = !that.capsLock
        this.firstWrite && this.popupSetProps()
        return
      }
      // 按键不是caps Lock，判断每次最后输入的字母的大小写
      const e = event || window.event
      const keyvalue = e.keyCode ? e.keyCode : e.which
      const shifKey = that.shifKey
      if (typeof that.realValue === 'undefined') return
      const userPassword = that.realValue || ''
      const strStart = that.input.element.selectionStart // 光标位置
      if (strStart) {
        const uniCode = userPassword.charCodeAt(strStart - 1)
        // 65到90字母键
        if (keyvalue >= 65 && keyvalue <= 90) {
          this.firstWrite = true
          // 是否同时按住shift键
          if (
            (uniCode >= 65 && uniCode <= 90 && !shifKey) ||
            (uniCode >= 97 && uniCode <= 122 && shifKey)
          ) {
            that.capsLock = true
          } else {
            that.capsLock = false
          }
        }
      }
      this.popupSetProps()
    })

    this.input.element.addEventListener('keydown', (event) => {
      const e = event || window.event
      const keyvalue = e.keyCode ? e.keyCode : e.which
      const shifKey = e.shiftKey ? e.shiftKey : keyvalue === 16
      this.shifKey = shifKey
    })
  }

  popupSetProps() {
    this.capsLock ? this.popup.show() : this.popup.hide()
    this.popup.setProps({ PasswordPopupHidden: !this.capsLock })
  }

  _getValue() {
    return this.realValue ? this.realValue.trim(' ') : null
  }

  _setValue(value) {
    const { rightIconType, value: oldValue } = this.props
    const pass = value ? (rightIconType === 'eye' ? value.replace(/./g, '*') : value) : null
    this.input.setText(pass)
    if (oldValue !== value) {
      this.setProps({
        value,
      })
      this.realValue = value
    }
  }
}

Password.defaults = {
  allowClear: false,
  visibilityToggle: true,
  rightIconType: 'eye',
}
Component.register(Password)

export default Password
