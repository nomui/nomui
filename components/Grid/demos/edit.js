define([], function () {
    return {
        title: '行内编辑',
        file: 'edit',
        demo: function () {
            let gridRef = null

            const roleArr = [
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
            ]

            const deptArr = [
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
            ]

            const sexArr = [
                {
                    text: '男',
                    value: '1',
                },
                {
                    text: '女',
                    value: '2',
                },
            ]


            return {
                component: 'Flex',
                gutter: 'small',
                rows: [
                    {
                        gutter: 'small',
                        cols: [
                            {
                                component: 'Button',
                                text: '新增编辑行',
                                onClick: () => {
                                    gridRef.appendRow({ editMode: true, data: { id: nomui.utils.newGuid() } })
                                }
                            },
                            {
                                component: 'Button',
                                text: '新增行(带默认值)',
                                onClick: () => {
                                    gridRef.appendRow({ data: { id: nomui.utils.newGuid(), name: '任我行', date: '2024-01-15', role: '4', dept: '0-1-1', sex: '2' } })
                                }
                            },
                            {
                                component: 'Button',
                                text: '获取已修改数据'
                            }
                        ]
                    },
                    {
                        component: 'Grid',
                        ref: (c) => {
                            gridRef = c
                        },
                        columns: [
                            {
                                field: 'name',
                                title: '姓名',
                                width: 200,
                                editRender: ({ cellData }) => {
                                    return {
                                        component: 'Textbox',
                                        value: cellData
                                    }
                                },
                                cellRender: ({ cellData }) => {
                                    if (!cellData) return '-'
                                    return cellData
                                }
                            },
                            {
                                field: 'date',
                                title: '入职日期',
                                width: 500,
                                editRender: ({ cellData }) => {
                                    return {
                                        component: 'DatePicker',
                                        required: true,
                                        value: cellData,
                                    }
                                },
                                cellRender: ({ cellData }) => {
                                    if (!cellData) return '-'
                                    return cellData
                                }
                            },
                            {
                                field: 'role',
                                title: '岗位',
                                editRender: ({ cellData }) => {
                                    return {
                                        component: 'Select',
                                        optionFields: { text: 'name', value: 'value' },
                                        value: cellData,
                                        options: roleArr
                                    }
                                },
                                cellRender: ({ cellData }) => {
                                    if (!cellData) return '-'
                                    return roleArr.filter(n => {
                                        return n.value === cellData
                                    })[0].name
                                }
                            },
                            {
                                field: 'dept',
                                title: '部门',
                                width: 500,
                                editRender: ({ cellData }) => {
                                    return {
                                        component: 'TreeSelect',
                                        value: cellData,
                                        options: deptArr
                                    }
                                },
                                cellRender: ({ cellData }) => {
                                    if (!cellData) return '-'
                                    let obj = {}
                                    const mapTree = (arr) => {
                                        arr.forEach(n => {
                                            if (n.value === cellData) {
                                                obj = n

                                            }
                                            else if (n.children) {
                                                mapTree(n.children)
                                            }
                                        })
                                    }
                                    mapTree(deptArr)
                                    return obj.text
                                }

                            },
                            {
                                field: 'sex',
                                title: '性别',
                                editRender: ({ cellData }) => {
                                    return {
                                        component: 'RadioList',
                                        required: true,
                                        value: cellData,
                                        options: sexArr
                                    }
                                },
                                cellRender: ({ cellData }) => {
                                    if (!cellData) return '-'
                                    if (cellData === '1') return '男'
                                    if (cellData === '2') return '女'
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
                                                text: row.props.editMode ? '保存' : '编辑',
                                                onClick: () => {
                                                    if (row.props.editMode) {
                                                        if (row.validate()) {
                                                            row.save()
                                                        }
                                                    }
                                                    else {
                                                        row.edit()
                                                    }

                                                }
                                            },
                                            {
                                                text: row.props.editMode ? '取消' : '删除',
                                                onClick: () => {
                                                    if (row.props.editMode) {
                                                        row.save(false)
                                                    }
                                                    else {
                                                        row.remove()
                                                    }

                                                }
                                            }
                                        ]
                                    }
                                }
                            }

                        ],
                        data: [
                            { id: 1, name: '张小花', date: '2020-03-15', role: '2', dept: '0-1-2', sex: '1' },

                        ],
                    }
                ]
            }
        },
    }
})
