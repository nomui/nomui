define([], function () {
    return {
        title: 'label 对齐方式',
        file: 'label-align',
        demo: function () {
            let form = null

            return {
                component: 'Rows',
                items: [
                    {
                        component: 'RadioList',
                        options: [
                            { text: '左边对齐', value: 'left' },
                            { text: '右边对齐', value: 'right' },
                            { text: '上边对齐', value: 'top' },
                        ],
                        onValueChange: (args) => {
                            form.update({
                                fieldDefaults: {
                                    labelAlign: args.newValue
                                }
                            })
                        }
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
