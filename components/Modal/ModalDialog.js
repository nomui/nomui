import Component, { n } from '../Component/index'
import Panel from '../Panel/index'
import { isFunction, isPlainObject, isString } from '../util/index'
import ModalContentMixin from './ModalContentMixin'

class ModalDialog extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Panel },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const modal = this.modal = this.parent
    const { content, okText: modalOkText, onOk: modalOnOk, cancelText: modalCancelText, onCancel: modalOnCancel } = this.modal.props
    if (isString(content)) {
      require([content], (contentConfig) => {
        let props = contentConfig
        if (isFunction(props)) {
          props = contentConfig.call(this, modal)
        }
        const { okText, onOk, cancelText, onCancel } = props
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
                  onClick: function () {
                    modal.close()
                  },
                },
              ],
            },
            footer: {
              children: {
                component: 'Cols',
                items: [
                  {
                    component: 'Button',
                    styles: {
                      color: 'primary'
                    },
                    text: okText || modalOkText || '确 定',
                    onClick: onOk || modalOnOk || (() => {
                      modal.close()
                    })
                  },
                  {
                    component: 'Button',
                    text: cancelText || modalCancelText || '取 消',
                    onClick: onCancel || modalOnCancel || (() => {
                      modal.close()
                    })
                  }
                ]
              }
            }
          },
          props,
        )
        this.update({
          children: n(null, props, null, [ModalContentMixin]),
        })
      })
    }
  }

  _config() {
    const { content } = this.modal.props
    if (isPlainObject(content)) {
      this.setProps({
        children: n(null, content, null, [ModalContentMixin]),
      })
    }
  }


}

Component.register(ModalDialog)

export default ModalDialog
