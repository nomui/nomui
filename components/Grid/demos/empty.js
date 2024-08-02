define([], function () {
    return {
        title: '空数据',
        file: 'empty',
        demo: function () {
            return {
                component: 'Grid',
                showTitle: true,
                rowSelectable: {
                    onSelect: (args) => {
                        console.log(args)
                    },
                },

                attrs: {
                    style: {
                        height: '400px'
                    }
                },
                columns: [
                    {
                        field: 'name',
                        key: 'name',
                        title: '标题',
                        width: 200,
                    },
                    {
                        field: 'author',
                        key: 'author',
                        title: '作者',
                    },
                    {
                        field: 'sales',
                        key: 'sales',
                        title: '销量',
                    },

                    {
                        field: 'role',
                        key: 'role',
                        title: '主角',
                        width: 500,
                        showTitle: false,
                    },
                ],
                data: []
            }
        },
    }
})
