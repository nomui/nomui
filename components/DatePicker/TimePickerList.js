import Component from '../Component/index'
import List from '../List/index'

class DateTimePickerList extends List {
  constructor(props, ...mixins) {
    const defaults = {
      gutter: 'sm',
      cols: 1,
      min: '00',
      max: '59',
      scrollIntoView: false,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.scroller = this.parent
    this.timeWrapper = this.parent.parent.parent.parent.parent
    this.pickerControl = this.timeWrapper.pickerControl
    this.pickerControl.timeList[this.props.type] = this
  }

  _config() {
    let items = []
    const selected = []
    const that = this
    const { currentDateBeforeMin, currentDateAfterMax } = this.pickerControl.datePicker
    this.props.min = this.pickerControl.timeRange[this.props.type][0]
    this.props.max = this.pickerControl.timeRange[this.props.type][1]

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
        scrollIntoView: true,
      },
      attrs: {
        style: {
          position: 'relative',
        },
      },
      selectedItems: selected,
      itemDefaults: {
        _config: function () {
          const key = this.props.key

          // 日期部分已经超出 min 或 max
          this.setProps({
            disabled:
              key < that.props.min ||
              key > that.props.max ||
              currentDateBeforeMin ||
              currentDateAfterMax,
          })
        },
      },

      onItemSelectionChange: () => {
        this.onChange()
      },
    })

    super._config()
  }

  onChange() {
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
        this.selectItem(t[0], { triggerSelectionChange: false })
      } else if (this.props.type === 'minute') {
        this.selectItem(t[1], { triggerSelectionChange: false })
      } else {
        this.selectItem(t[2], { triggerSelectionChange: false })
      }
    } else {
      this.unselectAllItems()
    }
  }

  refresh() {
    this.update()
  }
}

export default DateTimePickerList
