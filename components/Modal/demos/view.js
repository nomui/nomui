define([], function () {
    return {
        title: '弹出其他视图',
        file: 'view',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Button',
                        name: 'button',
                        text: '点我',
                        attrs: {
                            onclick: function () {
                                new nomui.Modal(
                                    {
                                        content: '/components/Modal/demos/view-content.js'
                                    }
                                )
                            }
                        }
                    }
                ]
            }
        }
    }
})