define([], function () {
    return {
        title: '没有头部/底部',
        file: 'no-header-or-no-footer',
        description:
            '通过 `noHeader` 配置是否不要头部，通过 `noFooter` 配置是否不要底部。当需要完全自定义头部或底部时可以设置这两个属性。',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Button',
                        name: 'button',
                        text: '点我',
                        onClick: function () {
                            new nomui.Modal({
                                noHeader: true,
                                noFooter: true,
                                content: {
                                    component: 'Panel',
                                    body: {
                                        children: [
                                            {
                                                children: 'I am a modal',
                                            },
                                        ],
                                    },
                                },
                            })
                        },
                    },
                ],
            }
        },
    }
})
