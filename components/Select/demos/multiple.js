define([], function () {
  return {
    title: '多选',
    file: 'multiple',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Select',
            options: [
              {
                text: '金庸',
                value: 0,
              },
              {
                text: '古龙',
                value: 1,
              },
              {
                text: '梁羽生',
                value: 2,
              },
              {
                text: '温瑞安',
                value: 3,
              },
            ],
            multiple: true,
          },
          {
            component: 'Select',
            multiple: true,
            placeholder: '请选择你喜欢的作者们',
            options: [
              {
                text: '金庸',
                value: 0,
              },
              {
                text: '古龙',
                value: 1,
              },
              {
                text: '梁羽生',
                value: 2,
              },
              {
                text: '温瑞安',
                value: 3,
              },
            ],
          },
        ],
      }
    },
  }
})
