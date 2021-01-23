import Component from '../Component/index'
import Field from '../Field/index'
import Group from '../Group/Group'

class GroupList extends Field {
    constructor(props, ...mixins) {
        const defaults = {
            fields: [],
            fieldDefaults: { component: Field },
            groupDefaults: {
                action: {
                    component: 'Button',
                    text: '移除'
                }
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        const that = this
        const { fields, groupDefaults } = this.props

        this.setProps({
            control: {
                children: [
                    {
                        component: Field,
                        _created: function () {
                            that.action = this
                        },
                        control: {
                            component: 'Button',
                            text: '添加',
                            onClick: () => {
                                that.action.before(Component.extendProps(groupDefaults, {
                                    component: Group,
                                    fields: fields
                                }))
                            }
                        }
                    }
                ]
            }
        })

        super._config()
    }
}

Component.register(GroupList)

export default GroupList
