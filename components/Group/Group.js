import Component from '../Component/index'
import Field from '../Field/index'
import { extend, isFunction, isPlainObject } from '../util/index'

class Group extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Group.defaults, props), ...mixins)
  }

  _config() {
    this._addPropStyle('inline', 'striped', 'line', 'nowrap')
    const { fields, fieldDefaults, value, collapsible } = this.props
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

    if (collapsible && this.props.labelAlign === 'top') {
      this.setProps({
        labelContent: {
          component: 'Flex',
          align: 'center',
          cols: [
            {
              grow: true,
              children: {
                styles: {
                  padding: 'd5'
                },
                children: this.props.label
              }
            },
            {
              styles: {
                cursor: 'pointer'
              },
              children: isPlainObject(collapsible) && isFunction(collapsible.render) ? {
                ...collapsible.render(this.props.collapsed),
                onClick: () => {
                  this._toggleCollapse()
                }
              } : {
                component: 'Button',
                type: 'text',
                size: 'small',
                rightIcon: this.props.collapsed ? 'right' : 'up',
                onClick: () => {
                  this._toggleCollapse()
                }
              }
            }
          ]
        }
      })
    }


    this.setProps({
      classes: {
        'nom-group-collapsed': collapsible && this.props.collapsed
      },
      control: { children: children },
    })


    super._config()
  }

  _toggleCollapse() {
    if (!this.props.collapsed) {
      this.props.collapsed = true
      this.element.classList.add('nom-group-collapsed')
    }
    else {
      this.props.collapsed = false
      this.element.classList.remove('nom-group-collapsed')
    }
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
      },
      options,
    )
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
  }

  validate(options) {
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
  collapsible: false,
}

Component.register(Group)

export default Group
