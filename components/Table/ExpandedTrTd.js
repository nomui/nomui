import Td from './Td'
import Component from '../Component/index'

class ExpandedTrTd extends Td {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'td',
      data: null,
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.tr = this.parent
    this.table = this.parent.table
  }

  _config() {}
}

Component.register(ExpandedTrTd)

export default ExpandedTrTd
