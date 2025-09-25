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

    this.setProps({
      itemDefaults: {
        component: MenuItem,
        indicatorIcon: this.props.indicatorIcon,
      },
    })

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
        'nom-menu-force-inline': !!this.props.onResize,
      },
      children: children,
    })
  }

  getInvisibleItems() {
    const el = this.element
    const arr = []
    const ulRect = el.getBoundingClientRect()
    const liElements = el.children
    const tolerance = 6 // 容差像素，可按需调整

    for (const li of liElements) {
      const liRect = li.getBoundingClientRect()
      const isVisible =
        liRect.left >= ulRect.left - tolerance && liRect.right <= ulRect.right + tolerance

      if (!isVisible) {
        const k = li.component.props.item[this.props.keyField]
        arr.push(this.props.items.find((x) => x[this.props.keyField] === k))
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

  getRootItemKeys() {
    const items = this.newOrderItems.length ? this.newOrderItems : this.props.items
    return items.map((n) => {
      return n[this.props.keyField]
    })
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

      const nestedSortables = [].slice.call(this.element.querySelectorAll('.nom-menu-sub'))
      nestedSortables.unshift(this.element)
      for (let i = 0; i < nestedSortables.length; i++) {
        new nomui.utils.Sortable(nestedSortables[i], {
          group: {
            name: this.key, // 保留组名用于识别
            pull: 'clone', // 或 false 禁止从其他组拉取
            put: false, // 禁止放入其他组
          },
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65,
          handle: '.nom-menu-item',
          onEnd: function (evt) {
            if (evt.from !== evt.to) return
            // 同步DOM顺序到数据

            if (me.props.direction === 'vertical') {
              me._syncItemsFromDOM()
            } else {
              const data = { oldIndex: evt.oldIndex, newIndex: evt.newIndex }
              me._processNewOrder(data)
            }
            const itemData = evt.item.component.props.item
            delete itemData.component
            delete itemData.keyField
            if (me.props.sortable.onEnd) {
              me._callHandler(me.props.sortable.onEnd, {
                rootItemKeys: me.getRootItemKeys(),
                items: me.props.items,
                currentItemData: itemData,
              })
            }
          },
        })
      }
    }
  }

  _syncItemsFromDOM() {
    // 1. 从根菜单元素开始遍历
    const rootElement = this.element
    const newItems = this._buildItemsFromDOM(rootElement)

    // 2. 更新props
    this.props.items = newItems
  }

  /**
   * 递归构建菜单项数据
   */
  _buildItemsFromDOM(parentElement) {
    const items = []

    // 遍历所有直接子元素（包括分隔线）
    const childElements = parentElement.children

    for (const element of childElements) {
      // 处理分隔线
      if (element.classList.contains('nom-menu-divider')) {
        items.push({ type: 'divider' })
        continue
      }

      // 处理普通菜单项
      if (element.classList.contains('nom-menu-item-wrapper')) {
        // 获取菜单项数据
        const itemWrapper = element.component
        const itemData = itemWrapper ? { ...itemWrapper.props.item } : {}

        // 移除不需要的字段
        delete itemData.component
        delete itemData.keyField

        // 处理子菜单
        const subMenu = element.querySelector(':scope > ul.nom-menu-sub')
        if (subMenu) {
          // 使用与原始数据相同的字段名(items)
          itemData.items = this._buildItemsFromDOM(subMenu)
        }

        items.push(itemData)
      }
    }

    return items
  }

  _processNewOrder(params) {
    const { items } = this.props
    this.newOrderItems = this._rearrangeArray(items, params)
  }

  _rearrangeArray(arr, { oldIndex, newIndex }) {
    const [movedItem] = arr.splice(oldIndex, 1)
    arr.splice(newIndex, 0, movedItem)

    return arr
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

  indicatorIcon: {
    right: 'right',
    down: 'down',
    up: 'up',
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
  onResize: false,
  popupWidth: 160,
}
Component.register(Menu)

export default Menu
