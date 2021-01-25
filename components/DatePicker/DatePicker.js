import Cols from '../Cols/index'
import Component from '../Component/index'
import List from '../List/index'
import Rows from '../Rows/index'
import Select from '../Select/index'
import Textbox from '../Textbox/index'
import {} from '../util/date'

class DatePicker extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      format: 'yyyy-MM-dd',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _config() {
    const { value, format } = this.props
    const currentDate = value !== null ? Date.parseString(value, format) : new Date()
    let year = currentDate.getFullYear()
    let month = currentDate.getMonth() + 1
    const day = currentDate.getDate()
    const that = this

    this.setProps({
      rightIcon: 'calendar',
      popup: {
        styles: {
          padding: '1',
        },
        triggerAction: 'click',
        attrs: {
          style: {
            width: '300px',
          },
        },
        children: {
          component: Rows,
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
                  const isToday = this.props.date === new Date().format('yyyy-M-dd')

                  if (this.props.lastMonth === true || this.props.nextMonth === true) {
                    textStyles.push('muted')
                  }

                  if (isToday) {
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
                  })
                },
                onClick: function (args) {
                  that.setValue(args.sender.props.date)
                  that.popup.hide()
                },
              },
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

    for (let i = thisYear + 20; i > thisYear - 30; i--) {
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
          date: `${lastMonthYear}-${lastMonthMonth}-${i}`,
        })
      }
    }

    for (i = 1; i < currentDayCount + 1; i++) {
      daysList.push({
        day: i,
        year: year,
        month: month,
        date: `${year}-${month}-${i}`,
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
        date: `${nextMonthYear}-${nextMonthMonth}-${i}`,
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

  _daylightSavingAdjust(date) {
    if (!date) {
      return null
    }
    date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0)
    return date
  }
}

Component.register(DatePicker)

export default DatePicker
