define([], function () {
    return {
        title: '控件宽度',
        file: 'control-width',
        description: '',
        demo: function () {
            return {
                component: 'Group',
                fields: [
                    {
                        component: 'Textbox', label: 'xs',
                        controlWidth: 'xs'
                    },
                    {
                        component: 'Textbox', label: 'sm',
                        controlWidth: 'sm'
                    },
                    {
                        component: 'Textbox', label: 'md',
                        controlWidth: 'md'
                    },
                    {
                        component: 'Textbox', label: 'lg',
                        controlWidth: 'lg'
                    },
                    {
                        component: 'Textbox', label: 'xl',
                        controlWidth: 'xl'
                    },
                ],
            }
        },
    }
})
