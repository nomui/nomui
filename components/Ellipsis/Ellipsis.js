import Component from '../Component/index'

class Ellipsis extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      text: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      children: {
        classes: {
          'nom-ellipsis-inner': true,
        },
        children: this.props.text ? this.props.text : this.props.children,
      },
    })
  }
}

Component.mixin({
  _config: function () {
    if (this.props.ellipsis) {
      this.setProps({
        classes: {
          'nom-ellipsis-block': true,
        },
      })
    }
  },
})

Component.register(Ellipsis)

export default Ellipsis
