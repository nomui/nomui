define([], function () {
  return {
    title: '自定义文字格式',
    description: '通过format属性指定格式',
    file: 'format',
    demo: function () {
      return {
        children: [
          {
            component: 'Cols',
            items: [
              {
                component: 'Progress',
                type: 'circle',
                percent: 75,
                format: (percent) => `${percent} Days`,
              },
              {
                component: 'Progress',
                type: 'circle',
                percent: 100,
                format: () => 'Done',
              },
            ],
          },
        ],
      }
    },
  }
})
