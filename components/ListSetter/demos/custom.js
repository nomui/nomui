define(['css!./custom.css'], function () {
    return {
        title: '自定义',
        file: 'custom',
        demo: function () {
            let fieldSelectorRef = null

            const columns = [
                { type: 'createTime', label: '创建时间', value: null },
                { type: 'code', label: '编号', value: null },
                { type: 'fixed', label: '固定字符串', value: null },
            ]

            const covertValueString = (obj) => {
                return `起始值:${obj.start}, 长度：${obj.length}, 自动补零:${obj.fillZero ? '是' : '否'}`
            }

            return {
                children: {
                    component: 'ListSetter',
                    label: '表格列设置',
                    labelAlign: 'top',
                    minItems: 1,
                    listItemRender: ({ itemData }) => {
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
                                    children: nomui.utils.isPlainObject(itemData.value) ? covertValueString(itemData.value) : itemData.value
                                },
                            ]
                        }

                    },
                    actions: ({ listSetter }) => {
                        return {
                            component: 'Icon',
                            type: 'plus',
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
                                    data: columns,
                                    itemRender: ({ itemData }) => {
                                        return {
                                            component: 'Flex',
                                            justify: 'between',
                                            gap: 'large',
                                            onClick: () => {
                                                listSetter.appendItem(itemData)
                                            },
                                            items: [
                                                {
                                                    children: itemData.label
                                                },
                                                {
                                                    children: '添加'
                                                }
                                            ]

                                        }
                                    }
                                }
                            }
                        }
                    },
                    onValueChange: ({ newValue }) => {
                        console.log(newValue)

                    },
                    onItemRemoved: ({ key }) => {
                        fieldSelectorRef.unselectItem(key, { triggerUnselect: false })
                    },
                    itemForm: (itemData) => {
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
                    keyField: 'type',
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
