import Component from '../Component/index'
import Field from '../Field/index'
import Grid from '../grid/index'
import GroupGridTr from './GroupGridTr'
import Toolbar from '../Toolbar/index'

import { extend, isFunction } from '../util/index'

class GroupGrid extends Field {
  constructor(props, ...mixins) {
    const defaults = {
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
    const columns = []
    groupDefaults.fields.forEach((f) => {
      columns.push({
        field: f.name,
        title: f.label,
        cellRender: ({ cellData, row }) => {
          return Component.extendProps(f, {
            notShowLabel: true,
            plain: true,
            value: cellData,
            __group: row,
          })
        },
      })
    })
    columns.push({
      cellRender: ({ row }) => {
        return {
          component: Toolbar,
          items: [
            {
              component: 'Button',
              text: '移除',
              onClick: () => {
                row.remove()
                that._onValueChange()
              },
            },
          ],
        }
      },
    })
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

    this.setProps({
      control: {
        children: {
          component: Grid,
          columns: columns,
          data: value,
        },
      },
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
      rowDefaults: {
        component: GroupGridTr,
      },
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

Component.register(GroupGrid)

export default GroupGrid
