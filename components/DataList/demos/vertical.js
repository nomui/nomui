define([], function () {
    return {
        title: '纵向显示',
        file: 'vertical',
        description: '如要纵向显示，设置 vertical 为 true',
        demo: function () {
            return {
                component: 'DataList',
                vertical: true,
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
