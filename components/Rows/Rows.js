import Component from '../Component/index'
import Row from './Row'

class Rows extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      wrap: false,
      items: [],
      itemDefaults: null,
      gutter: 'md',
      childDefaults: {
        component: Row
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['gutter', 'align', 'justify']
    const { items } = this.props
    const children = []
    if (Array.isArray(items) && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        item = Component.extendProps({}, this.props.itemDefaults, item)
        children.push({ component: Row, children: item })
      }

      this.setProps({
        children: children,
      })
    }
  }
}

Component.register(Rows)

export default Rows
