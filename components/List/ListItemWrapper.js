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

  _create() {
    this._propStyleClasses = ['span']
    this.list = this.parent
  }

  _config() {
    let { item } = this.props,
      { itemDefaults } = this.list.props

    this.setProps({
      selectable: false,
      children: item,
      childDefaults: n(null, itemDefaults, null, [ListItemMixin])
    })
  }
}

Component.register(ListItemWrapper)

export default ListItemWrapper
