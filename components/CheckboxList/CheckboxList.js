import Component from '../Component/index'
import Field from '../Field/index'
import { extend, isString } from '../util/index'
import List from './DefaultOptionList'

class CheckboxList extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(CheckboxList.defaults, props), ...mixins)
  }

  _config() {
    const me = this
    this.setProps({
      optionDefaults: {
        key: function () {
          return this.props[me.props.fieldName.value]
        },
      },
    })

    this.setProps({
      optionList: {
        component: List,
        onCreated: ({ inst }) => {
          inst.controlRef = me
        },
        fieldName: this.props.fieldName,
        cols: this.props.cols,
      },
    })

    this.setProps({
      // RadioList,CheckboxList等div组件不为 focusable 元素
      // 需设置 tabindex才有 fouces方法，进而触发校验的 Tooltip
      attrs: { tabindex: this.props.tabindex || 0 },
      control: this.props.optionList,
    })

    super._config()
  }

  getSelectedOptions() {
    return this.optionList.getSelectedItems()
  }

  getUnselectedOptions() {
    return this.optionList.getUnselectedItems()
  }

  hideOption(value, alsoUnselect = true) {
    this.optionList.hideItem(value)
    if (alsoUnselect === true) {
      this.optionList.unselectItem(value)
    }
  }

  showOption(value) {
    this.optionList.showItem(value)
  }

  _getValue(options) {
    const me = this
    const { valueOptions } = this.props
    options = extend(
      {
        asArray: true,
      },
      valueOptions,
      options,
    )

    const selected = this.getSelectedOptions()
    if (selected !== null && Array.isArray(selected) && selected.length > 0) {
      const vals = selected.map(function (item) {
        return item.props[me.props.fieldName.value]
      })

      return options.asArray ? vals : vals.join(',')
    }

    return null
  }

  _getValueText(options, value) {
    const selected =
      value !== undefined ? this._getOptionsByValue(value) : this.getSelectedOptions()
    if (selected !== null && Array.isArray(selected) && selected.length > 0) {
      const vals = selected.map(function (item) {
        return item.props ? item.props[this.props.fieldName.text] : item[this.props.fieldName.text]
      })

      return vals
    }

    return null
  }

  _setValue(value, options) {
    const me = this
    const { valueOptions } = this.props

    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, valueOptions, options)
    }

    if (value === null) {
      this.optionList.unselectAllItems({ triggerSelectionChange: options.triggerChange })
    }

    if (options.asArray === false && isString(value)) {
      value = value.split(',')
    }

    const _that = this
    const optionsArry = []
    this.props.options.forEach((ele) => {
      optionsArry.push(ele[me.props.fieldName.value])
    })
    Array.isArray(value) &&
      optionsArry.forEach((item) => {
        if (value.includes(item)) {
          _that.optionList.selectItem(item, { triggerSelectionChange: options.triggerChange })
        } else {
          _that.optionList.unselectItem(item, { triggerSelectionChange: options.triggerChange })
        }
      })
  }

  _disable() {
    if (this.firstRender === false) {
      this.optionList.disable()
    }
  }

  _enable() {
    if (this.firstRender === false) {
      this.optionList.enable()
    }
  }

  _getOptionsByValue(value) {
    const me = this
    let retOptions = null
    const { options } = this.props
    if (Array.isArray(value)) {
      retOptions = []
      for (let i = 0; i < options.length; i++) {
        if (value.indexOf(options[i][me.props.fieldName.value]) !== -1) {
          retOptions.push(options[i])
        }
      }
    }
    return retOptions
  }
}

CheckboxList.defaults = {
  options: [],
  valueOptions: {
    asArray: true,
  },
  fieldName: {
    text: 'text',
    value: 'value',
  },
  itemRender: null,
}

Component.register(CheckboxList)

export default CheckboxList
