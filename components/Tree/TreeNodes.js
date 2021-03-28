import Component from '../Component/index'
import TreeNode from './TreeNode'

class TreeNodes extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
      childDefaults: {
        component: TreeNode,
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    if (this.parent instanceof Component.components.Tree) {
      this.tree = this.parent
      this.tree.nodesRef = this
      this.parentNode = null
    } else {
      this.parentNode = this.parent
      this.parentNode.nodesRef = this
      this.tree = this.parentNode.tree
    }
  }

  _config() {
    const { nodes } = this.props

    this.setProps({
      children: nodes,
    })
  }
}

Component.register(TreeNodes)

export default TreeNodes
