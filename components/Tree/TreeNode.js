import Component from '../Component/index'
import List from '../List/index'

class TreeNode extends List {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      items: null,
      key: null,
      title: null,
      value: null,
      status: 0,
      collapsed: false,
      checked: false,
      checkChild: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    this.wrapper = this.parent
    this.wrapper.item = this
    this.tree = this.wrapper.tree

    // this.tree.itemRefs[this.key] = this
  }

  _config() {
    const { value, title, key, items, checked } = this.props
    const that = this

    let checkIcon = null
    if (checked) {
      checkIcon = 'checked-square'
    } else {
      checkIcon = 'blank-square'
    }

    this.setProps({
      value: value,
      title: title,
      key: key,
      children: {
        tag: 'span',
        classes: {
          'nom-tree-node-name': true,
          indent: !items,
        },
        children: [
          Component.normalizeIconProps({
            type: checkIcon,
            events: {
              click: function () {
                that.handleCheck()
              },
            },
          }),
          {
            tag: 'span',
            children: title,
          },
        ],
      },
    })
  }

  handleCheck() {
    this.props.checked = !this.props.checked
    if (this.props.items) {
      this.props.checkChild = this.props.checked
    }
    this.update(this.props.checked)
    this.update(this.props.checkChild)
  }
}

Component.register(TreeNode)

export default TreeNode
