import Component from '../Component/index'

class Toolbar extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Toolbar.defaults, props), ...mixins)
  }

  _config() {
    const {
      items,
      type,
      gutter,
      size,
      visibleItems,
      inline,
      itemDefaults,
      menuClasses,
      forceVisible,
      dropdownProps,
    } = this.props

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
      itemDefaults,
      type,
      inline,
      size,
      menuClasses,
      ...dropdownProps,
    }
    const arr = [...before]
    if (items.length > visibleItems || forceVisible) {
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
  menuClasses: null,
  dropdownProps: {},
}
Component.register(Toolbar)

export default Toolbar
