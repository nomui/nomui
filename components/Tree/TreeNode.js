import Component from '../Component/index'
import TreeNodeContent from './TreeNodeContent'

class TreeNode extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.level = 0
    this.parentNode = this.parent.parentNode
    if (this.parentNode !== null) {
      this.level = this.parentNode.level + 1
    }
    this.tree = this.parent.tree
  }

  _config() {
    const { nodes } = this.props
    const children = [
      {
        component: TreeNodeContent,
      },
    ]
    this.isLeaf = !nodes
    if (Array.isArray(nodes)) {
      children.push({
        component: 'TreeNodes',
        nodes,
      })
    }
    this.setProps({
      children,
    })
  }
}

Component.register(TreeNode)

export default TreeNode
