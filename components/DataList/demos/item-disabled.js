define([], function () {
    return {
        title: '禁用项',
        file: 'item-disabled',
        description: '通过 disabledKeys 设置禁用的项。',
        demo: function () {
            return {
                component: 'DataList',
                disabledKeys: ['雪山飞狐', '白马啸西风'],
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
                        children: `《${itemData.name}》`
                    }
                }
            }
        },
    }
})
