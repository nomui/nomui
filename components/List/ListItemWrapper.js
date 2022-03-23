import Component, { n } from '../Component/index'
import ListItemMixin from './ListItemMixin'

class ListItemWrapper extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(ListItemWrapper.defaults, props), ...mixins)
  }

  _created() {
    this.list = this.parent.list || this.parent.parent.parent.parent.list
  }

  _config() {
    this._addPropStyle('span')
    const { item, span } = this.props
    const { itemDefaults } = this.list.props
    if (this.props.disabled) {
      item.disabled = true
    }

    if (!span && item.span) {
      this.setProps({
        span: item.span,
      })
    }

    this.setProps({
      selectable: false,
      children: item,
      childDefaults: n(null, itemDefaults, null, [ListItemMixin]),
    })
  }
}
ListItemWrapper.defaults = {
  tag: 'li',
  item: {},
}
Component.register(ListItemWrapper)

export default ListItemWrapper
