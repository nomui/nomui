import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import Sortable from '../util/sortable.core.esm'
import TreeNode from './TreeNode'

class TreeNodes extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(TreeNodes.defaults, props), ...mixins)
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
    const { nodes, childrenData } = this.props
    const { initExpandLevel } = this.tree.props
    const expanded =
      initExpandLevel === -1 || initExpandLevel > (this.parentNode ? this.parentNode.level : -1)
    let nodesProps = nodes
    if (Array.isArray(childrenData)) {
      nodesProps = childrenData.map((item) => {
        return {
          data: item,
        }
      })
    }
    const childDefaults = Component.extendProps(
      {
        component: TreeNode,
        dataToNode: ({ data, node }) => {
          if (isPlainObject(data)) {
            node.props.key = data.key
            node.props.text = data.text
            node.props.icon = data.icon
            node.props.tools = data.tools
            node.props.disabled = data.disabled
            node.props.childrenData = data.children
          }
        },
      },
      this.tree.props.nodeDefaults,
    )

    this.setProps({
      children: nodesProps,
      childDefaults,
      hidden: expanded === false,
    })
  }

  _rendered() {
    const { sortable } = this.tree.props
    if (sortable !== false) {
      new Sortable(this.element, {
        group: this.key,
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        handle:
          this.tree.props.sortable &&
          this.tree.props.sortable.showHandler &&
          this.tree.props.sortable.byHandler
            ? '.nom-tree-drag-handler'
            : null,
      })
    }
  }

  iterateNodes() {}
}
TreeNodes.defaults = {
  nodes: null,
  childrenData: null,
}
Component.register(TreeNodes)

export default TreeNodes
