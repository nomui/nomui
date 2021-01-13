import Component from '../Component/index'
import Control from '../Control/index'
import Icon from '../Icon/index'
import TreeSelectPopup from './TreeSelectPopup'

class TreeSelect extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      treeData: null,

      multiple: true,
      leafOnly: false,
      showArrow: true,
      selectedNodes: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.items = []
  }

  _config() {
    const { showArrow, selectedNodes } = this.props
    const items = []
    const that = this
    if (typeof selectedNodes === 'string') {
      const temp = []
      temp.push(selectedNodes)
      that.props.selectedNodes = temp
    }

    if (selectedNodes) {
      that.getList().forEach(function (item) {
        that.props.selectedNodes.forEach(function (key) {
          if (key === item.key) {
            items.push({
              component: 'Badge',
              size: 'xs',
              text: item.title,
              key: item.key,
              removable: function (param) {
                that.props.selectedNodes = selectedNodes.filter(function (k) {
                  return k !== param
                })
                that.update(that.props.selectedNodes)
              },
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
          _created: function () {
            that.arrow = this
          },
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

  _rendered() {
    this.popup = new TreeSelectPopup({ trigger: this.arrow, selectedNodes: this.props.selected })
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
    this.props.selectedNodes = data
    this.update(this.props.selectedNodes)
  }

  _getValue() {
    return this.props.selectedNodes
  }
}

Component.register(TreeSelect)

export default TreeSelect
