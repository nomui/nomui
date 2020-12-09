define([], function () {

    return {
        text: '触发方式',
        demo: function () {
            var that = this
            return {
                children: [
                    {
                        component: 'Button',
                        ref: 'clickTriggerButton',
                        text: '点击弹出'
                    },
                    {
                        component: 'Button',
                        ref: 'hoverTriggerButton',
                        text: '鼠标悬浮弹出'
                    }
                ],
                _render: function () {
                    new nomui.Popup({
                        trigger: that.refs.clickTriggerButton.element,
                        children: 'hello'
                    })

                    new nomui.Popup({
                        trigger: that.refs.hoverTriggerButton.element,
                        triggerType: 'hover',
                        children: 'hello'
                    })
                }
            }
        }
    }

})