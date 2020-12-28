import Component from '../Component/index'
import Control from '../Control/index'
import List from './DefaultOptionList'

class CheckboxList extends Control {
  constructor(props, ...mixins) {
    const defaults = {
      options: [],
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    super._config()

    this.setProps({
      optionDefaults: {
        key: function () {
          return this.props.value
        },
      },
    })

    this.setProps({
      optionList: {
        component: List,
      },
    })

    this.setProps({
      children: this.props.optionList,
    })
  }

  getSelectedOptions() {
    return this.optionList.getSelectedItems()
  }

  _getValue() {
    const selected = this.getSelectedOptions()
    if (selected !== null && Array.isArray(selected)) {
      const vals = selected.map(function (item) {
        return item.props.value
      })

      return vals
    }

    return null
  }

  _setValue(value) {
    this.optionList.selectItem(function () {
      return this.props.value === value
    })
  }
}

Component.register(CheckboxList)

export default CheckboxList
