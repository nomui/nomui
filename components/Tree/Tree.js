import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import { isFunction } from '../util/index'
import scrollIntoView from '../util/scrollIntoView'
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
        scrollIntoView: true,
      },
      dataFields: {
        key: 'key',
        text: 'text',
        children: 'children',
        parentKey: 'parentKey',
      },
      flatData: false,
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

    const { nodes, data, flatData, nodeCheckable } = this.props
    if (flatData === true) {
      this.setProps({
        data: this._toTreeData(data),
      })
    }

    this._addPropStyle('fit')

    if (nodeCheckable) {
      this.setProps({
        nodeCheckable: Component.extendProps(
          {
            cascadeCheckParent: true,
            cascadeUncheckChildren: true,
            cascade: false,
            showCheckAll: false,
            checkAllText: '全选',
            checkedNodeKeys: [],
          },
          nodeCheckable,
        ),
      })

      this.checkedNodeKeysHash = {}
      if (Array.isArray(this.props.nodeCheckable.checkedNodeKeys)) {
        this.props.nodeCheckable.checkedNodeKeys.forEach((key) => {
          this.checkedNodeKeysHash[key] = true
        })
      }
    }

    const children = []
    if (this.props.nodeCheckable && this.props.nodeCheckable.showCheckAll === true) {
      children.push(this._getCheckAllCheckbox())
    }
    children.push({
      component: TreeNodes,
      nodes,
      childrenData: this.props.data,
    })

    this.setProps({
      children: children,
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

      const children = this.getData(getOptions, childNode)
      if (children && children.length) {
        childNodeData.children = children
      }
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
    getOptions = getOptions || { flatData: false }
    node = node || this
    let checkedNodesData = []
    const childNodes = node.getChildNodes()
    childNodes.forEach((childNode) => {
      if (childNode.isChecked() === true) {
        const childNodeData = { ...childNode.props.data }
        checkedNodesData.push(childNodeData)

        if (getOptions.flatData === true) {
          checkedNodesData = checkedNodesData.concat(
            this.getCheckedNodesData(getOptions, childNode),
          )
        } else {
          const children = this.getCheckedNodesData(getOptions, childNode)
          if (children && children.length) {
            childNodeData.children = children
          }
        }
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

    if (node) {
      node.select()
      if (this.props.nodeSelectable.scrollIntoView) {
        this.scrollTo(node)
      }
    }
  }

  scrollTo(param) {
    const node = this.getNode(param)
    if (node) {
      scrollIntoView(node.element, {
        behavior: 'smooth',
        scrollMode: 'if-needed',
      })
    }
  }

  checkAllNodes() {
    Object.keys(this.nodeRefs).forEach((nodeKey) => {
      this.nodeRefs[nodeKey].check({ triggerCheckChange: false })
    })

    this._onCheckChange()
  }

  uncheckAllNodes() {
    Object.keys(this.nodeRefs).forEach((nodeKey) => {
      this.nodeRefs[nodeKey].uncheck({ triggerCheckChange: false })
    })

    this._onCheckChange()
  }

  _onCheckChange(args) {
    const { onCheckChange } = this.props.nodeCheckable

    this._callHandler(onCheckChange, args)
  }

  _onNodeClick(args) {
    this._callHandler('onNodeClick', args)
  }

  _onNodeSelect(args) {
    const { onNodeSelect } = this.props.nodeSelectable
    this._callHandler(onNodeSelect, args)
  }

  _toTreeData(arrayData) {
    const { key, parentKey, children } = this.props.dataFields

    if (!key || key === '' || !arrayData) return []

    if (Array.isArray(arrayData)) {
      const r = []
      const tmpMap = {}

      arrayData.forEach((item) => {
        tmpMap[item[key]] = item

        if (tmpMap[item[parentKey]] && item[key] !== item[parentKey]) {
          if (!tmpMap[item[parentKey]][children]) tmpMap[item[parentKey]][children] = []
          tmpMap[item[parentKey]][children].push(item)
        } else {
          // 无parent，为根节点，直接push进r
          r.push(item)
        }
      })

      return r
    }

    return [arrayData]
  }

  _getCheckAllCheckbox() {
    const { disabled } = this.props

    return {
      component: Checkbox,
      classes: {
        'nom-tree-check-all': true,
      },
      text: this.props.nodeCheckable.checkAllText,
      disabled: disabled,
      _created: (inst) => {
        this.checkAllRef = inst
      },
      // value: this.tree.checkedNodeKeysHash[this.node.key] === true,
      onValueChange: ({ newValue }) => {
        if (newValue === true) {
          this.checkAllNodes()
        } else {
          this.uncheckAllNodes()
        }
      },
    }
  }
}

Component.register(Tree)

export default Tree
