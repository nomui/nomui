define([], function () {

    return {
        text: '带分页',
        file: 'with-pager',
        demo: function () {
            var demo = this;

            function getData(pageIndex) {
                fetch(`https://randomuser.me/api?results=10&page=${pageIndex}`, { mode: 'cors' })
                    .then(res => res.json())
                    .then(function (data) {
                        demo.refs.table.update({ data: data.results })
                        demo.refs.pager.update({ totalCount: 200, pageIndex: pageIndex })
                    })
            }
            return {
                children: [
                    {
                        component: 'Table',
                        ref: 'table',
                        columns: [
                            {
                                field: 'name.first', title: 'Name', width: 200,
                            },
                            {
                                field: 'gender', title: 'Gender'
                            },
                            {
                                field: 'email', title: 'Email', width: 500
                            }
                        ]
                    },
                    {
                        component: 'Pager',
                        ref: 'pager',
                        events: {
                            pageChange: function (params) {
                                getData(params.pageIndex)
                            }
                        }
                    }
                ],
                _create: function () {
                    getData(1)
                }
            }
        }
    }
})