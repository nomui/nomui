import Component from '../Component/index'
import Textbox from '../Textbox/index'
import Rows from '../Rows/index'
import Cols from '../Cols/index'
import Select from '../Select/index'

class DatePicker extends Textbox {
    constructor(props, ...mixins) {
        const defaults = {

        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        this.setProps({
            rightIcon: 'check'
        })

        this.setProps({
            popup: {
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
                                    options: this._getYears()
                                },
                                {
                                    component: Select,
                                    options: this._getMonths()
                                }
                            ]
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

    /* 求XX年XX月1号是星期几 */
    _getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1).getDay();
    }

    /* 求XX年XX月有多少天 */
    _getDaysInMonth(year, month) {
        return 32 - this._daylightSavingAdjust(new Date(year, month, 32)).getDate();
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