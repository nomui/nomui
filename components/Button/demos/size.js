define([], function () {

    return {
        text: '不同尺寸',
        file: 'size',
        demo: function () {
            return {
                children: [
                    {
                        text: 'Extra small button',
                        styles: {
                            size: 'xs'
                        }
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
                childDefaults: {
                    component: 'Button',
                    styles: {
                        margin: '1'
                    }
                }
            }
        }
    }
})