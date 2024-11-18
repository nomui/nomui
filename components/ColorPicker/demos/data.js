define([], function () {
    return {
        title: '使用data数据源',
        file: 'data',
        description: '配置useStyles:false将会启用组件默认的hex色值数据源，也可以直接传入data属性的自定义hex色值数据源，如：["#ff0000","#00ff00","#0000ff"]',
        demo: function () {
            let colorPickerRef = null

            return {
                component: 'Flex',
                gap: 'large',
                rows: [
                    {
                        gap: 'large',
                        align: 'center',
                        cols: [
                            {
                                component: 'Button',
                                text: '获取值',
                                onClick: () => {
                                    new nomui.Message({
                                        content: `颜色值: ${colorPickerRef.getValue()}`,
                                        type: 'info',
                                        duration: 3,
                                    })
                                }
                            },
                            {
                                component: 'RadioList',
                                uistyle: 'button',
                                options: [
                                    {
                                        text: '禁用',
                                        value: true,
                                    },
                                    {
                                        text: '启用',
                                        value: false,
                                    },
                                ],
                                value: false,
                                onValueChange: (args) => {
                                    if (args.newValue === true) {
                                        colorPickerRef.disable()
                                    } else {
                                        colorPickerRef.enable()
                                    }
                                },
                            },
                        ]
                    },
                    {
                        children: {
                            component: 'ColorPicker',
                            ref: (c) => {
                                colorPickerRef = c
                            },
                            useStyles: false,
                        }
                    }
                ]
            }
        },
    }
})
