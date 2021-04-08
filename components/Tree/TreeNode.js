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
  }

  _config() {
    this.props.dataToNode({ data: this.props.data, node: this })
    const { nodes, childrenData } = this.props
    const children = [
      {
        component: TreeNodeContent,
      },
    ]
    this.isLeaf = !nodes
    if (Array.isArray(nodes) || Array.isArray(childrenData)) {
      children.push({
        component: 'TreeNodes',
        nodes,
      })
    }
    this.setProps({
      children,
    })
  }

  check(checkOptions = { checkCheckbox: true }) {
    const { checkCheckbox } = checkOptions
    this.parentNode && this.parentNode.check()
    if (checkCheckbox === true) {
      this.checkboxRef.setValue(true, { triggerChange: false })
    }
  }

  uncheck(uncheckOptions = { uncheckCheckbox: true }) {
    const { uncheckCheckbox } = uncheckOptions

    uncheckCheckbox && this.checkboxRef.setValue(false, { triggerChange: false })
    Object.keys(this.subnodeRefs).forEach((key) => {
      this.subnodeRefs[key].uncheck()
    })
  }
}

Component.register(TreeNode)

export default TreeNode
