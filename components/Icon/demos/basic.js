define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        children: [
          {
            type: 'arrow-up',
          },
          {
            type: 'arrow-down',
          },
          {
            type: 'arrow-right',
          },
          {
            type: 'arrow-left',
          },
        ],
        childDefaults: {
          component: 'Icon',
          styles: {
            margin: '1',
          },
        },
      }
    },
  }
})
