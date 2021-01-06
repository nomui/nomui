import Component from '../Component/index'
import List from '../List/index'

class TreeSelectItem extends List {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'li',
      items: null,
      // itemSelectable: {
      //   multiple: false,
      //   byClick: true,
      // },
      selected: false,
      collapsed: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { value, title, key, items, selected, collapsed } = this.props
    // const that = this

    this.setProps({
      // tag:'ul',
      children: {
        value: value,
        title: title,
        key: key,
        children: items
          ? [
              Component.normalizeIconProps(collapsed ? 'up' : 'right'),
              {
                tag: 'span',
                children: [
                  Component.normalizeIconProps(selected ? 'blank-square' : 'checked-square'),
                  {
                    tag: 'span',
                    children: title,
                  },
                ],
              },
              {
                tag: 'ul',
                classes: {
                  'nom-tree-select-sub': true,
                },
                children: items,
              },
            ]
          : {
              tag: 'li',
              children: {
                tag: 'span',
                children: [
                  Component.normalizeIconProps(selected ? 'blank-square' : 'checked-square'),
                  {
                    tag: 'span',
                    children: title,
                  },
                ],
              },
            },
        events: {
          click: function () {},
        },
      },
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(TreeSelectItem)

export default TreeSelectItem
