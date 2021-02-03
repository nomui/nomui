define([], function () {
    return {
        title: '标签宽度',
        file: 'label-width',
        description: '',
        demo: function () {
            return {
                component: 'Group',
                fields: [
                    {
                        component: 'Textbox', label: '60',
                        labelWidth: 60
                    },
                    {
                        component: 'Textbox', label: '100',
                        labelWidth: 100
                    },
                    {
                        component: 'Textbox', label: '150',
                        labelWidth: 150
                    },
                    {
                        component: 'Textbox', label: '200',
                        labelWidth: 200
                    },
                    {
                        component: 'Textbox', label: '250',
                        labelWidth: 250
                    },
                ],
            }
        },
    }
})
