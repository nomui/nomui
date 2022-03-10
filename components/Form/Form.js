import Component from '../Component/index'
import Group from '../Group/index'

class Form extends Group {
  constructor(props, ...mixins) {
    super(Component.extendProps(Form.defaults, props), ...mixins)
  }
}
Form.defaults = {
  labelAlign: 'top',
}
Component.register(Form)

export default Form
