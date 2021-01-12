define([], function () {

    return {
        title: '带遮罩',
        file: 'backdrop',
        demo: function () {
            return {
                component: 'Button',
                text: '点击弹出遮罩层',
                onClick: function () {
                    new nomui.Layer({
                        align: 'center',
                        backdrop: true,
                        closeOnClickBackdrop: true,
                        styles: {
                            padding: '1',
                            color: 'white',
                            border: '1px'
                        },
                        children: '带遮罩的层'
                    })
                }
            }
        }
    }

})