import Component from '../Component/index'
import Textbox from '../Textbox/index'
import {} from '../util/date'

class PartialDatePicker extends Textbox {
  constructor(props, ...mixins) {
    const defaults = {
      disabledTime: null,
      yearRange: [50, 20],
      mode: 'year',
      allowClear: true,
      onChange: null,
      placeholder: '选择年份',
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.year = null
    this.quarter = null
    this.month = null
    this.week = null
  }

  _config() {
    const { disabled, placeholder } = this.props

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
        placeholder: placeholder,
        popup: {
          _created: function () {
            that.popup = this
          },
          classes: {
            'nom-partial-date-picker-popup': true,
          },
          styles: {
            padding: '1',
          },
          attrs: {
            style: {
              width: 'auto',
              height: '240px',
            },
          },
          triggerAction: 'click',
          onShow: () => {
            if (!that.getValue()) {
              that.yearPicker.scrollTo(new Date().format('yyyy'))
            }
          },

          children: {
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
                  },
                  gutter: 'sm',
                  cols: 1,
                  ref: (c) => {
                    that.yearPicker = c
                  },

                  onItemSelectionChange: (args) => {
                    const key = args.sender.props.selectedItems
                    that.handleYearChange(key)
                  },
                  itemDefaults: {
                    _config: function () {},
                  },
                },
              },
              that.props.mode === 'quarter' && {
                children: {
                  component: 'List',
                  items: that._getQuarter(),
                  itemSelectable: {
                    multiple: false,
                    byClick: true,
                  },
                  gutter: 'sm',
                  cols: 1,
                  ref: (c) => {
                    that.quarterPicker = c
                  },

                  onItemSelectionChange: (args) => {
                    const key = args.sender.props.selectedItems
                    that.handleQuarterChange(key)
                  },
                  itemDefaults: {
                    _config: function () {},
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
                  },
                  gutter: 'sm',
                  cols: 1,
                  ref: (c) => {
                    that.monthPicker = c
                  },

                  onItemSelectionChange: (args) => {
                    const key = args.sender.props.selectedItems
                    that.handleMonthChange(key)
                  },
                  itemDefaults: {
                    _config: function () {},
                  },
                },
              },
              that.props.mode === 'week' && {
                hidden: !this.year,
                children: {
                  component: 'List',

                  items: that._getWeek('2010'),
                  itemSelectable: {
                    multiple: false,
                    byClick: true,
                  },
                  gutter: 'sm',
                  cols: 1,
                  ref: (c) => {
                    that.weekPicker = c
                  },
                  _created: (me) => {
                    me.parent.setProps({
                      classes: {
                        'nom-week-list': true,
                      },
                    })
                  },
                  onItemSelectionChange: (args) => {
                    const key = args.sender.props.selectedItems
                    that.handleWeekChange(key)
                  },
                  itemDefaults: {
                    _config: function () {},
                  },
                },
              },
            ],
          },
        },
      },
    })

    super._config()
  }

  _getYear() {
    const years = []
    const thisYear = new Date().getFullYear()

    for (let i = thisYear + this.props.yearRange[1]; i > thisYear - this.props.yearRange[0]; i--) {
      years.push({
        key: `${i}`,
        children: `${i}年`,
      })
    }

    return years
  }

  _getMonth() {
    const month = []
    const that = this

    for (let i = 1; i < 13; i++) {
      month.push({
        key: that._getDoubleDigit(i),
        children: `${i}月`,
      })
    }
    return month
  }

  _getQuarter() {
    const quarter = []

    for (let i = 1; i < 5; i++) {
      quarter.push({
        key: `${i}`,
        children: `第${i}季度`,
      })
    }
    return quarter
  }

  _getWeek(param) {
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
    // 计算一年中的每一周都是从几号到几号
    // 第一周为1月1日到 本年的 第一个周日
    // 第二周为 本年的 第一个周一 往后推到周日
    // 以此类推 再往后推52周。。。
    // 如果最后一周在12月31日之前，则本年有垮了54周，反之53周
    // 12月31 日不论是周几，都算为本周的最后一天
    // 参数年份 ，函数返回一个数组，数组里的对象包含 这一周的开始日期和结束日期
    function whichWeek(year) {
      const d = new Date(parseInt(year, 10), 0, 1)
      while (d.getDay() !== 1) {
        d.setDate(d.getDate() + 1)
      }
      const arr = []
      const longnum = d.setDate(d.getDate())
      if (longnum > +new Date(parseInt(year, 10), 0, 1)) {
        const obj = yearDay(+new Date(year, 0, 1) / 1000)
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
        const obj = yearDay(lastStr / 1000 + 86400)
        obj.last = yearDay(+new Date(parseInt(year, 10) + 1, 0, 1) / 1000 - 86400)
        arr.push(obj)
      } else {
        arr[arr.length - 1].last = yearDay(+new Date(parseInt(year, 10) + 1, 0, 1) / 1000 - 86400)
      }
      return arr
    }

    const week = whichWeek(param).map(function (item, index) {
      return {
        key: `${index + 1}`,
        children: {
          component: 'List',
          items: [
            { children: `第${index + 1}周` },
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

  clearTime() {
    this.setValue(null)
  }

  handleYearChange(key) {
    this.year = key
    if (this.props.mode === 'week') {
      this.setValue(null)
      this.weekPicker.parent.props.hidden &&
        this.weekPicker.parent.update({
          hidden: false,
        })
      this.weekPicker.update({
        items: this._getWeek(this.year),
      })
      return
    }
    this.updateValue()
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
    switch (this.props.mode) {
      case 'year':
        this.year && this.setValue(this.year)
        break

      case 'quarter':
        this.year && this.quarter && this.setValue(`${this.year} ${this.quarter}季度`)
        break

      case 'month':
        this.year &&
          this.month &&
          this.setValue(new Date(`${this.year}-${this.month}`).format('yyyy-MM'))
        break

      case 'week':
        this.year && this.week && this.setValue(`${this.year} ${this.week}周`)
        break

      default:
        break
    }
  }
}

Component.register(PartialDatePicker)

export default PartialDatePicker
