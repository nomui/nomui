define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: {
          component: 'Steps',
          current: 1,
          splite: true,
          // direction: 'vertical',
          // onStepClick: (index) => {
          //   console.log('click step', index)
          // },
          // useIcon: false, // 配置false则不显示打勾图标,保留数字
          options: [
            {
              title: 'Finished',
              description: 'This is description',
            },
            {
              title: 'In Progress',
              subTitle: 'subTitle',
              description: 'This is description',
            },
            {
              title: 'Waiting',
              description: 'This is description',
            },
          ],
        },
      }
    },
  }
})
