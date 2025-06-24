import Component, { n } from '../Component/index'
import List from '../List/index'
import SelectListItemMixin from './SelectListItemMixin'

class SelectList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'x-md',
      cols: 1,
      vertical: true,
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
      optionDefaults,
      value,
      multiple,
      filterOption,
      optionFields,
      options,
    } = this.selectControl.props
    const { text } = this.props
    const { checked, checkedOption } = this.selectControl
    let filterStr = checked ? checkedOption && checkedOption.text : text
    // null或undefined处理
    filterStr = filterStr || ''

    this.selectControl._normalizeInternalOptions(options)

    const filterOptions = showSearch && filterOption(filterStr, this.selectControl.internalOptions)
    const items = showSearch ? filterOptions : this.selectControl.internalOptions

    // value唯一值校验提示
    this._wranOptionsValue(items, optionFields.value)
    this.setProps({
      items,
      itemDefaults: n(null, optionDefaults, null, [SelectListItemMixin]),
      itemSelectable: {
        multiple: multiple,
        byClick: true,
        scrollIntoView: true,
      },
      selectedItems: showSearch ? checkedOption && checkedOption.value : value,

      onItemSelectionChange: () => {
        if (!this.selectControl.props.multiple || !this.selectControl.props.changeOnClose) {
          this.selectControl._onValueChange()
        }
      },
    })

    super._config()
  }

  _wranOptionsValue(options, value) {
    const map = new Map()
    for (let index = 0; index < options.length; index++) {
      const opt = options[index]
      if (map.get(opt[value])) {
        console.warn(`Warning: Encountered two children with the same key, \`${opt[value]}\`.`)
        return false
      }
      map.set(opt[value], true)
    }
  }
}

export default SelectList
