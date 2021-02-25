import Component from '../Component/index'
import Field from '../Field/index'

class Checkbox extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      text: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    this.setProps({
      control: {
        tag: 'label',
        children: [
          {
            tag: 'input',
            attrs: {
              type: 'checkbox',
              checked: this.props.value,
              onchange() {
                that._onValueChange()
              },
            },
            _created() {
              that.input = this
            },
          },
          { tag: 'span' },
          { tag: 'span', classes: { 'checkbox-text': true }, children: this.props.text || '' },
        ],
      },
    })

    super._config()
  }

  _getValue() {
    return this.input.element.checked
  }

  _setValue(value) {
    this.input.element.checked = value === true
    this._onValueChange()
  }

  _disable() {
    this.input.element.setAttribute('disabled', 'disabled')
  }

  _enable() {
    this.input.element.removeAttribute('disabled', 'disabled')
  }
}

Component.register(Checkbox)

export default Checkbox
