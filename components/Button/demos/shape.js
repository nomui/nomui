define([], function () {
    return {
        text: '不同形状',
        demo: function () {
            return {
                children: [
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
                childDefaults: {
                    component: 'Button',
                    styles: {
                        margin: '1'
                    }
                }
            };
        }
    };
});