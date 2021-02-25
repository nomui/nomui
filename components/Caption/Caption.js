import Component from '../Component/index'
import { } from '../Icon/index'
import { isPlainObject, isString } from '../util/index'

class Caption extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      title: '',
      subtitle: '',
      icon: null,
      image: null,
      titleLevel: 5,
    }

    const tagProp = props.href ? { tag: 'a' } : {}

    super(Component.extendProps(defaults, props, tagProp), ...mixins)
  }

  _config() {
    this._addPropStyle('subtitleWrap')
    const { title, subtitle, icon, image, href, titleLevel } = this.props
    const children = []
    if (isPlainObject(image)) {
      children.push(Component.extendProps({ tag: 'img', classes: { 'nom-caption-image': true } }, image))
    }
    else if (isString(image)) {
      children.push({ tag: 'img', classes: { 'nom-caption-image': true }, attrs: { src: image } })
    }
    else if (icon) {
      children.push(Component.extendProps({ classes: { 'nom-caption-icon': true } }, Component.normalizeIconProps(icon)))
    }
    const titleTag = `h${titleLevel}`
    children.push({
      tag: titleTag,
      classes: {
        'nom-caption-title': true,
      },
      children: [title, subtitle && { tag: 'small', children: subtitle }],
    })
    if (href) {
      this.setProps({ attrs: { href: href } })
    }
    this.setProps({
      children: children,
    })
  }
}

Component.register(Caption)

export default Caption
