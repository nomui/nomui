import Component from '../Component/index'
import CollapseItem from './CollapseItem'

class Collapse extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Collapse.defaults, props), ...mixins)
  }

  _created() {
    this.itemRef = []
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

  _onCollapse(key, isShown) {
    const that = this
    this.setProps({
      activeKey: key,
    })
    if (isShown && this.props.accordion) {
      Object.keys(this.itemRef).forEach(function (k) {
        if (k !== key && parseInt(k, 10) !== key) {
          that.itemRef[k].close()
        }
      })
    }
    this.props.onChange &&
      this._callHandler(this.props.onChange, {
        currentKey: key,
        collapsed: !isShown,
      })
  }
}
Collapse.defaults = {
  activeKey: 1,
  items: null,
  bordered: false,
  icon: {
    default: 'right',
    open: 'up',
    align: 'left',
  },
  iconOnly: false,
  accordion: false,
}
Component.register(Collapse)

export default Collapse
