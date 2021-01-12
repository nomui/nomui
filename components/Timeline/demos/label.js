define([], function () {
  return {
    title: '标签',
    file: 'label',
    description: '使用 label 标签单独展示时间。',
    demo: function () {
      let labelTimeLine = null

      return {
        component: 'Rows',
        items: [
          {
            component: 'RadioList',
            options: [
              {
                text: 'left',
                value: 'left',
              },
              {
                text: 'right',
                value: 'right',
              },
              {
                text: 'alternate',
                value: 'alternate',
              },
            ],
            onValueChange: (e) => {
              labelTimeLine.update({
                mode: e.newValue || 'left',
              })
            },
          },
          {
            component: 'Timeline',
            ref: (c) => {
              labelTimeLine = c
            },
            items: [
              {
                label: '2015-09-01',
                children: 'Create a services',
              },
              {
                label: '2015-09-01 09:12:11',
                children: 'Solve initial network problems',
              },
              {
                children: 'Technical testing',
              },
              {
                label: '2015-09-01 09:12:11',
                children: 'Network problems being solved',
              },
            ],
          },
        ],
      }
    },
  }
})
