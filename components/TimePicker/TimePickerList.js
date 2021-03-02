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
    this.pickerControl.timeList[this.props.type] = this
  }

  _config() {
    let items = []
    const selected = []

    if (this.props.type === 'hour') {
      items = this.pickerControl.getHour()
      !this.pickerControl.empty && selected.push(this.pickerControl.time.hour)
    } else if (this.props.type === 'minute') {
      items = this.pickerControl.getMinute()
      !this.pickerControl.empty && selected.push(this.pickerControl.time.minute)
    } else if (this.props.type === 'second') {
      items = this.pickerControl.getSecond()
      !this.pickerControl.empty && selected.push(this.pickerControl.time.second)
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
      selectedItems: selected,

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

  resetTime() {
    if (this.pickerControl.defaultValue) {
      const t = this.pickerControl.defaultValue.split(':')
      if (this.props.type === 'hour') {
        this.selectItem(t[0])
      } else if (this.props.type === 'minute') {
        this.selectItem(t[1])
      } else {
        this.selectItem(t[2])
      }
    } else {
      this.unselectAllItems()
    }
  }

  scrollToKey() {
    const top = this.getSelectedItem() ? this.getSelectedItem().element.offsetTop - 3 : 0
    this.scroller.element.scrollTop = top
  }
}

export default SelectList
