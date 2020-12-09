define([], function () {
    return {
        text: '对齐位置（外部）',
        file: 'align-outer',
        demo: function () {
            function getButton(align) {
                return {
                    component: 'Button',
                    text: align,
                    attrs: {
                        style: {
                            width: '100px'
                        },
                        onclick: function () {
                            if (!this[align]) {
                                this[align] = new nomui.Layer({
                                    align: align,
                                    alignTo: this.element,
                                    alignOuter: true,
                                    children: {
                                        styles: {
                                            padding: '1',
                                            bg: 'white',
                                            border: 'all'
                                        },
                                        children: '我是层内容'
                                    },
                                    closeOnClickOutside: true
                                })
                            }

                            this[align].show()
                        }
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