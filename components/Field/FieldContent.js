import Component, { n } from '../Component/index'
import ControlMixin from './ControlMixin'
import ControlActionMixin from './ControlActionMixin'
import ControlBeforeMixin from './ControlBeforeMixin'
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

    let controlBeforeProps = null
    if (controlBefore) {
      controlBeforeProps = { component: 'List', classes: { 'nom-control-before': true } }
      if (Array.isArray(controlAfter)) {
        controlBeforeProps = Component.extendProps(controlBeforeProps, { items: controlBefore })
      } else {
        controlBeforeProps = Component.extendProps(controlBeforeProps, controlBefore)
      }
    }

    let controlActionProps = null
    if (controlAction) {
      controlActionProps = {
        component: 'List',
        gutter: 'sm',
        classes: { 'nom-control-action': true },
      }
      if (Array.isArray(controlAction)) {
        controlActionProps = Component.extendProps(controlActionProps, { items: controlAction })
      } else {
        controlActionProps = Component.extendProps(controlActionProps, controlAction)
      }
    }

    this.setProps({
      children: [
        controlBeforeProps && n(controlBeforeProps, [ControlBeforeMixin]),
        n(null, Component.extendProps(control, { classes: { 'nom-control': true } }), null, [
          ControlMixin,
        ]),
        controlAfterProps && n(controlAfterProps, [ControlAfterMixin]),
        controlActionProps && n(controlActionProps, [ControlActionMixin]),
      ],
    })
  }
}

Component.register(FieldContent)

export default FieldContent
