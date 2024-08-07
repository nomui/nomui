import Component from '../Component/index'
import Popup from '../Popup/index'
import { isString } from '../util/index'

class Popconfirm extends Popup {
  constructor(props, ...mixins) {
    super(Component.extendProps(Popconfirm.defaults, props), ...mixins)
  }

  _config() {
    const that = this

    const { content, okText, cancelText, icon } = this.props
    this.setProps({
      children: {
        attrs: {
          style: {
            'max-width': '350px',
            padding: '15px',
          },
        },
        children: {
          component: 'Rows',
          items: [
            {
              component: 'Cols',
              items: [
                {
                  component: 'Icon',
                  type: icon,
                  classes: {
                    'nom-popconfirm-icon': true
                  },
                },
                { children: isString(content) ? content : content() },
              ],
            },
            {
              component: 'Cols',
              justify: 'end',
              gutter: 'sm',
              items: [
                {
                  component: 'Button',
                  type: 'primary',

                  text: okText,
                  onClick: () => {
                    that._handleOk()
                  },
                },
                {
                  component: 'Button',
                  text: cancelText,

                  onClick: () => {
                    that._handleCancel()
                  },
                },
              ],
            },
          ],
        },
      },
    })
    super._config()
  }

  _handleOk() {
    this._callHandler(this.props.onConfirm)
    this.props && this.props.animate && this.animateHide()
    this.props && !this.props.animate && this.hide()
  }

  _handleCancel() {
    this.props && this.props.animate && this.animateHide()
    this.props && !this.props.animate && this.hide()
  }

  animateHide() {
    if (!this.element) return false
    this.addClass('nom-layer-animate-hide')
    setTimeout(() => {
      if (!this.element) return false
      this.hide()
    }, 90)
  }
}
Popconfirm.defaults = {
  triggerAction: 'click',
  closeOnClickOutside: false,
  content: null,
  onConfirm: null,
  okText: '是',
  cancelText: '否',
  icon: 'info-circle-fill',
  align: 'top left',
}
Component.mixin({
  _rendered: function () {
    if (this.props.popconfirm) {
      if (isString(this.props.popconfirm)) {
        this.popconfirm = new Popconfirm({ trigger: this, children: this.props.popconfirm })
      } else {
        this.popconfirm = new Popconfirm(
          Component.extendProps({}, this.props.popconfirm, {
            trigger: this,
          }),
        )
      }
    }
  },
})

Component.register(Popconfirm)

export default Popconfirm
