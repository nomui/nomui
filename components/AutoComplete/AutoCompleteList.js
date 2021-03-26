import Component from '../Component/index'
import List from '../List/index'

class AutoCompleteList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'x-md',
      cols: 1,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.autoCompleteControl = this.parent.parent.parent.autoCompleteControl
    this.autoCompleteControl.optionList = this
  }

  _config() {
    this.setProps({
      items: [{ text: 'a', value: 'a' }],
    })

    super._config()
  }
}

export default AutoCompleteList
