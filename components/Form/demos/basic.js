define([], function () {

    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Form',
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
                    }
                ]
            }
        }
    }
})