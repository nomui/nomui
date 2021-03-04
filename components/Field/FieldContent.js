import Component, { n } from '../Component/index'
import ControlMixin from './ControlMixin'
import ControlAction from './ControlAction'
import ControlBefore from './ControlBefore'
import ControlAfterMixin from './ControlAfterMixin'

class FieldContent extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props, ...mixins) {
    super(props, ...mixins)
  }

  _created() {
    this.field = this.parent
    this.field.content = this
  }

  _config() {
    const { control, controlBefore, controlAfter, controlAction } = this.field.props

    let controlAfterProps = null
    if (controlAfter) {
      controlAfterProps = { component: 'List', classes: { 'nom-control-after': true } }
      if (Array.isArray(controlAfter)) {
        controlAfterProps = Component.extendProps(controlAfterProps, { items: controlAfter })
      } else {
        controlAfterProps = Component.extendProps(controlAfterProps, controlAfter)
      }
    }

    this.setProps({
      children: [
        controlBefore && {
          component: ControlBefore,
          children: { component: 'List', items: controlBefore },
        },
        n(null, Component.extendProps(control, { classes: { 'nom-control': true } }), null, [
          ControlMixin,
        ]),
        controlAfterProps && n(controlAfterProps, [ControlAfterMixin]),
        controlAction && {
          component: ControlAction,
          children: { component: 'List', items: controlAction },
        },
      ],
    })
  }
}

Component.register(FieldContent)

export default FieldContent
