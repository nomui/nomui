import Component from '../Component/index'
import { isNumeric, isPlainObject, isString } from '../util/index'
import Col from './Col'

class Cols extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      wrap: false,
      items: [],
      itemDefaults: null,
      gutter: 'md',
      childDefaults: {
        component: Col,
      },
      strechIndex: null,
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
        if (isNumeric(this.props.strechIndex) && this.props.strechIndex === i) {
          children.push({
            component: Col,
            classes: {
              'nom-col-strech': true,
            },
            children: item,
          })
        } else {
          children.push({ component: Col, children: item })
        }
      }

      this.setProps({
        children: children,
      })
    } else if (this.props.showEmpty) {
      if (isPlainObject(this.props.showEmpty)) {
        this.setProps({
          children: {
            component: 'Empty',
            ...this.props.showEmpty,
          },
        })
      } else {
        this.setProps({
          children: {
            component: 'Empty',
          },
        })
      }
    }
  }
}

Component.register(Cols)

export default Cols
