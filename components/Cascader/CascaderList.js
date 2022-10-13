import Component from '../Component/index'
import Icon from '../Icon/index'
import { isNumeric } from '../util/index'

class CascaderList extends Component {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this._timer = null
    this._clickedKey = null
    this._clickTime = null
    this.cascaderControl = this.parent.parent.parent.cascaderControl
    this.cascaderControl.optionList = this
  }

  _remove() {
    this._timer && clearTimeout(this._timer)
  }

  _config() {
    const { popMenu } = this.props
    const value = this.cascaderControl.selectedOption.map((e) => e.key)

    this.selected = []

    this.setProps({
      children: popMenu
        ? popMenu.map((menu, index) => {
            return this.getMenuItems(menu, value[index])
          })
        : null,
    })

    super._config()
  }

  // 处理非叶子节点点击事件
  _handleNoLeafClick(key) {
    const cascaderList = this
    const changeOnSelect = this.cascaderControl.props.changeOnSelect

    if (changeOnSelect) {
      const triggerTime = Date.now()

      let interval = Number.MAX_SAFE_INTEGER
      if (key === this._clickedKey && isNumeric(this._clickTime)) {
        interval = triggerTime - this._clickTime
      }

      this._clickTime = triggerTime
      this._clickedKey = key

      if (interval < 300) {
        // 双击事件
        cascaderList.cascaderControl._itemSelected(key, true)
        this._timer && clearTimeout(this._timer)
      } else {
        // 单击事件
        this._timer = setTimeout(() => {
          cascaderList.cascaderControl._itemSelected(key, true, false)
        }, 300)
      }
    } else {
      // 单击
      cascaderList.cascaderControl._itemSelected(key)
    }
  }

  getMenuItems(menu, currentVal) {
    const cascaderList = this
    if (!menu) {
      return null
    }

    return {
      tag: 'ul',
      classes: {
        'nom-cascader-menu': true,
      },
      attrs: {
        style: {
          width: `${this.cascaderControl.props.width}px`,
          height: `${this.cascaderControl.props.height}px`,
        },
      },
      children: menu.map((item) => {
        if (item.children) {
          return {
            tag: 'li',
            _rendered() {
              item.key === currentVal && cascaderList.selected.push(this)
            },
            classes: {
              'nom-cascader-menu-item': true,
              'nom-cascader-menu-item-active': item.key === currentVal,
              'nom-cascader-menu-item-disabled': item.disabled === true,
            },
            onClick: () => {
              item.disabled !== true && cascaderList._handleNoLeafClick(item.key)
            },
            children: [
              {
                tag: 'span',
                children: {
                  component: 'Ellipsis',
                  text: item.label,
                },
              },
              {
                component: Icon,
                type: 'right',
                classes: {
                  'nom-cascader-menu-item-expand-icon': true,
                },
              },
            ],
          }
        }

        return {
          tag: 'li',
          _rendered() {
            item.key === currentVal && cascaderList.selected.push(this)
          },
          classes: {
            'nom-cascader-menu-item': true,
            'nom-cascader-menu-item-active': item.key === currentVal,
          },
          onClick: () => {
            cascaderList.cascaderControl._itemSelected(item.key, true)
          },
          children: [
            {
              tag: 'span',
              children: {
                component: 'Ellipsis',
                text: item.label,
              },
            },
          ],
        }
      }),
    }
  }
}

export default CascaderList
