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

  getSelectedTree() {
    const arr = []

    Object.keys(this.itemRefs).forEach((key) => {
      if (this.itemRefs[key].props.checked === true) {
        arr.push({
          key: this.itemRefs[key].key,
          parentKey: this.itemRefs[key].wrapper.isRoot
            ? null
            : this.itemRefs[key].wrapper.parentWrapper.treeNode.key,
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

  _rendered() {
    const uls = this.element.getElementsByTagName('ul')
    for (let i = 0; i < uls.length; i++) {
      new Sortable(uls[i], {
        group: 'nested',
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
      })
    }
  }
}

Component.register(Tree)

export default Tree
