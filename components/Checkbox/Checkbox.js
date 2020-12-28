import Component from '../Component/index'
import Control from '../Control/index'

class Checkbox extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      text: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    super._config()

    const that = this
    this.setProps({
      children: {
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
            _create() {
              that.input = this
            },
          },
          { tag: 'span' },
          { tag: 'span', classes: { 'checkbox-text': true }, children: this.props.text || '' },
        ],
      },
    })
  }

  _getValue() {
    return this.input.element.checked
  }

  _setValue(value) {
    this.input.element.checked = value === true
  }
}

Component.register(Checkbox)

export default Checkbox
