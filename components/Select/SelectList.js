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
    const {
      showSearch,
      options,
      optionDefaults,
      value,
      multiple,
      filterOption,
    } = this.selectControl.props
    const { text } = this.props
    const { checked, checkedOption } = this.selectControl
    const filterStr = checked ? checkedOption?.text : text
    const filterOptions = filterOption(filterStr, options)

    this.setProps({
      items: showSearch ? filterOptions : options,
      itemDefaults: n(null, optionDefaults, null, [SelectListItemMixin]),
      itemSelectable: {
        multiple: multiple,
        byClick: true,
      },
      selectedItems: showSearch ? checkedOption?.value : value,

      onItemSelectionChange: () => {
        this.selectControl._onValueChange()
      },
    })

    super._config()
  }
}

export default SelectList
