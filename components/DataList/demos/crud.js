define(['nanoid'], function (nanoid) {
    return {
        title: '增删改查',
        file: 'crud',
        description: '提供了一系列方法来进行客户端的增删改查，注意这些操作都基于根据数据项的键来找到要操作的项，默认的 dataKey 为 id。',
        demo: function () {
            let listRef = null

            const tlbbId = nanoid()
            let fhwzIndex = 1
            let tlbbIndex = 1

            const books = [
                { id: nanoid(), name: '飞狐外传', imageName: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
                { id: nanoid(), name: '雪山飞狐', imageName: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
                { id: nanoid(), name: '连城诀', imageName: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
                { id: tlbbId, name: '天龙八部', imageName: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
                { id: nanoid(), name: '射雕英雄传', imageName: '飞狐外传', publisher: '三联出版社', publication_year: '1980' },
            ]
            return {
                component: 'Flex',
                vertical: true,
                gap: 'medium',
                items: [
                    {
                        component: 'Flex',
                        gap: 'medium',
                        items: [
                            {
                                component: 'Button',
                                text: '后面新增飞狐外传',
                                onClick: () => {
                                    listRef.appendItem({
                                        id: nanoid(),
                                        name: `飞狐外传${fhwzIndex++}`,
                                        imageName: '飞狐外传',
                                        publisher: '三联出版社',
                                        publication_year: '1980',
                                    })
                                },
                            },
                            {
                                component: 'Button',
                                text: '前面新增天龙八部',
                                onClick: () => {
                                    listRef.prependItem({
                                        id: nanoid(),
                                        name: `天龙八部${tlbbIndex++}`,
                                        imageName: '天龙八部',
                                        publisher: '三联出版社',
                                        publication_year: '1980',
                                    })
                                },
                            },
                            {
                                component: 'Button',
                                text: '删除天龙八部',
                                onClick: () => {
                                    listRef.removeItem(tlbbId)
                                },
                            },
                            {
                                component: 'Button',
                                text: '获取所有子元素的键数组',
                                onClick: () => {
                                    const keys = JSON.stringify(listRef.getItemKeys(), null, 2)
                                    new nomui.Message({
                                        content: `子元素键数组：${keys}`,
                                        type: 'info',
                                        duration: 3,
                                    })
                                },
                            },
                        ],
                    },
                    {
                        component: 'DataList',
                        ref: (c) => {
                            listRef = c
                        },
                        wrap: true,
                        gap: 'large',
                        data: books,
                        itemRender: ({ itemData, list }) => {
                            return {
                                component: 'Flex',
                                gap: 'small',
                                rows: [
                                    {
                                        tag: 'img',
                                        attrs: {
                                            src: `docs/images/books/${itemData.imageName}.jpg`,
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
                                        justify: 'between',
                                        cols: [
                                            {
                                                component: 'Button',
                                                text: '修改',
                                                onClick: () => {
                                                    let bookNameRef = null
                                                    new nomui.Modal({
                                                        content: {
                                                            header: {
                                                                caption: {
                                                                    title: '修改',
                                                                },
                                                            },
                                                            body: {
                                                                children: {
                                                                    component: 'Textbox',
                                                                    ref: (c) => {
                                                                        bookNameRef = c
                                                                    },
                                                                    name: 'name',
                                                                    value: itemData.name
                                                                }
                                                            },
                                                            onOk: ({ sender }) => {
                                                                itemData.name = bookNameRef.getValue()
                                                                listRef.updateItem(itemData.id, itemData)
                                                                sender.close()
                                                            }
                                                        }
                                                    })
                                                },
                                            },
                                            {
                                                component: 'Button',
                                                text: '删除',
                                                danger: true,
                                                onClick: () => {
                                                    list.removeItem(itemData.id)
                                                },
                                            },
                                        ],
                                    },
                                ],
                            }
                        },
                    },
                ],
            }
        },
    }
})
