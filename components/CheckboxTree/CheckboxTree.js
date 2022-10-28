import Component from '../Component/index'
import Field from '../Field/index'
import { extend, isChrome49 } from '../util/index'
import DefaultCheckboxOptionTree from './DefaultCheckboxOptionTree'

class CheckboxTree extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(CheckboxTree.defaults, props), ...mixins)
  }

  _config() {
    const {
      options,
      showCheckAll,
      checkAllText,
      treeDataFields,
      cascadeUncheckChildren,
      cascadeCheckChildren,
      cascadeCheckParent,
      cascadeUncheckParent,
      cascade,
      attrs,
      initExpandLevel,
    } = this.props
    if (attrs && attrs.style && attrs.style.height && isChrome49()) {
      attrs.style.overflow = 'auto'
    }
    this.setProps({
      control: {
        component: DefaultCheckboxOptionTree,
        data: options,
        fit: true,
        dataFields: treeDataFields,
        initExpandLevel,
        nodeCheckable: {
          showCheckAll,
          checkAllText,
          cascade,
          cascadeCheckParent,
          cascadeCheckChildren,
          cascadeUncheckChildren,
          cascadeUncheckParent,
        },
      },
    })

    super._config()
  }

  getSelectedOptions() {
    return this.optionTree.getCheckedNodesData({ flatData: true })
  }

  _getValue(options) {
    const { valueOptions } = this.props
    options = extend(
      {
        asString: false,
      },
      valueOptions,
      options,
    )

    const selected = this.getSelectedOptions()
    if (selected !== null && Array.isArray(selected) && selected.length > 0) {
      const vals = selected.map(function (item) {
        return item.key
      })

      if (options.asString) {
        return vals.join()
      }
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

CheckboxTree.defaults = {
  options: [],
  showCheckAll: false,
  checkAllText: '全选',
  treeDataFields: {},
}

Component.register(CheckboxTree)

export default CheckboxTree
