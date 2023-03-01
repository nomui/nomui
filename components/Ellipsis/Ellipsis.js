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
          'nom-ellipsis-nowrap': this.props.line === null || this.props.line === 1,
        },
        attrs: {
          title:
            this.props.showTitle && (isString(this.props.text) || isNumeric(this.props.text))
              ? this.props.text
              : null,
          style: {
            '-webkit-line-clamp': this.props.line,
            display: this.props.line > 1 ? '-webkit-box' : '',
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
