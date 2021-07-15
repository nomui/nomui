define([], function () {
  return {
    title: '值选项',
    file: 'value-options',
    description:
      '`valueOptions.asArray` 设置值是否为数组，默认为 `true` ，当为 `false` 时值为字符串，选中多项时用逗号分隔，取值跟赋值时都需要对应的格式。',
    demo: function () {
      return {
        children: [
          {
            component: 'CheckboxList',
            label: '值为数组',
            value: [1, 3],
            options: [
              {
                text: '金庸',
                value: 1,
              },
              {
                text: '古龙',
                value: 2,
              },
              {
                text: '梁羽生',
                value: 3,
              },
              {
                text: '温瑞安',
                value: 4,
              },
            ],
          },
          {
            component: 'CheckboxList',
            label: '值为字符串',
            valueOptions: {
              asArray: false,
            },
            value: '1,3',
            options: [
              {
                text: '金庸',
                value: '1',
              },
              {
                text: '古龙',
                value: '2',
              },
              {
                text: '梁羽生',
                value: '3',
              },
              {
                text: '温瑞安',
                value: '4',
              },
            ],
          },
        ],
      }
    },
  }
})
