define([], function () {

    return {
        header: {
            title: '标题'
        },
        body: {
            children: '内容'
        },
        footer: {
            _config: function () {
                let modal = this.modal

                this.setProps({
                    children: {
                        component: 'Button',
                        text: '关闭',
                        events: {
                            click: function () {
                                modal.close()
                            }
                        }
                    }
                })
            }
        }
    }
})