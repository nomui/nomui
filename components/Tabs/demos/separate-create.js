define([], function () {
    return {
        title: '新增删除tab项(分体tab)',
        file: 'separate-create',
        demo: function () {
            let tabListRef = null, tabContentRef = null
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
                                        tabListRef.createItem({
                                            key: 'age',
                                            text: 'age'
                                        })
                                        tabContentRef.createPanel({
                                            key: 'age',
                                            children: 'age contens'
                                        })
                                    }

                                },
                                {
                                    component: 'Button',
                                    text: '移除',
                                    onClick: () => {
                                        tabListRef.removeItem('tab2')
                                        tabContentRef.removePanel('tab2')
                                    }

                                }
                            ]
                        },
                        {
                            component: 'Panel',
                            header: {
                                styles: {
                                    justify: 'between',
                                },
                                caption: {
                                    title: 'Panel title',
                                },
                                tools: [
                                    {
                                        component: 'TabList',
                                        ref: (c) => {
                                            tabListRef = c
                                        },
                                        tabContent: () => {
                                            return tabContentRef
                                        },
                                        selectedItems: 'tab1',
                                        onTabSelectionChange: () => {
                                            console.log('Changed')
                                        },
                                        items: [
                                            {
                                                key: 'tab1',
                                                text: 'Tab 1',
                                            },
                                            {
                                                key: 'tab2',
                                                text: 'Tab 2',
                                            },
                                        ],
                                    },
                                ],
                            },
                            body: {
                                children: {
                                    component: 'TabContent',
                                    ref: (c) => {
                                        tabContentRef = c
                                    },
                                    selectedPanel: 'tab1',

                                    panels: [
                                        {
                                            key: 'tab1',
                                            children: 'Tab 1 content',
                                        },
                                        {
                                            key: 'tab2',
                                            children: 'Tab 2 content',
                                        },
                                    ],
                                },
                            },
                            children: [
                                {
                                    component: 'Tabs',
                                    tabs: [
                                        {
                                            item: { text: 'Home' },
                                            panel: {
                                                children: 'home content',
                                            },
                                        },
                                        {
                                            item: { text: 'Profile' },
                                            panel: {
                                                children: 'profile content',
                                            },
                                        },
                                        {
                                            item: { text: 'Contact' },
                                            panel: {
                                                children: 'contact content',
                                            },
                                        },
                                    ],
                                },
                            ],
                        }
                    ],
                }
            }
        },
    }
})
