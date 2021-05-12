import Component from '../Component/index'
import Popup from '../Popup/index'
import { isString } from '../util/index'

class Popconfirm extends Popup {
  constructor(props, ...mixins) {
    const defaults = {
      triggerAction: 'click',
      closeOnClickOutside: false,
      title: null,
      content: null,
      onConfirm: null,
      okText: '是',
      cancelText: '否',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const that = this

    const { content, okText, cancelText } = this.props
    this.setProps({
      children: {
        component: 'Rows',
        items: [
          {
            component: 'Cols',
            items: [
              {
                component: 'Icon',
                type: 'info-circle',
                attrs: {
                  style: {
                    'font-size': '1.8rem',
                  },
                },
              },
              { children: content },
            ],
          },
          {
            component: 'Cols',
            gutter: 'sm',
            items: [
              {
                component: 'Button',
                styles: {
                  color: 'primary',
                },
                size: 'small',
                text: okText,
                onClick: () => {
                  that._handleOk()
                },
              },
              {
                component: 'Button',
                text: cancelText,
                size: 'small',
                onClick: () => {
                  that._handleCancel()
                },
              },
            ],
          },
        ],
      },
    })
    super._config()
  }

  _handleOk() {
    this._callHandler(this.props.onConfirm)
    this.hide()
  }

  _handleCancel() {
    this.hide()
  }
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
