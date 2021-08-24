import Component from '../Component/index'
import Tr from '../Table/Tr'

class GroupGridTr extends Tr {
  constructor(props, ...mixins) {
    const defaults = {
      hideAction: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }
}

export default GroupGridTr
