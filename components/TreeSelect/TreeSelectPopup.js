import Component from '../Component/index'
import Layout from '../Layout/index'
import Popup from '../Popup/index'
import TreeSelectItem from './TreeSelectItem'

class TreeSelectPopup extends Popup {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    super._create()

    this.selectControl = this.opener
  }

  _config() {
    const { treeData } = this.selectControl.props

    function mapTree(data) {
      return data.map(function (item) {
        if (item.children && item.children.length > 0) {
          const c = mapTree(item.children)
          return {
            component: TreeSelectItem,
            key: item.value,
            title: item.title,
            value: item.value,
            items: c,
          }
        }
        return {
          component: TreeSelectItem,
          key: item.value,
          title: item.title,
          value: item.value,
        }
      })
    }

    const children = mapTree(treeData)
    console.log(children)

    this.setProps({
      attrs: {
        style: {
          width: `${this.selectControl.offsetWidth()}px`,
        },
      },
      children: {
        component: Layout,
        body: {
          children: children,
        },
      },
    })

    super._config()
  }
}

Component.register(TreeSelectPopup)

export default TreeSelectPopup
