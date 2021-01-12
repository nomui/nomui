import Component, { n } from '../Component/index'
import List from '../List/index'
import SelectListItemMixin from './SelectListItemMixin'

class SelectList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'x-md',
      cols: 1,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.selectControl = this.parent.parent.parent.selectControl
    this.selectControl.optionList = this
  }

  _config() {
    const selectProps = this.selectControl.props
    this.setProps({
      items: selectProps.options,
      itemDefaults: n(null, selectProps.optionDefaults, null, [SelectListItemMixin]),
      itemSelectable: {
        multiple: selectProps.multiple,
        byClick: true,
      },
      selectedItems: selectProps.value,

      onItemSelectionChange: () => {
        this.selectControl._onValueChange()
      },
    })

    super._config()
  }
}

export default SelectList
