define([], function () {

    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Flex',
                items: [
                    {
                        text: '普通',
                    },
                    {
                        text: '禁用',
                        disabled: true
                    },
                    {
                        text: '简单样式',
                        type: 'plain'
                    }
                ],
                itemDefaults: {
                    component: 'Button',
                }
            }
        }
    }
})