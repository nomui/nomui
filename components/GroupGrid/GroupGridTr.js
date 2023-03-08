import Component from '../Component/index'
import Tr from '../Table/Tr'
import { clone, extend, isFunction, isPlainObject } from '../util/index'

let nameSeq = 0

class GroupGridTr extends Tr {
  constructor(props, ...mixins) {
    const defaults = {
      hideAction: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.fields = []
    const { name, value, data } = this.props
    this.currentData = data
    this.initValue = value !== undefined ? clone(this.props.value) : null
    this.oldValue = null
    this.currentValue = this.initValue
    if (name) {
      this.name = name
      this._autoName = false
    } else {
      this._autoName = true
      this.name = `__field_grid${++nameSeq}`
    }
    this.group = this.table.grid.groupGrid
    this.rootField = this.group === null ? this : this.group.rootField
    this.rules = []
  }

  getValue(options) {
    const { valueOptions, hiddenColumns } = this.props
    options = extend(
      {
        ignoreDisabled: true,
        ignoreHidden: true,
        merge: false,
      },
      options,
      valueOptions,
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
    hiddenColumns.forEach(element => {
      if (!options.ignoreHidden) {
        if (this.currentData.hasOwnProperty(element.field)) {
          value[element.field] = this.currentData[element.field]
        } else if (element.value) {
          value[element.field] = element.value
        }
      }
    });
    if (options.merge === true) {
      return extend(this.currentValue, value)
    }
    return value
  }

  setValue(value, options) {
    this.currentData = value
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

  validate(fromParent = false) {
    this.invalids = []
    for (let i = 0; i < this.fields.length; i++) {
      const field = this.fields[i],
        { disabled, hidden } = field.props
      if (!(disabled || hidden) && field.validate) {
        const valResult = field.validate()
        if (valResult !== true) {
          this.invalids.push(field)
        }
      }
    }

    // 如果是GroupGrid触发的校验，则不主动 focus
    if (!fromParent && this.invalids.length > 0) {
      this.invalids[0].focus()
    }

    return this.invalids.length === 0
  }

  _focusInvalid() {
    if (this.invalids.length) {
      this.invalids[0].focus()
    }
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

  _onValueChange(args) {
    const that = this
    this.oldValue = clone(this.currentValue)

    this.currentValue = clone(this.getValue())
    this.props.value = this.currentValue

    args = extend(true, args, {
      name: this.props.name,
      oldValue: this.oldValue,
      newValue: this.currentValue,
    })

    setTimeout(function () {
      that._callHandler(that.props.onValueChange, args)
      that.group && that.group._onValueChange({ changedField: args.changedField || that })
      isFunction(that._valueChange) && that._valueChange(args)
      if (that.validateTriggered) {
        that._validate()
      }
    }, 0)
  }

  focus() {
    this.element.focus()
  }

  reset() {
    this.setValue(this.initValue)
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

export default GroupGridTr
