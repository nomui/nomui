define([], function () {
    let form = null

    return {
        title: '基础用法',
        file: 'group',
        description: '设置字段的 `type` 为 `Group`，然后可以通过 `fields` 数组来设置多个子字段。该示例有两层字段组，最外层是一个字段组，所在地也是一个字段组',
        demo: function () {
            return {
                component: 'Group',
                value: {
                    name: 'jerry',
                    address: {
                        province: 2,
                        city: 2,
                    }
                },
                fields: [
                    {
                        component: 'Textbox', name: 'name', label: '姓名',
                    },
                    {
                        component: 'Group', name: 'address', label: '所在地',
                        flatValue: true,
                        inline: true,
                        fields: [
                            {
                                component: 'Select', name: 'province',
                                attrs: {
                                    style: {
                                        width: '120px'
                                    }
                                },
                                placeholder: '省份',
                                options: [
                                    { text: '湖南', value: 1 },
                                    { text: '广东', value: 2 }
                                ]
                            },
                            {
                                component: 'StaticText',
                                value: '-'
                            },
                            {
                                component: 'Select', name: 'city',
                                attrs: {
                                    style: {
                                        width: '120px'
                                    }
                                },
                                placeholder: '城市',
                                options: [
                                    { text: '长沙', value: 1 },
                                    { text: '广州', value: 2 }
                                ]
                            },
                        ]
                    },
                ],
            }
        },
    }
})
