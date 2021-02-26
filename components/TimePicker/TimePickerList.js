import Component from '../Component/index'
import List from '../List/index'

class SelectList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'sm',
      cols: 1,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.scroller = this.parent
    this.timeWrapper = this.parent.parent.parent.parent.parent
    this.pickerControl = this.timeWrapper.parentPopup.pickerControl
  }

  _config() {
    let items = []

    if (this.props.type === 'hour') {
      items = this.pickerControl.getHour()
    } else if (this.props.type === 'minute') {
      items = this.pickerControl.getMinute()
    } else if (this.props.type === 'second') {
      items = this.pickerControl.getSecond()
    }

    this.setProps({
      styles: {
        padding: '3px',
      },

      items: items,
      itemSelectable: {
        multiple: false,
        byClick: true,
      },
      selectedItems: null,

      onItemSelectionChange: () => {
        this.onChange()
      },
    })

    super._config()
  }

  onChange() {
    this.scrollToKey()
    this.setTime()
  }

  setTime() {
    const key = this.getSelectedItem().key || '00'
    this.pickerControl.setTime({
      type: this.props.type,
      value: key,
    })
  }

  scrollToKey() {
    const top = this.getSelectedItem().element.offsetTop - 3
    this.scroller.element.scrollTop = top
  }
}

export default SelectList
