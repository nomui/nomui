define([], function () {
    return {
        title: '嵌套字段组',
        file: 'nest',
        demo: function () {
            return {
                component: 'Group',
                fields: [
                    {
                        component: 'Textbox', name: 'name', label: '姓名',
                    },
                    {
                        component: 'Group', name: 'address', label: '地址',
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
