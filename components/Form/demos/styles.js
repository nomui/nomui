define([], function () {
    return {
        title: '样式综合示例',
        file: 'styles',
        demo: function () {
            let form = null

            return {
                component: 'Rows',
                items: [
                    {
                        component: 'Cols',
                        items: [
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
                                    form.update({
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
                                    form.update({
                                        line: args.newValue
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
                                    form.update({
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
                                    form.update({
                                        striped: args.newValue
                                    })
                                }
                            }
                        ]
                    },

                    {
                        component: 'Form',
                        ref: (c) => {
                            form = c
                        },
                        fields: [
                            {
                                name: 'name',
                                label: '姓名',
                                control: {
                                    component: 'Textbox',
                                },
                            },
                            {
                                name: 'age',
                                label: '年龄',
                                control: {
                                    component: 'Numberbox',
                                },
                            },
                            {
                                name: 'email',
                                label: 'Email',
                                control: {
                                    component: 'Textbox',
                                },
                            },
                            {
                                name: 'gender',
                                label: '性别',
                                control: {
                                    component: 'RadioList',
                                    options: [
                                        { text: '男', value: 0 },
                                        { text: '女', value: 1 },
                                    ],
                                },
                            },
                            {
                                name: 'hobbies',
                                label: '爱好',
                                control: {
                                    component: 'CheckboxList',
                                    options: [
                                        { text: '唱歌', value: 1 },
                                        { text: '跳舞', value: 2 },
                                        { text: '旅游', value: 3 },
                                    ],
                                },
                            },
                        ],
                    }
                ]
            }
        },
    }
})
