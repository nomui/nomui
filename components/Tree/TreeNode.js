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

  _created() {
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
      classes: {
        'nom-tree-node-disabled': that.tree.props.leafOnly && !that.wrapper.isLeaf,
      },
      key: key,
      children: {
        tag: 'span',
        classes: {
          'nom-tree-node-name': true,
          indent: indent,
        },
        children: [
          (that.wrapper.isLeaf || !that.tree.props.leafOnly) &&
            Component.normalizeIconProps({
              type: checkIcon,
              onClick: function () {
                that.handleClick()
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

  getSubtreeStatus() {
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

  getSiblingStatus() {
    if (this.wrapper.isRoot) {
      return
    }
    const sib = this.wrapper.parentWrapper.subTree.checkStatus
    let x = 0
    let y = 0

    Object.keys(sib).forEach((key) => {
      y += 1
      if (!sib[key].props.checked) {
        x += 1
      }
    })

    if (x === 0) {
      this.wrapper.parentWrapper.subTree.check = 'all'
    } else if (x > 0 && x < y) {
      this.wrapper.parentWrapper.subTree.check = 'part'
    } else {
      this.wrapper.parentWrapper.subTree.check = 'none'
    }
  }

  checkDown(status, self) {
    if (!self) {
      this.props.checked = status !== null ? status : !this.props.checked
      this.update(this.props.checked)
    }
    this.getSubtreeStatus()
    if (this.wrapper.isLeaf) {
      return
    }

    if (this.props.checked) {
      if (this.subTree.check === 'all') {
        return
      }
      const t = this.subTree.children

      for (let i = 0; i < t.length; i++) {
        t[i].treeNode.checkDown(true, false)
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
          t[i].treeNode.checkDown(true, false)
        }
      } else {
        const t = this.subTree.children
        for (let i = 0; i < t.length; i++) {
          t[i].treeNode.checkDown(false, false)
        }
      }
    }
    this.update(this.props.checked)
  }

  checkUp(status, self) {
    if (!self) {
      this.props.checked = status !== null ? status : !this.props.checked
      this.update(this.props.checked)
    }

    this.getSiblingStatus()
    if (this.wrapper.isRoot) {
      return
    }
    if (status) {
      this.props.checked = status
    }

    if (this.props.checked && this.wrapper.parentWrapper.subTree.check === 'all') {
      this.wrapper.parentWrapper.treeNode.checkUp(true, false)
    }
    if (!this.props.checked && this.wrapper.parentWrapper.subTree.check !== 'all') {
      this.wrapper.parentWrapper.treeNode.checkUp(false, false)
    }
  }

  setCheck(status) {
    this.props.checked = status
    this.update(this.props.checked)
  }

  handleClick(status) {
    if (this.tree.props.leafOnly) {
      if (!this.wrapper.isLeaf) {
        return
      }
      if (!this.tree.props.multiple) {
        this.tree.unCheckAll(true)
      }
    }

    this.props.checked = status || !this.props.checked
    this.update(this.props.checked)

    if (!this.tree.props.leafOnly) {
      this.checkDown(null, true)
      this.checkUp(null, true)
    }

    this.tree.triggerCheck(this)
  }
}

Component.register(TreeNode)

export default TreeNode
