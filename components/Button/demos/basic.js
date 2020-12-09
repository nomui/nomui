define([], function () {

    return {
        text: '基础用法',
        demo: function () {
            return {
                children: [
                    {
                        text: '普通',
                        popup: {
                            children: 'hello',
                            triggerType: 'hover',
                            render: false
                        }
                    },
                    {
                        text: '禁用',
                        disable: true
                    },
                    {
                        text: '简单样式',
                        type: 'plain'
                    }
                ],
                childDefaults: {
                    component: 'Button',
                    styles: {
                        margin: '1'
                    }
                }
            }
        }
    }
})