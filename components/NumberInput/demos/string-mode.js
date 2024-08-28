define([], function () {
    return {
        title: '字符串模式',
        file: 'string-mode',
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
                                name: '3',
                                stringMode: true,
                                label: '字符串模式',
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
