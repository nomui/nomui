import Button from '../Button/index'
import Cols from '../Cols/index'
import Component from '../Component/index'

class NotificationContent extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      title: null,
      description: null,
      // type:null,
      // icon:'',
      // closeIcon: 'close',
      btn: false,
    }
    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { title, description, type, btn, closeIcon, onClose, okText } = this.props

    let { icon } = this.props
    const iconMap = {
      info: 'info-circle-fill',
      success: 'check-circle-fill',
      error: 'close-circle-fill',
      warning: 'warning-circle-fill',
    }
    icon = icon || iconMap[type]

    const iconProps = icon
      ? Component.extendProps(Component.normalizeIconProps(icon), {
        classes: {
          'nom-notification-icon': true,
        },
      })
      : null

    const titleProps = title
      ? Component.extendProps(Component.normalizeTemplateProps(title), {
        classes: { 'nom-notification-title': true },
      })
      : null

    const closeIconProps = Component.extendProps(
      Component.normalizeTemplateProps({
        component: 'Button',
        icon: closeIcon,
        styles: {
          border: 'none',
        },
        onClick: function () {
          onClose()
        },
      }),
      {
        classes: { 'nom-notification-close': true },
      },
    )

    const headerProps = {
      component: 'Cols',
      justify: 'between',
      items: [titleProps, closeIconProps],
    }

    const descriptionProps = description
      ? Component.extendProps(Component.normalizeTemplateProps(description), {
        classes: { 'nom-notification-description': true },
      })
      : null
    let actionProps
    if (btn) {
      const okButtonProps = {
        component: Button,
        styles: {
          color: 'primary',
        },
        size: 'small',
        text: btn.text || okText,
        onClick: () => {
          onClose()
        },
      }
      actionProps = {
        component: Cols,
        justify: 'end',
        items: [okButtonProps],
      }
    }

    this.setProps({
      children: [
        {
          classes: {
            'nom-notification-body': true,
          },
          children: [
            icon
              ? {
                classes: {
                  'nom-notification-body-icon': true,
                },
                children: iconProps,
              }
              : undefined,
            {
              classes: {
                'nom-notification-body-content': true,
              },
              children: [headerProps, descriptionProps],
            },
          ],
        },
        actionProps
          ? {
            classes: {
              'nom-notification-actions': true,
            },
            children: actionProps,
          }
          : undefined,
      ],
    })
  }
}

export default NotificationContent
