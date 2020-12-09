define([], function () {

    return {
        text: '混入选项',
        file: 'minin',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Button',
                        ref: 'clickTriggerButton',
                        text: '点击弹出',
                        popup: {
                            children: 'hello'
                        }
                    },
                    {
                        component: 'Button',
                        ref: 'hoverTriggerButton',
                        text: '鼠标悬浮弹出',
                        popup: {
                            triggerType: 'hover',
                            children: 'hello'
                        }
                    }
                ]
            }
        }
    }

})