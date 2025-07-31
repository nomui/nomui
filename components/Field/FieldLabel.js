import Component from '../Component/index'

class FieldLabel extends Component {
  // constructor(props, ...mixins) {
  //   super(props)
  // }

  _created() {
    this.field = this.parent
  }

  _config() {
    this._addPropStyle('uistyle')

    const { labelExpandable, labelActions } = this.props
    const children = [
      {
        tag: 'label',
        classes: {
          'nom-label': true,
        },
        children: this.field.props.label,
      },
    ]

    if (labelActions) {
      children.push(labelActions)
      this.setProps({
        classes: {
          'has-actions': true,
        },
      })
    }

    if (labelExpandable) {
      children.push({
        component: 'Button',
        ref: (c) => {
          this.field.expandBtnRef = c
        },
        type: 'text',
        size: 'small',
        expanded: this.field.props.labelExpanded,
        expandable: {
          byClick: true,
          target: () => {
            return this.field.content
          },
          expandedProps: {
            rightIcon: 'up',
          },
          collapsedProps: {
            rightIcon: 'down',
          },
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
