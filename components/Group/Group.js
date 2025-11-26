import Component from '../Component/index'
import Field from '../Field/index'
import { extend, isPlainObject } from '../util/index'

class Group extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Group.defaults, props), ...mixins)
  }

  _created() {
    super._created()
  }

  _config() {
    this._addPropStyle('inline', 'striped', 'line', 'nowrap')
    const { fields, fieldDefaults, value } = this.props
    const children = []

    for (let i = 0; i < fields.length; i++) {
      let fieldProps = extend(true, {}, fields[i])
      if (isPlainObject(value)) {
        if (fieldProps.flatValue === true) {
          fieldProps.value = value
        } else if (fieldProps.value === null || fieldProps.value === undefined) {
          fieldProps.value = value[fieldProps.name]
        }
      }
      fieldProps.__group = this
      fieldProps = Component.extendProps(fieldDefaults, fieldProps)
      children.push(fieldProps)
    }

    this.setProps({
      control: { children: children },
    })

    super._config()
  }

  getValue(options) {
    const { valueOptions } = this.props
    options = extend(
      {
        ignoreDisabled: true,
        ignoreHidden: true,
        merge: false,
      },
      valueOptions,
      options,
    )

    const value = {}
    const len = this.fields.length
    for (let i = 0; i < len; i++) {
      const field = this.fields[i]
      if (field.getValue && this._needHandleValue(field, options)) {
        const fieldValue = field.getValue(options)
        if (field.props.flatValue === true) {
          extend(value, fieldValue)
        } else {
          value[field.name] = fieldValue
        }
      }
    }

    if (options.merge === true) {
      return extend(this.currentValue, value)
    }
    return value
  }

  setValue(value, options) {
    options = extend(
      {
        ignoreDisabled: false,
        ignoreHidden: false,
        ignoreNone: false,
      },
      options,
    )
    if (options.ignoreNone === false) {
      const len = this.fields.length
      for (let i = 0; i < len; i++) {
        const field = this.fields[i]
        if (field.setValue && this._needHandleValue(field, options)) {
          let fieldValue = value
          if (field.props.flatValue === false) {
            if (isPlainObject(value)) {
              fieldValue = value[field.name]
            }
          }
          if (fieldValue === undefined) {
            fieldValue = null
          }
          field.setValue(fieldValue)
        }
      }
    } else if (isPlainObject(value)) {
      Object.keys(value).forEach((key) => {
        const field = this.getField(key)
        if (field) {
          let fieldValue = value
          if (field.props.flatValue === false) {
            if (isPlainObject(value)) {
              fieldValue = value[key]
            }
          }
          if (fieldValue === undefined) {
            fieldValue = null
          }
          field.setValue(fieldValue)
        }
      })
    }
  }

  // 软校验，配置了soft:true的规则将不会影响校验结果，但会返回校验失败的信息
  softValidate(options = { showInvalidTip: true }) {
    const details = {}
    const invalids = []
    let groupValid = true

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (!field || !field.softValidate) continue

      const { disabled, hidden } = field.props

      // 💡 忽略 disabled 或 hidden 的字段
      if (disabled || hidden) {
        continue
      }

      // 调用每个 Field 的 softValidate
      const result = field.softValidate({
        ...options,
        showInvalidTip: options.showInvalidTip !== false, // 让 field 自己显示 tooltip
      })

      // 结果是false或者结果的valid是false
      if (result === false || result.valid === false) {
        groupValid = false
        invalids.push(field)
      }

      // 结果是对象则收集error信息
      if (result.errors && result.errors.length > 0) {
        details[field.name] = result.errors
      }
    }

    const hasSoftError = Object.keys(details).length > 0

    if (invalids.length > 0 && options.showInvalidTip !== false) {
      this.rootField.focusField(invalids[0])
    }

    if (this.expandBtnRef && invalids.length > 0) {
      this.expand()
    }

    if (groupValid === false) {
      return false
    }

    if (hasSoftError) {
      return {
        valid: groupValid,
        fields: details,
      }
    }

    return true
  }

  validate(options) {
    options = options || {}
    const invalids = []

    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (!field) continue

      const { disabled, hidden } = field.props
      if (!(disabled || hidden) && field.validate) {
        const valResult = field.validate(options)
        if (valResult !== true) {
          invalids.push(field)
        }
      }
    }

    // 仅当显示校验提示时才自动聚焦第一个无效字段
    if (invalids.length > 0 && options.showInvalidTip !== false) {
      this.rootField.focusField(invalids[0])
    }

    if (this.expandBtnRef && invalids.length > 0) {
      this.expand()
    }

    return invalids.length === 0
  }

  getField(fieldName, options = {}) {
    if (options.byDom) {
      const name = fieldName.split('.').pop()
      return this.findField(name)
    }
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

  findField(fieldName) {
    if (!this.element) {
      return null
    }
    const el = this.element.querySelector(`[data-field-name="${fieldName}"]`)
    if (el && el.component) {
      return el.component
    }

    return null
  }

  appendField(fieldProps) {
    const { fieldDefaults } = this.props
    this.props.fields.push(fieldProps)
    return this.control.appendChild(
      Component.extendProps(fieldDefaults, fieldProps, { __group: this }),
    )
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

  _clear() {
    this._resetValidStatus()
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i]
      if (field.setValue) {
        field.setValue(null)
      }
    }
  }

  _needHandleValue(field, options) {
    const { disabled, hidden } = field.props
    const { ignoreFields = [] } = options
    if (field._autoName) {
      return false
    }
    if (options.ignoreDisabled && disabled === true) {
      return false
    }
    if (options.ignoreHidden && hidden === true) {
      return false
    }
    if (ignoreFields.includes(field.name)) {
      return false
    }

    return true
  }
}
Group.defaults = {
  fields: [],
  fieldDefaults: { component: Field },
}

Component.register(Group)

export default Group
