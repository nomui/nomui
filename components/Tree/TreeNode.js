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
    // if (this.parentTree.props.checkChild) {
    //   this.props.checked = true
    //   if (this.props.items) {
    //     this.props.checkChild = this.props.checked
    //   }
    // }

    const { value, title, key, items, checked } = this.props
    const that = this

    let checkIcon = null
    if (checked) {
      checkIcon = 'checked-square'
    } else {
      checkIcon = 'blank-square'
    }

    // console.log(checked)
    // if (status === 0) {
    //   checkIcon = 'blank-square'
    // } else if (status === 1) {
    //   debugger
    //   checkIcon = 'checked-square'
    // } else {
    //   checkIcon = 'half-square'
    // }

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

    // if (this.props.items) {
    //   for (let x = 0; x < this.props.items.length; x++) {
    //     this.props.items[x].checked = this.props.checked
    //   }
    // }

    // function checkChild(data) {
    //   for (let x = 0; x < this.children.length; x++) {
    //     // this.children[5].children[0].handleCheck()

    //     if (this.children[x].element && this.children[x].element.nodeName === 'UL') {
    //       const c = this.children[x].children
    //       for (let i = 0; i < c.length; i++) {
    //         c[i].handleCheck()
    //       }
    //     }
    //   }
    // }
    // // this.children[5].children[0].handleCheck()
    // checkChild(this.props)
  }
}

Component.register(TreeNode)

export default TreeNode
