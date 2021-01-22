define([], function () {
    let form = null

    return {
        title: '字段组',
        file: 'group',
        description: '设置字段的 `type` 为 `Group`，然后可以通过 `fields` 数组来设置多个子字段。该示例有两层字段组，最外层是一个字段组，所在地也是一个字段组',
        demo: function () {
            return {
                component: 'Field',
                type: 'Group',
                value: {
                    name: 'jerry',
                    address: {
                        province: 2,
                        city: 2,
                    }
                },
                fields: [
                    {
                        name: 'name',
                        label: '姓名',
                        control: {
                            component: 'Textbox',
                        },
                    },
                    {
                        name: 'address',
                        label: '所在地',
                        type: 'Group',
                        flatValue: true,
                        inline: true,
                        fields: [
                            {
                                name: 'province',
                                attrs: {
                                    style: {
                                        width: '120px'
                                    }
                                },
                                control: {
                                    component: 'Select',
                                    placeholder: '省份',
                                    options: [
                                        { text: '湖南', value: 1 },
                                        { text: '广东', value: 2 }
                                    ]
                                }
                            },
                            {
                                control: {
                                    component: 'TextControl',
                                    value: '-'
                                }
                            },
                            {
                                name: 'city',
                                attrs: {
                                    style: {
                                        width: '120px'
                                    }
                                },
                                control: {
                                    component: 'Select',
                                    placeholder: '城市',
                                    options: [
                                        { text: '长沙', value: 1 },
                                        { text: '广州', value: 2 }
                                    ]
                                }
                            },
                        ]
                    },
                ],
            }
        },
    }
})
