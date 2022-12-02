import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import { defaultSortableOndrop, isFunction } from '../util/index'
import scrollIntoView from '../util/scrollIntoView'
import TreeNodes from './TreeNodes'

class Tree extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Tree.defaults, props), ...mixins)
  }

  _created() {
    this.nodeRefs = {}
    this._alreadyProcessedFlat = false
    this.selectedNode = null
  }

  _update(props) {
    if (props.data && this.props) {
      // data更新, flatData需要重新组装成Tree结构
      if (this.props.flatData) {
        this._alreadyProcessedFlat = false
      }
    }
  }

  _config() {
    this.nodeRefs = {}
    this.selectedNode = null

    const { nodes, data, flatData, nodeCheckable } = this.props
    if (flatData === true && !this._alreadyProcessedFlat) {
      this.setProps({
        data: this._setTreeData(data),
      })
      this._alreadyProcessedFlat = true
    }

    this._addPropStyle('fit')

    if (nodeCheckable) {
      this._loopSetValue(nodeCheckable, [
        'cascadeCheckParent',
        'cascadeCheckChildren',
        'cascadeUncheckChildren',
        'cascadeUncheckParent',
      ])
      this.setProps({
        nodeCheckable: Component.extendProps(
          {
            cascadeCheckParent: true,
            cascadeCheckChildren: true,
            cascadeUncheckChildren: true,
            cascadeUncheckParent: true,
            cascade: false,
            showCheckAll: false,
            checkAllText: '全选',
            checkedNodeKeys: [],
          },
          nodeCheckable,
        ),
      })

      if (this.props.nodeCheckable && this.props.nodeCheckable.onlyleaf) {
        this.setProps({
          nodeCheckable: {
            cascadeCheckParent: false,
            cascadeUncheckParent: false,
            cascade: false,
          },
        })
      }

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

  _rendered() {
    this.autoCheckAll()
    this.props.sortable && defaultSortableOndrop()
  }

  autoCheckAll() {
    if (!this.checkAllRef) return false
    const check = Object.keys(this.nodeRefs).some((nodeKey) => {
      return this.nodeRefs[nodeKey].props.checked === false
    })

    this.checkAllRef.setValue(!check, { triggerChange: false })
  }

  _loopSetValue(key, arry) {
    if (key.cascade === undefined) return false
    arry.forEach(function (currentValue) {
      if (key[currentValue] === undefined) {
        key[currentValue] = key.cascade
      }
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
      }
      this.getCheckedNodeKeys(getOptions, checkedNodeKeys, childNode)
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

  setCheckedNodeKeys(array) {
    this.props.nodeCheckable.checkedNodeKeys = array
    this.update({})
  }

  // 展开指定节点
  expandTo(param) {
    let node = this.getNode(param)
    // 遍历展开 parentNode
    while (node) {
      // 节点存在 && 为展开-->expanded: false
      if (node && node.content && !node.content.props.expanded) {
        node.content.expand()
      }

      node = node.parentNode
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

  checkAllNodes(options) {
    Object.keys(this.nodeRefs).forEach((nodeKey) => {
      if (options && options.ignoreDisabled === true) {
        if (this.nodeRefs[nodeKey].props.disabled !== true) {
          this.nodeRefs[nodeKey].check({ triggerCheckChange: false })
        }
      } else {
        this.nodeRefs[nodeKey].check({ triggerCheckChange: false })
      }
    })

    this._onCheckChange()
  }

  uncheckAllNodes(options) {
    Object.keys(this.nodeRefs).forEach((nodeKey) => {
      if (options && options.ignoreDisabled === true) {
        if (this.nodeRefs[nodeKey].props.disabled !== true) {
          this.nodeRefs[nodeKey].uncheck({ triggerCheckChange: false })
        }
      } else {
        this.nodeRefs[nodeKey].uncheck({ triggerCheckChange: false })
      }
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

  _setTreeData(arr) {
    const { key, parentKey, children } = this.props.dataFields

    if (!key || key === '' || !arr) return []
    //  删除所有 children,以防止多次调用
    arr.forEach(function (item) {
      delete item[children]
    })
    const map = {} // 构建map
    arr.forEach((i) => {
      map[i[key]] = i // 构建以key为键 当前数据为值
    })

    const treeData = []
    arr.forEach((child) => {
      const mapItem = map[child[parentKey]] // 判断当前数据的parentKey是否存在map中

      if (mapItem) {
        // 存在则表示当前数据不是最顶层数据

        // 这里的map中的数据是引用了arr的它的指向还是arr，当mapItem改变时arr也会改变
        ;(mapItem[children] || (mapItem[children] = [])).push(child) // 这里判断mapItem中是否存在children, 存在则插入当前数据, 不存在则赋值children为[]然后再插入当前数据
      } else {
        // 不存在则是组顶层数据
        treeData.push(child)
      }
    })

    return treeData
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
Tree.defaults = {
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
Component.register(Tree)

export default Tree
