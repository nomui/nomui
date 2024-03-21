define([], function () {
    return {
        title: '行内编辑',
        file: 'edit',
        demo: function () {
            return {
                component: 'Flex',
                gutter: 'small',
                rows: [
                    {
                        gutter: 'small',
                        cols: [
                            {
                                component: 'Button',
                                text: '新增行'
                            },
                            {
                                component: 'Button',
                                text: '新增行(带默认值)'
                            },
                            {
                                component: 'Button',
                                text: '获取已修改数据'
                            }
                        ]
                    },
                    {
                        component: 'Grid',
                        columns: [
                            {
                                field: 'name',
                                title: '姓名',
                                width: 200,
                                editable: true
                            },
                            {
                                field: 'date',
                                title: '入职日期',
                                width: 500,
                                editable: {
                                    component: 'DatePicker',
                                }
                            },
                            {
                                field: 'role',
                                title: '岗位',
                                editable: {
                                    component: 'Select',
                                    optionFields: { text: 'name', value: 'value' },
                                    options: [
                                        {
                                            name: '前端开发工程师',
                                            value: '1',
                                        },
                                        {
                                            name: '后端开发工程师',
                                            value: '2',
                                        },
                                        {
                                            name: 'UI设计师',
                                            value: '3',
                                        },
                                        {
                                            name: '产品经理',
                                            value: '4',
                                        },
                                    ],
                                }
                            },
                            {
                                field: 'dept',
                                title: '部门',
                                width: 500,
                                editable: {
                                    component: 'TreeSelect',
                                    maxTagCount: 3,
                                    options: [
                                        {
                                            text: '总经办',
                                            value: '0-0',
                                            children: [
                                                {
                                                    text: '人事部',
                                                    value: '0-0-1',
                                                },
                                                {
                                                    text: '行政部',
                                                    value: '0-0-2',
                                                },
                                            ],
                                        },
                                        {
                                            text: '技术中心',
                                            value: '0-1',
                                            children: [
                                                {
                                                    text: '后端组',
                                                    value: '0-1-1',
                                                    children: [
                                                        {
                                                            text: '开发一组',
                                                            value: '0-1-1-1',
                                                        },
                                                        {
                                                            text: '开发二组',
                                                            value: '0-1-1-2',
                                                        },
                                                    ],
                                                },
                                                {
                                                    text: '前端组',
                                                    value: '0-1-2',
                                                },
                                            ],
                                        },
                                    ],

                                }
                            },
                            {
                                field: 'sex',
                                title: '性别',
                                editable: {
                                    component: 'RadioList',
                                    options: [
                                        {
                                            text: '男',
                                            value: '1',
                                        },
                                        {
                                            text: '女',
                                            value: '2',
                                        },
                                    ],
                                }
                            },
                            {
                                field: 'actions',
                                title: '操作',
                                cellRender: ({ row }) => {
                                    return {
                                        component: 'Toolbar',
                                        items: [
                                            {
                                                text: '编辑',
                                                onClick: () => {
                                                    row.edit()
                                                }
                                            },
                                            {
                                                text: '保存',
                                                onClick: () => {
                                                    row.save()
                                                }
                                            }
                                        ]
                                    }
                                }
                            }

                        ],
                        data: [
                            { id: 1, name: '张小花', date: '2020-3-15', role: '2', dept: '0-1-2', sex: '1' },

                        ],
                    }
                ]
            }
        },
    }
})
