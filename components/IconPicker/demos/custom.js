define([], function () {
    return {
        title: '自定义渲染',
        file: 'custom',
        demo: function () {
            return {
                component: 'Form',
                onValueChange: (args) => {
                    console.log(args)
                },
                fields: [
                    {
                        component: 'IconPicker',
                        name: 'ip2',
                        iconRender: (value) => {
                            return {
                                component: 'Avatar',
                                size: 'xlarge',
                                styles: {
                                    shape: 'square',
                                    color: 'indigo'
                                },
                                icon: value || 'down'
                            }
                        },
                        label: '自定义渲染',
                    },
                ],
            }
        },
    }
})
