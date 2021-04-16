define([], function () {

    return {
        title: '基本用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Rows',
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