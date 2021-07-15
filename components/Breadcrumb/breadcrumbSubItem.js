import Component from '../Component/index'
import { isNotEmptyArray } from '../util/index'

class BreadcrumbSubItem extends Component {
  constructor(props, ...mixins) {
    const defaults = { align: 'right top', icon: 'right', tag: 'li' }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { text, items, align, icon, url } = this.props

    const reference = this
    const children = [{ tag: 'a', attrs: { href: url }, children: text }]

    if (isNotEmptyArray(items)) {
      this.setProps({
        popup: {
          triggerAction: 'hover',
          align,
          reference,
          children: {
            component: 'BreadcrumbSub',
            items,
          },
        },
      })

      children.push({
        component: 'Icon',
        type: icon,
      })
    }

    this.setProps({
      attrs: { style: { padding: '5px 15px' } },
      children: {
        component: 'Cols',
        children,
      },
    })
  }
}

Component.register(BreadcrumbSubItem)

export default BreadcrumbSubItem
