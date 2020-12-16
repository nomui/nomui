define([], function () {
    return {
        title: '不同形状',
        file: 'shape',
        demo: function () {
            return {
                component: 'Cols',
                items: [
                    {
                        text: 'normal',
                    },
                    {
                        text: 'round',
                        styles: {
                            shape: 'round'
                        }
                    },
                    {
                        text: 'circle',
                        styles: {
                            shape: 'circle'
                        }
                    }
                ],
                itemDefaults: {
                    component: 'Button',
                }
            };
        }
    };
});