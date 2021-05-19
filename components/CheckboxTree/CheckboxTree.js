import Component from '../Component/index'
import Field from '../Field/index'
import DefaultCheckboxOptionTree from './DefaultCheckboxOptionTree'
import { extend } from '../util/index'

class CheckboxTree extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { options } = this.props

    this.setProps({
      control: {
        component: DefaultCheckboxOptionTree,
        data: options,
      },
    })

    super._config()
  }

  getSelectedOptions() {
    return this.optionTree.getCheckedNodesData({ flatData: true })
  }

  _getValue() {
    const selected = this.getSelectedOptions()
    if (selected !== null && Array.isArray(selected) && selected.length > 0) {
      const vals = selected.map(function (item) {
        return item.value
      })

      return vals
    }

    return null
  }

  _getValueText(options, value) {
    const selected =
      value !== undefined ? this._getOptionsByValue(value) : this.getSelectedOptions()
    if (selected !== null && Array.isArray(selected) && selected.length > 0) {
      const vals = selected.map(function (item) {
        return item.text
      })

      return vals
    }

    return null
  }

  _setValue(value, options) {
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }

    if (value === null) {
      this.optionTree.unselectAllItems({ triggerSelectionChange: options.triggerChange })
    }
    this.optionTree.selectItem(
      function () {
        return this.props.value === value
      },
      { triggerSelectionChange: options.triggerChange },
    )
  }

  _disable() {
    if (this.firstRender === false) {
      this.optionTree.disable()
    }
  }

  _enable() {
    if (this.firstRender === false) {
      this.optionTree.enable()
    }
  }

  _getOptionsByValue(value) {
    let retOptions = null
    const { options } = this.props
    if (Array.isArray(value)) {
      retOptions = []
      for (let i = 0; i < options.length; i++) {
        if (value.indexOf(options[i].value) !== -1) {
          retOptions.push(options[i])
        }
      }
    }
    return retOptions
  }
}

Component.register(CheckboxTree)

export default CheckboxTree
