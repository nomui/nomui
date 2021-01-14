import Component from '../Component/index'
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
            key: item.value,
            title: item.title,
            value: item.value,
            checked: that.selectedList.indexOf(item.value) !== -1,
            items: c,
          }
        }
        return {
          component: TreeWrapper,
          key: item.value,
          title: item.title,
          value: item.value,
          checked: that.selectedList.indexOf(item.value) !== -1,
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
}

Component.register(Tree)

export default Tree
