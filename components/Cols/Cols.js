import Component from '../Component/index'
import { isString } from '../util/index'
import Col from './Col'

class Cols extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      wrap: false,
      items: [],
      itemDefaults: null,
      gutter: 'md',
      childDefaults: {
        component: Col
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['gutter', 'align', 'justify', 'fills', 'inline']
    const { items } = this.props
    const children = []
    if (Array.isArray(items) && items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        let item = items[i]
        if (isString(item)) {
          item = {
            children: item,
          }
        }
        item = Component.extendProps({}, this.props.itemDefaults, item)
        children.push({ component: Col, children: item })
      }

      this.setProps({
        children: children,
      })
    }
  }
}

Component.register(Cols)

export default Cols
