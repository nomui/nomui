import Component from '../Component/index'
import Textbox from '../Textbox/index'
import Rows from '../Rows/index'
import Cols from '../Cols/index'
import Select from '../Select/index'
import List from '../List/index'
import { } from '../util/date'

class DatePicker extends Textbox {
    constructor(props, ...mixins) {
        const defaults = {
            format: 'yyyy-MM-dd',
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        let { value, format } = this.props,
            currentDate = value !== null ? Date.parseString(value, format) : new Date(),
            year = currentDate.getFullYear(),
            month = currentDate.getMonth() + 1,
            day = currentDate.getDate(),
            that = this

        this.setProps({
            rightIcon: 'calendar',
            popup: {
                styles: {
                    padding: '1'
                },
                triggerAction: 'click',
                attrs: {
                    style: {
                        width: '300px'
                    }
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
                                    events: {
                                        valueChange: function (changed) {
                                            year = changed.newValue
                                            that.days.update({
                                                items: that._getDays(year, month)
                                            })
                                        }
                                    }
                                },
                                {
                                    component: Select,
                                    value: month,
                                    options: this._getMonths(),
                                    events: {
                                        valueChange: function (changed) {
                                            month = changed.newValue
                                            that.days.update({
                                                items: that._getDays(year, month)
                                            })
                                        }
                                    }
                                }
                            ]
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
                            }
                        },
                        {
                            component: List,
                            _create: function () {
                                that.days = this
                            },
                            gutter: 'sm',
                            cols: 7,
                            selectedItems: year + '-' + month + '-' + day,
                            itemSelectable: {
                                byClick: true
                            },
                            items: this._getDays(year, month),
                            itemDefaults: {
                                key: function () {
                                    return this.props.date
                                },
                                styles: {
                                    padding: 'd375',
                                    hover: {
                                        color: 'darken'
                                    },
                                    selected: {
                                        color: 'primary'
                                    }
                                },
                                attrs: {
                                    role: 'button'
                                },
                                _config: function () {
                                    let textStyles = ['center'],
                                        isToday = this.props.date === new Date().format('yyyy-M-dd')

                                    if (this.props.lastMonth === true || this.props.nextMonth === true) {
                                        textStyles.push('muted')
                                    }

                                    if (isToday) {
                                        this.setProps({
                                            styles: {
                                                border: ['1px', 'primary']
                                            }
                                        })
                                    }

                                    this.setProps({
                                        styles: {
                                            text: textStyles
                                        },
                                        children: this.props.day
                                    })
                                },
                                events: {
                                    click: function () {
                                        that.setValue(this.props.date)
                                        that.popup.hide()
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        })

        super._config()
    }

    _getYears() {
        let years = [],
            thisYear = new Date().getFullYear();

        for (let i = thisYear + 20; i > thisYear - 30; i--) {
            years.push({
                text: i,
                value: i
            });
        }

        return years;
    }

    _getMonths() {
        let months = [];

        for (let i = 1; i < 13; i++) {
            months.push({
                text: i,
                value: i
            });
        }

        return months;
    }

    _getDays(year, month) {
        var firstDay = this._getFirstDayOfMonth(year, month),
            currentDayCount = this._getDaysInMonth(year, month),
            lastDayCount = this._getDaysInMonth(year, month),
            daysList = [],
            i = 0,
            lastMonthYear = year,
            lastMonthMonth = month - 1,
            nextMonthYear = year,
            nextMonthMonth = month + 1;

        if (month === 1) {
            lastDayCount = this._getDaysInMonth(year - 1, 12);
            lastMonthYear = year - 1;
            lastMonthMonth = 11;
        }

        if (firstDay > 0) {
            for (i = lastDayCount - firstDay + 1; i < lastDayCount + 1; i++) {
                daysList.push({
                    day: i,
                    year: lastMonthYear,
                    month: lastMonthMonth,
                    lastMonth: true,
                    date: lastMonthYear + '-' + lastMonthMonth + '-' + i
                });
            }
        }

        for (i = 1; i < currentDayCount + 1; i++) {
            daysList.push({
                day: i,
                year: year,
                month: month,
                date: year + '-' + month + '-' + i
            });
        }
        var nextMonthCount = 7 - ((daysList.length % 7) || 7);
        if (month === 12) {
            nextMonthYear++;
            nextMonthMonth = 1;
        }
        for (i = 1; i < nextMonthCount + 1; i++) {
            daysList.push({
                day: i,
                year: nextMonthYear,
                month: nextMonthMonth,
                nextMonth: true,
                date: nextMonthYear + '-' + nextMonthMonth + '-' + i
            });
        }
        return daysList;

    }

    /* 求XX年XX月1号是星期几 */
    _getFirstDayOfMonth(year, month) {
        return new Date(year, month - 1, 1).getDay();
    }

    /* 求XX年XX月有多少天 */
    _getDaysInMonth(year, month) {
        return 32 - this._daylightSavingAdjust(new Date(year, month - 1, 32)).getDate();
    }

    _daylightSavingAdjust(date) {
        if (!date) {
            return null;
        }
        date.setHours(date.getHours() > 12 ? date.getHours() + 2 : 0);
        return date;
    }
}

Component.register(DatePicker)

export default DatePicker