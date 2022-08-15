import Component from '../Component/index'
import List from '../List/index'
import { isChrome49 } from '../util/index'

class RadioOptionList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      itemDefaults: {
        tag: 'label',
        _config: function () {
          this.setProps({
            children: [
              {
                tag: 'span',
                classes: {
                  radio: true,
                },
              },
              // { tag: 'i' },
              {
                tag: 'span',
                classes: {
                  text: true,
                },
                children: this.props[this.parent.parent.parent.parent.parent.props.fieldName.text],
              },
            ],
          })
        },
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.radioList = this.parent.parent
    this.radioList.optionList = this
  }

  _config() {
    const listProps = this.radioList.props
    if (listProps.type === 'radio') {
      this.setProps({
        gutter: 'x-md',
      })
    }
    this.setProps({
      attrs: {
        style: {
          overflow: isChrome49() ? 'visible' : '',
        },
      },
      disabled: listProps.disabled,
      items: listProps.options,
      itemDefaults: listProps.optionDefaults,
      itemSelectable: {
        byClick: true,
      },
      selectedItems: listProps.value,
      onItemSelectionChange: () => {
        this.radioList._onValueChange()
      },
    })

    super._config()
  }
}

export default RadioOptionList
