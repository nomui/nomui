import Component from '../Component/index'

class Dropdown extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'span',
      triggerAction: 'click',
      rightIcon: 'down',
      split: false,
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
    const { items, triggerAction, split, text, type } = this.props

    const children = [
      split && {
        component: 'Button',
        text: text,
        type: type,
        onClick: () => {
          that._callHandler(that.props.event)
        },
      },
      {
        component: 'Button',
        text: split ? null : that.props.text,
        rightIcon: that.props.rightIcon,
        type: type,
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
                  color: 'primary',
                },
              },
            },
            items: items,
          },
        },
      },
    ]

    this.setProps({
      children: children,
      classes: {
        'nom-split-button': this.props.split,
      },
    })

    super._config()
  }

  _rendered() {}
}

Component.register(Dropdown)

export default Dropdown
