import Component from '../Component/index'

class Dropdown extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'span',
      triggerAction: 'click',
      rightIcon: 'down',
      split: false,
      onClick: null,
      items: [],
      size: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.onClick = this.props.onClick
  }

  _config() {
    const that = this
    const { items, triggerAction, split, text, type, size } = this.props

    const children = [
      split && {
        component: 'Button',
        text: text,
        type: type,
        size: size,
        inline: type === 'link',
        onClick: (args) => {
          that._callHandler(that.onClick)
          args.event.stopPropagation()
        },
      },
      {
        component: 'Button',
        text: split ? null : that.props.text,
        rightIcon: that.props.rightIcon,
        type: type,
        size: size,
        inline: type === 'link',
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
              size: size,
            },
            items: items,
          },
          onClick: (args) => {
            args.sender.hide()
          },
        },
      },
    ]

    this.setProps({
      onClick: null,
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
