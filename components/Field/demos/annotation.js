define([], function () {
    return {
        title: '标记',
        file: 'annotation',
        description: '',
        demo: function () {
            return {
                component: 'Textbox',
                label: '姓名',
                labelAlign: 'right',
                extra: 'Please input your chinese name',
                action: [{ component: 'Button', text: '我是操作' }],
                annotation: {}
            }
        },
    }
})
