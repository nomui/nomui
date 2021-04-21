import Component from '../Component/index'
import TreeNodeContent from './TreeNodeContent'

class TreeNode extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      nodes: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
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
    this.isLeaf = !nodes && !childrenData
    if (Array.isArray(nodes) || Array.isArray(childrenData)) {
      children.push({
        component: 'TreeNodes',
        nodes,
        childrenData,
      })
    }

    this.setProps({
      children,
    })

    if (this.tree.props.nodeCheckable) {
      this.setProps({
        checked: this.tree.checkedNodeKeysHash[this.key] === true,
      })
    }
  }

  check(checkOptions = { checkCheckbox: true }) {
    const { checked } = this.props
    if (checked === true) {
      return
    }
    const { checkCheckbox } = checkOptions
    this.parentNode && this.parentNode.check()
    if (checkCheckbox === true) {
      this.checkboxRef.setValue(true, { triggerChange: false })
    }

    this.props.checked = true
  }

  uncheck(uncheckOptions = { uncheckCheckbox: true }) {
    const { checked } = this.props
    if (checked === false) {
      return
    }
    const { uncheckCheckbox } = uncheckOptions

    uncheckCheckbox && this.checkboxRef.setValue(false, { triggerChange: false })
    Object.keys(this.subnodeRefs).forEach((key) => {
      this.subnodeRefs[key].uncheck()
    })
    this.props.checked = false
  }

  isChecked() {
    return this.props.checked === true
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

Component.register(TreeNode)

export default TreeNode
