import Component from '../Component/index'
import Panel from '../Panel/index'
import { isPlainObject, isString } from '../util/index'
import ModalContentMixin from './ModalContentMixin'

class ModalDialog extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Panel },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    this.modal = this.parent
    const { content } = this.modal.props
    if (isString(content)) {
      require([content], (props) => {
        props = Component.extendProps(
          {
            component: Panel,
            header: {
              nav: {},
              tools: [
                {
                  component: 'Button',
                  icon: 'close',
                  styles: {
                    border: 'none',
                  },
                  events: {
                    click: function () {
                      this.$modal.close()
                    },
                  },
                },
              ],
            },
          },
          props,
        )
        this.update({
          children: { props: props, mixins: [ModalContentMixin] },
        })
      })
    }
  }

  _config() {
    const { content } = this.modal.props
    if (isPlainObject(content)) {
      this.setProps({
        children: { props: content, mixins: [ModalContentMixin] },
      })
    }
  }
}

Component.register(ModalDialog)

export default ModalDialog
