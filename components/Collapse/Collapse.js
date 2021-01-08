import Component from '../Component/index'
import CollapseItem from './CollapseItem'

class Collapse extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      activeKey: 1,
      items: null,
      bordered: false,
      icon: {
        default: 'right',
        open: 'up',
      },
      iconOnly: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { activeKey, bordered } = this.props
    // const that = this
    const items = this.props.items.map(function (item) {
      return {
        component: CollapseItem,
        key: item.key,
        title: item.title,
        content: item.content,
        collapsed: activeKey !== item.key,
        classes: {
          'nom-collapse-bordered': !!bordered,
        },
      }
    })
    this.setProps({
      children: items,
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(Collapse)

export default Collapse
