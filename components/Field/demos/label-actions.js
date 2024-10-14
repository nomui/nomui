define([], function () {
    return {
        title: '标签操作',
        file: 'label-actions',
        description: '',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Field',
                        label: '我是标签',
                        labelAlign: 'top',
                        labelActions: {
                            component: 'Button',
                            icon: 'plus'
                        },
                        control: { children: '我是内容' },
                        action: [{ component: 'Button', text: '我是操作' }]
                    },
                ],
            }
        },
    }
})
