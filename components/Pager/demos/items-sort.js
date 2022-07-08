define([], function () {
  let pagerRef
  const typeMap = {
    c: 'count',
    p: 'pages',
    s: 'sizes',
  }
  return {
    title: '排列顺序',
    file: 'items-sort',
    description:
      '可通过配置`itemsSort`来实现分页内部组件的的顺序,`count: 数据总条数`,`pages: 分页数List`, `sizes: 分页大小Select`',
    demo: function () {
      return {
        component: 'Flex',
        rows: [
          {
            component: 'RadioList',
            uistyle: 'button',
            value: 'end',
            options: [
              { text: `默认顺序['count', 'pages', 'sizes']`, disabled: true, value: null },
              { text: 'c,p,s', value: 'c,p,s' },
              { text: 'c,s,p', value: 'c,s,p' },
              { text: 'p,c,s', value: 'p,c,s' },
              { text: 'p,s,c', value: 'p,s,c' },
            ],
            onValueChange: ({ newValue }) => {
              pagerRef.update({ itemsSort: newValue.split(',').map((item) => typeMap[item]) })
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
