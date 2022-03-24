import Component from '../Component/index'
import { isNumeric, isString } from '../util/index'

class Ellipsis extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Ellipsis.defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      children: {
        classes: {
          'nom-ellipsis-inner': true,
        },
        attrs: {
          title:
            this.props.showTitle && (isString(this.props.text) || isNumeric(this.props.text))
              ? this.props.text
              : null,
          style: {
            '-webkit-line-clamp': this.props.line,
          },
        },
        children: this.props.text ? this.props.text : this.props.children,
      },
    })
  }
}

Ellipsis.defaults = {
  text: null,
  showTitle: true,
  line: null,
}

Component.register(Ellipsis)

export default Ellipsis
