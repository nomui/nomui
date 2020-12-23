define([], function () {
    return {
        title: '带图标',
        file: 'with-icon',
        demo: function () {
            return {
                component: 'Cols',
                items: [
                    {
                        text: 'Add',
                        icon: 'plus'
                    },
                    {
                        icon: 'plus'
                    },
                    {
                        text: 'Right icon',
                        rightIcon: 'arrow-right'
                    }
                ],
                itemDefaults: {
                    component: 'Button',
                }
            }
        }
    }
})