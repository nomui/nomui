define([], function () {
    return {
        title: '可折叠',
        file: 'collapsible',
        demo: function () {
            return {
                component: 'Group',
                fields: [
                    {
                        component: 'Group',
                        labelAlign: 'top',
                        collapsible: true,
                        label: '群组1',
                        fields: [
                            {
                                component: 'Textbox',
                                name: 'name',
                                label: '姓名',
                            },
                            {
                                component: 'Numberbox',
                                name: 'age',
                                label: '年龄',
                            },
                            {
                                component: 'RadioList',
                                name: 'gender',
                                label: '性别',
                                options: [
                                    { text: '男', value: 0 },
                                    { text: '女', value: 1 },
                                ],
                            },
                            {
                                component: 'CheckboxList',
                                name: 'hobbies',
                                label: '爱好',
                                options: [
                                    { text: '唱歌', value: 1 },
                                    { text: '跳舞', value: 2 },
                                    { text: '旅游', value: 3 },
                                ],
                            },
                            {
                                component: 'Checkbox',
                                name: 'aggree',
                                text: '同意',
                                label: '',
                            },
                        ],
                    },
                    {
                        component: 'Group',
                        labelAlign: 'top',
                        collapsible: {
                            render: (collapsed) => {
                                return {
                                    component: 'Button',
                                    type: 'primary',
                                    size: 'small',
                                    text: collapsed ? '收起' : '展开',
                                    icon: collapsed ? 'sort-up' : 'sort-down'
                                }
                            }
                        },
                        label: '自定义折叠样式',
                        fields: [
                            {
                                component: 'Textbox',
                                name: 'name',
                                label: '姓名',
                            },
                            {
                                component: 'Numberbox',
                                name: 'age',
                                label: '年龄',
                            },
                            {
                                component: 'RadioList',
                                name: 'gender',
                                label: '性别',
                                options: [
                                    { text: '男', value: 0 },
                                    { text: '女', value: 1 },
                                ],
                            },
                            {
                                component: 'CheckboxList',
                                name: 'hobbies',
                                label: '爱好',
                                options: [
                                    { text: '唱歌', value: 1 },
                                    { text: '跳舞', value: 2 },
                                    { text: '旅游', value: 3 },
                                ],
                            },
                            {
                                component: 'Checkbox',
                                name: 'aggree',
                                text: '同意',
                                label: '',
                            },
                        ],
                    },
                ],
            }
        },
    }
})
