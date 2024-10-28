define([], function () {
    return {
        title: '标签样式',
        file: 'label-uistyle',
        description: '',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Field',
                        label: '我是标签',
                        labelAlign: 'top',
                        labelUiStyle: 'leftline',
                        control: { children: '我是内容' },
                        action: [{ component: 'Button', text: '我是操作' }]
                    },
                ],
            }
        },
    }
})
