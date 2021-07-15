import Component from '../Component/index'
import { isNotEmptyArray } from '../util/index'
import BreadcrumbSubItem from './breadcrumbSubItem'

class BreadcrumbSub extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'ul',
      attrs: {
        style: { paddingLeft: 0, listStyle: 'none' },
      },
      itemDefaults: {
        component: BreadcrumbSubItem,
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const breadcrumbSubRef = this
    const children = isNotEmptyArray(this.props.items)
      ? this.props.items.map((item) => {
          return {
            component: BreadcrumbSubItem,
            ...Component.extendProps({}, breadcrumbSubRef.props.itemDefaults, item),
            items: item.items,
          }
        })
      : null

    this.setProps({ children })
  }
}

Component.register(BreadcrumbSub)

export default BreadcrumbSub
