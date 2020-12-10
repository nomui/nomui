define([
], function () {
    return {
        text: '基本用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Flex',
                items: [
                    {
                        component: 'Button',
                        text: 'item'
                    },
                    {
                        component: 'Button',
                        text: 'item'
                    }
                ]
            }
        }
    }

})