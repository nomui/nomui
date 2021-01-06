import Component from '../Component/index'
import List from '../List/index'

class TreeSelectItem extends List {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      items: null,
      // itemSelectable: {
      //   multiple: false,
      //   byClick: true,
      // },
      selected: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { value, title, key, items, selected } = this.props
    // const that = this

    this.setProps({
      // tag: 'div',
      value: value,
      title: title,
      key: key,
      children: items
        ? [
            Component.normalizeIconProps(selected ? 'up' : 'down'),
            {
              tag: 'span',
              children: title,
            },
            {
              tag: 'div',
              classes: {
                'nom-tree-select-sub': true,
              },
              children: items,
            },
          ]
        : [
            Component.normalizeIconProps(selected ? 'up' : 'down'),
            {
              tag: 'span',
              children: title,
            },
          ],
      events: {
        click: function () {},
      },
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(TreeSelectItem)

export default TreeSelectItem
