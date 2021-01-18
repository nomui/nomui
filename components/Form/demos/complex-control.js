define([], function () {
    let form = null

    return {
        title: '复合控件',
        file: 'complex-control',
        demo: function () {
            return {
                component: 'Form',
                value: {
                    name: 'jerry',
                    province: 1,
                    city: 1,
                    address: {
                        province: 2,
                        city: 2,
                        building: '金鹿国际'
                    }
                },
                ref: (c) => {
                    form = c
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
                        label: '籍贯',
                        flatValue: true,
                        control: {
                            component: 'Form',
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
                                        options: [
                                            { text: '长沙', value: 1 },
                                            { text: '广州', value: 2 }
                                        ]
                                    }
                                },
                            ]
                        },
                    },
                    {
                        label: '现住址',
                        name: 'address',
                        control: {
                            component: 'Form',
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
                                        options: [
                                            { text: '长沙', value: 1 },
                                            { text: '广州', value: 2 }
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
                                    name: 'building',
                                    control: {
                                        component: 'Textbox',
                                    }
                                },
                            ]
                        },
                    },
                    {
                        label: '',
                        control: {
                            component: 'Button',
                            text: '提交',
                            onClick: () => {
                                console.log(form.getValue())
                            }
                        },
                    },
                ],
            }
        },
    }
})
