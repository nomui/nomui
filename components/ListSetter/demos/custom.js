define([], function () {
    return {
        title: '自定义',
        file: 'custom',
        demo: function () {
            let fieldSelectorRef = null
            let listSetterRef = null

            const data =
                [
                    { type: 'createTime', label: '创建时间', value: null },
                    { type: 'code', label: '编号', value: null },
                    { type: 'fixed', label: '固定字符串', value: null },
                ]

            const convertValueString = (val) => {
                if (!val) {
                    return '-'
                }
                if (nomui.utils.isString(val)) {
                    return val
                }
                return `起始值:${val.start || '-'}, 长度：${val.length || '-'}, 自动补零:${val.fillZero ? '是' : '否'}`
            }

            return {
                attrs: {
                    style: {
                        width: '400px'
                    }
                },
                children: {
                    component: 'Flex',
                    gap: 'medium',
                    vertical: true,
                    items: [
                        {
                            component: 'Flex',
                            items: [
                                {
                                    component: 'Button',
                                    text: '获取值',
                                    onClick: () => {
                                        const values = listSetterRef.getValue()
                                        console.log(values)
                                    }
                                }
                            ]
                        },
                        {
                            component: 'ListSetter',
                            label: '编号规则设置',
                            labelAlign: 'top',
                            ref: c => {
                                listSetterRef = c
                            },
                            // minItems: 1,
                            itemRemovable: ({ itemData }) => {
                                return itemData.type !== 'fixed'
                            },
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
                                            children: convertValueString(itemData.value)
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
                                    "type": "fixed",
                                    "label": "固定字符串",
                                    "value": "wt-",
                                    "id": "28a8347a5211466fb04350b52768a218"
                                },
                                {
                                    "type": "createTime",
                                    "label": "创建时间",
                                    "value": 'yyyy-MM-DD HH:mm:ss',
                                    "id": "7c98e3666bf74df886835db015dc7daf"
                                },
                                {
                                    "type": "code",
                                    "label": "编号",
                                    "value": {
                                        "start": 0,
                                        "length": 4,
                                        "fillZero": true
                                    },
                                    "id": "2b7a9a6b215442dab3c391b367c0b9dc"
                                }
                            ]
                        }
                    ],
                },
            }
        },
    }
})
