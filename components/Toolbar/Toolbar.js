import Component from '../Component/index'

class Toolbar extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Toolbar.defaults, props), ...mixins)
  }

  _config() {
    const { items, type, gutter, size, visibleItems, inline, itemDefaults } = this.props

    const before = items.slice(0, visibleItems).map((item) => {
      return {
        component: 'Button',
        type,
        size,
        inline,
        ...itemDefaults,
        ...item,
      }
    })
    const dropdowns = {
      component: 'Dropdown',
      rightIcon: 'ellipsis',
      items: items.slice(visibleItems),
      type,
      inline,
      size,
    }

    this.setProps({
      children: {
        component: 'Cols',
        gutter: gutter,
        items: [...before, items.length > visibleItems && dropdowns],
      },
    })
  }
}
Toolbar.defaults = {
  type: 'default',
  visibleItems: 2,
  gutter: 'sm',
  size: null,
  items: [],
  itemDefaults: {},
}
Component.register(Toolbar)

export default Toolbar
