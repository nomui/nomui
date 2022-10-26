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
        checked: this.tree.checkedNodeKeysHash[this.key] === true,
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

    // 级联选中子节点 && 当前节点的选中不是因为 children 级联上来的
    !onlyleaf &&
      cascadeCheckChildren === true &&
      !fromChildren &&
      Object.keys(this.subnodeRefs).forEach((key) => {
        this.subnodeRefs[key].checkChildren({ checkCheckbox: true, triggerCheckChange: false })
      })

    // 级联选中父节点: fromChildren传值true
    !onlyleaf &&
      cascadeCheckParent === true &&
      this.parentNode &&
      this.parentNode.check({ checkCheckbox: true, triggerCheckChange: false, fromChildren: true })

    if (checkCheckbox === true) {
      this.checkboxRef.setValue(true, { triggerChange: false })
    }

    this.props.checked = true
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

    if (checked === false) {
      return
    }

    uncheckCheckbox && this.checkboxRef.setValue(false, { triggerChange: false })

    !onlyleaf &&
      cascadeUncheckChildren === true &&
      skipChildren === false &&
      Object.keys(this.subnodeRefs).forEach((key) => {
        this.subnodeRefs[key].uncheck({ uncheckCheckbox: true, triggerCheckChange: false })
      })

    !onlyleaf &&
      cascadeUncheckParent === true &&
      this.parentNode &&
      this.parentNode.checkNodes({ childKey: this.key })

    this.props.checked = false
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

  select() {
    this.content.select()
  }

  unselect() {
    this.content.unselect()
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
