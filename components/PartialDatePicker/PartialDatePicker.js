import Component from '../Component/index'
import Textbox from '../Textbox/index'
import {} from '../util/date'
import { isFunction } from '../util/index'

class PartialDatePicker extends Textbox {
  constructor(props, ...mixins) {
    super(Component.extendProps(PartialDatePicker.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.year = null
    this.quarter = null
    this.month = null
    this.week = null
    this.hasRange = false
    this.minSub = '00'
    this.maxSub = '60'
  }

  _config() {
    const { disabled, placeholder, animate, extraTools, mode, formatMap } = this.props

    if (!this.props.format) {
      this.props.format = formatMap[mode]
    }

    this._fixValue()

    if (this.props.value) {
      this.year = this.props.mode === 'year' ? this.props.value : this.props.value.substring(0, 4)
    }

    let extra = []
    if (isFunction(extraTools)) {
      extra = Array.isArray(extraTools(this)) ? extraTools(this) : [extraTools(this)]
    } else if (Array.isArray(extraTools)) {
      extra = extraTools
    }

    const that = this

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
        placeholder: placeholder,
        popup: {
          _created: function () {
            that.popup = this
          },
          animate,
          classes: {
            'nom-partial-date-picker-popup': true,
            'nom-partial-date-picker-popup-hasfooter': extraTools !== null,
          },

          attrs: {
            style: {
              width: 'auto',
              minHeight: '240px',
            },
          },
          triggerAction: 'click',
          onShow: () => {
            if (!that.getValue()) {
              setTimeout(() => {
                that.yearPicker.scrollTo(new Date().format('yyyy'))
              }, 200)
            } else {
              that.activeItem()
            }
            this.hasRange && this.updateList()
          },
          onHide: () => {
            that.getValue() &&
              that.props.onChange &&
              that._callHandler(that.props.onChange, that.getValue())
          },

          children: {
            component: 'Flex',
            rows: [
              {
                component: 'Cols',
                gutter: null,
                fills: true,
                align: 'stretch',
                children: [
                  {
                    children: {
                      component: 'List',
                      items: that._getYear(),
                      itemSelectable: {
                        multiple: false,
                        byClick: true,
                        scrollIntoView: true,
                      },
                      gutter: 'xs',
                      cols: 1,
                      ref: (c) => {
                        that.yearPicker = c
                      },

                      onItemSelectionChange: (args) => {
                        const key = args.sender.props.selectedItems
                        that.handleYearChange(key)
                      },
                      itemDefaults: {
                        _config: function () {
                          const key = this.props.key

                          if (key < that.minYear || key > that.maxYear) {
                            this.setProps({
                              disabled: true,
                            })
                          }
                        },
                      },
                    },
                  },
                  that.props.mode === 'quarter' && {
                    classes: {
                      'nom-quarter-list': true,
                    },
                    children: {
                      component: 'List',
                      items: that._getQuarter(),
                      itemSelectable: {
                        multiple: false,
                        byClick: true,
                        scrollIntoView: true,
                      },
                      gutter: 'xs',
                      cols: 1,
                      ref: (c) => {
                        that.quarterPicker = c
                        if (that.props.mode === 'quarter') {
                          that.subPicker = c
                        }
                      },

                      onItemSelectionChange: (args) => {
                        const key = args.sender.props.selectedItems
                        that.handleQuarterChange(key)
                      },
                      itemDefaults: {
                        _config: function () {
                          const key = this.props.key

                          if (
                            parseInt(key, 10) < parseInt(that.minSub, 10) ||
                            parseInt(key, 10) > parseInt(that.maxSub, 10)
                          ) {
                            this.setProps({
                              disabled: true,
                            })
                          }
                        },
                      },
                    },
                  },
                  that.props.mode === 'month' && {
                    children: {
                      component: 'List',
                      items: that._getMonth(),
                      itemSelectable: {
                        multiple: false,
                        byClick: true,
                        scrollIntoView: true,
                      },
                      gutter: 'xs',
                      cols: 1,
                      ref: (c) => {
                        that.monthPicker = c
                        if (that.props.mode === 'month') {
                          that.subPicker = c
                        }
                      },

                      onItemSelectionChange: (args) => {
                        const key = args.sender.props.selectedItems
                        that.handleMonthChange(key)
                      },
                      itemDefaults: {
                        _config: function () {
                          const key = this.props.key

                          if (
                            parseInt(key, 10) < parseInt(that.minSub, 10) ||
                            parseInt(key, 10) > parseInt(that.maxSub, 10)
                          ) {
                            this.setProps({
                              disabled: true,
                            })
                          }
                        },
                      },
                    },
                  },
                  that.props.mode === 'week' && {
                    classes: {
                      'nom-week-list': true,
                    },
                    children: {
                      component: 'List',

                      items: that.year
                        ? that._getWeek(that.year)
                        : [
                            {
                              component: 'StaticText',
                              value: that.props.selectYearText,
                              disabled: true,
                            },
                          ],
                      itemSelectable: {
                        multiple: false,
                        byClick: true,
                        scrollIntoView: true,
                      },
                      gutter: 'xs',
                      cols: 1,
                      ref: (c) => {
                        that.weekPicker = c
                        if (that.props.mode === 'week') {
                          that.subPicker = c
                        }
                      },
                      onItemSelectionChange: (args) => {
                        const key = args.sender.props.selectedItems
                        that.handleWeekChange(key)
                      },
                      itemDefaults: {
                        _config: function () {
                          const key = this.props.key

                          if (
                            parseInt(key, 10) < parseInt(that.minSub, 10) ||
                            parseInt(key, 10) > parseInt(that.maxSub, 10)
                          ) {
                            this.setProps({
                              disabled: true,
                            })
                          }
                        },
                      },
                    },
                  },
                ],
              },
              extra.length && {
                component: 'Flex',
                classes: {
                  'nom-partial-date-picker-footer': true,
                },
                gutter: 'small',
                cols: extra,
              },
            ],
          },
        },
      },
    })

    super._config()
  }

  _rendered() {
    if (this.props.value) {
      this.resolveValue()
    }
    if (this.props.minDate || this.props.maxDate) {
      this.resolveRange()
    }
  }

  _getYear() {
    const years = []
    const thisYear = new Date().getFullYear()

    for (let i = thisYear + this.props.yearRange[1]; i > thisYear - this.props.yearRange[0]; i--) {
      const str = this.props.yearText.replace('{{year}}', i)
      years.push({
        key: `${i}`,
        children: str,
      })
    }

    return years
  }

  _getMonth() {
    const month = []
    const that = this

    for (let i = 1; i < 13; i++) {
      // const str = this.props.monthText.replace('{{month}}', i)
      month.push({
        key: that._getDoubleDigit(i),
        children: this.props.monthMap[i],
      })
    }
    return month
  }

  _getQuarter() {
    const quarter = []

    for (let i = 1; i < 5; i++) {
      const str = this.props.quarterText.replace('{{quarter}}', i)
      quarter.push({
        key: `${i}`,
        children: str,
      })
    }
    return quarter
  }

  _mapWeekData(param) {
    if (!param) return
    const that = this
    // 时间戳转年月日  参数是秒的时间戳 函数返回一个对象 对象里有年 月 日
    function yearDay(long) {
      const time = new Date(long * 1000)
      const year = `${time.getFullYear()}`
      const month = that._getDoubleDigit(time.getMonth() + 1)
      const day = that._getDoubleDigit(time.getDate())
      const yearday = { year, month, day }
      return yearday
    }
    // *为了适配后端现有周计算逻辑，改为如下逻辑：本年1月1日如果不是周一，则第一周从上一年12月XX号开始；同样如果本年12月31日不是周日，则这一周不算入本年，而算作来年第一周。
    // 计算一年中的每一周都是从几号到几号
    // 第一周为本年的第一个周日往前推七天
    // 第二周为 本年的 第一个周一 往后推到周日
    // 以此类推 再往后推52周。。。
    // 参数年份 ，函数返回一个数组，数组里的对象包含 这一周的开始日期和结束日期
    function whichWeek(year) {
      const d = new Date(parseInt(year, 10), 0, 1)
      while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1)
      }
      const arr = []
      const longnum = d.setDate(d.getDate())

      if (longnum > +new Date(parseInt(year, 10), 0, 1)) {
        const obj = yearDay(longnum / 1000 - 86400 * 7)
        obj.last = yearDay(longnum / 1000 - 86400)
        arr.push(obj)
      }
      const oneitem = yearDay(longnum / 1000)
      oneitem.last = yearDay(longnum / 1000 + 86400 * 6)
      arr.push(oneitem)

      let lastStr
      for (let i = 0; i < 51; i++) {
        const long = d.setDate(d.getDate() + 7)
        const obj = yearDay(long / 1000)
        obj.last = yearDay(long / 1000 + 86400 * 6)
        lastStr = long + 86400000 * 6
        arr.push(obj)
      }

      if (lastStr < +new Date(parseInt(year, 10) + 1, 0, 1)) {
        // const obj = yearDay(lastStr / 1000 + 86400)
        // obj.last = yearDay(+new Date(parseInt(year, 10) + 1, 0, 1) / 1000 - 86400)
        // arr.push(obj)
      } else {
        arr.pop()

        // arr[arr.length - 1].last = yearDay(+new Date(parseInt(year, 10) + 1, 0, 1) / 1000 - 86400)
      }
      return arr
    }

    return whichWeek(param)
  }

  _getWeek(param) {
    const that = this

    const week = this._mapWeekData(param).map(function (item, index) {
      const str = that.props.weekText.replace('{{week}}', index + 1)
      return {
        key: `${index + 1}`,
        firstDay: `${item.year}-${item.month}-${item.day}`,
        children: {
          component: 'List',
          items: [
            { children: str },
            {
              classes: {
                'nom-week-subtitle': true,
              },
              children: `(${item.year}/${item.month}/${item.day} - ${item.last.year}/${item.last.month}/${item.last.day})`,
            },
          ],
        },
      }
    })

    return week
  }

  _getDoubleDigit(num) {
    if (num < 10) {
      return `0${num}`
    }
    return `${num}`
  }

  showPopup() {
    this.popup.show()
  }

  _getValueText() {
    const val = this.getValue()
    if (!val) return 'NA'
    return val
  }

  clearTime() {
    this.year = null
    this.quarter = null
    this.month = null
    this.week = null
    this._resetLists()
    this.setValue(null)
  }

  _resetLists() {
    this.yearPicker && this.yearPicker.unselectAllItems()
    this.monthPicker && this.monthPicker.unselectAllItems()
    this.quarterPicker && this.quarterPicker.unselectAllItems()
    this.weekPicker && this.weekPicker.unselectAllItems()
  }

  handleYearChange(key) {
    this.year = key

    let noUpdate = false

    if (this.hasRange && this.subPicker) {
      if (this.year <= this.minYear) {
        this.minSub = this.minAfter
        this.setValue(null)
        this.subPicker.unselectAllItems()
        noUpdate = true
      } else {
        this.minSub = '00'
      }
      if (this.year >= this.maxYear) {
        this.maxSub = this.maxAfter
        this.setValue(null)
        this.subPicker.unselectAllItems()
        noUpdate = true
      } else {
        this.maxSub = '60'
      }
      this.updateList(true)
    }

    if (this.props.mode === 'week') {
      this.setValue(null, { triggerChange: false })
      this.weekPicker.parent.props.hidden &&
        this.weekPicker.parent.update({
          hidden: false,
        })
      this.weekPicker.update({
        items: this._getWeek(this.year),
      })
      this.weekPicker.unselectAllItems()
      noUpdate = true
    }

    !noUpdate && this.updateValue()
  }

  handleQuarterChange(key) {
    this.quarter = key
    this.updateValue()
  }

  handleMonthChange(key) {
    this.month = key
    this.updateValue()
  }

  handleWeekChange(key) {
    this.week = key
    this.updateValue()
  }

  updateValue() {
    const old_val = this.getValue()
    let new_val
    switch (this.props.mode) {
      case 'year': {
        new_val = this.year
        this.year && old_val !== new_val && this.setValue(new_val)
        break
      }

      case 'quarter': {
        new_val = this.props.format.replace('$year', this.year).replace('$quarter', this.quarter)
        this.year && this.quarter && old_val !== new_val && this.setValue(new_val)
        break
      }

      case 'month': {
        new_val = new Date(
          `${this.year}-${nomui.utils.isNumeric(this.month) ? this.month : '01'}`,
        ).format(this.props.format)
        this.year && this.month && old_val !== new_val && this.setValue(new_val)
        break
      }

      case 'week': {
        new_val = this.props.format.replace('$year', this.year).replace('$week', this.week)
        this.year && this.week && old_val !== new_val && this.setValue(new_val)
        break
      }

      default:
        break
    }
  }

  _fixValue() {
    let { value } = this.props
    if (value instanceof Date || (typeof value === 'string' && !Number.isNaN(Date.parse(value)))) {
      const date = new Date(value)
      if (this.props.mode === 'year') {
        value = date.getFullYear().toString()
      } else if (this.props.mode === 'month') {
        value = date.format('yyyy-MM')
      }
    }
    this.props.value = value
  }

  resolveValue(value) {
    const v = value || this.getValue() || this.year

    const strArr = v.match(/\d+/g)
    if (!strArr) {
      return
    }
    const year = this.props.mode === 'year' ? v : strArr[0]
    const after = this.props.mode === 'year' ? null : Math.abs(strArr[1])

    this.year = year
    switch (this.props.mode) {
      case 'year':
        break
      case 'quarter':
        this.quarter = `${after}`
        break
      case 'month':
        this.month = `${after}`
        break
      case 'week':
        this.week = `${after}`
        break
      default:
        break
    }
  }

  close() {
    this.popup.hide()
  }

  resolveRange() {
    const min = this.props.minDate
    const max = this.props.maxDate
    if (min) {
      this.minYear = this.props.mode === 'year' ? min : min.substring(0, 4)
      this.minAfter = this.props.mode === 'year' ? null : Math.abs(parseInt(min.substring(4), 10))
      this.hasRange = true
    }
    if (max) {
      this.maxYear = this.props.mode === 'year' ? max : max.substring(0, 4)
      this.maxAfter = this.props.mode === 'year' ? null : Math.abs(parseInt(max.substring(4), 10))
      this.hasRange = true
    }
  }

  activeItem() {
    this.yearPicker.selectItem(this.year)

    switch (this.props.mode) {
      case 'year':
        break
      case 'quarter':
        this.subPicker.selectItem(this.quarter)
        break
      case 'month':
        this.subPicker.selectItem(this.month)
        break
      case 'week':
        this.subPicker.selectItem(this.week)
        break
      default:
        break
    }
  }

  _setValue(value) {
    value && this.resolveValue(value)
    super._setValue(value)
  }

  updateList(noyear) {
    if (!noyear) {
      this.yearPicker.update()
    }

    this.props.mode !== 'year' && this.subPicker.update()
  }

  getDateString(format) {
    if (!this.getValue()) {
      return null
    }
    let date = null
    switch (this.props.mode) {
      case 'year':
        date = new Date(this.year)
        break
      case 'quarter':
        switch (this.quarter) {
          case '1':
            date = new Date(`${this.year}-01-01`)
            break
          case '2':
            date = new Date(`${this.year}-04-01`)
            break
          case '3':
            date = new Date(`${this.year}-07-01`)
            break
          case '4':
            date = new Date(`${this.year}-10-01`)
            break
          default:
            break
        }

        break
      case 'month':
        date = new Date(this.getValue())
        break
      case 'week': {
        const time = this._mapWeekData(this.year)[parseInt(this.week, 10) - 1]
        date = new Date(time.year, time.month - 1, time.day)
        break
      }
      default:
        break
    }

    return date.format(format || 'yyyy-MM-dd')
  }
}
PartialDatePicker.defaults = {
  yearRange: [50, 20],
  mode: 'year',
  allowClear: true,
  onChange: null,
  placeholder: '选择年份',
  value: null,
  minDate: null,
  maxDate: null,
  readonly: false,
  restrictInput: true,
  extraTools: null,
  selectYearText: '请先选择年份',
  formatMap: {
    quarter: '$year年 $quarter季度',
    month: 'yyyy-MM',
    week: '$year年 $week周',
  },
  yearText: '{{year}}年',
  monthText: '{{month}}月',
  quarterText: '第{{quarter}}季度',
  weekText: '第{{week}}周',
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
}
Component.register(PartialDatePicker)

export default PartialDatePicker
