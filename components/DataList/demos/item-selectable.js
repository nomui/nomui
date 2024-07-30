define([], function () {
    return {
        title: '数据项可选择',
        file: 'item-selectable',
        description: '通过 itemSelectable 配置数据项的可选择行为，配合 itemRender 返回的 props 的 styles 设置选中的样式。',
        demo: function () {
            let listRef = null

            return {
                component: 'Flex',
                gap: 'large',
                rows: [
                    {
                        align: 'center',
                        gap: 'large',
                        cols: [
                            {
                                component: 'RadioList',
                                uistyle: 'button',
                                value: 'single',
                                options: [
                                    { text: '单选', value: 'single' },
                                    { text: '多选', value: 'multiple' }
                                ],
                                onValueChange: ({ newValue }) => {
                                    listRef.update({ itemSelectable: { multiple: newValue === 'multiple' } })
                                }
                            },
                            {
                                component: 'Button',
                                text: '选择天龙八部',
                                onClick: () => {
                                    listRef.selectItem('天龙八部')
                                }
                            },
                            {
                                component: 'Button',
                                text: '获取选中数据',
                                onClick: () => {
                                    const selectedDataStr = JSON.stringify(listRef.getSelected(), null, 2)
                                    new nomui.Message({
                                        content: `选中数据：${selectedDataStr}`,
                                        type: 'info',
                                        duration: 3,
                                    })
                                }
                            }
                        ]
                    },
                    {
                        component: 'DataList',
                        ref: (c) => {
                            listRef = c
                        },
                        gap: 'large',
                        itemSelectable: {
                            byClick: true,
                        },
                        selectedKeys: '天龙八部',
                        dataKey: 'name',
                        data: [
                            { name: '飞狐外传' },
                            { name: '雪山飞狐' },
                            { name: '连城诀' },
                            { name: '天龙八部' },
                            { name: '射雕英雄传' },
                            { name: '白马啸西风' },
                            { name: '鹿鼎记' },
                        ],
                        itemRender: ({ itemData }) => {
                            return {
                                styles: {
                                    color: 'lgray',
                                    padding: '2',
                                    cursor: 'pointer',
                                    hover: {
                                        color: 'lprimary-light'
                                    },
                                    selected: {
                                        color: 'lprimary',
                                    }
                                },
                                children: `《${itemData.name}》`
                            }
                        }
                    }
                ]
            }
        },
    }
})
