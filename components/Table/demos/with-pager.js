define([], function () {

    return {
        text: '带分页',
        demo: function () {
            var demo = this;

            function getData(pageIndex) {
                nom.request('https://randomuser.me/api', {
                    params: {
                        results: 10,
                        page: pageIndex
                    }
                }).then(function (data) {
                    demo.refs.table.update({ data: data.results });
                    demo.refs.pager.update({ totalCount: 200, pageIndex: pageIndex });
                });
            };
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
                                getData(params.pageIndex);
                            }
                        }
                    }
                ],
                _create: function () {
                    getData(1);
                }
            };
        }
    };
});