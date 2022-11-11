import Component from '../Component/index'

class Tag extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Tag.defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['size', 'color']
    const { icon, rightIcon, text, type, overflowCount, removable } = this.props
    const number = this.props.number === 0 ? '0' : this.props.number

    const that = this
    if (icon || rightIcon) {
      this.setProps({
        classes: {
          'p-with-icon': true,
        },
      })
    }

    if (type === 'round') {
      this.setProps({
        classes: {
          'u-shape-round': true,
        },
      })
    }

    this.setProps({
      classes: {
        'nom-tag-pointer': !!this.props.onClick || this.props.removable,
      },
      children: [
        Component.normalizeIconProps(icon),

        { tag: 'span', children: text },
        number && { tag: 'span', children: number > overflowCount ? `${overflowCount}+` : number },

        Component.normalizeIconProps(rightIcon),
        removable &&
          Component.normalizeIconProps({
            type: 'times',
            classes: {
              'nom-tag-remove': true,
              'nom-tag-remove-basic': !that.props.styles,
            },
            onClick: function ({ event }) {
              nomui.utils.isFunction(that.props.removable) && that.props.removable(that.props.key)
              that.props.onRemove && that._callHandler(that.props.onRemove, { key: that.props.key })

              event.stopPropagation()
            },
          }),
      ],
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Tag.defaults = {
  key: null,
  tag: 'span',
  type: 'square',
  color: null,
  text: null,
  icon: null,
  number: null,
  overflowCount: 99,
  removable: false,
  size: 'sm',
}

Component.register(Tag)

export default Tag
