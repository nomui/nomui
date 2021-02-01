import Component from '../Component/index'
import Group from '../Group/index'

class Form extends Group {
  constructor(props, ...mixins) {
    const defaults = {
      labelAlign: 'top'
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }
}

Component.register(Form)

export default Form
