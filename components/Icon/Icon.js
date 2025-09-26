import Component from '../Component/index'
import { isPlainObject, isString } from '../util/index'

class Icon extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Icon.defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      // eslint-disable-next-line prefer-template
      children: Icon.svgs[this.props.type] ? '#' + Icon.svgs[this.props.type].svg : null,
    })
  }
}
Icon.defaults = {
  type: '',
  tag: 'i',
}
Icon.svgs = {}

Icon.add = function (type, svg, cat) {
  Icon.svgs[type] = { type, svg, cat }
}

Component.normalizeIconProps = function (props) {
  if (props === null || props === undefined) {
    return null
  }
  let iconProps = {}
  if (isString(props)) {
    iconProps.type = props
  } else if (isPlainObject(props)) {
    iconProps = props
  } else {
    return null
  }
  if (!iconProps.component) {
    iconProps.component = Icon
  }

  return iconProps
}

Component.register(Icon)

export default Icon
