define(['./helper.js'], function (helper) {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            component: 'VirtualList',
            listData: helper.getData1(10000),
            height: 300,
            size: 40,
            bufferScale: 1,
            backtop: {
              duration: 100,
              animations: 'Linear',
              target: 'nom-virtual-list-container',
              visibilityHeight: 400,
              right: 30,
              bottom: 30,
              onClick: () => {
                console.log('123')
              },
            },
          },
        ],
      }
    },
  }
})
