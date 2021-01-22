define([], function () {

    return {
        title: '获取字段',
        file: 'get-field',
        description: '在字段组实例上调用 `getField(fieldName)` 方法来获取子孙字段的引用，`fieldName` 参数可由圆点分隔来获取不同层级的子孙字段',
        demo: function () {
            let group = null
            let currentField = null
            return {
                component: 'Rows',
                items: [
                    {
                        component: 'RadioList',
                        uistyle: 'button',
                        options: [
                            { text: '姓名（name）', value: 'name' },
                            { text: '所在地（address）', value: 'address' },
                            { text: '省份（address.province）', value: 'address.province' },
                            { text: '城市（address.city）', value: 'address.city' }
                        ],
                        onValueChange: (args) => {
                            const fieldName = args.newValue
                            if (currentField !== null) {
                                currentField.update({
                                    styles: {
                                        border: null
                                    }
                                })
                            }
                            currentField = group.getField(fieldName)
                            currentField.update({
                                styles: {
                                    border: [true, 'primary']
                                }
                            })
                        }
                    },
                    {
                        component: 'Group',
                        value: {
                            name: 'jerry',
                            address: {
                                province: 2,
                                city: 2,
                            }
                        },
                        ref: (c) => {
                            group = c
                        },
                        fields: [
                            {
                                component: 'Textbox', name: 'name', label: '姓名',
                            },
                            {
                                component: 'Group', name: 'address',
                                label: '所在地',
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
                ]
            }
        },
    }
})
