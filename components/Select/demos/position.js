define([], function () {
  return {
    title: '修改Select下拉框定位方式',
    file: 'position',
    demo: function () {
      let rowsRef = null
      return {
        component: 'Flex',
        ref: (c) => {
          rowsRef = c
        },
        rows: [
          {
            component: 'Select',
            popupContainer: () => {
              return rowsRef
            },
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
          {
            component: 'Select',
            placeholder: '选择你喜欢的作者',
            popupContainer: 'self',
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
