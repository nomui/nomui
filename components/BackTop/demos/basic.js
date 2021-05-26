define(['./helper.js'], function (helper) {
  return {
    title: '基本用法',
    file: 'basic',
    demo: function () {
      return {
        classes: {
          'nom-demo-for-back': true,
        },
        attrs: {
          style: {
            height: '300px',
            overflow: 'auto',
          },
        },
        children: helper.getData3(100),
        backtop: {
          target: 'nom-demo-for-back',
        },
      }
    },
  }
})
