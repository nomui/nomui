import Component from '../Component/index'
import TreeNode from './TreeNode'
import TreeSub from './TreeSub'

class TreeWrapper extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'li',
      key: null,
      title: null,
      value: null,
      checked: null,
      items: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.isLeaf = !this.props.items

    this.isRoot = false
    this.level = 0
    this.parentWrapper = null

    if (this.parent.parent instanceof Component.components.Tree) {
      this.tree = this.parent.parent
      this.isRoot = true
    } else if (this.parent instanceof Component.components.TreeSub) {
      this.tree = this.parent.tree
      this.parentWrapper = this.parent.wrapper
    }

    if (this.parentWrapper) {
      this.level = this.parentWrapper.level + 1
    }
  }

  _config() {
    const that = this

    const { key, title, value, checked, items, collapsed } = this.props

    this.setProps({
      children: [
        Component.normalizeIconProps({
          type: collapsed ? 'down' : 'right',
          hidden: !items,
          onClick: function () {
            that.props.collapsed = !that.props.collapsed
            that.update(collapsed)
          },
        }),
        {
          component: TreeNode,
          key: key,
          title: title,
          value: value,
          checked: checked,
          indent: !items,
        },
        items && {
          component: TreeSub,
          hidden: collapsed,
          items: items,
        },
      ],
    })
  }
}

Component.register(TreeWrapper)

export default TreeWrapper
