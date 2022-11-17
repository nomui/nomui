define([], function () {
  return {
    title: '限制显示多选个数',
    file: 'max-tags',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            component: 'Select',
            multiple: true,
            placeholder: '请选择你喜欢的作者们',
            value: [0, 1],
            maxTagCount: 4,
            optionFields: {
              text: 'name',
              value: 'id',
            },
            options: [
              {
                name: '金庸',
                id: 0,
              },
              {
                name: '古龙',
                id: 1,
              },
              {
                name: '梁羽生',
                id: 2,
              },
              {
                name: '温瑞安',
                id: 3,
              },
              {
                name: '金庸1',
                id: 10,
              },
              {
                name: '古龙2',
                id: 12,
              },
              {
                name: '梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生梁羽生',
                id: 23,
              },
              {
                name: '温瑞安4',
                id: 43,
              },
            ],
          },
        ],
      }
    },
  }
})
