import Component from '../Component/index'
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
    this.setProps({
      selectable: false,
      children: {
        props: this.props.item,
        mixins: [ListItemMixin],
      },
    })
  }
}

Component.register(ListItemWrapper)

export default ListItemWrapper
