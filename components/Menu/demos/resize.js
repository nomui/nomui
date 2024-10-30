define([], function () {
    return {
        title: '自动折叠菜单',
        file: 'resize',
        description: '水平菜单配置onResize时，可以实时返回不可见的菜单项数据，结合外部布局可以实现自动折叠的菜单',
        demo: function () {

            let menuRef = null, dropdownRef = null

            return {
                children: {
                    component: 'Flex',
                    attrs: {
                        style: {
                            width: '50vw'
                        }
                    },
                    align: 'center',
                    items: [
                        {
                            attrs: {
                                style: {
                                    width: 0,
                                    flexGrow: '1'
                                }
                            },
                            children: {
                                component: 'Menu',
                                direction: 'horizontal',
                                uistyle: 'line',
                                ref: (c) => {
                                    menuRef = c
                                },
                                itemSelectable: {
                                    byClick: true
                                },
                                keyField: 'id',
                                onResize: (args) => {
                                    console.log(args)
                                    setTimeout(() => {
                                        dropdownRef.update({
                                            items: args.items
                                        })
                                    }, 0)
                                },
                                items: [
                                    {
                                        "text": "概览",
                                        "id": "overview"
                                    },
                                    {
                                        "text": "任务",
                                        "id": "tasks"
                                    },
                                    {
                                        "text": "发现",
                                        "id": "discover"
                                    },
                                    {
                                        "text": "报告",
                                        "id": "reports"
                                    },
                                    {
                                        "text": "受试者",
                                        "id": "subjects"
                                    },
                                    {
                                        "text": "SAE",
                                        "id": "sae"
                                    },
                                    {
                                        "text": "文档",
                                        "id": "documents"
                                    },
                                    {
                                        "text": "分析",
                                        "id": "analysis"
                                    },
                                    {
                                        "text": "设置",
                                        "id": "settings"
                                    },
                                    {
                                        "text": "用户",
                                        "id": "users"
                                    },
                                    {
                                        "text": "日志",
                                        "id": "logs"
                                    },
                                    {
                                        "text": "图表",
                                        "id": "charts"
                                    },
                                    {
                                        "text": "数据",
                                        "id": "data"
                                    },
                                    {
                                        "text": "帮助",
                                        "id": "help"
                                    },
                                    {
                                        "text": "关于",
                                        "id": "about"
                                    },
                                    {
                                        "text": "联系",
                                        "id": "contact"
                                    },
                                    {
                                        "text": "反馈",
                                        "id": "feedback"
                                    },
                                    {
                                        "text": "更新",
                                        "id": "updates"
                                    },
                                    {
                                        "text": "支持",
                                        "id": "support"
                                    },
                                    {
                                        "text": "安全",
                                        "id": "security"
                                    },
                                    {
                                        "text": "隐私",
                                        "id": "privacy"
                                    }
                                ]
                            },
                        },
                        {
                            component: 'Dropdown',
                            icon: 'ellipsis',
                            type: 'text',
                            ref: (c) => {
                                dropdownRef = c
                            },
                            itemDefaults: {
                                onClick: ({ sender }) => {
                                    menuRef.selectToItem(sender.props.id)
                                }
                            }
                        }
                    ],
                }
            }
        },
    }
})
