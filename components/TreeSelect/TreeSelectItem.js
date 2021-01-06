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
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { value, title, key, items } = this.props
    // const that = this

    this.setProps({
      // tag: 'div',
      value: value,
      title: title,
      key: key,
      children: items
        ? [
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
