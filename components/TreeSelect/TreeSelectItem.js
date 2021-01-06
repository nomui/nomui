import Component from '../Component/index'
import List from '../List/index'

class TreeSelectItem extends List {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'div',
      items: [],
      itemSelectable: {
        multiple: false,
        byClick: true,
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { value, title, key, items } = this.props
    // const that = this

    this.setProps({
      children: [
        {
          tag: 'div',
          value: value,
          title: title,
          key: key,
          children: [
            {
              tag: 'span',
              children: title,
            },
            ...items,
          ],
          events: {
            click: function () {},
          },
        },
      ],
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(TreeSelectItem)

export default TreeSelectItem
