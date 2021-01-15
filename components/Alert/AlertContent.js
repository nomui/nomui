import Button from '../Button/index'
import Cols from '../Cols/index'
import Component from '../Component/index'
import { isPlainObject } from '../util/index'

class AlertContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      title: null,
      description: null,
      icon: null,
      type: null,
      okText: null,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { title, description, type, okText, action } = this.props
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

    const okButtonProps = {
      component: Button,
      styles: {
        color: 'primary'
      },
      text: okText,
      onClick: () => {
        alertInst._handleOk()
      }
    }

    let actionProps = {
      component: Cols,
      justify: 'end',
    }
    if (!action) {
      actionProps.items = [okButtonProps]
    }
    else if (isPlainObject(action)) {
      actionProps = Component.extendProps(actionProps, action)
    }
    else if (Array.isArray(action)) {
      actionProps.items = action
    }

    this.setProps({
      children: [
        {
          classes: {
            'nom-alert-body': true,
          },
          children: [
            {
              classes: {
                'nom-alert-body-icon': true
              },
              children: iconProps
            },
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
          children: actionProps,
        },
      ],
    })
  }
}

Component.register(AlertContent)

export default AlertContent
