import Component from '../Component/index'
import { extend } from '../util/index'

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
      itemDefaults: null,
      itemRender: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.onClick = this.props.onClick
  }

  _config() {
    const that = this
    const { items, triggerAction, split, text, type, size, itemDefaults, itemRender } = this.props
    const _itemDefaults = extend(
      {
        styles: {
          hover: {
            color: 'primary',
          },
        },
        size: size,
      },
      itemDefaults,
    )

    const children = [
      split && {
        component: 'Button',
        text: text,
        type: type,
        size: size,
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
            itemDefaults: _itemDefaults,
            itemRender: itemRender,
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
