import Component from '../Component/index'

class Toolbar extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'span',
      type: null,
      text: null,
      mask: true,
      icon: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {}

  _config() {}

  _rendered() {}
}

Component.register(Toolbar)

export default Toolbar
