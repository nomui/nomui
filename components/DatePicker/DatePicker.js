import Component from '../Component/index'
import Flex from '../Flex/index'
import List from '../List/index'
import Textbox from '../Textbox/index'
import {} from '../util/date'
import { formatDate, isFunction, isNumeric, isValidDate } from '../util/index'
import TimePickerPanel from './TimePickerPanel'

class DatePicker extends Textbox {
  constructor(props, ...mixins) {
    super(Component.extendProps(DatePicker.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.dateInfo = null
    this.todayItem = null
    this.startTime = null
    this.originValue = null
  }

  _config() {
    const that = this

    if (isValidDate(this.props.value)) {
      this.props.value = formatDate(this.props.value, this.props.format)
    }
    const { disabled, extraTools, startWeekOnMonday } = this.props

    // 如果设置了从周一开始，则将周日移动到最后
    if (startWeekOnMonday) {
      const weekTextArray = this.props.weekText.split(' ')
      const firstDay = weekTextArray.shift()
      weekTextArray.push(firstDay)

      this.props.weekText = weekTextArray.join(' ')
    }

    if (this.props.weekMode) {
      this.props.showTime = false
    }

    let extra = []
    if (isFunction(extraTools)) {
      extra = Array.isArray(extraTools(this)) ? extraTools(this) : [extraTools(this)]
    } else if (Array.isArray(extraTools)) {
      extra = extraTools
    }

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

    this.minDateDay = this.props.minDate ? new Date(this.props.minDate).format('yyyy-MM-dd') : null
    this.maxDateDay = this.props.maxDate ? new Date(this.props.maxDate).format('yyyy-MM-dd') : null

    this.showNow = true

    if (
      (this.props.minDate && new Date().isBefore(new Date(`${this.props.minDate} ${minTime}`))) ||
      (this.props.maxDate && new Date().isAfter(new Date(`${this.props.maxDate} ${maxTime}`)))
    ) {
      this.showNow = false
    }

    const { weekText } = this.props

    this.setProps({
      leftIcon: 'calendar',
      clearProps: {
        component: 'Icon',
        type: 'times',
        classes: {
          'nom-field-clear-handler': true,
        },
        hidden: !this.props.allowClear || this.props.disabled,
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

          onShow: () => {
            this.getCurrentDate()
            this.reActiveList()
            this.yearMonthContainerRef.hide()
            // that.props.showTime && that.timePicker.onShow()
            setTimeout(() => {
              this._fixTimePickerHeight && this._fixTimePickerHeight()
            }, 0)
          },
          onHide: () => {
            that.onPopupHide()
          },
          animate: this.props.animate,
          classes: {
            'nom-date-picker-popup': true,
            'nom-date-picker-with-time': this.props.showTime,
          },
          triggerAction: 'click',

          children: [
            {
              component: Flex,
              cols: [
                {
                  attrs: {
                    style: {
                      width: '280px',
                    },
                  },
                  rows: [
                    {
                      classes: {
                        'nom-datepicker-popup-hd': true,
                      },
                      justify: 'between',
                      align: 'center',

                      gap: 'small',
                      cols: [
                        that.props.showYearSkip && {
                          children: {
                            component: 'Button',
                            icon: 'double-left',
                            type: 'text',
                            onClick: ({ event }) => {
                              event.stopPropagation()
                              that._yearMinus()
                            },
                          },
                        },
                        {
                          children: {
                            component: 'Button',
                            icon: 'left',
                            type: 'text',
                            onClick: ({ event }) => {
                              event.stopPropagation()
                              that._monthMinus()
                            },
                          },
                        },
                        {
                          grow: true,
                          align: 'center',
                          children: {
                            component: 'Flex',
                            onClick: () => {
                              that.yearMonthContainerRef.show()
                              that.yearClicked = false
                              that.monthClicked = false
                              that.yearRef.selectItem(that.year)
                              that.monthRef.selectItem(that.month)
                            },
                            gap: 'small',
                            cols: [
                              {
                                tag: 'h5',
                                ref: (c) => {
                                  that.yearTextRef = c
                                },
                                children: that.props.yearTextFormatter(that.year),
                              },
                              {
                                tag: 'h5',
                                ref: (c) => {
                                  that.monthTextRef = c
                                },
                                children: that.props.monthMap[that.month],
                              },
                            ],
                          },
                        },
                        {
                          children: {
                            component: 'Button',
                            icon: 'right',
                            type: 'text',
                            onClick: ({ event }) => {
                              event.stopPropagation()
                              that._monthPlus()
                            },
                          },
                        },
                        that.props.showYearSkip && {
                          children: {
                            component: 'Button',
                            icon: 'double-right',
                            type: 'text',
                            onClick: ({ event }) => {
                              event.stopPropagation()
                              that._yearPlus()
                            },
                          },
                        },
                      ],
                    },
                    {
                      classes: {
                        'nom-datepicker-popup-bd': true,
                      },
                      rows: [
                        {
                          cols: weekText.split(' '),
                          fills: true,
                          // gap: 'md',
                          classes: {
                            'nom-datepicker-panel-header': true,
                          },
                        },
                        {
                          component: List,
                          _created: function () {
                            that.days = this
                          },
                          // onRendered: () => {
                          //   that._recountHeight()
                          // },

                          cols: 7,
                          classes: {
                            'nom-datepicker-panel-days': true,
                          },
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
                            classes: {
                              'nom-datepicker-day-item': true,
                            },
                            attrs: {
                              role: 'button',
                            },
                            _config: function () {
                              let isMuted = false
                              const date = that._getDateString(
                                this.props.year,
                                this.props.month,
                                this.props.day,
                              )

                              // 根据当前日期获取周几，然后将跟它相邻的同一周日期添加到数组中

                              const weekDays = []
                              const currentDate = new Date(date)
                              const currentDay = currentDate.getDay()

                              // 根据 startWeekOnMonday 配置项决定周的起点是周一还是周日
                              const startOfWeekOffset = that.props.startWeekOnMonday
                                ? currentDay === 0
                                  ? -6
                                  : 1 - currentDay
                                : -currentDay

                              // 计算当前周的起始日期
                              const startOfWeek = new Date(currentDate)
                              startOfWeek.setDate(currentDate.getDate() + startOfWeekOffset)

                              // 计算当前周的每一天
                              for (let i = 0; i < 7; i++) {
                                const _day = new Date(startOfWeek)
                                _day.setDate(startOfWeek.getDate() + i)
                                weekDays.push(_day.format('yyyy-MM-dd'))
                              }

                              this.weekDays = weekDays

                              const isFirstDayOfWeek = date === weekDays[0]
                              const isLastDayOfWeek = date === weekDays[6]

                              const isToday = date === new Date().format('yyyy-MM-dd')
                              let isDisabled = false
                              if (that.props.disabledTime) {
                                isDisabled = that.props.disabledTime(date)
                              }

                              if (
                                that.props.minDate &&
                                new Date(date).isBefore(new Date(that.minDateDay))
                              ) {
                                isDisabled = true
                              }

                              if (
                                that.props.maxDate &&
                                new Date(date).isAfter(new Date(that.maxDateDay))
                              ) {
                                isDisabled = true
                              }

                              if (this.props.lastMonth === true || this.props.nextMonth === true) {
                                isMuted = true
                              }

                              if (isToday) {
                                that.todayItem = this

                                this.setProps({
                                  classes: {
                                    'nom-datepicker-today-item': true,
                                  },
                                })
                              }

                              if (that.props.weekMode) {
                                this.weekCount = that._getWeekNumber(date)
                                this.setProps({
                                  tooltip: that.props.weekCountText.replace(
                                    '{week}',
                                    this.weekCount,
                                  ),
                                })
                              }

                              this.setProps({
                                styles: {
                                  text: 'center',
                                },
                                attrs: {
                                  'data-date': date,
                                },
                                classes: {
                                  'nom-datepicker-item-muted': isMuted,
                                  'nom-datepicker-item-first-day-of-week': isFirstDayOfWeek,
                                  'nom-datepicker-item-last-day-of-week': isLastDayOfWeek,
                                },
                                children: this.props.day,
                                disabled: !!isDisabled,
                              })
                            },
                            _rendered: function () {
                              if (that.props.weekMode) {
                                const { weekDays } = this

                                this.element.addEventListener('mouseenter', () => {
                                  that.days.element
                                    .querySelectorAll(`[data-date]`)
                                    .forEach((item) => {
                                      if (weekDays.includes(item.dataset.date)) {
                                        item.classList.add('nom-datepicker-item-week-hover')
                                      } else {
                                        item.classList.remove('nom-datepicker-item-week-hover')
                                      }
                                    })
                                })
                              }
                            },
                            onClick: function (args) {
                              const {
                                year: selYear,
                                month: selMonth,
                                day: selDay,
                              } = args.sender.props

                              that.dateInfo = {
                                ...that.dateInfo,
                                ...{
                                  year: selYear,
                                  month: selMonth - 1,
                                  day: selDay,
                                },
                              }

                              if (that.props.weekMode) {
                                // 周模式下选择日期，将选择的日期设置为当前周的第一天
                                const firstDayOfWeek = new Date(args.sender.weekDays[0])
                                that.dateInfo = {
                                  year: firstDayOfWeek.getFullYear(),
                                  month: firstDayOfWeek.getMonth(),
                                  day: firstDayOfWeek.getDate(),
                                }

                                that.updateValue()
                                that.popup.hide()
                                return
                              }

                              if (that.props.showTime) {
                                that._updateTimePickerStartEndTime(args.sender.props.day)
                              }

                              that.updateValue()

                              if (that.timePicker) {
                                that.timePicker.onShow()
                                that._fixTimePickerHeight()
                              }
                              !that.props.showTime && that.popup.hide()
                            },
                          },
                          onRendered: ({ inst }) => {
                            if (
                              that.props.weekMode &&
                              inst.props.selectedItems &&
                              inst.props.selectedItems.length
                            ) {
                              const item = inst.getSelectedItem()
                              const { weekDays } = item
                              // 遍历this.element的子元素，查找[data-date]属性值在sibs中的元素，给它们加上nom-datepicker-item-week-selected类，同时移除其他元素的nom-datepicker-item-week-selected类
                              inst.element.querySelectorAll(`[data-date]`).forEach((n) => {
                                if (weekDays.includes(n.dataset.date)) {
                                  n.classList.add('nom-datepicker-item-week-selected')
                                } else {
                                  n.classList.remove('nom-datepicker-item-week-selected')
                                }
                              })
                            }
                          },
                        },
                      ],
                    },
                  ],
                },
                this.props.showTime && {
                  component: TimePickerPanel,
                  ref: (c) => {
                    this.timePickerRef = c
                  },
                  classes: {
                    'nom-datepicker-time-panel': true,
                  },
                  onValueChange: (data) => {
                    this.handleTimeChange(data)
                  },
                  // 初始化传入 startTime, endTime
                  startTime: this.currentDateBeforeMin ? minTime : '00:00:00',
                  endTime: this.currentDateAfterMax ? maxTime : '23:59:59',
                  value:
                    this.props.value &&
                    new Date(this.props.value.replace(/-/g, '/')).format(
                      this.props.showTime.format || 'HH:mm:ss',
                    ),
                },
              ],
            },

            (this.props.showNow || extra.length) && {
              component: Flex,
              classes: {
                'nom-datepicker-footer': true,
              },
              cols: [
                ...extra,
                {
                  component: 'Button',
                  size: 'small',
                  text: that._getNowText(),
                  disabled: !this.showNow,
                  renderIf: this.props.showNow,
                  onClick: () => {
                    if (that.props.weekMode) {
                      // 周模式下选择日期，将选择的日期设置为当前周的第一天
                      const today = new Date()
                      const currentDay = today.getDay()
                      const startOfWeekOffset = that.props.startWeekOnMonday
                        ? currentDay === 0
                          ? -6 // 如果今天是周日，则回到上周一
                          : 1 - currentDay // 否则回到本周一
                        : -currentDay // 如果从周日开始，则回到本周日

                      const startOfWeek = new Date(today)
                      startOfWeek.setDate(today.getDate() + startOfWeekOffset)

                      that.dateInfo = {
                        year: startOfWeek.getFullYear(),
                        month: startOfWeek.getMonth(), // 注意：getMonth() 返回 0-11
                        day: startOfWeek.getDate(),
                      }

                      that.updateValue()
                      that.popup.hide()
                      return
                    }
                    if (that.props.showTime) {
                      that._updateTimePickerStartEndTime(new Date().getDate())
                    }
                    this.setNow()
                  },
                },
              ],
            },

            {
              ref: (c) => {
                that.yearMonthContainerRef = c
              },
              classes: {
                'nom-datepicker-year-month': true,
              },
              hidden: true,
              children: {
                component: 'Flex',
                vertical: true,
                items: [
                  {
                    classes: {
                      'nom-datepicker-year-month-back': true,
                    },
                    children: {
                      component: 'Button',
                      icon: 'left',
                      text: that.props.backText,
                      type: 'text',
                      onClick: ({ event }) => {
                        event.stopPropagation()
                        that.yearMonthContainerRef.hide()
                        that._fixTimePickerHeight()
                      },
                    },
                  },
                  {
                    component: 'Flex',
                    classes: {
                      'nom-datepicker-year-month-container': true,
                    },
                    items: [
                      {
                        component: 'List',
                        cols: 1,
                        itemSelectable: {
                          byClick: true,
                          scrollIntoView: true,
                          multiple: false,
                        },
                        ref: (c) => {
                          that.yearRef = c
                        },
                        itemDefaults: {
                          key: function () {
                            return this.props.value
                          },
                          onConfig: ({ inst }) => {
                            inst.setProps({
                              children: that.props.yearTextFormatter(inst.props.text),
                            })
                          },
                          onClick: () => {
                            if (!that.props.autoHideYearMonthPicker) {
                              return
                            }
                            that.yearClicked = true
                            if (that.yearClicked && that.monthClicked) {
                              setTimeout(() => {
                                that.yearMonthContainerRef.hide()
                              }, 400)
                            }
                          },
                        },
                        onItemSelectionChange: () => {
                          const y = that.yearRef.getSelectedItem()
                          that.year = y.key
                          that.yearTextRef.update({
                            children: that.props.yearTextFormatter(that.year),
                          })
                          y.element.scrollIntoView({ block: 'center', behavior: 'smooth' })

                          that.days.update({
                            items: that._getDays(that.year, that.month),
                          })
                        },
                        items: this._getYears(),
                      },
                      {
                        component: 'List',
                        ref: (c) => {
                          that.monthRef = c
                        },
                        cols: 1,
                        itemSelectable: {
                          byClick: true,
                          scrollIntoView: true,
                          multiple: false,
                        },
                        itemDefaults: {
                          key: function () {
                            return this.props.value
                          },
                          onConfig: ({ inst }) => {
                            inst.setProps({
                              children: that.props.monthMap[inst.props.value],
                            })
                          },
                          onClick: () => {
                            if (!that.props.autoHideYearMonthPicker) {
                              return
                            }
                            that.monthClicked = true
                            if (that.yearClicked && that.monthClicked) {
                              setTimeout(() => {
                                that.yearMonthContainerRef.hide()
                              }, 400)
                            }
                          },
                        },
                        onItemSelectionChange: () => {
                          const m = that.monthRef.getSelectedItem()
                          that.month = m.key
                          that.monthTextRef.update({
                            children: that.props.monthMap[that.month],
                          })
                          m.element.scrollIntoView({ block: 'center', behavior: 'smooth' })
                          that.days.update({
                            items: that._getDays(that.year, that.month),
                          })
                        },
                        items: this._getMonths(),
                      },
                    ],
                  },
                ],
              },
            },
          ],
        },
      },
    })

    super._config()
  }

  _fixTimePickerHeight() {
    if (!this.timePicker || !this.popup.rendered) {
      return
    }
    const h = this.popup.element.querySelector('.nom-datepicker-popup-bd').offsetHeight
    this.popup.element.querySelector('.timepicker-group').style.height = `${h}px`
  }

  // 更新 timePicker的禁用情况(内部个根据 startTime endTime计算)
  _updateTimePickerStartEndTime(day) {
    this.currentDateBeforeMin = false
    this.currentDateAfterMax = false

    const minDay = parseInt(new Date(this.minDateDay).format('d'), 10)
    const maxDay = parseInt(new Date(this.maxDateDay).format('d'), 10)
    const timeProps = {
      startTime: '00:00:00',
      endTime: '23:59:59',
    }

    if (minDay === day) {
      timeProps.startTime = this.startTime
    }
    if (maxDay === day) {
      timeProps.endTime = this.endTime
    }

    this.timePicker.update(timeProps)
  }

  _yearMinus() {
    this.year -= 1

    this.yearTextRef.update({
      children: this.props.yearTextFormatter(this.year),
    })
    this.days.update({
      items: this._getDays(this.year, this.month),
    })
    this._fixTimePickerHeight()
  }

  _yearPlus() {
    this.year += 1

    this.yearTextRef.update({
      children: this.props.yearTextFormatter(this.year),
    })
    this.days.update({
      items: this._getDays(this.year, this.month),
    })
    this._fixTimePickerHeight()
  }

  _monthMinus() {
    if (this.month === 1) {
      this.month = 12
      this.year -= 1
      this.yearTextRef.update({
        children: this.props.yearTextFormatter(this.year),
      })
    } else {
      this.month -= 1
    }

    this.monthTextRef.update({
      children: this.props.monthMap[this.month],
    })
    this.days.update({
      items: this._getDays(this.year, this.month),
    })
    this._fixTimePickerHeight()
  }

  _monthPlus() {
    if (this.month === 12) {
      this.month = 1
      this.year += 1
      this.yearTextRef.update({
        children: this.props.yearTextFormatter(this.year),
      })
    } else {
      this.month += 1
    }
    this.monthTextRef.update({
      children: this.props.monthMap[this.month],
    })
    this.days.update({
      items: this._getDays(this.year, this.month),
    })
    this._fixTimePickerHeight()
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
      lastMonthMonth = 12
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

  _recountHeight() {
    // 动态计算时间列表高度
    const me = this
    setTimeout(() => {
      const h = me.days.element.offsetHeight
      me.timePickerRef.element.querySelectorAll('.nom-datepicker-time-overcont').forEach((n) => {
        n.style.maxHeight = `${h + 40}px`
      })
    }, 0)
  }

  /* 求XX年XX月1号是星期几 */
  _getFirstDayOfMonth(year, month) {
    const firstDay = new Date(year, month - 1, 1).getDay() // 0 (Sunday) to 6 (Saturday)
    if (this.props.startWeekOnMonday) {
      // 如果从周一开始，将 Sunday (0) 转换为 7，其他减 1
      return firstDay === 0 ? 6 : firstDay - 1
    }
    return firstDay // 默认情况，直接返回
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
    this.yearRef.selectItem(this.year)
    this.monthRef.selectItem(this.month)

    this.props.value &&
      this.days.update({ selectedItems: `${this.year}-${this.month}-${this.day}` })
  }

  getCurrentDate() {
    let currentDate = new Date()
    if (this.props.value !== null) {
      currentDate = Date.parseString(this.props.value, this.props.format)
    } else if (this.minDateDay) {
      currentDate = new Date(this.minDateDay)
    }

    // let currentDate =
    //   this.props.value !== null ? Date.parseString(this.props.value, this.props.format) : new Date()

    if (!currentDate) {
      currentDate = new Date()
    }

    this.year = currentDate.getFullYear()
    this.month = currentDate.getMonth() + 1
    this.day = currentDate.getDate()

    // 注: 此处的比较 如果传入的时间格式不一致, 会有比较错误的情况
    //     因为 new Date(dateString) 并不可靠, `yyyy-MM-dd`得到的时间会是格林威治时间
    this.currentDateBeforeMin = this.minDateDay && currentDate.isBefore(new Date(this.minDateDay))
    this.currentDateAfterMax = this.maxDateDay && currentDate.isAfter(new Date(this.maxDateDay))

    this.dateInfo = {
      year: this.year,
      month: this.month - 1,
      day: this.day,
    }

    if (this.props.value && this.props.showTime && this.timePicker) {
      this.timePicker.setValue(
        new Date(this.props.value.replace(/-/g, '/')).format(
          this.props.showTime.format || 'HH:mm:ss',
        ),
      )
    } else if (!this.props.value && this.props.showTime && this.timePicker) {
      this.timePicker.clearTime()
    }
  }

  /**
   * 计算传入日期属于哪一年的第几周
   * @param {Date} date - 传入的日期
   * @returns {Object} - 返回包含年份和周数的对象，如 { year: 2023, week: 12 }
   */
  _getWeekNumber(date) {
    date = new Date(date)
    const year = date.getFullYear() // 获取年份
    const firstDayOfYear = new Date(year, 0, 1) // 本年1月1日
    const lastDayOfYear = new Date(year, 11, 31) // 本年12月31日

    const firstDayOfYearWeekday = firstDayOfYear.getDay()

    const lastDayOfYearWeekday = lastDayOfYear.getDay()

    // 根据 startWeekOnMonday 配置项调整周的计算逻辑
    const isStartWeekOnMonday = this.props.startWeekOnMonday

    // 计算第一周的起始日期
    let firstWeekStart
    if (isStartWeekOnMonday) {
      if (firstDayOfYearWeekday === 1) {
        firstWeekStart = new Date(year, 0, 1)
      } else {
        firstWeekStart = new Date(year, 0, 1 + ((1 - firstDayOfYearWeekday + 7) % 7))
      }
    } else if (firstDayOfYearWeekday === 0) {
      firstWeekStart = new Date(year, 0, 1)
    } else {
      firstWeekStart = new Date(year, 0, 1 - firstDayOfYearWeekday)
    }

    let lastWeekEnd
    if (isStartWeekOnMonday) {
      if (lastDayOfYearWeekday === 0) {
        lastWeekEnd = new Date(year, 11, 31)
      } else {
        lastWeekEnd = new Date(year, 11, 31 + (7 - lastDayOfYearWeekday))
      }
    } else if (lastDayOfYearWeekday === 6) {
      lastWeekEnd = new Date(year, 11, 31)
    } else {
      lastWeekEnd = new Date(year, 11, 31 + (6 - lastDayOfYearWeekday))
    }

    if (date < firstWeekStart) {
      return this.getWeekNumber(new Date(year - 1, 11, 31))
    }

    if (date > lastWeekEnd) {
      return this.getWeekNumber(new Date(year + 1, 0, 1))
    }

    const timeDiff = date.getTime() - firstWeekStart.getTime()
    const weekDiff = Math.floor(timeDiff / (7 * 24 * 60 * 60 * 1000)) + 1

    return weekDiff
  }

  _getNowText() {
    if (this.props.weekMode) {
      return this.props.currentWeekText
    }
    return this.props.showTime ? this.props.nowText : this.props.todayText
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

  close() {
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
    if (this.getValue() && !Date.isValid(this.getValue(), this.props.format)) {
      this.clearTime()
    }
    super._onBlur()
  }
}
DatePicker.defaults = {
  format: 'yyyy-MM-dd',
  autoHideYearMonthPicker: true,
  disabledTime: null,
  minDate: null,
  maxDate: null,
  yearRange: [90, 20],
  showTime: false,
  allowClear: true,
  onChange: null,
  showNow: true,
  readonly: false,
  restrictInput: true,
  extraTools: null,
  startWeekOnMonday: true, // 将周一算作一周的开始
  weekText: '日 一 二 三 四 五 六',
  currentWeekText: '本周',
  weekCountText: `第{week}周`,
  nowText: '此刻',
  todayText: '今天',
  showYearSkip: false,
  backText: '返回选择日期',
  weekMode: false,
  monthMap: {
    1: '1月',
    2: '2月',
    3: '3月',
    4: '4月',
    5: '5月',
    6: '6月',
    7: '7月',
    8: '8月',
    9: '9月',
    10: '10月',
    11: '11月',
    12: '12月',
  },
  yearTextFormatter: (val) => {
    return `${val}年`
  },
}
Component.register(DatePicker)

export default DatePicker
