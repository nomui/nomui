import Component from '../Component/index'
import Field from '../Field/index'

class MaskInfoField extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(MaskInfoField.defaults, props), ...mixins)
  }

  _config() {
    const { tag, type, text, mask, icon, empty, showTitle, toggle } = this.props
    this.setProps({
      control: {
        children: {
          component: 'MaskInfo',
          tag,
          type,
          text: this.props.value || text,
          mask,
          icon,
          empty,
          showTitle,
          toggle,
        },
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
MaskInfoField.defaults = {
  value: null,
  toggle: true,
}
Component.register(MaskInfoField)

export default MaskInfoField
