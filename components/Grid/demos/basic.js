define([], function () {

    return {
        text: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                children: [
                    {
                        component: 'grid',
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
                            { id: 1, name: '飞狐外传', author: '金庸', role: '胡斐' },
                            { id: 2, name: '雪山飞狐', author: '金庸', role: '胡斐' },
                            { id: 3, name: '连城诀' },
                            { id: 4, name: '天龙八部' },
                            { id: 5, name: '射雕英雄传' },
                            { id: 6, name: '白马啸西风' }
                        ]
                    }
                ]
            };
        }
    };
});