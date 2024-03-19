define([], function () {
    return {
        title: '自定义按钮文字',
        file: 'button-text',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Button',
                        text: '删 除',
                        styles: {
                            color: 'danger'
                        },
                        attrs: {
                            onclick: function () {
                                new nomui.Confirm({
                                    title: '确定删除吗 ？',
                                    description: '删除以后数据不可恢复',
                                    okText: '是 的',
                                    cancelText: '不 要'
                                })
                            },
                        },
                    },
                ],
            }
        },
    }
})
