import Component from '../Component/index'
import TreeNodeContent from './TreeNodeContent'

class TreeNode extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(TreeNode.defaults, props), ...mixins)
  }

  _created() {
    this.level = 0
    this.parentNode = this.parent.parentNode
    if (this.parentNode !== null) {
      this.level = this.parentNode.level + 1
      this.parentNode.subnodeRefs[this.key] = this
    }
    this.tree = this.parent.tree
    this.subnodeRefs = {}
    const { data } = this.props
    const { dataFields } = this.tree.props
    Object.keys(dataFields).forEach((dataField) => {
      data[dataField] = data[dataFields[dataField]]
    })
  }

  _config() {
    this.props.dataToNode({ data: this.props.data, node: this })
    if (this.props.key) {
      this.key = this.props.key
    }
    this.tree.nodeRefs[this.key] = this
    if (this.tree.props.nodeSelectable.selectedNodeKey === this.key) {
      this.tree.selectedNode = this
    }
    const { nodes, childrenData } = this.props
    const children = [
      {
        component: TreeNodeContent,
      },
    ]

    this.isLeaf = !(this._isNotEmptyArray(nodes) || this._isNotEmptyArray(childrenData))

    this.isLoadData = this.tree.props.loadData && this.props.data.isLeaf === false

    if (Array.isArray(nodes) || Array.isArray(childrenData)) {
      children.push({
        component: 'TreeNodes',
        nodes,
        childrenData,
      })
    }

    this.setProps({
      classes: { 'filter-node': this.props.data.__filterNode },
      children,
    })

    if (this.tree.props.nodeCheckable) {
      this.setProps({
        checked: this.firstRender
          ? this.tree.checkedNodeKeysHash[this.key] === true
          : this.props.checked === true || this.tree.checkedNodeKeysHash[this.key] === true,
      })
    }
  }

  _isNotEmptyArray(arr) {
    return Array.isArray(arr) && arr.length > 0
  }

  checkChildren({ checkCheckbox = true, triggerCheckChange = true } = {}) {
    const { checked } = this.props
    const { onCheckChange, cascadeCheckChildren } = this.tree.props.nodeCheckable

    cascadeCheckChildren === true &&
      Object.keys(this.subnodeRefs).forEach((key) => {
        this.subnodeRefs[key].checkChildren({ checkCheckbox: true, triggerCheckChange: false })
      })

    if (checked === true) {
      return
    }

    if (checkCheckbox === true) {
      this.checkboxRef.setValue(true, { triggerChange: false })
    }

    this.props.checked = true
    if (triggerCheckChange === true) {
      this._callHandler(onCheckChange)
    }
  }

  partCheck() {
    // Set the checkbox to a "partially checked" state
    this.checkboxRef.partCheck(false)

    this.props.partChecked = true
    this.props.checked = false
  }

  updateParentCheckState() {
    const childKeys = Object.keys(this.subnodeRefs)

    // 判断子节点的状态
    const allChecked = childKeys.every((key) => this.subnodeRefs[key].props.checked === true)
    const noneChecked = childKeys.every(
      (key) =>
        this.subnodeRefs[key].props.checked === false && !this.subnodeRefs[key].props.partChecked,
    )

    // 根据子节点状态更新当前节点状态
    if (allChecked) {
      this.check({ checkCheckbox: true, triggerCheckChange: false, fromChildren: true })
    } else if (noneChecked) {
      this.uncheck({ uncheckCheckbox: true, triggerCheckChange: false, skipChildren: true })
    } else {
      this.partCheck()
    }

    // 递归更新祖先节点状态
    if (this.parentNode) {
      this.parentNode.updateParentCheckState()
    }
  }

  check({ checkCheckbox = true, triggerCheckChange = true, fromChildren = false } = {}) {
    const { checked } = this.props
    const {
      onCheckChange,
      cascadeCheckParent,
      cascadeCheckChildren,
      onlyleaf,
    } = this.tree.props.nodeCheckable

    if (checked === true) {
      return
    }

    // 更新当前节点状态
    if (checkCheckbox === true) {
      this.checkboxRef.setValue(true, { triggerChange: false })
    }

    this.props.checked = true
    this.props.partChecked = false // 确保不是半选状态

    // 级联更新子节点状态
    if (!onlyleaf && cascadeCheckChildren === true && !fromChildren) {
      Object.keys(this.subnodeRefs).forEach((key) => {
        this.subnodeRefs[key].check({ checkCheckbox: true, triggerCheckChange: false })
      })
    }

    // 级联更新父节点状态
    if (!onlyleaf && cascadeCheckParent === true && this.parentNode) {
      this.parentNode.updateParentCheckState()
    }

    if (triggerCheckChange === true) {
      this._callHandler(onCheckChange)
    }
  }

  uncheck({ uncheckCheckbox = true, triggerCheckChange = true, skipChildren = false } = {}) {
    const { checked } = this.props
    const {
      onCheckChange,
      cascadeUncheckChildren,
      cascadeUncheckParent,
      onlyleaf,
    } = this.tree.props.nodeCheckable

    if (checked === false && this.props.partChecked === false) {
      return
    }

    // 更新当前节点状态
    if (uncheckCheckbox === true) {
      this.checkboxRef.setValue(false, { triggerChange: false })
    }

    this.props.checked = false
    this.props.partChecked = false // 确保不是半选状态

    // 级联更新子节点状态
    if (!onlyleaf && cascadeUncheckChildren === true && !skipChildren) {
      Object.keys(this.subnodeRefs).forEach((key) => {
        this.subnodeRefs[key].uncheck({ uncheckCheckbox: true, triggerCheckChange: false })
      })
    }

    // 级联更新父节点状态
    if (!onlyleaf && cascadeUncheckParent === true && this.parentNode) {
      this.parentNode.updateParentCheckState()
    }

    if (triggerCheckChange === true) {
      this._callHandler(onCheckChange)
    }
  }

  isChecked() {
    return this.props.checked === true
  }

  checkNodes({ childKey }) {
    const c = Object.keys(this.subnodeRefs).filter((n) => {
      return this.subnodeRefs[n].props.checked === true && this.subnodeRefs[n].key !== childKey
    })
    if (!c.length) {
      this.uncheck({ uncheckCheckbox: true, triggerCheckChange: false, skipChildren: true })
    }
  }

  autoCheckAll() {
    if (!this.tree.checkAllRef) return false
    const check = Object.keys(this.tree.nodeRefs).some((nodeKey) => {
      return this.tree.nodeRefs[nodeKey].props.checked === false
    })

    this.tree.checkAllRef.setValue(!check, { triggerChange: false })
  }

  getChildNodes() {
    return this.nodesRef ? this.nodesRef.getChildren() : []
  }

  addNodes(param) {
    this.update({ data: { children: [...this.props.data.children, ...param] } })
  }

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

  select() {
    this.content.select()
  }

  unselect() {
    this.content.unselect()
  }

  disable() {
    this.update({
      data: {
        disabled: true,
      },
    })
  }

  enable() {
    this.update({
      data: {
        disabled: false,
      },
    })
  }

  hide() {
    this.update({
      data: {
        hidden: true,
      },
    })
  }

  show() {
    this.update({
      data: {
        hidden: false,
      },
    })
  }
}
TreeNode.defaults = {
  nodes: null,
  data: {
    hidden: false,
  },
}
Component.register(TreeNode)

export default TreeNode
