define([], function () {
    return {
        title: '轮廓线样式',
        file: 'outline',
        demo: function () {
            let group = null

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
                        value: 12,
                        onValueChange: (args) => {
                            group.update({
                                fieldDefaults: {
                                    span: args.newValue
                                }
                            })
                        }
                    },
                    {
                        component: 'Form',
                        ref: (c) => {
                            group = c
                        },
                        line: 'outline',
                        fieldDefaults: {
                            span: 12,
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
