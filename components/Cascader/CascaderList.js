import Component from '../Component/index'
import Icon from '../Icon/index'

class CascaderList extends Component {
  constructor(props, ...mixins) {
    const defaults = {}

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.cascaderControl = this.parent.parent.parent.cascaderControl
    this.cascaderControl.optionList = this
  }

  _config() {
    const { popMenu } = this.props
    const value = this.cascaderControl.selectedOption.map((e) => e.key)

    this.setProps({
      children: popMenu
        ? popMenu.map((menu, index) => {
            return this.getMenuItems(menu, value[index])
          })
        : null,
    })
  }

  getMenuItems(menu, currentVal) {
    // const that = this
    if (!menu) {
      return null
    }

    return {
      tag: 'ul',
      classes: {
        'nom-cascader-menu': true,
      },
      children: menu.map((item) => {
        if (item.children) {
          return {
            tag: 'li',
            classes: {
              'nom-cascader-menu-item': true,
              'nom-cascader-menu-item-active': item.key === currentVal,
            },
            onClick: () => {
              this.cascaderControl._itemSelected(item.key)
            },
            children: [
              {
                tag: 'span',
                children: item.label,
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
          classes: {
            'nom-cascader-menu-item': true,
            'nom-cascader-menu-item-active': item.key === currentVal,
          },
          onClick: () => {
            this.cascaderControl._itemSelected(item.key, true)
          },
          children: [
            {
              tag: 'span',
              children: item.label,
            },
          ],
        }
      }),
    }
  }
}

export default CascaderList
