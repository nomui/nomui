import Component from '../Component/index'
import { isNumeric, isString } from '../util/index'

class Ellipsis extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      text: null,
      showTitle: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
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
        },
        children: this.props.text ? this.props.text : this.props.children,
      },
    })
  }
}

Component.register(Ellipsis)

export default Ellipsis
