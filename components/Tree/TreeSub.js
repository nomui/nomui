import Component from '../Component/index'

class TreeSub extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'ul',
      items: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.wrapper = this.props.wrapper || this.parent
    this.wrapper.subTree = this
    this.tree = this.wrapper.tree

    this.wrapper.treeNode.subTree = this.wrapper.subTree
    this.wrapper.treeNode.hasSubtree = true
    this.check = null
    this.checkStatus = []
  }

  _config() {
    const { items } = this.props

    this.setProps({
      children: items,
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(TreeSub)

export default TreeSub
