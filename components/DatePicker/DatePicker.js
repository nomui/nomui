import Cols from '../Cols/index'
import Component from '../Component/index'
import List from '../List/index'
import Rows from '../Rows/index'
import Select from '../Select/index'
import Textbox from '../Textbox/index'
import {} from '../util/date'
import { formatDate, isNumeric } from '../util/index'
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
      showNow: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.dateInfo = null
    this.todayItem = null
    this.startTime = null
  }

  _config() {
    const that = this
    this.props.value = formatDate(this.props.value, this.props.format)

    const { disabled } = this.props
    // let currentDate = value !== null ? Date.parseString(value, format) : new Date()
    // if (!currentDate) {
    //   currentDate = new Date()
    // }

    // let year = currentDate.getFullYear()
    // let month = currentDate.getMonth() + 1
    // const day = currentDate.getDate()

    this.getCurrentDate()

    const minTime =
      this.props.showTime && this.props.minDate
        ? new Date(this.props.minDate).format(this.props.showTime.format || 'HH:mm:ss')
        : '00:00:00'

    const maxTime =
      this.props.showTime && this.props.maxDate
        ? new Date(this.props.maxDate).format(this.props.showTime.format || 'HH:mm:ss')
        : '23:59:59'

    this.startTime = minTime

    this.endTime = maxTime

    this.props.minDate = this.props.minDate
      ? new Date(this.props.minDate).format('yyyy-MM-dd')
      : null
    this.props.maxDate = this.props.maxDate
      ? new Date(this.props.maxDate).format('yyyy-MM-dd')
      : null

    this.showNow = true

    if (
      (this.props.minDate && new Date().isBefore(new Date(this.props.minDate))) ||
      (this.props.maxDate && new Date().isAfter(new Date(this.props.maxDate)))
    ) {
      this.showNow = false
    }

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
          onShow: () => {
            this.getCurrentDate()
            this.reActiveList()
            that.props.showTime && that.timePicker.onShow()
          },
          onHide: () => {
            that.onPopupHide()
          },
          classes: {
            'nom-date-picker-popup': true,
            'nom-date-picker-with-time': this.props.showTime,
          },
          triggerAction: 'click',

          children: [
            {
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
                          value: that.year,
                          _created: function () {
                            that.years = this
                          },
                          options: this._getYears(),
                          onValueChange: (changed) => {
                            that.year = changed.newValue
                            that.days.update({
                              items: that._getDays(that.year, that.month),
                            })
                          },
                        },
                        {
                          component: Select,
                          value: that.month,
                          _created: function () {
                            that.months = this
                          },
                          options: this._getMonths(),
                          onValueChange: function (changed) {
                            that.month = changed.newValue
                            that.days.update({
                              items: that._getDays(that.year, that.month),
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
                      // selectedItems: that.props.value
                      //   ? `${that.year}-${that.month}-${that.day}`
                      //   : null,
                      itemSelectable: {
                        byClick: true,
                        multiple: false,
                        scrollIntoView: true,
                      },
                      items: this._getDays(that.year, that.month),
                      itemDefaults: {
                        key: function () {
                          this.props.date = new Date(
                            this.props.year,
                            this.props.month - 1,
                            this.props.day,
                          ).format('yyyy-M-d')

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

                          if (that.props.minDate && that.props.showTime) {
                            const myday = parseInt(new Date(that.props.minDate).format('d'), 10)
                            if (myday === args.sender.props.day) {
                              that.timePicker.update({
                                startTime: that.startTime,
                              })
                            } else if (myday < args.sender.props.day) {
                              that.timePicker.update({
                                startTime: '00:00:00',
                              })
                            }
                          }

                          that.updateValue()

                          that.timePicker && that.timePicker.onShow()
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
                  startTime: minTime,
                  // value: new Date(this.props.value).format(this.props.showTime.format),
                },
              ],
            },
            this.props.showNow && {
              component: 'Cols',
              attrs: {
                style: {
                  padding: '5px 0',
                },
              },
              items: [
                {
                  component: 'Button',
                  size: 'small',
                  text: '此刻',
                  disabled: !this.showNow,
                  onClick: () => {
                    this.setNow()
                  },
                },
              ],
            },
          ],
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
    let lastDayCount = this._getDaysInMonth(year, month - 1)
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

  reActiveList() {
    this.years.setValue(this.year)
    this.months.setValue(this.month)
    this.props.value &&
      this.days.update({ selectedItems: `${this.year}-${this.month}-${this.day}` })
  }

  getCurrentDate() {
    let currentDate = new Date()
    if (this.props.value !== null) {
      currentDate = Date.parseString(this.props.value, this.props.format)
    } else if (this.props.minDate) {
      currentDate = new Date(this.props.minDate)
    }

    // let currentDate =
    //   this.props.value !== null ? Date.parseString(this.props.value, this.props.format) : new Date()

    if (!currentDate) {
      currentDate = new Date()
    }

    this.year = currentDate.getFullYear()
    this.month = currentDate.getMonth() + 1
    this.day = currentDate.getDate()

    if (this.props.value && this.props.showTime && this.timePicker) {
      this.timePicker.setValue(new Date(this.props.value).format(this.props.showTime.format))
    } else if (!this.props.value && this.props.showTime && this.timePicker) {
      this.timePicker.clearTime()
    }
  }

  handleTimeChange(param) {
    if (!this.days.getSelectedItem() && this.todayItem && this.todayItem.props) {
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
    this.props.value = null
    this.setValue(null)
    this.dateInfo = null
    this.days && this.days.props && this.days.unselectAllItems()
    if (this.props.showTime && this.timePicker && this.timePicker.props) {
      this.timePicker.clearTime()
    }
  }

  setNow() {
    this.setValue(new Date().format(this.props.format))
    this.popup.hide()
  }

  updateValue() {
    const date = new Date(
      this.dateInfo.year || new Date().format('yyyy'),
      isNumeric(this.dateInfo.month) ? this.dateInfo.month : new Date().format('MM') - 1,
      this.dateInfo.day || new Date().format('dd'),
      this.dateInfo.hour || '00',
      this.dateInfo.minute || '00',
      this.dateInfo.second || '00',
    )

    this.setValue(date.format(this.props.format))
  }

  showPopup() {
    this.popup.show()
  }

  onPopupHide() {
    this.getValue() && this.props.onChange && this._callHandler(this.props.onChange)
  }

  _onBlur() {
    if (!Date.isValid(this.getValue(), this.props.format)) {
      this.input.setText(null)
    }
    super._onBlur()
  }
}

Component.register(DatePicker)

export default DatePicker
