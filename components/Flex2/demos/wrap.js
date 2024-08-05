define([], function () {
    return {
        title: '自动换行',
        file: 'wrap',
        description:
            '设置 wrap 为 true 自动换行',
        demo: function () {
            const itemStyles = {
                padding: '1'
            }

            return {
                component: 'Flex',
                wrap: true,
                items: [
                    {
                        children: 'item .......................... 1',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 2',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 3',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 4',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 5',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 6',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 7',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 8',
                        styles: itemStyles
                    },
                    {
                        children: 'item .......................... 9',
                        styles: itemStyles
                    },
                ],
            }
        },
    }
})
