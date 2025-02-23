import Component from '../Component/index'
import Field from '../Field/index'
import { extend } from '../util/index'
import RadioOptionList from './RadioOptionList'

class RadioList extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(RadioList.defaults, props), ...mixins)
  }

  _config() {
    const { fieldName } = this.props
    this.setProps({
      optionDefaults: {
        key() {
          return this.props[fieldName.value]
        },
      },
    })

    this.setProps({
      optionList: {
        component: RadioOptionList,
        onCreated: ({ inst }) => {
          inst.controlRef = this
        },
        cols: this.props.cols,
        fieldName,
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

  getSelectedOption() {
    return this.optionList.getSelectedItem()
  }

  _getValueText(options, value) {
    const { valueOptions, fieldName } = this.props
    options = extend(
      {
        asArray: false,
      },
      valueOptions,
      options,
    )

    const selected = value !== undefined ? this._getOptionByValue(value) : this.getSelectedOption()
    if (selected !== null) {
      if (options.asArray === true) {
        return selected.props ? [selected.props[fieldName.text]] : [selected[fieldName.text]]
      }
      return selected.props ? selected.props[fieldName.text] : selected[fieldName.text]
    }

    return null
  }

  _getValue(options) {
    const { valueOptions, fieldName } = this.props
    options = extend(
      {
        asArray: false,
      },
      valueOptions,
      options,
    )

    const selected = this.getSelectedOption()
    if (selected !== null) {
      if (options.asArray === true) {
        return [selected.props[fieldName.value]]
      }
      return selected.props[fieldName.value]
    }

    return null
  }

  _setValue(value, options) {
    const { fieldName } = this.props
    if (options === false) {
      options = { triggerChange: false }
    } else {
      options = extend({ triggerChange: true }, options)
    }

    if (value === null) {
      this.optionList.unselectAllItems({ triggerSelectionChange: options.triggerChange })
    } else {
      if (Array.isArray(value)) {
        value = value[0]
      }
      this.optionList.selectItem(function () {
        return this.props[fieldName.value] === value
      })
    }
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

  _getOptionByValue(value) {
    const { fieldName } = this.props
    let option = null
    const { options } = this.props
    if (Array.isArray(value)) {
      value = value[0]
    }
    for (let i = 0; i < options.length; i++) {
      if (options[i][fieldName.value] === value) {
        option = options[i]
        break
      }
    }
    return option
  }
}
RadioList.defaults = {
  options: [],
  uistyle: 'radio',
  fieldName: {
    text: 'text',
    value: 'value',
  },
  canRevert: true,
}
Component.register(RadioList)

export default RadioList
