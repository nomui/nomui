define([], function () {
  return {
    title: '自定义pagesize',
    file: 'page-size',
    demo: function () {
      return {
        children: [
          {
            component: 'Pager',
            totalCount: 100,
            pageSize: 20,
            pageSizeOptions: [
              {
                text: '20条/页',
                value: 20,
              },
              {
                text: '50条/页',
                value: 50,
              },
              {
                text: '80条/页',
                value: 80,
              },
            ],
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
