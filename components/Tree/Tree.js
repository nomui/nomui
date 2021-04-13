import Component from '../Component/index'
import TreeNodes from './TreeNodes'

class Tree extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
      nodeDefaults: {},
      nodeSelectable: {
        onlyleaf: false,
        byClick: true,
      },
      fields: {
        key: 'key',
        text: 'text',
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.nodeRefs = {}
    this.selectedNode = null
  }

  _config() {
    const { nodes, data, nodeCheckable } = this.props
    if (nodeCheckable) {
      this.setProps({
        nodeCheckable: Component.extendProps(
          {
            cascadeCheckParent: true,
            cascadeUncheckChildren: true,
            cascade: false,
            checkedKeys: [],
          },
          nodeCheckable,
        ),
      })

      this.checkedKeysHash = {}
      this.props.nodeCheckable.checkedKeys.forEach((key) => {
        this.checkedKeysHash[key] = true
      })
    }

    this.setProps({
      children: {
        component: TreeNodes,
        nodes,
        childrenData: data,
      },
    })
  }

  _dataToNodes() {}

  getData() {}

  getCheckedNodes(node) {
    if (node === undefined) {
      node = this
    }
    const checkedNodes = []

    const childNodes = node.getChildNodes()
    childNodes.forEach((childNode) => {
      if (childNode.isChecked() === true) {
        checkedNodes.push(childNode)

        childNode.checkedNodes = this.getCheckedNodes(childNode)
      }
    })

    return checkedNodes
  }

  getCheckedNodeKeys() {}

  getCheckedData() {}

  getSelectedNode() {
    return this.selectedNode
  }

  getChildNodes() {
    return this.nodesRef.getChildren()
  }

  _onNodeClick(args) {
    this._callHandler('onNodeClick', args)
  }

  _onNodeSelect(args) {
    this._callHandler('onNodeSelect', args)
  }
}

Component.register(Tree)

export default Tree
