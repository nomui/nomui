define([], function () {
    return {
        title: '禁用',
        file: 'disabled',

        demo: function () {
            let transRef = null

            const data = [
                {
                    key: '001',
                    text: '东方不败',
                },
                {
                    key: '002',
                    text: '任我行',
                },
                {
                    key: '003',
                    text: '令狐冲',
                },
                {
                    key: '004',
                    text: '乔峰',
                },
                {
                    key: '005',
                    text: '虚竹',
                },
                {
                    key: '006',
                    text: '段誉',
                },
                {
                    key: '007',
                    text: '慕容复',
                },
                {
                    key: '008',
                    text: '左冷禅',
                },
                {
                    key: '009',
                    text: '岳不群',
                },
                {
                    key: '010',
                    text: '林平之',
                },
                {
                    key: '011',
                    text: '谢逊',
                },
            ]
            return {
                component: 'Form',

                fields: [
                    {
                        component: 'Transfer',
                        ref: (c) => {
                            transRef = c
                        },
                        label: '穿梭框',
                        name: 'transfer',
                        data: data,
                        value: ['010'],
                    },
                    {
                        component: 'Field',
                        label: '',
                        control: {
                            component: 'Flex',
                            gutter: 'small',
                            cols: [
                                {
                                    component: 'Button',
                                    text: '取值',
                                    type: 'primary',
                                    onClick: () => {
                                        new nomui.Alert({
                                            description: `当前值为：${JSON.stringify(transRef.getValue())}`
                                        })
                                    },
                                },
                                {
                                    component: 'Button',
                                    text: '禁用',
                                    onClick: ({ sender }) => {
                                        if (sender.props.text === '禁用') {
                                            transRef.disable()
                                            sender.update({
                                                text: '启用'
                                            })
                                        }
                                        else {
                                            transRef.enable()
                                            sender.update({
                                                text: '禁用'
                                            })
                                        }
                                    },
                                },
                            ]
                        }
                    }

                ],
            }
        },
    }
})
