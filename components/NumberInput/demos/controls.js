define([], function () {
    return {
        title: '微调按钮显示隐藏',
        file: 'controls',
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
                                name: '6',
                                label: '不显示微调按钮',
                                controls: false,
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
