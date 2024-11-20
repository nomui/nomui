import Component, { n } from '../Component/index'
import List from '../List/index'
import AutoCompleteListItemMixin from './AutoCompleteListItemMixin'

class AutoCompleteList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'x-md',
      cols: 1,
      vertical: true,
      optionDefaults: {
        key() {
          return this.props.value
        },
        _config: function () {
          const { filterName, optionFields } = this.parent.parent.parent.autoCompleteControl.props
          if (optionFields.text && optionFields.value) {
            this.setProps({
              children: this.props[optionFields.text]
            })
          }
          else {
            this.setProps({
              children: filterName === 'text' ? this.props.value : this.props.text,
            })
          }

        },
        ...props.optionDefaults
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
    const { searchable, options: aops } = this.autoCompleteControl.props
    const { optionDefaults, options: sops } = this.props
    const value = this.autoCompleteControl.props.value || ''
    const options = searchable ? aops : sops
    this.setProps({
      items: options || [],
      itemDefaults: n(null, optionDefaults, null, [AutoCompleteListItemMixin]),
      itemSelectable: {
        multiple: false,
        byClick: true,
        scrollIntoView: true,
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
