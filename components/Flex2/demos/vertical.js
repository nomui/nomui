define([], function () {
    return {
        title: '纵向显示',
        file: 'vertical',
        description:
            '如要纵向显示，设置 vertical 为 true',
        demo: function () {
            const itemStyles = {
                padding: '1'
            }

            return {
                component: 'Flex',
                vertical: true,
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
