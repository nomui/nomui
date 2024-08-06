define([], function () {
    return {
        title: '拖拽排序',
        file: 'sortable',
        description: '设置 sortable 为 true 即可开启拖拽排序。',
        demo: function () {
            let listRef = null

            return {
                component: 'Flex',
                vertical: true,
                gap: 'large',
                items: [
                    {
                        component: 'Flex',
                        gap: 'large',
                        items: [
                            {
                                component: 'Button',
                                text: '获取所有数据',
                                onClick: () => {
                                    const datas = JSON.stringify(listRef.getItemDatas())
                                    new nomui.Message({
                                        content: `所有数据：${datas}`,
                                        type: 'info',
                                        duration: 5,
                                    })
                                }
                            },
                            {
                                component: 'Button',
                                text: '获取子元素键数组',
                                onClick: () => {
                                    const datas = JSON.stringify(listRef.getItemKeys())
                                    new nomui.Message({
                                        content: `所有数据：${datas}`,
                                        type: 'info',
                                        duration: 5,
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
                        sortable: true,
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
