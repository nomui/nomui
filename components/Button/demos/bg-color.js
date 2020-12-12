define([], function () {
    return {
        title: '不同颜色',
        file: 'bg-color',
        demo: function () {
            return {
                component: 'Flex',
                items: [
                    {
                        component: 'Button',
                        text: 'Primary',
                        styles: {
                            bg: 'primary'
                        }
                    },
                    {
                        component: 'Button',
                        text: 'Info',
                        styles: {
                            bg: 'info'
                        }
                    }
                ]
            }
        }
    }
})