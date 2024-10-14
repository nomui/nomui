import Component from '../Component/index'

class FieldLabel extends Component {
  // constructor(props, ...mixins) {
  //   super(props)
  // }

  _created() {
    this.field = this.parent
  }

  _config() {
    const { labelActions } = this.props
    const children = [{
      tag: 'label',
      classes: {
        'nom-label': true,
      },
      children: this.field.props.label,
    }]
    if (labelActions) {
      children.push(labelActions)
      this.setProps({
        classes: {
          'has-actions': true,
        },
      })
    }
    this.setProps({
      children: children,
    })
  }
}

Component.register(FieldLabel)

export default FieldLabel
