define([], function () {

    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Cols',
                items: [
                    {
                        component: 'Button',
                        text: '普通',
                    },
                    {
                        component: 'Button',
                        text: '禁用',
                        disabled: true
                    },
                    {

                        component: 'Button',
                        text: '简单样式',
                        type: 'plain'
                    }
                ],
            }
        }
    }
})