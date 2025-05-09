define([], function () {
  return {
    title: '手风琴',
    file: 'accordion',
    demo: function () {
      return {
        children: {
          component: 'Collapse',
          accordion: true,
          items: [
            {
              key: 1,
              title: '为啥企鹅的脚不怕冻？',
              content: {
                children: {
                  component: 'Flex',
                  justify: 'center',
                  align: 'center',
                  rows: [
                    { component: 'Checkbox', label: '我也想知道' },
                    { component: 'Textbox', value: '12' },
                  ],
                },
              },
            },
            {
              key: 2,
              title: '这是一个好问题',
              content: {
                children: {
                  component: 'Flex',
                  justify: 'center',
                  align: 'center',
                  rows: [
                    { component: 'Checkbox', label: '我也想知道' },
                    { component: 'Textbox', value: '12' },
                  ],
                },
              },
            },
          ],
        },
      }
    },
  }
})
