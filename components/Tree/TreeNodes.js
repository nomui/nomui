import Component from '../Component/index'
import { isPlainObject } from '../util/index'
import TreeNode from './TreeNode'

class TreeNodes extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
      childrenData: null,
      childDefaults: {
        component: TreeNode,
        dataToNode: ({ data, node }) => {
          if (isPlainObject(data)) {
            node.props.key = data.key
            node.props.text = data.text
            node.props.childrenData = data.children
          }
        },
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
    const { nodes, childrenData } = this.props
    let nodesProps = nodes
    if (Array.isArray(childrenData)) {
      nodesProps = childrenData.map((item) => {
        return {
          data: item,
        }
      })
    }
    this.setProps({
      children: nodesProps,
    })
  }

  iterateNodes() {}
}

Component.register(TreeNodes)

export default TreeNodes
