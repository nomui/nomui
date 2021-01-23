define([], function () {
    return {
        title: '字段占用栏数',
        file: 'span',
        demo: function () {
            return {
                component: 'Group',
                fields: [
                    {
                        component: 'Textbox', name: 'name', label: '姓名',
                        span: '6',
                    },
                    {
                        component: 'Numberbox', name: 'age', label: '年龄',
                        span: '6',
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
        },
    }
})
