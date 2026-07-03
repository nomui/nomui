define([], function () {
    return {
        title: '列表开启虚拟渲染',
        file: 'virtual',
        demo: function () {
            let listRef = null
            const data = Array.from({ length: 10000 }).map((_, index) => ({
                id: index + 1,
                name: `数据项 ${index + 1}`,
            }))
            return {
                component: 'Flex',
                direction: 'column',
                items: [
                    {
                        component: 'Flex',
                        gap: 'small',
                        items: [
                            {
                                component: 'Button',
                                text: '全选/取消全选',
                                onClick: () => {
                                    const allKeys = listRef.getItemDatas().map(item => item.id)
                                    const selecteds = listRef._getSelectedKeys()
                                    listRef.update({
                                        selectedKeys: selecteds?.length === allKeys.length ? [] : allKeys,
                                    })
                                }
                            },
                        ]
                    },
                    {
                        component: 'Textbox',
                        onValueChange: ({ newValue }) => {
                            const filteredDataSource = data.filter(item => item.name.includes(newValue || ''))
                            listRef.update({
                                data: filteredDataSource,
                            })
                        }
                    },
                    {
                        component: 'Divider',
                    },
                    {
                        component: 'DataList',
                        virtual: true,
                        vertical: true,
                        gap: 'small',
                        dataKey: 'id',
                        ref: c => {
                            listRef = c
                        },
                        itemSelectable: {
                            byClick: true,
                        },
                        data,
                        itemRender: ({ itemData }) => {
                            return {
                                styles: {
                                    padding: '1',
                                    cursor: 'pointer',
                                    hover: {
                                        color: 'lprimary-light',
                                    },
                                    selected: {
                                        color: 'lprimary',
                                    },
                                },
                                children: itemData.name,
                            }
                        },
                    }
                ],
            }
        },
    }
})
