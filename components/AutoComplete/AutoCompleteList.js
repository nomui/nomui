import Component, { n } from '../Component/index'
import List from '../List/index'
import AutoCompleteListItemMixin from './AutoCompleteListItemMixin'

class AutoCompleteList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'x-md',
      cols: 1,
      optionDefaults: {
        key() {
          return this.props.value
        },
        _config: function () {
          this.setProps({
            children: this.props.value,
          })
        },
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.autoCompleteControl = this.parent.parent.parent.autoCompleteControl
    this.autoCompleteControl.optionList = this
  }

  _config() {
    const { optionDefaults, options } = this.props
    const value = this.autoCompleteControl.props.value ? this.autoCompleteControl.props.value : ''

    this.setProps({
      items: options || [],
      itemDefaults: n(null, optionDefaults, null, [AutoCompleteListItemMixin]),
      itemSelectable: {
        multiple: false,
        byClick: true,
      },
      selectedItems: value,

      onItemSelectionChange: () => {
        this.autoCompleteControl._onValueChange()
      },
    })

    super._config()
  }
}

export default AutoCompleteList
