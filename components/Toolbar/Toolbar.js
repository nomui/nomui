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
    const arr = [...before]
    if (items.length > visibleItems) {
      arr.push(dropdowns)
    }
    this.setProps({
      children: {
        component: 'Cols',
        gutter: gutter,
        items: arr,
      },
      onClick: ({ event }) => {
        this.props.stopPropagation && event.stopPropagation()
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
  stopPropagation: true,
}
Component.register(Toolbar)

export default Toolbar
