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
    const { name, value } = this.props
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
      invalids[0].focus()
    }

    return invalids.length === 0
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
    if (field._autoName) {
      return false
    }
    if (options.ignoreDisabled && disabled === true) {
      return false
    }
    if (options.ignoreHidden && hidden === true) {
      return false
    }

    return true
  }
}

export default GroupGridTr
