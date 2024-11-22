define([], function () {
  return {
    title: '增加自定义内容',
    file: 'with-children',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Avatar',
            icon: 'user',
            text: '小马',
            children: {
              component: 'Icon',
              type: 'times',
              attrs: {
                style: {
                  position: 'absolute',
                  top: '-6px',
                  right: '-6px',
                  color: 'red',
                  cursor: 'pointer',
                }
              }
            }
          },
        ],
      }
    },
  }
})
