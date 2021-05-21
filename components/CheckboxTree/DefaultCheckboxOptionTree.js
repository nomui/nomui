import Component from '../Component/index'
import Tree from '../Tree/index'
import OptionTreeMixin from './OptionTreeMixin'

class DefaultCheckboxOptionTree extends Tree {
  constructor(props, ...mixins) {
    const defaults = {
      dataFields: {
        key: 'value',
      },
    }

    super(Component.extendProps(defaults, props), OptionTreeMixin, ...mixins)
  }
}

export default DefaultCheckboxOptionTree
