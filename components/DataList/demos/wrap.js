define([], function () {
    return {
        title: '自动换行',
        file: 'wrap',
        description: '设置 wrap 为 true 自动换行',
        demo: function () {
            return {
                component: 'DataList',
                wrap: true,
                data: [
                    { name: '飞狐外传' },
                    { name: '雪山飞狐' },
                    { name: '连城诀' },
                    { name: '天龙八部' },
                    { name: '射雕英雄传' },
                    { name: '白马啸西风' },
                    { name: '鹿鼎记' },
                    { name: '笑傲江湖' },
                    { name: '书剑恩仇录' },
                    { name: '神雕侠侣' },
                    { name: '倚天屠龙记' },
                    { name: '碧血剑' },
                    { name: '鸳鸯剑' },
                    { name: '飞狐外传' },
                    { name: '雪山飞狐' },
                    { name: '连城诀' },
                    { name: '天龙八部' },
                    { name: '射雕英雄传' },
                    { name: '白马啸西风' },
                    { name: '鹿鼎记' },
                    { name: '笑傲江湖' },
                    { name: '书剑恩仇录' },
                    { name: '神雕侠侣' },
                    { name: '倚天屠龙记' },
                    { name: '碧血剑' },
                    { name: '鸳鸯剑' },
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
