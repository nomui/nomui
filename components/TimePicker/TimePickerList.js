import Component from '../Component/index'
import List from '../List/index'

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

    this.timeWrapper = this.parent.parent
    this.pickerControl = this.timeWrapper.parentPopup.pickerControl
  }

  _config() {
    const that = this

    let items = []

    if (this.props.type === 'hour') {
      items = this.pickerControl.getHour()
    } else if (this.props.type === 'minute') {
      items = this.pickerControl.getMinute()
    } else if (this.props.type === 'second') {
      items = this.pickerControl.getSecond()
    }

    this.setProps({
      items: items,
      itemSelectable: {
        multiple: false,
        byClick: true,
      },
      selectedItems: null,

      onItemSelectionChange: (data) => {
        this.onChange(data)
      },
    })

    console.log(that)
    super._config()
  }
}

export default SelectList
