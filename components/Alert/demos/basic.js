define([], function () {

    return {
        text: '基本用法',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Button',
                        text: '普通',
                        attrs: {
                            onclick: function () {
                                new nomui.Alert({
                                    title: 'hello'
                                })
                            }
                        }
                    }
                ]
            }
        }
    }

})