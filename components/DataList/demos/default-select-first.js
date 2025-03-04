define([], function () {
    return {
        title: '默认选择第一项',
        file: 'default-select-first',
        description: '通过 itemSelectable.defaultSelectFirst 配置默认选择第一项。',
        demo: function () {
            return {
                component: 'Flex',
                gap: 'large',
                rows: [
                    {
                        component: 'DataList',
                        gap: 'large',
                        itemSelectable: {
                            byClick: true,
                            defaultSelectFirst: true,
                            triggerOnInit: true,
                        },
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
                        },
                        onItemSelected: (itemData, key) => {
                            console.log('selected', itemData, key)
                        },
                    }
                ]
            }
        },
    }
})
