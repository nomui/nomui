import Component from '../Component/index'
import Field from '../Field/index'
import Grid from '../Grid/index'
import Toolbar from '../Toolbar/index'
import { extend, isFunction } from '../util/index'
import GroupGridTr from './GroupGridTr'

class GroupGrid extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      hideAction: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    const that = this
    const { groupDefaults, value, actionColumn, gridProps } = this.props
    const columns = []
    groupDefaults.fields.forEach((f) => {
      if (f.hidden !== true) {
        columns.push({
          field: f.name,
          title: f.label,
          width: f.width,
          cellRender: ({ cellData, row }) => {
            return Component.extendProps(f, {
              notShowLabel: true,
              plain: true,
              value: cellData,
              __group: row,
              invalidTip:{
                reference:this
              },
              onCreated: ({ inst }) => {
                row.fields.push(inst)
              },
            })
          },
        })
      }
    })
    columns.push(
      Component.extendProps(
        {
          width: 80,
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
        },
        actionColumn,
      ),
    )

    this.setProps({
      control: {
        children: Component.extendProps(gridProps, {
          component: Grid,
          columns: columns,
          data: value,
          line: 'both',
          rowDefaults: {
            component: GroupGridTr,
          },
          onCreated: ({ inst }) => {
            that.grid = inst
            inst.groupGrid = that
          },
        }),
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

  validate() {
    const invalids = []
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i],
        { disabled, hidden } = field.props
      if (!(disabled || hidden) && field.validate) {
        const valResult = field.validate()
        if (valResult !== true) {
          invalids.push(field)
        }
      }
    }

    if (invalids.length > 0) {
      // invalids[0].focus()
    }

    return invalids.length === 0
  }

  getField(fieldName) {
    if (typeof fieldName === 'string') {
      // Handle nested keys, e.g., "foo.bar" "foo[1].bar" "foo[key].bar"
      const parts = fieldName.split('.')
      let curField = this
      if (parts.length) {
        for (let i = 0; i < parts.length; i++) {
          const part = parts[i]
          curField = curField._getSubField(part)
          if (!curField) {
            break
          }
        }
      }

      return curField
    }
  }

  _getSubField(fieldName) {
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (field.name === fieldName) {
        return field
      }
    }

    return null
  }

  focus() {}

  addGroup() {
    const { addDefaultValue } = this.props
    const rowData = isFunction(addDefaultValue) ? addDefaultValue.call(this) : addDefaultValue
    if (this.grid.props.data.length > 0) {
      this.grid.appendRow({ data: rowData })
    } else {
      const tr = this.props.groupDefaults.fields.map((n) => {
        const item = {}
        item[n.name] = null
        return item
      })
      this.grid.update({ data: [tr] })
    }

    this._onValueChange()
  }

  _clear() {
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (field.setValue) {
        field.setValue(null)
      }
    }
  }
}

Object.defineProperty(GroupGrid.prototype, 'fields', {
  get: function () {
    return this.grid.getRows()
  },
})

Component.register(GroupGrid)

export default GroupGrid
