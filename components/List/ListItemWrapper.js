import Component, { n } from '../Component/index'
import ListItemMixin from './ListItemMixin'

class ListItemWrapper extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'li',
      item: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.list = this.parent.list
  }

  _config() {
    this._addPropStyle('span')
    const { item, span } = this.props
    const { itemDefaults } = this.list.props

    if (!span && item.span) {
      this.setProps({
        span: item.span
      })
    }

    this.setProps({
      selectable: false,
      children: item,
      childDefaults: n(null, itemDefaults, null, [ListItemMixin]),
    })
  }
}

Component.register(ListItemWrapper)

export default ListItemWrapper
