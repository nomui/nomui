define([], function () {
  return {
    title: '周选择模式',
    file: 'week-mode',
    description:
      '周选择模式下，界面上显示的是以周为单位，但取值的日期为当周的第一天，如果默认有值且不是当周周一，也会高亮该日期所在的周。',
    demo: function () {
      return {
        children: {
          component: 'DatePicker',
          placeholder: 'choose a week',
          weekMode: true,
          value: '2025-03-14',
        },
      }
    },
  }
})
