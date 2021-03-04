import Component, { n } from '../Component/index'
import ControlMixin from './ControlMixin'
import ControlAction from './ControlAction'
import ControlBefore from './ControlBefore'
import ControlAfter from './ControlAfter'

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
    this.setProps({
      children: [
        controlBefore && {
          component: ControlBefore,
          children: { component: 'List', items: controlBefore },
        },
        n(null, Component.extendProps(control, { classes: { 'nom-control': true } }), null, [
          ControlMixin,
        ]),
        controlAfter && {
          component: ControlAfter,
          children: { component: 'List', items: controlAfter },
        },
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
