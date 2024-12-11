import Component from '../Component/index'
import Group from '../Group/Group'
import { extend, isFunction, isNullish } from '../util/index'

class GroupList extends Group {
  constructor(props, ...mixins) {
    super(Component.extendProps(GroupList.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.extGroupDefaults = null
  }

  _config() {
    const that = this
    const { groupDefaults, value, disabled, controlAction } = this.props
    const actionRender = groupDefaults.actionRender || null

    this.extGroupDefaults = Component.extendProps(groupDefaults, {
      _config: function () {
        const group = this
        if (isFunction(actionRender)) {
          this.setProps({
            action: actionRender({
              group: group,
              groupList: that,
            }),
          })
        } else {
          this.setProps({
            action: [
              {
                component: 'Button',
                text: that.props.removeText,
                disabled: disabled,
                onClick: () => {
                  that.removeGroup(group)
                },
              },
            ],
          })
        }
      },
    })

    const groups = []
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        groups.push(Component.extendProps(that.extGroupDefaults, { value: item }))
      })
    }

    let realControlAction = controlAction

    if (isNullish(realControlAction)) {
      realControlAction = [
        {
          component: 'Button',
          type: 'dashed',
          text: this.props.addText,
          span: 12,
          block: true,
          disabled: disabled,
          onClick: () => {
            that.addGroup()
          },
          hidden: that.props.hideAction,
        },
      ]
    }

    this.setProps({
      fields: groups,
      fieldDefaults: that.extGroupDefaults,
      controlAction: realControlAction,
    })

    super._config()
  }

  getValue(options) {
    const { valueOptions } = this.props
    const opts = extend(
      {
        ignoreDisabled: true,
        ignoreHidden: true,
        merge: false,
      },
      valueOptions,
      options,
    )
    const value = []
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (field.getValue) {
        const fieldValue = field.getValue(opts)
        value.push(fieldValue)
      }
    }

    return value
  }

  setValue(value, options) {
    if (Array.isArray(value)) {
      for (let i = 0; i < this.fields.length; i++) {
        const field = this.fields[i]
        if (field.setValue) {
          field.setValue(value[i], options)
        }
      }
    }
  }

  validate(options) {
    if (this.props.required && !this.fields.length) {
      return false
    }
    const invalids = []
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i],
        { disabled, hidden } = field.props
      if (!(disabled || hidden) && field.validate) {
        const valResult = field.validate(options)
        if (valResult !== true) {
          invalids.push(field)
        }
      }
    }

    if (invalids.length > 0) {
      invalids[0].focus()
    }

    return invalids.length === 0
  }

  addGroup(groupProps) {
    if (isNullish(groupProps)) {
      groupProps = {}
    }
    const { addDefaultValue } = this.props
    if (isNullish(groupProps.value)) {
      groupProps.value = isFunction(addDefaultValue)
        ? addDefaultValue.call(this)
        : addDefaultValue
    }

    groupProps = Component.extendProps(this.extGroupDefaults, groupProps)

    this.appendField(groupProps)
    this._onValueChange()
  }

  removeGroup(group) {
    group.remove()
    this._onValueChange()
  }
}
GroupList.defaults = {
  fieldDefaults: { component: Group },
  hideAction: false,
  addText: '添加',
  removeText: '移除'
}

Component.register(GroupList)

export default GroupList
