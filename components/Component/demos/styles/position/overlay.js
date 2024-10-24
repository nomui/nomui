define([], function () {
    return {
        title: '遮罩',
        file: 'overlay',
        description: '通过 `styles.overlay` 来设置遮罩',
        demo: function () {
            return {
                attrs: {
                    style: {
                        height: '200px'
                    }
                },
                styles: {
                    color: 'lgray',
                    overlay: 'container',
                    position: 'relative'
                },
                children: [
                    {
                        styles: {
                            overlay: true,
                        },
                        children: {
                            component: 'Flex',
                            styles: {
                                position: ['absolute', 'center'],
                            },
                            items: [
                                {
                                    component: 'Toolbar',
                                    visibleItems: 3,
                                    items: [
                                        {
                                            text: '按钮1',
                                            onClick: () => {
                                                console.log('按钮1')
                                            },
                                        },
                                        {
                                            text: '按钮2',
                                            onClick: () => {
                                                console.log('按钮2')
                                            },
                                        },
                                        {
                                            text: '按钮3',
                                            onClick: () => {
                                                console.log('按钮3')
                                            },
                                        },
                                    ],
                                }
                            ]
                        }

                    }
                ]
            }
        },
    }
})
