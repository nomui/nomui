define([], function () {
  return {
    title: '更多用法',
    file: 'more',
    demo: function () {
      return {
        children: [
          {
            component: 'Pager',
            totalCount: 1000,
            pageIndex: 3,
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
