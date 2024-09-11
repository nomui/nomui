define([], function () {
    return {
        title: '结束事件',
        file: 'events',
        demo: function () {
            let loadingRef = null, container = null
            return {
                component: 'Flex',
                gap: 'small',
                rows: [
                    {
                        ref: (c) => {
                            container = c
                        },
                        styles: {
                            padding: '4',
                            border: '1px',
                        },
                        children: 'container',
                    },
                    {
                        gap: 'small',
                        cols: [
                            {
                                component: 'Button',
                                text: '先创建loading',
                                onClick: () => {
                                    loadingRef = new nomui.Loading({
                                        container: container
                                    })
                                }
                            },
                            {
                                component: 'Button',
                                text: '成功',
                                onClick: () => {
                                    if (!loadingRef || !loadingRef.props) {
                                        new nomui.Alert({
                                            title: '先创建一个Loading才能对其实例调用Close方法'
                                        })
                                    }
                                    loadingRef.close({ type: 'success' })
                                }
                            },
                            {
                                component: 'Button',
                                text: '失败',
                                onClick: () => {
                                    if (!loadingRef || !loadingRef.props) {
                                        new nomui.Alert({
                                            title: '先创建一个Loading才能对其实例调用Close方法'
                                        })
                                    }
                                    loadingRef.close({ type: 'fail' })
                                }
                            },
                            {
                                component: 'Button',
                                text: '不显示Loading 只显示成功动画',
                                onClick: () => {
                                    nomui.Loading.success()
                                }
                            },



                        ]
                    },

                ],
            }
        },
    }
})
