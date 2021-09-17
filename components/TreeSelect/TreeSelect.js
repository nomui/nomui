import Component from '../Component/index'
import Field from '../Field/index'
import Icon from '../Icon/index'
import { extend, isNullish, isString } from '../util/index'
import TreeSelectPopup from './TreeSelectPopup'

class TreeSelect extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
      allowClear: false,
      placeholder: '请选择',
      multiple: false,
      // 复选框模式，即为多选
      treeCheckable: false,
      treeDataFields: {
        key: 'value',
        text: 'text',
        children: 'children',
        parentKey: 'parentKey',
      },
      leafOnly: false,
      showArrow: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.items = []
    if (this.props.treeCheckable) {
      this.props.multiple = true
    }

    this.getListData()
  }

  _config() {
    const children = this._getContentChildren()
    this.setProps({
      control: {
        children,
      },
    })

    super._config()
  }

  _rendered() {
    this.popup = new TreeSelectPopup({
      trigger: this.control,
      nodeSelectable: this._getPopupNodeSelectable(),
      nodeCheckable: this._getPopupNodeCheckable(),
    })

    this._valueChange({ newValue: this.currentValue })
  }

  // tree 转换为list
  getListData() {
    this.listData = this.getList()
  }

  // 树结构扁平化为数组数据
  getList() {
    const { treeDataFields } = this.props
    const list = []
    function mapTree(data) {
      return data.forEach(function (item) {
        list.push({
          key: item[treeDataFields.key],
          [treeDataFields.text]: item[treeDataFields.text],
          [treeDataFields.key]: item[treeDataFields.key],
        })
        if (item.children && item.children.length > 0) {
          mapTree(item.children)
        }
      })
    }

    mapTree(this.props.options)
    return list
  }

  _getContentChildren() {
    const { showArrow, placeholder, allowClear } = this.props
    const { currentValue = [] } = this
    const that = this
    const children = []
    if (typeof currentValue === 'string') {
      that.currentValue = [currentValue]
    }

    // _content: 所选择的数据的展示
    children.push({
      classes: { 'nom-tree-select-content': true },
      _created() {
        that._content = this
      },
      children: this._getContentBadges(),
    })

    // placeholder
    if (isString(placeholder)) {
      children.push({
        _created() {
          that.placeholder = this
        },
        classes: { 'nom-tree-select-placeholder': true },
        children: placeholder,
      })
    }

    // 箭头
    if (showArrow) {
      children.push({
        component: Icon,
        type: 'down',
        classes: {
          'nom-tree-select-arrow': true,
        },
      })
    }

    if (allowClear) {
      children.push({
        component: Icon,
        type: 'times',
        classes: {
          'nom-tree-select-clear': true,
        },
        hidden: true,
        ref: (c) => {
          this.clearIcon = c
        },
        onClick: (args) => {
          this._setValue(null)
          this.props.allowClear && this.clearIcon.hide()
          this.popup && this.popup.hide()
          args.event && args.event.stopPropagation()
        },
      })
    }
    return children
  }

  _getContentBadges() {
    const { treeDataFields } = this.props
    const { currentValue } = this
    const items = []
    const that = this
    if (currentValue && currentValue.length) {
      currentValue.forEach((key) => {
        this.listData.forEach((item) => {
          if (key === item.key) {
            items.push({
              component: 'Tag',
              type: 'round',
              // size: 'xs',
              text: item[treeDataFields.text],
              key: item[treeDataFields.key],
              removable: function (param) {
                that._setValue(
                  currentValue.filter(function (k) {
                    return k !== param
                  }),
                )
              },
            })
          }
        })
      })
    }
    return items
  }

  // 弹窗的nodeSelectable的配置
  _getPopupNodeSelectable() {
    const { multiple } = this.props
    const { currentValue } = this
    if(multiple) return false
    
    return {
      selectedNodeKey: currentValue && currentValue[0],
      onNodeSelect: ({ nodeData }) => {
        this._setValue([nodeData.key])
      }
    }
  }

  // 弹窗的nodeCheckable的配置
  _getPopupNodeCheckable() {
    const { multiple, treeCheckable } = this.props
    const { currentValue } = this

    if (!multiple && !treeCheckable) return false
    // 多选则展示复选框
    return Component.extendProps(
      {
        checkedNodeKeys: currentValue,
        onCheckChange: () => {
          const checkedKeys = this.tree.getCheckedNodeKeys()
          this._setValue(checkedKeys)
        },
      },
      treeCheckable,
    )
  }

  _setValue(value, options) {
    this.tempValue = value
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }

    // 单选则点击后即关闭popup
    if (!this.props.multiple) {
      this.popup.hide()
    }

    if (options.triggerChange) {
      this._onValueChange()
    }
    this._content.update({ children: this._getContentBadges() })
  }

  // getValue时根据选中的节点返回
  _getValue() {
    if (isNullish(this.tempValue)) return null

    const { multiple, treeDataFields } = this.props
    if (multiple) {
      const checkedKeys = this.tree.getCheckedNodeKeys()
      return checkedKeys
    }
    const selectNode = this.tree.getSelectedNode()
    return selectNode && selectNode[treeDataFields.key]
  }

  _valueChange(changed) {
    const { newValue } = changed
    if (newValue) {
      this.props.allowClear && this.clearIcon.show()
    }
    if (this.placeholder) {
      if ((Array.isArray(newValue) && newValue.length === 0) || isNullish(newValue)) {
        this.placeholder.show()
      } else {
        this.placeholder.hide()
      }
    }
    this.popup.update({
      nodeSelectable: this._getPopupNodeSelectable(),
      nodeCheckable: this._getPopupNodeCheckable(),
    })
  }
}

Component.register(TreeSelect)

export default TreeSelect
