define([], function () {
  return {
    title: '组合下拉选择框',
    file: 'with-label-align',
    demo: function () {
      return {
        component: 'Rows',
        items: [
          {
            component: 'Field',
            label: '选择英雄',
            labelAlign: 'left',
            control: {
              component: 'Select',
              attrs: {
                style: {
                  width: '200px',
                },
              },
              options: [
                {
                  text: '安其拉',
                  value: 0,
                },
                {
                  text: '阿珂',
                  value: 1,
                },
                {
                  text: '李白',
                  value: 2,
                },
                {
                  text: '狂铁',
                  value: 3,
                },
              ],
            },
          },
        ],
      }
    },
  }
})
