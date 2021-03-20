import Component from '../Component/index'
import Sortable from '../util/sortable.core.esm'
import TreeWrapper from './TreeWrapper'

class Tree extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      treeData: null,
      leafOnly: false,
      multiple: true,
      selectedNodes: null,
      onCheck: null,
      showLine: false,
      toolbar: null,
      fields: {
        title: 'title',
        value: 'value',
      },
      sortable: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.itemRefs = []
    this.selectedList = []
  }

  _config() {
    const that = this
    const { treeData, selectedNodes, showline } = this.props

    const { title, value } = this.props.fields

    if (selectedNodes) {
      if (typeof selectedNodes === 'string') {
        this.selectedList.push(selectedNodes)
      } else {
        this.selectedList = selectedNodes
      }
    }

    function mapTree(data) {
      return data.map(function (item) {
        if (item.children && item.children.length > 0) {
          const c = mapTree(item.children)
          return {
            component: TreeWrapper,
            key: item[value],
            title: item[title],
            value: item[value],
            checked: that.selectedList.indexOf(item[value]) !== -1,
            items: c,
          }
        }

        return {
          component: TreeWrapper,
          key: item[value],
          title: item[title],
          value: item[value],
          checked: that.selectedList.indexOf(item[value]) !== -1,
        }
      })
    }

    const children = mapTree(treeData)

    this.setProps({
      children: [
        this.props.toolbar && this.props.toolbar.placement === 'before' && this.props.toolbar.item,
        {
          tag: 'ul',
          classes: {
            'nom-tree-container': true,
            'nom-tree-showline': showline,
          },
          children: children,
        },
        this.props.toolbar && this.props.toolbar.placement === 'after' && this.props.toolbar.item,
      ],
    })
  }

  getSelected() {
    return Object.keys(this.itemRefs).filter((key) => {
      return this.itemRefs[key].props.checked === true
    })
  }

  _getNewTree() {
    const arr = []
    function mapTree(data) {
      data.forEach(function (n) {
        if (n.children) {
          mapTree(n.children)
        }
        arr.push(n)
      })
    }
    mapTree(this.getTreeData())
    return arr
  }

  getSelectedTree() {
    const arr = []
    const newTree = this._getNewTree()
    const that = this

    newTree.forEach(function (n) {
      const key = n.key
      if (that.itemRefs[key].props.checked === true) {
        arr.push({
          key: that.itemRefs[key].key,
          parentKey: that.itemRefs[key].wrapper.isRoot
            ? null
            : that.itemRefs[key].wrapper.parentWrapper.treeNode.key,
        })
      }
    })

    function setTreeData(data) {
      // 删除所有的children,以防止多次调用
      data.forEach(function (item) {
        delete item.children
      })
      const map = {} // 构建map
      data.forEach((i) => {
        map[i.key] = i // 构建以area_id为键 当前数据为值
      })
      const treeData = []
      data.forEach((child) => {
        const mapItem = map[child.parentKey] // 判断当前数据的parent_id是否存在map中
        if (mapItem) {
          // 存在则表示当前数据不是最顶层的数据
          // 注意： 这里的map中的数据是引用了arr的它的指向还是arr,当mapItem改变时arr也会改变，踩坑点
          ;(mapItem.children || (mapItem.children = [])).push(child) // 这里判断mapItem中是否存在child
        } else {
          // 不存在则是顶层数据
          treeData.push(child)
        }
      })
      return treeData
    }
    return setTreeData(arr)
  }

  checkAll() {
    const that = this
    Object.keys(this.itemRefs).forEach(function (key) {
      that.itemRefs[key].setCheck(true)
    })
    const data = { items: this.getSelected() }
    this.props.onCheck && this._callHandler(this.props.onCheck, data)
  }

  unCheckAll() {
    const that = this
    Object.keys(this.itemRefs).forEach(function (key) {
      that.itemRefs[key].setCheck(false)
    })
  }

  triggerCheck(item) {
    const data = {
      items: this.getSelected(),
      key: item.key,
      status: item.props.checked,
    }

    this.props.onCheck && this._callHandler(this.props.onCheck, data)
  }

  // getArray() {
  //   const arr = []
  //   Object.keys(this.itemRefs).forEach((key) => {
  //     arr.push({
  //       key: this.itemRefs[key].key,
  //       parentKey: this.itemRefs[key].wrapper.isRoot
  //         ? null
  //         : this.itemRefs[key].wrapper.parentWrapper.treeNode.key,
  //     })
  //   })

  //   return arr
  // }

  getTreeData() {
    return this.props.treeData
  }

  _getNewOrder(params) {
    const that = this

    const treeData = this.getTreeData()

    function isParent(data) {
      let result = false
      data.forEach(function (n) {
        if (n[that.props.fields.value] === params.key) {
          result = true
        }
      })
      return result
    }

    function moveData(data) {
      if (params.newIndex < params.oldIndex) {
        const c = data
        const oldObj = { ...c[params.oldIndex] }
        c.splice(params.newIndex, 0, oldObj)
        c.splice(params.oldIndex + 1, 1)
      }
      if (params.newIndex > params.oldIndex) {
        const c = data
        const oldObj = { ...c[params.oldIndex] }
        c.splice(params.newIndex + 1, 0, oldObj)
        c.splice(params.oldIndex, 1)
      }
    }

    function resort(data) {
      if (isParent(data)) {
        moveData(data)
      }
      data.forEach(function (n) {
        if (n.children) {
          const c = n.children
          if (isParent(c)) {
            moveData(c)
          } else {
            resort(c)
          }
        }
      })
    }

    resort(treeData)
    return treeData
  }

  setOrder(params) {
    const treeData = this._getNewOrder(params)
    this.update({
      treeData: treeData,
    })
  }

  _rendered() {
    if (!this.props.sortable) {
      return
    }
    const tree = this
    const uls = this.element.getElementsByTagName('ul')
    for (let i = 0; i < uls.length; i++) {
      const target = uls[i]

      new Sortable(target, {
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        dataIdAttr: 'key',
        onEnd: function (evt) {
          const el = evt.item // dragged HTMLElement
          const key = el.getAttribute('key')

          if (evt.oldIndex === evt.newIndex) {
            return
          }

          tree.setOrder({
            key: key,
            oldIndex: evt.oldIndex,
            newIndex: evt.newIndex,
          })
        },
      })
    }
  }
}

Component.register(Tree)

export default Tree
