import Component from '../Component/index'

class Tag extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Tag.defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['size', 'color']
    const { icon, rightIcon, text, type, overflowCount, removable } = this.props
    const number = this.props.number

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

    if (this.props.color && this._isValidColor(this.props.color)) {
      this.setProps({
        attrs: {
          style: {
            backgroundColor: this.props.color,
            borderColor: this.props.borderColor || this.props.color,
            color: this.props.textColor || '#fff',
          },
        },
      })
    }

    this.setProps({
      classes: {
        'nom-tag-pointer': !!this.props.onClick || this.props.removable,
      },
      children: {
        component: 'Flex',
        align: 'center',
        cols: [
          Component.normalizeIconProps(icon),

          {
            children: {
              classes: {
                'nom-tag-content': true,
              },
              children: text,
              attrs: {
                style: { maxWidth: this.props.maxWidth ? `${this.props.maxWidth}px` : null },
              },
            },
          },
          (number || number === 0) && {
            tag: 'span',
            children: number > overflowCount ? `${overflowCount}+` : number,
          },

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
                that.hasOwnProperty('props') &&
                  that.props.onRemove &&
                  that._callHandler(that.props.onRemove, { key: that.props.key })

                event.stopPropagation()
              },
            }),
        ],
      },
    })
  }

  _isValidColor(str) {
    const re = /^#([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i
    return re.test(str)
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
  maxWidth: null,
}

Component.register(Tag)

export default Tag
