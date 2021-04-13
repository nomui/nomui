import Button from '../Button/index'
import Component from '../Component/index'

class Dropdown extends Button {
  constructor(props, ...mixins) {
    const defaults = {
      triggerAction: 'click',
      rightIcon: 'down',
      items: [
        {
          text: '导出Word',
          onClick: () => {},
        },
        {
          text: '导出Word',
          onClick: () => {},
        },
        {
          text: '导出Word',
          onClick: () => {},
        },
      ],
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    const { items, triggerAction } = this.props

    this.setProps({
      popup: {
        triggerAction: triggerAction,
        classes: {
          'nom-dropdown-popup': true,
        },
        ref: (c) => {
          that.popup = c
        },
        children: {
          component: 'Menu',
          itemDefaults: {
            styles: {
              hover: {
                color: 'lighten',
              },
            },
          },
          items: items,
        },
      },
    })

    super._config()
  }

  _rendered() {}
}

Component.register(Dropdown)

export default Dropdown
