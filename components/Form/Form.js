import Component from '../Component/index'
import Field from '../Field/index'

class Form extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      type: 'Group'
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }
}

Component.register(Form)

export default Form
