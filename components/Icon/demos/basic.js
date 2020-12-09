define([], function () {

    return {
        text: '基础用法',
        demo: function () {
            return {
                children: [
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
                childDefaults: {
                    component: 'Icon',
                    styles: {
                        margin: '1'
                    }
                }
            }
        }
    }
    
})