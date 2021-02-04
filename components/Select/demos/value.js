define([], function () {
    return {
        title: '设值取值',
        file: 'value',
        demo: function () {
            let singleSelectRef = null, multipleSelectRef = null
            return {
                component: 'Rows',
                items: [
                    {
                        component: 'Cols',
                        items: [
                            {
                                component: 'Button',
                                text: '设值',
                                onClick: () => {
                                    singleSelectRef.setValue(1)
                                    multipleSelectRef.setValue([1, 2])
                                }
                            }
                        ]
                    },
                    {
                        component: 'Select',
                        ref: (c) => {
                            singleSelectRef = c
                        },
                        placeholder: '选择你喜欢的作者',
                        options: [
                            {
                                text: '金庸',
                                value: 0,
                            },
                            {
                                text: '古龙',
                                value: 1,
                            },
                            {
                                text: '梁羽生',
                                value: 2,
                            },
                            {
                                text: '温瑞安',
                                value: 3,
                            },
                        ],
                    },
                    {
                        component: 'Select',
                        ref: (c) => {
                            multipleSelectRef = c
                        },
                        multiple: true,
                        placeholder: '选择你喜欢的作者们',
                        options: [
                            {
                                text: '金庸',
                                value: 0,
                            },
                            {
                                text: '古龙',
                                value: 1,
                            },
                            {
                                text: '梁羽生',
                                value: 2,
                            },
                            {
                                text: '温瑞安',
                                value: 3,
                            },
                        ],
                    },
                ],
            }
        },
    }
})
