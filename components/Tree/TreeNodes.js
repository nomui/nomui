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
    let expanded =
      initExpandLevel === -1 || initExpandLevel > (this.parentNode ? this.parentNode.level : -1)

    if (this.parentNode && this.tree.expandedNodeRefs[this.parentNode.key] !== undefined) {
      expanded = true
    }

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
      const sortableOptions = isPlainObject(sortable) ? sortable : {}
      const { onEnd, onStart } = sortableOptions
      const options = {
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
        ...sortableOptions,
        onEnd: ({ item }) => {
          const key = item.getAttribute('data-key')
          this._syncChildrenData()
          if (onEnd) {
            this.tree._callHandler(onEnd, { key, item })
          }
        },
        onStart: ({ item }) => {
          const key = item.getAttribute('data-key')
          if (onStart) {
            this.tree._callHandler(onStart, { key, item })
          }
        },
      }
      new Sortable(this.element, options)
    }
  }

  _syncChildrenData() {
    const childrenData = this.getChildren()
      .filter((node) => node && node.props)
      .map((node) => node.props.data)

    if (Array.isArray(this.props.childrenData)) {
      this.props.childrenData.splice(0, this.props.childrenData.length, ...childrenData)
    }

    if (this.parentNode) {
      const { children } = this.tree.props.dataFields
      if (Array.isArray(this.parentNode.props.data[children])) {
        this.parentNode.props.data[children].splice(
          0,
          this.parentNode.props.data[children].length,
          ...childrenData,
        )
      }
    } else if (Array.isArray(this.tree.props.data)) {
      this.tree.props.data.splice(0, this.tree.props.data.length, ...childrenData)
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
