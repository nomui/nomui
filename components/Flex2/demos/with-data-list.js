define([], function () {
    return {
        title: '与 DataList 配合使用',
        file: 'with-data-list',
        description:
            '将 Flex 做为 DataList 子元素使用',
        demo: function () {
            const books = [
                { name: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
                { name: '雪山飞狐', publisher: '三联出版社', publication_year: '1980' },
                { name: '连城诀', publisher: '三联出版社', publication_year: '1980' },
                { name: '天龙八部', publisher: '三联出版社', publication_year: '1980' },
                { name: '射雕英雄传', publisher: '三联出版社', publication_year: '1980' },
            ]

            return {
                component: 'DataList',
                wrap: true,
                gap: 'large',
                data: books,
                itemRender: ({ itemData }) => {
                    return {
                        component: 'Flex',
                        vertical: true,
                        gap: 'small',
                        styles: {
                            padding: '1',
                            shadow: 'lg',
                        },
                        items: [
                            {
                                tag: 'img',
                                attrs: {
                                    src: `docs/images/books/${itemData.name}.jpg`,
                                },
                            },
                            { children: itemData.name },
                            {
                                children: {
                                    styles: {
                                        text: 'muted',
                                    },
                                    children: `${itemData.publisher} / ${itemData.publication_year}`,
                                },
                            },
                            {
                                component: 'Flex',
                                justify: 'between',
                                items: [
                                    {
                                        component: 'Button',
                                        text: '修改',
                                    },
                                    {
                                        component: 'Button',
                                        text: '删除',
                                        danger: true,
                                    },
                                ],
                            },
                        ],
                    }
                },
            }
        },
    }
})
