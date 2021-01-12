import Component from '../Component/index'

class FieldLabel extends Component {
  // constructor(props, ...mixins) {
  //   super(props)
  // }

  _created() {
    this.field = this.parent
  }

  _config() {
    this.setProps({
      children: {
        tag: 'label',
        classes: {
          'nom-label': true,
        },
        children: this.field.props.label,
      },
    })
  }
}

Component.register(FieldLabel)

export default FieldLabel
