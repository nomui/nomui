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
    const modal = (this.modal = this.parent)
    const { content } = this.modal.props
    if (isString(content)) {
      require([content], (contentConfig) => {
        let props = contentConfig
        if (isFunction(props)) {
          props = contentConfig.call(this, modal)
        }
        props = Component.extendProps(this._getDefaultPanelContent(props), props)
        this.update({
          children: n(null, props, null, [ModalContentMixin]),
        })
      })
    }
  }

  _getDefaultPanelContent(contentProps) {
    const modal = this.modal
    modal.setProps({
      okText: contentProps.okText,
      onOk: contentProps.onOk,
      cancelText: contentProps.cancelText,
      onCancel: contentProps.onCancel,
    })

    const { okText, cancelText } = modal.props

    return {
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
                color: 'primary',
              },
              text: okText,
              onClick: () => {
                modal._handleOk()
              },
            },
            {
              component: 'Button',
              text: cancelText,
              onClick: () => {
                modal._handleCancel()
              },
            },
          ],
        },
      },
    }
  }

  _config() {
    const { content } = this.modal.props
    if (isPlainObject(content)) {
      const contentProps = Component.extendProps(this._getDefaultPanelContent(content), content)
      this.setProps({
        children: n(null, contentProps, null, [ModalContentMixin]),
      })
    }
  }
}

Component.register(ModalDialog)

export default ModalDialog
