import Component from '../Component/index'

class Divider extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Divider.defaults, props), ...mixins)
  }

  _config() {
    // this._propStyleClasses = ['type','orientation','dashed','plain']
    const { orientation, classes, dashed, plain } = this.props

    let { children = undefined } = this.props
    const hasChildren = !!children
    const orientationPrefix = orientation.length > 0 ? `-${orientation}` : orientation

    children = children && {
      tag: 'span',
      classes: {
        'nom-divider-inner-text': true,
      },
      children,
    }
    this.setProps({
      classes: {
        [`nom-divider-with-text`]: hasChildren,
        [`nom-divider-with-text${orientationPrefix}`]: hasChildren,
        [`nom-divider-dashed`]: !!dashed,
        [`nom-divider-plain`]: !!plain,
        ...classes,
      },
      attrs: {
        role: 'separator',
      },
      children,
    })
  }
}
Divider.defaults = {
  type: 'horizontal',
  orientation: 'center',
  // dashed:true,
  // plan:true,
  // children:
}
Component.register(Divider)

export default Divider
