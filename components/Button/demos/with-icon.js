define([], function () {
    return {
        text: '带图标',
        demo: function () {
            return {
                children: [
                    {
                        text: 'Add',
                        icon: 'plus'
                    },
                    {
                        icon: 'minus'
                    },
                    {
                        text: 'Right icon',
                        rightIcon: 'arrow-right'
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