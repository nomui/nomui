import Component from '../Component/index'
import Field from '../Field/index'

class Switch extends Field {
  constructor(props, ...mixins) {
    const defaults = {

      unselectedText: '关',
      selectedText: '开',
      value: false,
    }
    super(Component.extendProps(defaults, props), ...mixins)
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
            },
          },
        ],
      }
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

Component.register(Switch)
export default Switch
