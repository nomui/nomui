define([], function () {
    return {
        title: '对齐位置（内部）',
        file: 'align-inner',
        demo: function () {

            function getButton(align) {
                return {
                    component: 'Button',
                    text: align,
                    attrs: {
                        style: {
                            width: '8rem'
                        },
                        onclick: function () {
                            new nomui.Layer({
                                align: align,
                                children: {
                                    styles: {
                                        padding: '1',
                                        color: 'white',
                                        border: '1px'
                                    },
                                    children: '我是层内容'
                                },
                                closeOnClickOutside: true
                            })
                        }
                    }
                }
            }

            return {
                children: {
                    children: [
                        {
                            children: [getButton('left top'), getButton('top'), getButton('right top')]
                        },
                        {
                            children: [getButton('left'), getButton('center'), getButton('right')]
                        },
                        {
                            children: [getButton('left bottom'), getButton('bottom'), getButton('right bottom')]
                        }
                    ]
                }
            }
        }
    }
})