import Component from '../Component/index'
import Field from '../Field/index'
import { extend } from '../util/index'
import RadioOptionList from './RadioOptionList'

class RadioList extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
      uistyle: 'radio',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    this.setProps({
      optionDefaults: {
        key() {
          return this.props.value
        },
      },
    })

    this.setProps({
      optionList: {
        component: RadioOptionList,
        cols: this.props.cols,
      },
    })

    this.setProps({
      control: this.props.optionList,
    })

    super._config()
  }

  getSelectedOption() {
    return this.optionList.getSelectedItem()
  }

  _getValueText(options, value) {
    const { valueOptions } = this.props
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
        return selected.props ? [selected.props.text] : [selected.text]
      }
      return selected.props ? selected.props.text : selected.text
    }

    return null
  }

  _getValue(options) {
    const { valueOptions } = this.props
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
        return [selected.props.value]
      }
      return selected.props.value
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
      this.optionList.unselectAllItems({ triggerSelectionChange: options.triggerChange })
    } else {
      if (Array.isArray(value)) {
        value = value[0]
      }
      this.optionList.selectItem(function () {
        return this.props.value === value
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
    let option = null
    const { options } = this.props
    if (Array.isArray(value)) {
      value = value[0]
    }
    for (let i = 0; i < options.length; i++) {
      if (options[i].value === value) {
        option = options[i]
        break
      }
    }
    return option
  }
}

Component.register(RadioList)

export default RadioList
