import Component from '../Component/index'

class Th extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'th',
      column: {},
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.tr = this.parent
    this.table = this.tr.table
  }

  _config() {
    const children = this.props.column.header || this.props.column.title

    this.setProps({
      children,
    })
  }
}

Component.register(Th)

export default Th
