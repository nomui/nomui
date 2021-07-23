import Component from '../Component/index'
import Group from '../Group/Group'
import { extend, isFunction } from '../util/index'

class GroupList extends Group {
  constructor(props, ...mixins) {
    const defaults = {
      fieldDefaults: { component: Group },
      hideAction: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.extGroupDefaults = null
  }

  _config() {
    const that = this
    const { groupDefaults, value } = this.props
    this.extGroupDefaults = Component.extendProps(groupDefaults, {
      _config: function () {
        const group = this
        this.setProps({
          action: [
            {
              component: 'Button',
              text: '移除',
              onClick: () => {
                group.remove()
                that._onValueChange()
              },
            },
          ],
        })
      },
    })

    const groups = []
    if (Array.isArray(value)) {
      value.forEach(function (item) {
        groups.push(Component.extendProps(that.extGroupDefaults, { value: item }))
      })
    }

    this.setProps({
      fields: groups,
      fieldDefaults: that.extGroupDefaults,
      controlAction: [
        {
          component: 'Button',
          type: 'dashed',
          text: '添加',
          span: 12,
          block: true,
          onClick: () => {
            that.addGroup()
          },
          hidden: that.props.hideAction,
        },
      ],
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

  addGroup() {
    const { addDefaultValue } = this.props
    this.extGroupDefaults.value = isFunction(addDefaultValue)
      ? addDefaultValue.call(this)
      : addDefaultValue
    this.appendField(this.extGroupDefaults)
    this._onValueChange()
  }
}

Component.register(GroupList)

export default GroupList
