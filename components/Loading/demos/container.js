define([], function () {

    return {
        title: '指定容器',
        file: 'basic',
        demo: function () {
            let demo = this

            return {
                component: 'Rows',
                items: [
                    {
                        ref: 'container',
                        styles: {
                            padding: '4',
                            border: 'all'
                        },
                        children: 'container'
                    },
                    {
                        component: 'Checkbox',
                        text: '加载中',
                        events: {
                            valueChange: function (changed) {
                                if (changed.newValue === true) {
                                    new nomui.Loading({
                                        reference: demo.refs.container
                                    })
                                }
                            }
                        }
                    }
                ]
            }
        }
    }

})