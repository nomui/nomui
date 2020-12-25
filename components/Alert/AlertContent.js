import Component from '../Component/index'
import { isString } from '../util/index'
import Button from '../Button/index'
import Cols from '../Cols/index'

class AlertContent extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            title: null,
            description: null,
            icon: null,
            type: null,
            ok: {
                text: '确定'
            },
            cancel: {
                text: '取消'
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        let { title, description, icon, type, ok, cancel } = this.props,
            alertInst = this.modal

        const iconMap = {
            info: 'info-alt',
            success: 'success',
            danger: 'danger',
            error: 'warn',
            warning: 'help-alt'
        }

        icon = icon || iconMap[type]

        let iconProps = icon ?
            Component.extendProps(Component.normalizeIconProps(icon), { classes: { 'nom-alert-icon': true } })
            : null

        let titleProps = title ?
            Component.extendProps(Component.normalizeTemplateProps(title), { classes: { 'nom-alert-title': true } })
            : null

        let descriptionProps = description ?
            Component.extendProps(Component.normalizeTemplateProps(description), { classes: { 'nom-alert-description': true } })
            : null

        let okProps = ok ?
            Component.extendProps(
                ok,
                {
                    component: Button,
                    styles: {
                        color: 'primary'
                    },
                    events: {
                        click: function () {
                            if (ok.callback) {
                                if (ok.callback.call(this, alertInst) !== false) {
                                    alertInst.close()
                                }
                            }
                            else {
                                alertInst.close()
                            }
                        }
                    }
                },
            )
            : null

        let cancelProps = cancel ?
            Component.extendProps(
                cancel,
                {
                    component: Button,
                    events: {
                        click: function () {
                            alertInst.close()
                        }
                    }
                },
            )
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
                            children: [
                                titleProps,
                                descriptionProps
                            ]
                        }
                    ]
                },
                {
                    classes: {
                        'nom-alert-actions': true
                    },
                    children: {
                        component: Cols,
                        inline: true,
                        items: [
                            cancelProps,
                            okProps
                        ]
                    }
                }
            ]
        })
    }
}

Component.register(AlertContent)

export default AlertContent