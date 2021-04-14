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
      dataFields: {
        key: 'key',
        text: 'text',
        children: 'children',
        parentId: 'parentId',
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

  getCheckedNodeKeys(getOptions, checkedKeys, node) {
    getOptions = getOptions || {}
    checkedKeys = checkedKeys || []
    node = node || this
    const childNodes = node.getChildNodes()
    childNodes.forEach((childNode) => {
      if (childNode.isChecked() === true) {
        checkedKeys.push(childNode.key)

        this.getCheckedNodeKeys(getOptions, checkedKeys, childNode)
      }
    })

    return checkedKeys
  }

  getCheckedNodesData(getOptions, node) {
    getOptions = getOptions || {}
    node = node || this
    const checkedNodesData = []
    const childNodes = node.getChildNodes()
    childNodes.forEach((childNode) => {
      if (childNode.isChecked() === true) {
        const childNodeData = { ...childNode.props.data }
        checkedNodesData.push(childNodeData)

        childNodeData.children = this.getCheckedNodesData(getOptions, childNode)
      }
    })

    return checkedNodesData
  }

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
