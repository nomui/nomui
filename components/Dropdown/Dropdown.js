import Component from '../Component/index'

class Dropdown extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Dropdown.defaults, props), ...mixins)
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
            'nom-dropdown-animate-top-show': true,
          },
          ref: (c) => {
            that.popup = c
          },
          children: {
            component: 'Menu',
            itemDefaults: {
              size: size,
            },
            items: items,
          },
          onClick: (args) => {
            that.popup.addClass('nom-dropdown-animate-top-hide')
            setTimeout(() => {
              args.sender.hide()
              that.popup.removeClass('nom-dropdown-animate-top-hide')
            }, 120)
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

  _show() {}
}
Dropdown.defaults = {
  tag: 'span',
  triggerAction: 'click',
  rightIcon: 'down',
  split: false,
  onClick: null,
  items: [],
  size: null,
}
Component.register(Dropdown)

export default Dropdown
