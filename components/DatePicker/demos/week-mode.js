define([], function () {
  return {
    title: '周选择模式',
    file: 'week-mode',
    description: '周选择模式下，界面上显示的是以周为单位，但取值的日期为当周的第一天',
    demo: function () {
      return {
        children: {
          component: 'DatePicker',
          placeholder: 'choose a week',
          weekMode: true,
        },
      }
    },
  }
})
