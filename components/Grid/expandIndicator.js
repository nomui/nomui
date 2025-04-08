import Component from '../Component/index'
import Icon from '../Icon/index'

class ExpandIcon extends Icon {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.grid = this.props.grid
    this.row = this.props.row
  }

  expand() {
    if (this.grid.props.rowExpandable.expandSingle === true) {
      if (this.grid.expandedTrItem) {
        this.grid.expandedTrItem.collapse()
      }
      this.grid.expandedTrItem = this
    }
    super.expand()

    if (this.grid.props.rowExpandable.onExpand) {
      this.grid._callHandler(this.grid.props.rowExpandable.onExpand, { row: this.row })
    }
  }

  collapse() {
    if (this.grid.props.rowExpandable.expandSingle === true) {
      this.grid.expandedTrItem = null
    }
    super.collapse()
    if (this.grid.props.rowExpandable.onCollapse) {
      this.grid._callHandler(this.grid.props.rowExpandable.onCollapse, { row: this.row })
    }
  }
}

Component.register(ExpandIcon)

export default ExpandIcon
