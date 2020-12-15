import Component from '../Component/index'
import Control from '../Control/index'

class TimePicker extends Control {
    constructor(props, ...mixins) {

    }

    _getTimeData(count) {
        var data = []
        for (i = 0; i < count; i++) {
            var val = i + '';
            if (i < 10) {
                val = '0' + i;
            }
            data.push({
                text: val,
                value: val
            })
        }
        
        return data
    }
}

export default TimePicker