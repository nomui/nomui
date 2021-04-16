import Component from '../Component/index'
import TreeNodes from './TreeNodes'
import { isFunction } from '../util/index'

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
