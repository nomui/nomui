import Button from '../Button/index'
import Cols from '../Cols/index'
import Component from '../Component/index'
import { isPlainObject } from '../util/index'

class ConfirmContent extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            title: null,
            description: null,
            icon: null,
            type: null,
        }
        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        const confirmInst = this.modal

        const { title, description, icon, action, okText, cancelText } = confirmInst.props

        const iconProps = icon
            ? Component.extendProps(Component.normalizeIconProps(icon), {
                classes: { 'nom-confirm-icon': true },
            })
            : null

        const titleProps = title
            ? Component.extendProps(Component.normalizeTemplateProps(title), {
                classes: { 'nom-confirm-title': true },
            })
            : null

        const descriptionProps = description
            ? Component.extendProps(Component.normalizeTemplateProps(description), {
                classes: { 'nom-confirm-description': true },
            })
            : null

        const okButtonProps = {
            component: Button,
            styles: {
                color: 'primary'
            },
            text: okText,
            onClick: () => {
                confirmInst._handleOk()
            }
        }

        const cancelButtonProps = {
            component: Button,
            text: cancelText,
            onClick: () => {
                confirmInst._handleCancel()
            }
        }

        let actionProps = {
            component: Cols,
            justify: 'end',
        }
        if (!action) {
            actionProps.items = [okButtonProps, cancelButtonProps]
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
                        'nom-confirm-body': true,
                    },
                    children: [
                        iconProps,
                        {
                            classes: {
                                'nom-confirm-body-content': true,
                            },
                            children: [titleProps, descriptionProps],
                        },
                    ],
                },
                {
                    classes: {
                        'nom-confirm-actions': true,
                    },
                    children: actionProps,
                },
            ],
        })
    }
}

Component.register(ConfirmContent)

export default ConfirmContent
