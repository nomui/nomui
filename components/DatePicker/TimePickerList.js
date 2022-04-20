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
    const that = this
    const { currentDateBeforeMin, currentDateAfterMax } = this.pickerControl.datePicker
    const { _isHourOverRange, _isMinuteOverRange } = this.pickerControl
    const { type } = this.props
    this.props.min = this.pickerControl.timeRange[type][0]
    this.props.max = this.pickerControl.timeRange[type][1]

    if (type === 'hour') {
      items = this.pickerControl.getHour()
    } else if (type === 'minute') {
      items = this.pickerControl.getMinute()
    } else if (type === 'second') {
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
        scrollIntoView: {
          block: 'start',
          scrollMode: 'always',
        },
      },
      attrs: {
        style: {
          position: 'relative',
        },
      },
      itemDefaults: {
        _config: function () {
          const key = this.props.key
          const disabledOverRange =
            (type !== 'hour' && _isHourOverRange) || (type === 'second' && _isMinuteOverRange)

          // 日期部分已经超出 min 或 max
          this.setProps({
            disabled:
              key < that.props.min ||
              key > that.props.max ||
              currentDateBeforeMin ||
              currentDateAfterMax ||
              disabledOverRange,
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
