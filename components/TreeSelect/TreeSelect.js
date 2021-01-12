import Component from '../Component/index'
import Control from '../Control/index'
import Icon from '../Icon/index'
import TreeSelectPopup from './TreeSelectPopup'

class TreeSelect extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      treeData: null,

      multiple: false,
      showArrow: true,
      selected: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    this.items = []
  }

  _config() {
    const { showArrow, selected } = this.props
    const items = []
    const that = this
    if (typeof selected === 'string') {
      const temp = []
      temp.push(selected)
      that.props.selected = temp
    }

    if (selected) {
      that.getList().forEach(function (item) {
        that.props.selected.forEach(function (key) {
          if (key === item.key) {
            items.push({
              component: 'Badge',
              size: 'xs',
              text: item.title,
              key: item.key,
              // removable: function (param) {
              //   that.props.selected = selected.filter(function (k) {
              //     return k !== param
              //   })
              //   that.update(that.props.selected)
              // },
            })
          }
        })
      })
    }
    let children = []

    if (showArrow) {
      children = [
        ...items,
        {
          component: Icon,
          type: 'down',
          classes: {
            'nom-tree-select-arrow': true,
          },
        },
      ]
    }

    this.setProps({
      tag: 'div',
      children: children,
    })

    super._config()
  }

  _render() {
    this.popup = new TreeSelectPopup({ trigger: this, selected: this.props.selected })
  }

  getList() {
    const list = []
    function mapTree(data) {
      return data.forEach(function (item) {
        list.push({
          key: item.value,
          title: item.title,
          value: item.value,
        })
        if (item.children && item.children.length > 0) {
          mapTree(item.children)
        }
      })
    }

    mapTree(this.props.treeData)
    return list
  }

  setValue(data) {
    this.props.selected = data
    this.update(this.props.selected)
    // const that = this
    // if (data.length) {
    //   this.props.items = []
    //   this.selected = data
    //   for (let i = 0; i < data.length; i++) {
    //     that.props.items.push({
    //       component: 'Badge',
    //       key: that.tree.itemRefs[data[i]].props.key,
    //       text: that.tree.itemRefs[data[i]].props.title,
    //       size: 'xs',
    //     })
    //   }
    //   that.update(that.props.selected)
    //   //  that.update(that.props.items)
    // }
  }
}

Component.register(TreeSelect)

export default TreeSelect
