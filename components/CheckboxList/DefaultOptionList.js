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
            children: [
              {
                tag: 'span',
                classes: {
                  checkbox: true,
                },
              },
              {
                tag: 'span',
                classes: {
                  text: true,
                },
                children: this.props.text,
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
