define([], function () {
    return {
        title: '样式综合示例',
        file: 'styles',
        demo: function () {
            let group = null

            return {
                component: 'Rows',
                items: [
                    {
                        component: 'Cols',
                        items: [
                            {
                                component: 'Checkbox',
                                text: '不换行',
                                onValueChange: (args) => {
                                    group.update({
                                        nowrap: args.newValue
                                    })
                                }
                            },
                            {
                                component: 'RadioList',
                                uistyle: 'button',
                                options: [
                                    { text: '一列', value: null },
                                    { text: '二列', value: 6 },
                                    { text: '三列', value: 4 },
                                ],
                                value: null,
                                onValueChange: (args) => {
                                    group.update({
                                        fieldDefaults: {
                                            span: args.newValue
                                        }
                                    })
                                }
                            },
                            {
                                component: 'RadioList',
                                uistyle: 'button',
                                options: [
                                    { text: '没有线', value: null },
                                    { text: '分隔线', value: 'splitline' },
                                    { text: '轮廓线', value: 'outline' },
                                ],
                                onValueChange: (args) => {
                                    group.update({
                                        line: args.newValue
                                    })
                                }
                            },
                            {
                                component: 'Checkbox',
                                text: '不显示标签',
                                onValueChange: (args) => {
                                    group.update({
                                        fieldDefaults: {
                                            notShowLabel: args.newValue
                                        }
                                    })
                                }
                            },
                            {
                                component: 'RadioList',
                                uistyle: 'button',
                                options: [
                                    { text: '标签右对齐', value: null },
                                    { text: '标签左对齐', value: 'left' },
                                    { text: '标签上对齐', value: 'top' },
                                ],
                                value: null,
                                onValueChange: (args) => {
                                    group.update({
                                        fieldDefaults: {
                                            labelAlign: args.newValue
                                        }
                                    })
                                }
                            },
                            {
                                component: 'Checkbox',
                                text: '条纹样式',
                                onValueChange: (args) => {
                                    group.update({
                                        striped: args.newValue
                                    })
                                }
                            }
                        ]
                    },
                    {
                        component: 'Group',
                        ref: (c) => {
                            group = c
                        },
                        fields: [
                            {
                                component: 'Textbox', name: 'name', label: '姓名',
                            },
                            {
                                component: 'Numberbox', name: 'age', label: '年龄',
                            },
                            {
                                component: 'Textbox', name: 'email', label: 'Email',
                            },
                            {
                                component: 'RadioList', name: 'gender', label: '性别',
                                options: [
                                    { text: '男', value: 0 },
                                    { text: '女', value: 1 },
                                ],
                            },
                            {
                                component: 'CheckboxList', name: 'hobbies', label: '爱好',
                                options: [
                                    { text: '唱歌', value: 1 },
                                    { text: '跳舞', value: 2 },
                                    { text: '旅游', value: 3 },
                                ],
                            },
                        ],
                    }
                ]
            }
        },
    }
})
