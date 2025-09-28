import Component, { n } from '../Component/index'
import Panel from '../Panel/index'
import { isFunction, isPlainObject, isString } from '../util/index'
import ModalContentMixin from './ModalContentMixin'

class ModalDialog extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      children: { component: Panel, uistyle: 'plain' },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    const modal = (this.modal = this.parent)
    const { content } = this.modal.props
    if (isString(content)) {
      this.modal.element && this.modal.element.setAttribute('data-url', content)
      require([content], (contentConfig) => {
        let props = contentConfig
        if (isFunction(props)) {
          const pNames = this.getParameterNames(props)
          if (pNames.length && pNames[0] === '{') {
            const args = modal.props.args || {}
            props = contentConfig({ modal: modal, args: args })
            if (props.then) {
              props.then((result) => {
                props = result
                props = Component.extendProps(this._getDefaultPanelContent(props), props)
                if (isFunction(props.footer)) {
                  props.footer = props.footer.call(this.modal, this.modal)
                }
                this.update({
                  children: n(null, props, null, [ModalContentMixin]),
                })
              })
            } else {
              props = Component.extendProps(this._getDefaultPanelContent(props), props)
              if (isFunction(props.footer)) {
                props.footer = props.footer.call(this.modal, this.modal)
              }
              this.update({
                children: n(null, props, null, [ModalContentMixin]),
              })
            }
          } else {
            props = contentConfig.call(this, modal)
            props = Component.extendProps(this._getDefaultPanelContent(props), props)
            if (isFunction(props.footer)) {
              props.footer = props.footer.call(this.modal, this.modal)
            }
            this.update({
              children: n(null, props, null, [ModalContentMixin]),
            })
          }
        }
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
      okButton: contentProps.okButton,
    })

    const {
      okText,
      cancelText,
      fit,
      okButton = {},
      cancelButton = {},
      size,
      adaptToFit,
    } = modal.props
    return {
      component: Panel,
      fit: fit || size === 'full' || adaptToFit,

      uistyle: 'plain',
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
            okButton !== false &&
              Component.extendProps(
                {
                  component: 'Button',
                  type: 'primary',
                  text: okText,
                  onClick: () => {
                    modal._handleOk()
                  },
                },
                okButton,
              ),
            cancelButton !== false &&
              Component.extendProps(
                {
                  component: 'Button',
                  text: cancelText,
                  onClick: () => {
                    modal._handleCancel()
                  },
                },
                cancelButton,
              ),
          ],
        },
      },
    }
  }

  _config() {
    const { content } = this.modal.props
    if (isPlainObject(content)) {
      const extendContent = {}
      if (isFunction(content.footer)) {
        extendContent.footer = content.footer.call(this.modal, this.modal)
      }
      const contentProps = Component.extendProps(
        this._getDefaultPanelContent(content),
        content,
        extendContent,
      )

      this.setProps({
        children: n(null, contentProps, null, [ModalContentMixin]),
      })
    }
    this.setProps({
      classes: {
        'nom-modal-dialog-centered': this.modal.props.centered,
      },
    })
  }

  getParameterNames(fn) {
    const code = fn.toString()
    const result = code.slice(code.indexOf('(') + 1, code.indexOf(')')).match(/([^\s,]+)/g)
    return result === null ? [] : result
  }
}

Component.register(ModalDialog)

export default ModalDialog
