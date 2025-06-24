define([], function () {
  return {
    title: '多选',
    file: 'multiple',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
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
            changeOnClose: true,
            onValueChange: ({ newValue }) => {
              console.log('onValueChange', newValue)
            },
          },
          {
            component: 'Select',
            multiple: true,
            placeholder: '请选择你喜欢的作者们',
            value: [0, 1],
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
              {
                text: '金庸1',
                value: 10,
              },
              {
                text: '古龙2',
                value: 12,
              },
              {
                text: '梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生',
                value: 23,
              },
              {
                text: '温瑞安4',
                value: 43,
              },
            ],
          },
        ],
      }
    },
  }
})
