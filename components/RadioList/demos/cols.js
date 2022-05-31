define([], function () {
    return {
      title: '指定列数',
      file: 'cols',
      demo: function () {
        let radioListRef = null
        return {
          component: 'Rows',
          items: [
            {
              component: 'RadioList',
              uistyle: 'button',
              options: [
                { text: '自动', value: null },
                { text: '1列', value: 1 },
                { text: '2列', value: 2 },
                { text: '3列', value: 3 },
              ],
              onValueChange: ({ newValue }) => {
                radioListRef.update({ cols: newValue })
              },
            },
            {
              component: 'RadioList',
              ref: (c) => {
                radioListRef = c
              },
              options: [
                {
                  text: '金庸',
                  value: 0,
                },
                {
                  text: '古龙',
                  value: 1,
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
          ],
        }
      },
    }
  })
  