import Component from '../Component/index'

class VirtualList extends Component {
  constructor(props, ...mixins) {
    const defaults = {}
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.replyObj = {}
  }

  _config() {
    this.setProps({
      children: '123',
    })
  }
}

Component.register(VirtualList)

export default VirtualList
