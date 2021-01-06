import Component from '../Component/index'
import Control from '../Control/index'
import Icon from '../Icon/index'
import List from '../List/index'
import TreeSelectPopup from './TreeSelectPopup'

class TreeSelect extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      treeData: [
        {
          title: 'Node1',
          value: '0-0',
          children: [
            {
              title: 'Child Node1',
              value: '0-0-1',
            },
            {
              title: 'Child Node2',
              value: '0-0-2',
            },
          ],
        },
        {
          title: 'Node2',
          value: '0-1',
        },
      ],
      optionDefaults: {
        key() {
          return this.props.value
        },
        _config: function () {
          this.setProps({
            children: this.props.text,
          })
        },
      },
      selectedSingle: {
        classes: {
          'nom-tree-select-single': true,
        },
        _config: function () {
          this.setProps({
            children: this.props.text,
          })
        },
      },
      selectedMultiple: {
        component: List,
        itemDefaults: {
          _config: function () {
            this.setProps({
              tag: 'span',
              children: this.props.text,
            })
          },
        },
        styles: {
          flex: 'row',
          gap: 'sm',
        },
      },
      multiple: false,
      showArrow: true,
      minItemsForSearch: 20,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this
    const { multiple, selectedMultiple, selectedSingle, showArrow } = this.props
    const children = []

    this.setProps({
      selectedSingle: {
        _create() {
          that.selectedSingle = this
        },
      },
      selectedMultiple: {
        itemDefaults: {
          key() {
            return this.props.value
          },
        },
        _create() {
          that.selectedMultiple = this
        },
      },
    })

    if (multiple) {
      children.push(selectedMultiple)
    } else {
      children.push(selectedSingle)
    }

    if (showArrow) {
      children.push({
        component: Icon,
        type: 'down',
        classes: {
          'nom-tree-select-arrow': true,
        },
      })
    }

    this.setProps({
      children: children,
    })

    super._config()
  }

  _render() {
    const { treeData } = this.props

    this.popup = new TreeSelectPopup({ trigger: this, treeData: treeData })
  }
}

Component.register(TreeSelect)

export default TreeSelect
