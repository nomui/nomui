define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let group = null;
      return {
        children: {
          component: 'Form',
          ref: (c) => {
            group = c
          },
          fields: [
            {
              component: 'AutoComplete',
              name: 'city',
              propsMode: 'select',
              options: [
                { text: '北京', value: 1 },
                { text: '上海', value: 2 },
                { text: '广州', value: 3 },
              ],
            },
            {
              component: 'Field',
              label: '',
              control: {
                component: 'Cols',
                items: [
                  {
                    component: 'Button',
                    type: 'primary',
                    text: '提 交',
                    onClick: () => {
                      console.log(group.getValue())
                    },
                  },
                  {
                    component: 'Button',
                    text: '重 置',
                    onClick: () => {
                      group.reset()
                    },
                  },
                  {
                    component: 'Button',
                    text: '清除',
                    onClick: () => {
                      group.clear()
                    },
                  },
                ],
              },
            },
          ],
        },
      }
    },
  }
})
