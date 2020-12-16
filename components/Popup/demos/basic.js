define([], function () {

    return {
        title: '基本用法',
        file: 'basic',
        demo: function () {
            return {
                component: 'Cols',
                items: [
                    {
                        component: 'Button',
                        text: '点击弹出',
                        popup: {
                            children: 'hello'
                        }
                    },
                    {
                        component: 'Button',
                        text: '鼠标悬浮弹出',
                        popup: {
                            triggerAction: 'hover',
                            children: 'hello'
                        }
                    }
                ]
            }
        }
    }

})