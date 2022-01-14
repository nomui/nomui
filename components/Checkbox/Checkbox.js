import Component from '../Component/index'
import Field from '../Field/index'
import { extend } from '../util/index'

class Checkbox extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      text: null,
      valueText: {
        checked: '是',
        unchecked: '否',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    this.setProps({
      classes: {
        's-checked-part': !this.props.value && this.props.partChecked,
      },
      control: {
        tag: 'label',
        children: [
          {
            tag: 'input',
            attrs: {
              type: 'checkbox',
              checked: this.props.value,
              onchange() {
                that.removeClass('s-checked-part')
                that._onValueChange()
              },
            },
            _created() {
              that.input = this
            },
          },
          { tag: 'span' },
          {
            tag: 'span',
            classes: { 'checkbox-text': true, 'checkbox-text-none': !this.props.text },
            children: this.props.text || '',
          },
        ],
      },
    })

    super._config()
  }

  partCheck(triggerChange) {
    this.setValue(false, triggerChange)
    this.addClass('s-checked-part')
  }

  _getValue() {
    return this.input.element.checked
  }

  _getValueText() {
    if (this.getValue() === true) {
      return this.props.valueText.checked
    }
    return this.props.valueText.unchecked
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({}, options)
    }
    this.removeClass('s-checked-part')
    this.input.element.checked = value === true
    options.triggerChange !== false && this._onValueChange()
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
