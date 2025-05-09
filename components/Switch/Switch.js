import Component from '../Component/index'
import Field from '../Field/index'

class Switch extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Switch.defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { value, unselectedText, selectedText, animate } = this.props

    this._propStyleClasses = ['size']
    this.setProps({
      // RadioList,CheckboxList等div组件不为 focusable 元素
      // 需设置 tabindex才有 fouces方法，进而触发校验的 Tooltip
      attrs: { tabindex: this.props.tabindex || 0 },
      control: {
        tag: 'button',
        classes: { 'nom-switch-control': true, 'nom-switch-active': !!value },
        attrs: {
          onclick: () => {
            if (that.props.disabled) {
              return false
            }
            that._handleClick()
          },
        },
        children: [
          {
            tag: 'input',
            _created() {
              that.ck = this
            },
            attrs: {
              type: 'checkbox',
              hidden: true,
              checked: value,
              onchange() {
                that._onValueChange()
                that.update({ value: !value })
              },
            },
          },
          {
            tag: 'div',
            classes: {
              'nom-switch-el': true,
              'nom-switch-text': value,
              'nom-switch-indicator': !value,
              'nom-switch-text-left': value && animate,
              'nom-switch-indicator-left': !value && animate,
            },
            children: value ? selectedText : null,
          },
          {
            tag: 'div',
            children: value ? null : unselectedText,
            classes: {
              'nom-switch-el': true,
              'nom-switch-text': !value,
              'nom-switch-indicator': value,
              'nom-switch-text-right': !value && animate,
              'nom-switch-indicator-right': value && animate,
            },
          },
          // { tag: 'i' },
        ],
      },
    })

    super._config()
  }

  _handleClick() {
    if (this.ck) {
      this.ck.element.click()
    }
  }

  _getValue() {
    return this.ck.element.checked
  }

  _setValue(value) {
    this.ck.element.checked = value === true
    this.update({ value })
  }
}

Switch.defaults = {
  unselectedText: '',
  selectedText: '',
  value: false,
  size: 'small',
}

Component.register(Switch)
export default Switch
