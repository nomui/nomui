define([], function () {
    return {
        title: '列类型',
        file: 'column-type',
        description: '配置type为checker可以将列渲染为行选择器，配置order会渲染为行序号，配置checker&order则是行选择器与序号混合显示（hover时显示选择器，否则显示序号）',
        demo: function () {
            return {
                component: 'Flex',
                gutter: 'large',
                rows: [{
                    component: 'Grid',
                    showTitle: true,
                    rowSelectable: {
                        onSelect: (args) => {
                            console.log(args)
                        },
                    },

                    columns: [
                        {
                            field: 'name',
                            key: 'name',
                            title: '标题',
                            width: 200,
                        },
                        {
                            field: 'checker',
                            type: 'checker',
                            title: '勾选',
                            width: 80,
                        },
                        {
                            field: 'order',
                            type: 'order',
                            title: '序号',
                            align: 'center',
                            width: 80,
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
                    data: [
                        { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
                        { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
                        { id: 5, name: '射雕英雄传', author: '金庸', sales: 0, role: '郭靖' },
                    ],
                },
                {
                    component: 'Grid',
                    showTitle: true,
                    rowSelectable: {
                        onSelect: (args) => {
                            console.log(args)
                        },
                    },

                    columns: [
                        {
                            field: 'name',
                            key: 'name',
                            title: '标题',
                            width: 200,
                        },
                        {
                            field: 'checker',
                            type: 'checker&order',
                            title: '勾选',
                            width: 80,
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
                    data: [
                        { id: 1, name: '笑傲江湖', author: '金庸', sales: 100000, role: '令狐冲' },
                        { id: 4, name: '天龙八部', author: '金庸', sales: 200000, role: '乔峰' },
                        { id: 5, name: '射雕英雄传', author: '金庸', sales: 0, role: '郭靖' },
                    ],
                }]
            }
        },
    }
})
