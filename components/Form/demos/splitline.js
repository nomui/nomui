define([], function () {
    return {
        title: '分隔线样式',
        file: 'splitline',
        demo: function () {
            let form = null

            return {
                component: 'Rows',
                items: [
                    {
                        component: 'RadioList',
                        uistyle: 'button',
                        options: [
                            { text: '一列', value: 12 },
                            { text: '二列', value: 6 },
                            { text: '三列', value: 4 },
                        ],
                        onValueChange: (args) => {
                            form.update({
                                fieldDefaults: {
                                    span: args.newValue
                                }
                            })
                        }
                    },
                    {
                        component: 'Form',
                        ref: (c) => {
                            form = c
                        },
                        line: 'splitline',
                        fieldDefaults: {
                            span: 12,
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
