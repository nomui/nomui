define([], function () {
    return {
        text: '不同颜色',
        file: 'bg-color',
        demo: function () {
            return {
                children: [
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