define([], function () {

    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Cols',
                items: [
                    {
                        type: 'arrow-up'
                    },
                    {
                        type: 'arrow-down'
                    },
                    {
                        type: 'arrow-right'
                    },
                    {
                        type: 'arrow-left'
                    }
                ],
                itemDefaults: {
                    component: 'ThemifyIcon',
                }
            }
        }
    }

})