import Component from '../Component/index'
import { defaultSortableOndrop, extend, isFunction } from '../util/index'
import scrollIntoView from '../util/scrollIntoView'
import MenuItem from './MenuItem'
import MenuItemWrapper from './MenuItemWrapper'

class Menu extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Menu.defaults, props), ...mixins)
  }

  _created() {
    this.itemRefs = []
    this.selectedItem = null
    this.selectedItemKey = null
    this.expandedRoot = null
    this.newOrderItems = []
  }

  _config() {
    this._addPropStyle('direction')
    this._addPropStyle('fit')

    if (this.props.direction !== 'vertical') {
      this.setProps({
        compact: false,
      })
    }

    const that = this
    const children = this.props.items.map(function (item) {
      if (!item) {
        return
      }
      if (
        (item.type && item.type.toLowerCase() === 'divider') ||
        (item.component && item.component === 'Divider')
      ) {
        return {
          tag: 'li',
          classes: {
            'nom-menu-divider': true,
            'nom-menu-divider-dashed': item.dashed === true,
          },
        }
      }
      return {
        component: MenuItemWrapper,
        animate: that.props.animate,
        item: Component.extendProps({}, that.props.itemDefaults, item),
      }
    })



    this.setProps({
      classes: {
        'nom-menu-compact': this.props.compact,
        'nom-menu-force-inline': !!this.props.onResize
      },
      children: children,
    })
  }

  getInvisibleItems() {
    const el = this.element
    const arr = []
    const ulRect = el.getBoundingClientRect()
    const liElements = el.children
    for (const li of liElements) {
      const liRect = li.getBoundingClientRect()
      const isVisible = (
        liRect.left >= ulRect.left &&
        liRect.right <= ulRect.right
      )

      if (!isVisible) {
        const k = li.component.props.item[this.props.keyField]
        arr.push(this.props.items.filter(x => {
          return x[this.props.keyField] === k
        })[0])
      }
    }

    return arr
  }

  getItem(param) {
    let retItem = null

    if (param instanceof Component) {
      return param
    }

    if (isFunction(param)) {
      for (const key in this.itemRefs) {
        if (this.itemRefs.hasOwnProperty(key)) {
          if (param.call(this.itemRefs[key]) === true) {
            retItem = this.itemRefs[key]
            break
          }
        }
      }
    } else {
      return this.itemRefs[param] || null
    }

    return retItem
  }

  selectItem(param, selectOption) {
    const item = this.getItem(param)
    if (item === null || item === undefined) {
      return false
    }
    item.select(selectOption)
    selectOption && selectOption.scrollIntoView && this.scrollTo(item)
    return item
  }

  selectToItem(param) {
    if (this.props.compact) {
      const target = this.getRootItem(param)
      if (target === null) {
        console.warn(`Could not find the item with specific key.`)
        return
      }
      this.getItem(target).partSelect()

      this.scrollTo(target)
      this.expandedRoot = this.getItem(target).wrapper
      this.selectedItemKey = param
    } else {
      this.expandToItem(param)
      this.selectItem(param)
      this.scrollTo(param)
    }

    if (this.props.direction !== 'vertical' && isFunction(this.props.onResize)) {
      // 延迟执行，因为滚动条还没滚动完，获取不到正确的数据
      setTimeout(() => {
        this.props && this._callHandler(this.props.onResize, { items: this.getInvisibleItems() })
      }, 500)
    }
  }

  getRootItem(param) {
    const arr = this.props.items.filter((n) => {
      return JSON.stringify(n).includes(`"${param}"`)
    })

    if (arr.length) {
      const rootItem = arr[0][this.props.keyField]
      return this.itemRefs[rootItem]
    }
    return null
  }

  unselectItem(param, unselectOption) {
    unselectOption = extend(
      {
        triggerUnselect: true,
        triggerSelectionChange: true,
      },
      unselectOption,
    )
    const item = this.getItem(param)
    if (item === null) {
      return false
    }
    return item.unselect(unselectOption)
  }

  clearSelection() {
    const item = this.getSelectedItem()
    if (item) {
      this.unselectItem(item)
    }
  }

  getSelectedItem() {
    return this.selectedItem
  }

  expandToItem(param) {
    const item = this.getItem(param)
    if (item !== null) {
      let p = item.parentItem
      while (p) {
        p.expand()
        p = p.parentItem
      }
    }
  }

  scrollTo(
    param,
    scrollToOptions = {
      behavior: 'smooth',
      scrollMode: 'if-needed',
    },
  ) {
    const item = this.getItem(param)
    if (item && item.wrapper) {
      scrollIntoView(item.wrapper.element, scrollToOptions)
    }
  }

  scrollToSelected() {
    if (this.selectedItem) {
      this.scrollTo(this.selectedItem)
    }
  }

  _processNewOrder(params) {
    const { items } = this.props
    this.newOrderItems = this._rearrangeArray(items, params)
  }

  getRootItemKeys() {
    const items = this.newOrderItems.length ? this.newOrderItems : this.props.items
    return items.map(n => {
      return n[this.props.keyField]
    })
  }

  _rearrangeArray(arr, { oldIndex, newIndex }) {
    const [movedItem] = arr.splice(oldIndex, 1)
    arr.splice(newIndex, 0, movedItem)

    return arr
  }

  _rendered() {
    const me = this
    const { sortable, direction, onResize } = this.props

    if (direction !== 'vertical' && isFunction(onResize)) {
      this._callHandler(this.props.onResize, { items: this.getInvisibleItems() })
      this.resizeObserver = new ResizeObserver(() => {
        this.props && this._callHandler(this.props.onResize, { items: this.getInvisibleItems() })
      })
      this.resizeObserver.observe(this.element)
    }

    this.scrollToSelected()
    if (sortable) {
      defaultSortableOndrop()
      new nomui.utils.Sortable(this.element, {
        animation: 150,
        fallbackOnBody: true,
        swapThreshold: 0.65,
        onEnd: function (evt) {
          const data = { oldIndex: evt.oldIndex, newIndex: evt.newIndex }
          me._processNewOrder(data)
          if (sortable.onEnd) {
            me._callHandler(sortable.onEnd, { rootItemKeys: me.getRootItemKeys() })
          }
        },
      })
    }
  }

  _remove() {
    this.resizeObserver && this.resizeObserver.unobserve(this.element)
  }

  _onItemSelected(args) {

    this._callHandler(this.props.onItemSelected, args)
    if (this.props && !!this.props.onResize && this.props.direction !== 'vertical') {
      this.scrollToSelected()
    }

  }

}
Menu.defaults = {
  tag: 'ul',
  items: [],
  itemDefaults: {
    component: MenuItem,
  },
  itemSelectable: {
    onlyleaf: false,
    byClick: false,
  },
  itemExpandable: {
    expandSingle: true,
    initExpandLevel: 0,
  },
  compact: false,
  indent: 1.5,
  direction: 'vertical',
  keyField: 'key',
  sortable: false,
  onResize: false
}
Component.register(Menu)

export default Menu
