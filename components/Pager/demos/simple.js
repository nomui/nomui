define([], function () {
  return {
    title: '简单模式',
    file: 'simple',
    demo: function () {
      return {
        children: [
          {
            component: 'Pager',
            totalCount: 50,
            simple: true,
            pageIndex: 1,
            pageSize: 20,
            displayItemCount: 6,
            edgeItemCount: 2,
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
