define([], function () {
    return {
        title: '对齐位置（外部）',
        file: 'align-outer',
        demo: function () {
            function getButton(align) {
                return {
                    component: 'Button',
                    text: align,
                    attrs: {
                        style: {
                            width: '100px'
                        }
                    },
                    onClick: (arg) => {
                        const sender = arg.sender
                        if (!sender[align]) {
                            sender[align] = new nomui.Layer({
                                align: align,
                                alignTo: sender.element,
                                alignOuter: true,
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

                        sender[align].show()
                    }
                }
            }

            return {
                children: [
                    {
                        attrs: {
                            style: {
                                marginLeft: '100px'
                            }
                        },
                        children: [getButton('top left'), getButton('top'), getButton('top right')]
                    },
                    {
                        attrs: {
                            style: {
                                width: '100px',
                                float: 'left'
                            }
                        },
                        children: [getButton('left top'), getButton('left'), getButton('left bottom')]
                    },
                    {
                        attrs: {
                            style: {
                                width: '100px',
                                marginLeft: '400px'
                            }
                        },
                        children: [getButton('right top'), getButton('right'), getButton('right bottom')]
                    },
                    {
                        attrs: {
                            style: {
                                marginLeft: '100px'
                            }
                        },
                        children: [getButton('bottom left'), getButton('bottom'), getButton('bottom right')]
                    }
                ]
            }
        }
    }
})