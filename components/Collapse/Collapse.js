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
    const items = this.props.items.map((item) => {
      return {
        component: CollapseItem,
        key: item.key,
        title: item.title,
        content: item.content,
        collapsed:
          Object.prototype.toString.call(activeKey) === '[object Array]'
            ? !this.onActiveKeyArray(item.key)
            : activeKey !== item.key,
        classes: {
          'nom-collapse-bordered': !!bordered,
        },
      }
    })

    this.setProps({
      children: {
        component: 'Flex',

        gutter: this.props.gutter,
        rows: items,
      },
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

  onActiveKeyArray(key) {
    return this.props.activeKey.some(function (currentValue) {
      return currentValue === key
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
  gutter: 'small',
  iconOnly: false,
  accordion: false,
}
Component.register(Collapse)

export default Collapse
