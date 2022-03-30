import Component from '../Component/index'
import { isNotEmptyArray } from '../util/index'
import BreadcrumbItem from './breadcrumbItem'

class Breadcrumb extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Breadcrumb.defaults, props), mixins)
  }

  _config() {
    const { separator, items, itemDefaults } = this.props

    const children = isNotEmptyArray(items)
      ? items.map((item, idx) => {
          const isLeaf = idx === items.length - 1
          return {
            ...Component.extendProps({ separator, isLeaf }, itemDefaults, item),
          }
        })
      : []

    this.setProps({
      children,
    })
  }
}

Breadcrumb.defaults = {
  separator: '/',
  itemDefaults: { component: BreadcrumbItem },
}

Component.register(Breadcrumb)

export default Breadcrumb
