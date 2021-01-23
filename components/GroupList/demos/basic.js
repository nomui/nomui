define([], function () {
    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Form',
                fields: [{
                    component: 'GroupList',
                    label: '教育经历',
                    groupDefaults: {
                        inline: true,
                        line: 'outline',
                    },
                    fields: [
                        {
                            component: 'Textbox', name: 'school', label: '学校名称',
                        },
                        {
                            component: 'Numberbox', name: 'startYear', label: '入学年份',
                        },
                    ],
                }
                ]
            }
        },
    }
})
