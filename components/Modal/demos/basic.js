define([], function () {
    return {
        text: '点击弹出',
        file: 'basic',
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
                                        content: {
                                            header: {
                                                title: 'hello'
                                            },
                                            body: {
                                                children: [
                                                    {
                                                        children: 'I am a modal'
                                                    }
                                                ]
                                            }
                                        }
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