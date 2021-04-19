import Component from '../Component/index'
import { isFunction } from '../util/index'
import TreeNodes from './TreeNodes'

class Tree extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
      nodeDefaults: {},
      nodeSelectable: {
        onlyleaf: false,
        byClick: true,
        selectedNodeKey: null,
      },
      dataFields: {
        key: 'key',
        text: 'text',
        children: 'children',
        parentId: 'parentId',
      },
      sortable: false,
      initExpandLevel: -1,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.nodeRefs = {}
    this.selectedNode = null
  }

  _config() {
    this.nodeRefs = {}
    this.selectedNode = null

    const { nodes, data, nodeCheckable } = this.props
    if (nodeCheckable) {
      this.setProps({
        nodeCheckable: Component.extendProps(
          {
            cascadeCheckParent: true,
            cascadeUncheckChildren: true,
            cascade: false,
            checkedNodeKeys: [],
          },
          nodeCheckable,
        ),
      })

      this.checkedNodeKeysHash = {}
      this.props.nodeCheckable.checkedNodeKeys.forEach((key) => {
        this.checkedNodeKeysHash[key] = true
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

  getData(getOptions, node) {
    getOptions = getOptions || {}
    node = node || this
    const nodesData = []
    const childNodes = node.getChildNodes()
    childNodes.forEach((childNode) => {
      const childNodeData = { ...childNode.props.data }
      nodesData.push(childNodeData)

      childNodeData.children = this.getData(getOptions, childNode)
    })

    return nodesData
  }

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

  getCheckedNodeKeys(getOptions, checkedNodeKeys, node) {
    getOptions = getOptions || {}
    checkedNodeKeys = checkedNodeKeys || []
    node = node || this
    const childNodes = node.getChildNodes()
    childNodes.forEach((childNode) => {
      if (childNode.isChecked() === true) {
        checkedNodeKeys.push(childNode.key)

        this.getCheckedNodeKeys(getOptions, checkedNodeKeys, childNode)
      }
    })

    return checkedNodeKeys
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

  getNode(param) {
    let retNode = null

    if (param instanceof Component) {
      return param
    }

    if (isFunction(param)) {
      for (const key in this.nodeRefs) {
        if (this.nodeRefs.hasOwnProperty(key)) {
          if (param.call(this.nodeRefs[key]) === true) {
            retNode = this.nodeRefs[key]
            break
          }
        }
      }
    } else {
      return this.nodeRefs[param]
    }

    return retNode
  }

  getSelectedNode() {
    return this.selectedNode
  }

  getChildNodes() {
    return this.nodesRef.getChildren()
  }

  selectNode(param) {
    const node = this.getNode(param)

    node.select()
  }

  _onNodeClick(args) {
    this._callHandler('onNodeClick', args)
  }

  _onNodeSelect(args) {
    const { onNodeSelect } = this.props.nodeSelectable
    this._callHandler(onNodeSelect, args)
  }
}

Component.register(Tree)

export default Tree
