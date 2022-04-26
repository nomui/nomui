import Component from '../Component/index'
import Field from '../Field/index'

class Switch extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Switch.defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { value, unselectedText, selectedText } = this.props

    this._propStyleClasses = ['size']
    this.setProps({
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
              'nom-switch-text-left': value,
              'nom-switch-indicator-left': !value,
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
              'nom-switch-text-right': !value,
              'nom-switch-indicator-right': value,
            },
          },
          { tag: 'i' },
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
  }
}

Switch.defaults = {
  unselectedText: '关',
  selectedText: '开',
  value: false,
  size: 'small',
}

Component.register(Switch)
export default Switch
