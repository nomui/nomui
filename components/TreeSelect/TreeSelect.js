import Component from '../Component/index'
import TreeSelectItem from './TreeSelectItem'

class TreeSelect extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      treeData: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    // const { treeData } = this.props
    // const that = this
    const items = this.props.items.map(function (item) {
      return {
        component: TreeSelectItem,
        key: item.key,
        title: item.title,
        content: item.content,
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

Component.register(TreeSelect)

export default TreeSelect
