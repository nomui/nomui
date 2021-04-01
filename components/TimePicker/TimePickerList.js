import Component from '../Component/index'
import List from '../List/index'

class SelectList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'sm',
      cols: 1,
      min: '00',
      max: '59',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.scroller = this.parent
    this.timeWrapper = this.parent.parent.parent.parent.parent
    this.pickerControl = this.timeWrapper.parentPopup.pickerControl
    this.pickerControl.timeList[this.props.type] = this
    if (this.props.type === 'hour') {
      this.props.min = this.pickerControl.minTime.hour
      this.props.max = this.pickerControl.maxTime.hour
    }
  }

  _config() {
    let items = []
    const selected = []
    const that = this

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
      itemDefaults: {
        _config: function () {
          const key = this.props.key

          if (key < that.props.min || key > that.props.max) {
            this.setProps({
              disabled: true,
            })
          }
        },
      },

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

  refresh() {
    const selected = []
    this.getSelectedItem() && selected.push(this.getSelectedItem().props.key)
    this.props.selectedItems = selected

    this.update()

    this.scrollToKey()
  }

  scrollToKey() {
    const top = this.getSelectedItem() ? this.getSelectedItem().element.offsetTop - 3 : 0
    this.scroller.element.scrollTop = top
  }
}

export default SelectList
