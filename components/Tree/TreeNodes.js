import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import TreeNode from './TreeNode'
import Sortable from '../util/sortable.core.esm'

class TreeNodes extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
      childrenData: null,
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
    const { nodes, childrenData } = this.props
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
            node.props.childrenData = data.children
          }
        },
      },
      this.tree.props.nodeDefaults,
    )
    this.setProps({
      children: nodesProps,
      childDefaults,
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
      })
    }
  }

  iterateNodes() {}
}

Component.register(TreeNodes)

export default TreeNodes
