import Component from '../Component/index'
import List from '../List/index'
import OptionListMixin from './OptionListMixin'

class OptionList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'x-md',
      itemDefaults: {
        tag: 'label',
        _config: function () {
          this.setProps({
            selected: this.props.checked === true,
            children: [
              {
                tag: 'span',
                classes: {
                  checkbox: true,
                },
              },
              // { tag: 'i' },
              {
                tag: 'span',
                classes: {
                  text: true,
                },
                children: this.list.controlRef.props.itemRender
                  ? this.list.controlRef.props.itemRender({ itemData: this.props })
                  : this.props[props.fieldName.text],
              },
            ],
          })
        },
      },
    }

    super(Component.extendProps(defaults, props), OptionListMixin, ...mixins)
  }
}

export default OptionList
