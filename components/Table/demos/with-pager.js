define([], function () {
  return {
    title: '带分页',
    file: 'with-pager',
    demo: function () {
      let table = null
      let pager = null

      function getData(pageIndex) {
        table.loading()
        fetch(`https://randomuser.me/api?results=10&page=${pageIndex}`, { mode: 'cors' })
          .then((res) => res.json())
          .then(function (data) {
            table.update({ data: data.results })
            pager.update({ totalCount: 200, pageIndex: pageIndex })
          })
      }
      return {
        children: [
          {
            component: 'Table',
            ref: (c) => {
              table = c
            },
            columns: [
              {
                field: 'name.first',
                title: 'Name',
                width: 200,
              },
              {
                field: 'gender',
                title: 'Gender',
              },
              {
                field: 'email',
                title: 'Email',
                width: 500,
              },
            ],
          },
          {
            component: 'Pager',
            ref: (c) => {
              pager = c
            },
            onPageChange: function (params) {
              getData(params.pageIndex)
            },
          },
        ],
        _rendered: function () {
          getData(1)
        },
      }
    },
  }
})
