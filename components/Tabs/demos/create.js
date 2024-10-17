define([], function () {
    return {
        title: '新增删除tab项',
        file: 'create',
        demo: function () {
            let tabsRef = null
            return {
                children: {
                    component: 'Flex',
                    rows: [
                        {
                            gap: 'small',
                            cols: [
                                {
                                    component: 'Button',
                                    text: '新增',
                                    onClick: () => {
                                        tabsRef.createTab({
                                            key: 'age',
                                            item: {
                                                text: 'Age'
                                            },
                                            panel: {
                                                children: 'Age contents'
                                            }
                                        })
                                    }

                                },
                                {
                                    component: 'Button',
                                    text: '移除',
                                    onClick: () => {
                                        tabsRef.removeTab('profile')
                                    }

                                }
                            ]
                        },
                        {
                            component: 'Tabs',
                            ref: (c) => {
                                tabsRef = c
                            },
                            onTabSelectionChange: ({ key }) => {
                                console.log(`选中的key:${key}`)
                            },
                            onTabRemove: ({ item, panel }) => {
                                // 参数是移除的item以及panel
                                console.log(item, panel)

                            },
                            tabs: [
                                {
                                    key: 'home',
                                    item: { text: 'Home' },
                                    panel: {
                                        children: 'home content',
                                    },
                                },
                                {
                                    key: 'profile',
                                    item: { text: 'Profile' },
                                    panel: {
                                        children: 'profile content',
                                    },
                                },
                                {
                                    key: 'contact',
                                    item: { text: 'Contact' },
                                    panel: {
                                        children: 'contact content',
                                    },
                                },
                            ],
                        },
                    ],
                }
            }
        },
    }
})
