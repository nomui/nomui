import Component from '../Component/index'
import Field from '../Field/index'

class StaticText extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(StaticText.defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      control: {
        children: this.props.value,
      },
    })
    super._config()
  }

  _setValue(value) {
    this.update({
      value,
    })
  }

  _getValue() {
    return this.props.value
  }
}
StaticText.defaults = {
  value: null,
}
Component.register(StaticText)

export default StaticText
