import Component from '../Component/index'
import Field from '../Field/index'
import Group from '../Group/Group'

class GroupList extends Field {
    constructor(props, ...mixins) {
        const defaults = {
            fields: [],
            fieldDefaults: { component: Field }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _created() {
        super._created()

        this.groups = []
    }

    _config() {
        const that = this
        const { fields, groupDefaults, value } = this.props
        const extGroupDefaults = Component.extendProps(groupDefaults, {
            _config: function () {
                const group = this
                this.setProps({
                    action: {
                        component: 'Button',
                        text: '移除',
                        onClick: () => {
                            group.remove()
                        }
                    }
                })
            }
        })

        const groups = []
        if (Array.isArray(value)) {
            value.forEach(function (item) {
                groups.push(Component.extendProps(extGroupDefaults, {
                    component: Group,
                    fields: fields, value: item,
                    __group: that
                }))
            })
        }
        this.setProps({
            control: {
                children: [
                    ...groups,
                ]
            },
            lastControlAddons: {
                component: 'Button',
                text: '添加',
                onClick: () => {
                    that.control.appendChild(Component.extendProps(extGroupDefaults, {
                        component: Group,
                        fields: fields
                    }))
                }
            },
        })

        super._config()
    }

    getValue() {
        const value = []
        for (let i = 0; i < this.fields.length; i++) {
            const field = this.fields[i]
            if (field.getValue) {
                const fieldValue = field.getValue()
                value.push(fieldValue)
            }
        }

        return value
    }

    setValue(value) {
        if (Array.isArray(value)) {
            for (let i = 0; i < this.fields.length; i++) {
                const field = this.fields[i]
                if (field.setValue) {
                    field.setValue(value[i])
                }
            }
        }
    }
}

Component.register(GroupList)

export default GroupList
