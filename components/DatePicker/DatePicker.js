import Cols from '../Cols/index'
import Component from '../Component/index'
import List from '../List/index'
import Rows from '../Rows/index'
import Select from '../Select/index'
import Textbox from '../Textbox/index'
import {} from '../util/date'
import TimePickerPanel from './TimePickerPanel'

class DatePicker extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      format: 'yyyy-MM-dd',
      disabledTime: null,
      minDate: null,
      maxDate: null,
      yearRange: [50, 20],
      showTime: false,
      allowClear: true,
      onChange: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.dateInfo = null
    this.todayItem = null
  }

  _config() {
    const { value, format, disabled } = this.props
    let currentDate = value !== null ? Date.parseString(value, format) : new Date()
    if (!currentDate) {
      currentDate = new Date()
    }
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const that = this

    this.setProps({
      leftIcon: 'calendar',
      rightIcon: {
        component: 'Icon',
        type: 'times',
        hidden: !this.props.allowClear,
        onClick: (args) => {
          this.clearTime()
          args.event && args.event.stopPropagation()
        },
      },
      control: {
        disabled: disabled,
        popup: {
          _created: function () {
            that.popup = this
          },
          styles: {
            padding: '1',
          },
          onShown: () => {
            that.props.showTime && that.timePicker.onShown()
          },
          classes: {
            'nom-date-picker-popup': true,
            'nom-date-picker-with-time': this.props.showTime,
          },
          triggerAction: 'click',

          children: {
            component: 'Cols',
            items: [
              {
                component: Rows,
                attrs: {
                  style: {
                    width: '260px',
                  },
                },
                items: [
                  {
                    component: Cols,
                    justify: 'between',
                    fills: true,
                    items: [
                      {
                        component: Select,
                        value: year,
                        options: this._getYears(),
                        onValueChange: (changed) => {
                          year = changed.newValue
                          that.days.update({
                            items: that._getDays(year, month),
                          })
                        },
                      },
                      {
                        component: Select,
                        value: month,
                        options: this._getMonths(),
                        onValueChange: function (changed) {
                          month = changed.newValue
                          that.days.update({
                            items: that._getDays(year, month),
                          })
                        },
                      },
                    ],
                  },
                  {
                    component: Cols,
                    items: ['日', '一', '二', '三', '四', '五', '六'],
                    fills: true,
                    gutter: null,
                    itemDefaults: {
                      styles: {
                        text: 'center',
                      },
                    },
                  },
                  {
                    component: List,
                    _created: function () {
                      that.days = this
                    },
                    gutter: 'sm',
                    cols: 7,
                    selectedItems: `${year}-${month}-${day}`,
                    itemSelectable: {
                      byClick: true,
                    },
                    items: this._getDays(year, month),
                    itemDefaults: {
                      key: function () {
                        return this.props.date
                      },
                      styles: {
                        padding: 'd375',
                        hover: {
                          color: 'darken',
                        },
                        selected: {
                          color: 'primary',
                        },
                      },
                      attrs: {
                        role: 'button',
                      },
                      _config: function () {
                        const textStyles = ['center']
                        const date = that._getDateString(
                          this.props.year,
                          this.props.month,
                          this.props.day,
                        )
                        const isToday = date === new Date().format('yyyy-MM-dd')
                        let isDisabled = false
                        if (that.props.disabledTime) {
                          isDisabled = that.props.disabledTime(date)
                        }

                        if (
                          that.props.minDate &&
                          new Date(date).isBefore(new Date(that.props.minDate))
                        ) {
                          isDisabled = true
                        }

                        if (
                          that.props.maxDate &&
                          new Date(date).isAfter(new Date(that.props.maxDate))
                        ) {
                          isDisabled = true
                        }

                        if (this.props.lastMonth === true || this.props.nextMonth === true) {
                          textStyles.push('muted')
                        }

                        if (isToday) {
                          that.todayItem = this
                          this.setProps({
                            styles: {
                              border: ['1px', 'primary'],
                            },
                          })
                        }

                        this.setProps({
                          styles: {
                            text: textStyles,
                          },
                          children: this.props.day,
                          disabled: !!isDisabled,
                        })
                      },
                      onClick: function (args) {
                        const { year: selYear, month: selMonth, day: selDay } = args.sender.props

                        that.dateInfo = {
                          ...that.dateInfo,
                          ...{
                            year: selYear,
                            month: selMonth - 1,
                            day: selDay,
                          },
                        }

                        that.updateValue()
                        !that.props.showTime && that.popup.hide()
                      },
                    },
                  },
                ],
              },
              this.props.showTime && {
                component: TimePickerPanel,
                attrs: {
                  style: {
                    'border-left': '1px solid #ddd',
                    'padding-left': '5px',
                  },
                },
                onValueChange: (data) => {
                  this.handleTimeChange(data)
                },
              },
            ],
          },
        },
      },
    })

    super._config()
  }

  _getYears() {
    const years = []
    const thisYear = new Date().getFullYear()

    for (let i = thisYear + this.props.yearRange[1]; i > thisYear - this.props.yearRange[0]; i--) {
      years.push({
        text: i,
        value: i,
      })
    }

    return years
  }

  _getMonths() {
    const months = []

    for (let i = 1; i < 13; i++) {
      months.push({
        text: i,
        value: i,
      })
    }

    return months
  }

  _getDays(year, month) {
    const firstDay = this._getFirstDayOfMonth(year, month)
    const currentDayCount = this._getDaysInMonth(year, month)
    let lastDayCount = this._getDaysInMonth(year, month)
    const daysList = []
    let i = 0
    let lastMonthYear = year
    let lastMonthMonth = month - 1
    let nextMonthYear = year
    let nextMonthMonth = month + 1

    if (month === 1) {
      lastDayCount = this._getDaysInMonth(year - 1, 12)
      lastMonthYear = year - 1
      lastMonthMonth = 11
    }

    if (firstDay > 0) {
      for (i = lastDayCount - firstDay + 1; i < lastDayCount + 1; i++) {
        daysList.push({
          day: i,
          year: lastMonthYear,
          month: lastMonthMonth,
          lastMonth: true,
        })
      }
    }

    for (i = 1; i < currentDayCount + 1; i++) {
      daysList.push({
        day: i,
        year: year,
        month: month,
      })
    }
    const nextMonthCount = 7 - (daysList.length % 7 || 7)
    if (month === 12) {
      nextMonthYear++
      nextMonthMonth = 1
    }
    for (i = 1; i < nextMonthCount + 1; i++) {
      daysList.push({
        day: i,
        year: nextMonthYear,
        month: nextMonthMonth,
        nextMonth: true,
      })
    }
    return daysList
  }

  /* 求XX年XX月1号是星期几 */
  _getFirstDayOfMonth(year, month) {
    return new Date(year, month - 1, 1).getDay()
  }

  /* 求XX年XX月有多少天 */
  _getDaysInMonth(year, month) {
    return 32 - this._daylightSavingAdjust(new Date(year, month - 1, 32)).getDate()
  }

  _getDoubleDigit(num) {
    if (num < 10) {
      return `0${num}`
    }

    return num
  }

  _getDateString(year, month, day) {
    return `${year}-${this._getDoubleDigit(month)}-${this._getDoubleDigit(day)}`
  }

  _daylightSavingAdjust(date) {
    if (!date) {
      return null
    }
    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0)
    return date
  }

  _disable() {
    super._disable()
    if (this.firstRender === false) {
      this.control.disable()
    }
  }

  _enable() {
    super._enable()
    if (this.firstRender === false) {
      this.control.enable()
    }
  }

  handleTimeChange(param) {
    if (!this.days.getSelectedItem()) {
      this.days.selectItem(this.todayItem)
    }
    this.dateInfo = {
      ...this.dateInfo,
      ...{
        hour: param.hour,
        minute: param.minute,
        second: param.second,
      },
    }

    this.updateValue()
  }

  clearTime() {
    this.setValue(null)
    this.days.unselectAllItems()
    this.props.showTime && this.timePicker.resetList()
  }

  updateValue() {
    const date = new Date(
      this.dateInfo.year || new Date().format('yyyy'),
      this.dateInfo.month || new Date().format('MM') - 1,
      this.dateInfo.day || new Date().format('dd'),
      this.dateInfo.hour || '00',
      this.dateInfo.minute || '00',
      this.dateInfo.second || '00',
    )

    this.setValue(date.format(this.props.format))
    this.props.onChange && this._callHandler(this.props.onChange)
  }

  showPopup() {
    this.popup.show()
  }
}

Component.register(DatePicker)

export default DatePicker
