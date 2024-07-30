define([], function () {
    return {
        title: '值处理',
        file: 'value',
        description: '渲染一组数据，通过传入 data 数组及 itemRender 数组元素渲染函数，通过 css flex 样式来控制元素的排列。',
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
                                text: '设为绿色',
                                onClick: () => {
                                    colorPickerRef.setValue('green')
                                }
                            },
                            {
                                component: 'Button',
                                text: '重置',
                                onClick: () => {
                                    colorPickerRef.reset()
                                }
                            },
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
                            defaultValue: 'red'
                        }
                    }
                ]
            }
        },
    }
})
