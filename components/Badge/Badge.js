import Component from '../Component/index'

class Badge extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Badge.defaults, props), ...mixins)
  }

  _config() {
    this._propStyleClasses = ['size', 'color']
    const { icon, text, type, overflowCount } = this.props

    const number = this.props.number === 0 ? '0' : this.props.number

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
    } else if (type === 'dot') {
      if (number > 0) {
        this.setProps({
          classes: {
            'p-with-number': true,
          },
        })
      }
    } else if (type === 'tag') {
      this.setProps({
        classes: {
          'u-shape-tag': true,
        },
      })
    }

    this.setProps({
      children: [
        Component.normalizeIconProps(icon),
        { tag: 'span', children: text },
        number && {
          tag: 'span',
          children: number > overflowCount ? `${overflowCount}+` : number,
        },
      ],
    })
  }

  _disable() {
    this.element.setAttribute('disabled', 'disabled')
  }
}

Component.mixin({
  _config: function () {
    if (this.props.badge) {
      this.setProps({
        classes: {
          's-with-badge': true,
        },
      })
    }
  },
  _rendered: function () {
    if (this.props.badge) {
      const badgeProps = {
        type: 'dot',
      }
      if (this.props.badge.text) {
        badgeProps.text = this.props.badge.text
        badgeProps.type = 'tag'
      }
      if (
        this.props.badge.number !== undefined &&
        (this.props.badge.number === 0 || this.props.badge.number === '0')
      ) {
        badgeProps.hidden = true
      }
      badgeProps.number = this.props.badge.number ? this.props.badge.number : null
      badgeProps.overflowCount = this.props.badge.overflowCount
        ? this.props.badge.overflowCount
        : 99
      badgeProps.styles = this.props.badge.styles ? this.props.badge.styles : { color: 'danger' }
      this.props.badge = badgeProps
      this.badge = new Badge(Component.extendProps({ reference: this }, this.props.badge))
    }
  },
})
Badge.defaults = {
  key: null,
  tag: 'span',
  type: 'round',
  text: null,
  icon: null,
  number: null,
  overflowCount: 99,
  size: 'xs',
}
Component.register(Badge)

export default Badge
