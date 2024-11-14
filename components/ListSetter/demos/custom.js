define([], function () {
    return {
        title: '自定义',
        file: 'custom',
        demo: function () {
            let fieldSelectorRef = null

            const data = [
                { type: 'createTime', label: '创建时间', value: null },
                { type: 'code', label: '编号', value: null },
                { type: 'fixed', label: '固定字符串', value: null },
            ]

            const convertValueString = (obj) => {
                return `起始值:${obj.start}, 长度：${obj.length}, 自动补零:${obj.fillZero ? '是' : '否'}`
            }

            return {
                attrs: {
                    style: {
                        width: '400px'
                    }
                },
                children: {
                    component: 'ListSetter',
                    label: '编号规则设置',
                    labelAlign: 'top',
                    // minItems: 1,
                    itemRender: ({ itemData }) => {
                        return {
                            component: 'Flex',
                            items: [
                                {
                                    attrs: {
                                        style: {
                                            paddingRight: '5px',
                                            color: '#666'
                                        }
                                    },
                                    children: `${itemData.label} :`
                                },
                                {
                                    children: nomui.utils.isPlainObject(itemData.value) ? convertValueString(itemData.value) : itemData.value
                                },
                            ]
                        }

                    },
                    actions: ({ listSetter }) => {
                        return {
                            component: 'Icon',
                            type: 'plus',
                            styles: {
                                cursor: 'pointer'
                            },
                            popup: {
                                autoRender: true,
                                children: {
                                    component: 'DataList',
                                    ref: (c) => {
                                        fieldSelectorRef = c
                                    },
                                    vertical: true,
                                    gap: 'xsmall',
                                    dataKey: 'field',
                                    data: data,
                                    itemRender: ({ itemData }) => {
                                        return {
                                            styles: {
                                                cursor: 'pointer',
                                                hover: {
                                                    color: 'lgray'
                                                }
                                            },
                                            attrs: {
                                                style: {
                                                    padding: '.5rem 1rem'
                                                }
                                            },
                                            onClick: () => {
                                                listSetter.appendItem({ ...itemData, ...{ id: nomui.utils.newGuid() } })
                                            },
                                            children: itemData.label

                                        }
                                    }
                                }
                            }
                        }
                    },
                    onValueChange: ({ newValue }) => {
                        console.log(newValue)
                        // 动态控制 selector数据源
                        const types = []
                        newValue.forEach(n => {
                            types.push(n.type)
                        })
                        fieldSelectorRef.update({ data: data.filter(x => { return !types.includes(x.type) || x.type === 'fixed' }) })

                    },
                    onItemRemoved: ({ key }) => {
                        fieldSelectorRef.unselectItem(key, { triggerUnselect: false })
                    },
                    itemForm: ({ itemData }) => {
                        // 根据type渲染不同表单内容
                        if (itemData.type === 'createTime') {
                            return {
                                fieldDefaults: {
                                    labelWidth: 100,
                                    labelAlign: 'top'
                                },
                                fields: [
                                    {
                                        component: 'Textbox',
                                        name: 'value',
                                        label: '格式',
                                    },

                                ]
                            }
                        }
                        if (itemData.type === 'fixed') {
                            return {
                                fieldDefaults: {
                                    labelWidth: 100,
                                    labelAlign: 'top'
                                },
                                fields: [
                                    {
                                        component: 'Textbox',
                                        name: 'value',
                                        label: '固定字符串',
                                    },

                                ]
                            }
                        }
                        return {
                            fieldDefaults: {
                                labelWidth: 100,
                                labelAlign: 'top'
                            },
                            fields: [
                                {
                                    component: 'Group',
                                    name: 'value',
                                    label: '编号',
                                    fieldDefaults: {
                                        labelAlign: 'left',
                                        labelWidth: 100
                                    },
                                    fields: [
                                        {
                                            component: 'NumberInput',
                                            label: '开始值',
                                            name: 'start',
                                        },
                                        {
                                            component: 'NumberInput',
                                            label: '长度',
                                            name: 'length',
                                        },
                                        {
                                            component: 'Checkbox',
                                            label: '自动补零',
                                            name: 'fillZero',
                                        }
                                    ]
                                },

                            ]
                        }
                    },
                    labelField: 'label',
                    keyField: 'id',
                    value: [
                        {
                            type: 'fixed',
                            label: '固定字符串',
                            value: 'wt-'
                        }
                    ]
                },
            }
        },
    }
})
