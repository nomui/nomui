define([], function () {

    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Grid',
                columns: [
                    {
                        field: 'name', title: '标题', width: 200,
                    },
                    {
                        field: 'author', title: '作者'
                    },
                    {
                        field: 'role', title: '主角', width: 500
                    }
                ],
                data: [
                    { id: 1, name: '笑傲江湖', author: '金庸', role: '令狐冲' },
                    { id: 4, name: '天龙八部', author: '金庸', role: '乔峰' },
                    { id: 5, name: '射雕英雄传', author: '金庸', role: '郭靖' },
                ]
            }
        }
    }
})