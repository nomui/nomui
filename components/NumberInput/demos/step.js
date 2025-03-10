define([], function () {
    return {
        title: '步长',
        file: 'step',
        description: '通过step控制微调器点击的步进值',
        demo: function () {
            let group = null

            return {
                component: 'Flex',
                rows: [
                    {
                        component: 'Group',
                        ref: (c) => {
                            group = c
                        },
                        fields: [
                            {
                                component: 'NumberInput',
                                name: '1',
                                step: 10,
                                label: '步长',
                            },

                            {
                                component: 'Field',
                                label: '',
                                control: {
                                    component: 'Cols',
                                    items: [
                                        {
                                            component: 'Button',
                                            text: '取值',
                                            onClick: function () {
                                                console.log(group.getValue())
                                            },
                                        },
                                        {
                                            component: 'Button',
                                            text: '赋值',
                                            onClick: function () {
                                                group.setValue({
                                                    1: 213,
                                                    2: 2312321,
                                                    3: 2134,
                                                    4: 123
                                                })
                                            },
                                        }
                                    ],
                                },
                            },
                        ],
                    },
                ],
            }

        },
    }
})
