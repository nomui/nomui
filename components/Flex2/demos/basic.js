define([], function () {
    return {
        title: '基本用法',
        file: 'basic',
        description:
            '配置 `items` 数组，会横向排列项',
        demo: function () {
            const itemStyles = {
                padding: '1'
            }

            return {
                component: 'Flex',
                items: [
                    {
                        children: 'item 1',
                        styles: itemStyles
                    },
                    {
                        children: 'item 2',
                        styles: itemStyles
                    },
                    {
                        children: 'item 3',
                        styles: itemStyles
                    },
                ],
            }
        },
    }
})
