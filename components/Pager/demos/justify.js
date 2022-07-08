define([], function () {
  let pagerRef
  return {
    title: '排列方式',
    file: 'justify',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'RadioList',
            uistyle: 'button',
            value: 'end',
            options: [
              { text: '同Flex的 justify', disabled: true, value: null },
              { text: 'start', value: 'start' },
              { text: 'end', value: 'end' },
              { text: 'center', value: 'center' },
              { text: 'between', value: 'between' },
              { text: 'around', value: 'around' },
            ],
            onValueChange: ({ newValue }) => {
              pagerRef.update({ justify: newValue })
            },
          },
          {
            component: 'Pager',
            ref: (c) => {
              pagerRef = c
            },
            totalCount: 100,
            onPageChange: function (e) {
              e.sender.update(e)
              // eslint-disable-next-line
              console.log(e)
            },
          },
        ],
      }
    },
  }
})
