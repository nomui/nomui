import Component from '../Component/index'

class Tag extends Component {
  constructor(props, ...mixins) {
    const defaults = {
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

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['size', 'color']
    const { icon, text, type, number, overflowCount, removable } = this.props

    const that = this
    if (icon) {
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
      children: [
        Component.normalizeIconProps(icon),
        text && { tag: 'span', children: text },
        number && { tag: 'span', children: number > overflowCount ? `${overflowCount}+` : number },
        removable &&
          Component.normalizeIconProps({
            type: 'times',
            classes: {
              'nom-tag-remove': true,
              'nom-tag-remove-basic': !that.props.styles,
            },
            onClick: function () {
              that.props.removable(that.props.key)
            },
          }),
      ],
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.register(Tag)

export default Tag
