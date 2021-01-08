import Component from '../Component/index'
import List from '../List/index'

class TreeNode extends List {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      indent: false,
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

    this.wrapper.treeNode = this
    this.hasSubtree = !!this.subTree

    this.tree.itemRefs[this.key] = this

    if (!this.wrapper.isRoot && !this.wrapper.parentWrapper.isLeaf) {
      this.wrapper.parentWrapper.subTree.checkStatus[this.key] = this
    }
  }

  _config() {
    const { value, title, key, indent, checked } = this.props
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
          indent: indent,
        },
        children: [
          Component.normalizeIconProps({
            type: checkIcon,
            events: {
              click: function () {
                that.handleCheck()
              },
              select() {
                // if (that.tree.selectedList !== null) that.tree.selectedItem.unselect()

                that.tree.selectedList.push(this.key)
              },
              deselect() {
                // if (that.tree.selectedList !== null) that.tree.selectedItem.unselect()
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

  checkSubtree() {
    if (this.hasSubtree) {
      const sub = this.subTree.checkStatus
      let x = 0
      let y = 0

      Object.keys(sub).forEach((key) => {
        y += 1
        if (!sub[key].props.checked) {
          x += 1
        }
      })

      if (x === 0) {
        this.subTree.check = 'all'
      } else if (x > 0 && x < y) {
        this.subTree.check = 'part'
      } else {
        this.subTree.check = 'none'
      }
    }
  }

  checkDown() {
    if (this.wrapper.isLeaf) {
      return
    }
    if (this.props.checked) {
      if (this.subTree.check === 'all') {
        return
      }
      const t = this.subTree.children

      for (let i = 0; i < t.length; i++) {
        t[i].treeNode.handleCheck(true)
      }
    }
    if (!this.props.checked) {
      if (this.subTree.check === 'none') {
        return
      }

      if (this.subTree.check === 'part') {
        this.props.checked = true

        const t = this.subTree.children
        for (let i = 0; i < t.length; i++) {
          t[i].treeNode.handleCheck(true)
        }
      } else {
        const t = this.subTree.children
        for (let i = 0; i < t.length; i++) {
          t[i].treeNode.handleCheck(false)
        }
      }
    }
    this.update(this.props.checked)
  }

  checkUp() {
    if (!this.props.checked && !this.wrapper.isRoot) {
      this.wrapper.parentWrapper.treeNode.handleCheck(false)
    }
  }

  handleCheck(status) {
    this.props.checked = status || !this.props.checked
    this.update(this.props.checked)
    this.checkSubtree()

    this.checkDown()
  }
}

Component.register(TreeNode)

export default TreeNode
