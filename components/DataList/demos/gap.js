define([], function () {
    return {
        title: '设置间隔',
        file: 'gap',
        description: '`gap` 用来配置子项之间的间距大小',
        demo: function () {
            let verticalListRef = null,
                listRef = null

            return {
                component: 'Flex',
                gap: 'large',
                rows: [
                    {
                        children: {
                            component: 'RadioList',
                            uistyle: 'button',
                            value: false,
                            options: [
                                { text: 'default', value: false },
                                { text: 'small', value: 'xsmall' },
                                { text: 'small', value: 'small' },
                                { text: 'medium', value: 'medium' },
                                { text: 'large', value: 'large' },
                                { text: 'small', value: 'xlarge' },
                            ],
                            onValueChange: ({ newValue }) => {
                                verticalListRef.update({ gap: newValue })
                                listRef.update({ gap: newValue })
                            },
                        },
                    },
                    {
                        gap: 'medium',
                        cols: [
                            {
                                component: 'Panel',
                                uistyle: 'bordered',
                                header: false,
                                body: {
                                    children: {
                                        component: 'DataList',
                                        ref: (c) => {
                                            listRef = c
                                        },
                                        data: [
                                            {
                                                text: '第一列',
                                            },
                                            {
                                                text: '第二列',
                                            },
                                            {
                                                text: '第三列',
                                            },
                                        ],
                                        itemRender: ({ itemData }) => {
                                            return {
                                                styles: {
                                                    color: 'lprimary-light',
                                                    border: '1px',
                                                    padding: '1',
                                                },
                                                children: itemData.text
                                            }
                                        }
                                    },
                                },
                            },
                            {
                                component: 'Panel',
                                uistyle: 'bordered',
                                fit: true,
                                header: false,
                                body: {
                                    children: {
                                        component: 'DataList',
                                        ref: (c) => {
                                            verticalListRef = c
                                        },
                                        vertical: true,
                                        data: [
                                            {
                                                text: '第一行',
                                            },
                                            {
                                                text: '第二行',
                                            },
                                            {
                                                text: '第三行',
                                            },
                                        ],
                                        itemRender: ({ itemData }) => {
                                            return {
                                                styles: {
                                                    color: 'lprimary-light',
                                                    border: '1px',
                                                    padding: '1',
                                                },
                                                children: itemData.text
                                            }
                                        }
                                    },
                                },
                            },
                        ],
                    },
                ],
            }
        },
    }
})
