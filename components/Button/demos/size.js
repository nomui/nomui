define([], function () {

    return {
        title: '不同尺寸',
        file: 'size',
        demo: function () {
            return {
                component: 'Cols',
                items: [
                    {
                        text: 'Extra small button',
                        size: 'xs'
                    },
                    {
                        text: 'Small button',
                        size: 'sm'
                    },
                    {
                        text: 'Default button'
                    },
                    {
                        text: 'Large button',
                        size: 'lg'
                    },
                    {
                        text: 'Extra large button',
                        size: 'xl'
                    }
                ],
                itemDefaults: {
                    component: 'Button',
                }
            }
        }
    }
})