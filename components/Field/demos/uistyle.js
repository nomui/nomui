define([], function () {
    return {
        title: 'UI风格',
        file: 'uistyle',
        demo: function () {
            let field = null

            return {
                component: 'Flex',
                gap: 'small',
                rows: [
                    {
                        component: 'Flex',
                        attrs: {
                            style: {
                                minHeight: '40px',
                            },
                        },
                        cols: [
                            {
                                component: 'RadioList',
                                options: [
                                    {
                                        text: 'default',
                                        value: 'default',
                                    },
                                    {
                                        text: 'filled',
                                        value: 'filled',
                                    },
                                    {
                                        text: 'borderless',
                                        value: 'borderless',
                                    },
                                ],
                                value: 'right',
                                uistyle: 'button',
                                onValueChange: (args) => {
                                    field.update({
                                        variant: args.newValue,
                                    })
                                },
                            },
                        ],
                    },
                    {
                        component: 'DatePicker',
                        label: '日期',
                        ref: (c) => {
                            field = c
                        },
                        labelAlign: 'right',
                    },
                ],
            }
        },
    }
})
