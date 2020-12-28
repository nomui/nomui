import Component from '../Component/index'
import { isFunction } from '../util/index'

class Td extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'td',
      data: null,
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    let children = this.props.data
    if (isFunction(this.props.column.render)) {
      children = this.props.column.render.call(this, this.props.data, this.props.record)
    }
    this.setProps({
      children: children,
    })
  }
}

Component.register(Td)

export default Td
