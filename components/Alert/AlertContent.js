import Button from '../Button/index'
import Cols from '../Cols/index'
import Component from '../Component/index'

class AlertContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      title: null,
      description: null,
      icon: null,
      type: null,
      ok: {
        text: '确 定',
      },
      cancel: false,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { title, description, type, ok, cancel } = this.props
    let { icon } = this.props

    const alertInst = this.modal

    const iconMap = {
      info: 'info-circle',
      success: 'check-circle',
      error: 'close-circle',
      warning: 'exclamation-circle',
    }

    icon = icon || iconMap[type]

    const iconProps = icon
      ? Component.extendProps(Component.normalizeIconProps(icon), {
        classes: { 'nom-alert-icon': true },
      })
      : null

    const titleProps = title
      ? Component.extendProps(Component.normalizeTemplateProps(title), {
        classes: { 'nom-alert-title': true },
      })
      : null

    const descriptionProps = description
      ? Component.extendProps(Component.normalizeTemplateProps(description), {
        classes: { 'nom-alert-description': true },
      })
      : null

    const okProps = ok
      ? Component.extendProps(ok, {
        component: Button,
        styles: {
          color: 'primary',
        },
        onClick: function () {
          if (ok.callback) {
            if (ok.callback.call(this, alertInst) !== false) {
              alertInst.close()
            }
          } else {
            alertInst.close()
          }
        },
      })
      : null

    const cancelProps = cancel
      ? Component.extendProps(cancel, {
        component: Button,
        onClick: function () {
          alertInst.close()
        },
      })
      : null

    this.setProps({
      children: [
        {
          classes: {
            'nom-alert-body': true,
          },
          children: [
            iconProps,
            {
              classes: {
                'nom-alert-body-content': true,
              },
              children: [titleProps, descriptionProps],
            },
          ],
        },
        {
          classes: {
            'nom-alert-actions': true,
          },
          children: {
            component: Cols,
            inline: true,
            items: [cancelProps, okProps],
          },
        },
      ],
    })
  }
}

Component.register(AlertContent)

export default AlertContent
