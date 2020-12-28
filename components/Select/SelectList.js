import Component from '../Component/index'
import List from '../List/index'

class SelectList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'x-md',
      cols: 1,
      itemDefaults: {
        key() {
          return this.props.value
        },
        selectable: {
          byClick: true,
          canRevert: true,
        },
        _config: function () {
          this.setProps({
            children: this.props.text,
            selectable: {
              canRevert: this.list.selectControl.props.multiple === true,
            },
          })
        },
        events: {
          select() {
            const { selectControl } = this.list
            const selectProps = selectControl.props

            const selectedOption = { text: this.props.text, value: this.props.value }
            if (selectProps.multiple === false) {
              selectControl.selectedSingle.update(selectedOption)
              selectControl.popup.hide()
            } else {
              selectControl.selectedMultiple.appendItem(selectedOption)
            }
          },
          unselect() {
            const { selectControl } = this.list
            const selectProps = selectControl.props

            if (selectProps.multiple === true) {
              selectControl.selectedMultiple.removeItem(this.key)
            }
          },
        },
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _create() {
    super._create()

    this.selectControl = this.parent.parent.parent.selectControl
    this.selectControl.optionList = this
  }

  _config() {
    const selectProps = this.selectControl.props
    this.setProps({
      items: selectProps.options,
      itemDefaults: selectProps.optionDefaults,
      itemSelectable: {
        multiple: selectProps.multiple,
        byClick: true,
      },
      selectedItems: selectProps.value,
      events: {
        itemSelectionChange: () => {
          this.selectControl._onValueChange()
        },
      },
    })

    super._config()
  }
}

export default SelectList
