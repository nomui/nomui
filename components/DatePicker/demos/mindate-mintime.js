define([], function () {
  return {
    title: 'minDate和minTime的联动',
    description: 'timeRange区间左侧会根据 minDate 和 showTime.minTime 计算得出, 右侧同理',
    file: 'mindate-mintime',
    demo: function () {
      return {
        children: {
          component: 'DatePicker',
          placeholder: '请选择',
          // 假如未来的某一天，公司要求没事早点回家
          // 1.规定上班打卡时间不得早与 09:01:01, 下班时间不得晚于 18:02:02.
          // 时间区间 09:01:01 ~ 18:02:02，则每一天的此时间段之外的 time 是不可选的
          showTime: {
            // format: 'HH:mm:ss',
            minTime: '09:01:01',
            maxTime: '18:02:02',
          },
          // 2. 一号这天, 公司给大家放半天假 必须下午 13:03:03 之前不能打开
          // 3. 十号是周五, 大家早上上完班就赶紧回家 12:04:04 之后不能打开
          minDate: '2021-12-01 13:03:03',
          maxDate: '2021-12-10 12:04:04',
          // 总结: timeRange区间左侧会根据 minDate 和 showTime.minTime 计算得出, 右侧同理
          //      1号, timeRange: ['13:03:03', '18:02:02']
          //      2-9号, timeRange: ['09:01:01', '18:02:02']
          //      10号, timeRange: ['09:01:01', '12:04:04']

          format: 'yyyy-MM-dd HH:mm:ss',
          value: '2021-12-05 11:15:00',
        },
      }
    },
  }
})
