define([], function () {
    return {
        title: '自定义渲染',
        file: 'render',
        description: '',
        demo: function () {
            const refs = {}
            const steps = [
                {
                    render: () => {
                        return {
                            component: 'Flex',
                            align: 'center',
                            cols: [
                                {
                                    component: 'Icon',
                                    type: 'info-circle',
                                    attrs: {
                                        style: {
                                            fontSize: '2rem',
                                            color: 'var(--nom-color-info)',
                                            paddingRight: '1rem'
                                        }
                                    }
                                },
                                {
                                    children: '这是自定义渲染内容！'
                                }
                            ]
                        }
                    },
                    target: () => { return refs.step1 },
                },
            ]

            return {
                component: 'Flex',
                gutter: 'small',
                rows: [
                    {
                        gutter: 'small',
                        cols: [
                            {
                                component: 'Button',
                                ref: (c) => {
                                    refs.step1 = c
                                },
                                attrs: {
                                    id: 'step1'
                                },
                                text: '第一步'
                            },
                            {
                                grow: true,
                                children: {
                                    component: 'Button',
                                    ref: (c) => {
                                        refs.step2 = c
                                    },
                                    text: '第二步'
                                },
                            },
                            {
                                component: 'Button',
                                ref: (c) => {
                                    refs.step3 = c
                                },
                                text: '第三步'
                            },

                        ]
                    },
                    {
                        component: 'Button',
                        text: '查看指引',
                        type: 'primary',
                        onClick: () => {
                            new nomui.Tour({
                                steps: steps
                            })
                        }
                    }
                ]

            }
        },
    }
})
