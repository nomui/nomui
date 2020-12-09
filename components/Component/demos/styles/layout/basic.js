define([], function () {

    return {
        text: '排列与对齐',
        demo: function () {
            let demo = this,
                flexDir = 'row',
                flexFills = false

            return {
                children: [
                    {
                        ref: 'layout',
                        styles: {
                            flex: 'row',
                            bg: 'lprimary',
                            align: 'center',
                            justify: 'between'
                        },
                        attrs: {
                            style: {
                                height: '100px'
                            }
                        },
                        children: [
                            {
                                children: 'flex-item'
                            },
                            {
                                children: 'flex-item'
                            },
                            {
                                children: 'flex-item'
                            }
                        ],
                        childDefaults: {
                            styles: {
                                bg: 'lprimary-light',
                                padding: '1',
                                border: 'all'
                            }
                        },
                    },
                    {
                        children: [
                            {
                                component: 'RadioList',
                                options: [
                                    {
                                        text: 'row', value: 'row'
                                    },
                                    {
                                        text: 'column', value: 'column'
                                    }
                                ],
                                value: 'row',
                                events: {
                                    valueChange: function (changed) {
                                        let height = '100px';
                                        if (changed.newValue === 'column') {
                                            height = '200px'
                                        }
                                        flexDir = changed.newValue;
                                        let flexArr = [flexDir];
                                        if (flexFills !== false) {
                                            flexArr.push(flexFills);
                                        }
                                        if (changed.isInit === false) {
                                            demo.refs.layout.update({
                                                attrs: {
                                                    style: {
                                                        height: height
                                                    }
                                                },
                                                styles: { flex: flexArr }
                                            })
                                        }
                                    }
                                }
                            },
                            {
                                component: 'RadioList',
                                options: [
                                    {
                                        text: 'align-items-start', value: 'start'
                                    },
                                    {
                                        text: 'align-items-end', value: 'end'
                                    },
                                    {
                                        text: 'align-items-center', value: 'center'
                                    },
                                    {
                                        text: 'align-items-stretch (default)', value: 'stretch'
                                    }
                                ],
                                value: 'center',
                                events: {
                                    valueChange: function (changed) {
                                        if (changed.isInit === false) {
                                            demo.refs.layout.update({ styles: { align: changed.newValue } });
                                        }
                                    }
                                }
                            },
                            {
                                component: 'RadioList',
                                options: [
                                    {
                                        text: 'justify-conten-start (default)', value: 'start'
                                    },
                                    {
                                        text: 'justify-conten-end', value: 'end'
                                    },
                                    {
                                        text: 'justify-conten-center', value: 'center'
                                    },
                                    {
                                        text: 'justify-conten-between', value: 'between'
                                    },
                                    {
                                        text: 'justify-conten-around', value: 'around'
                                    }
                                ],
                                value: 'center',
                                events: {
                                    valueChange: function (changed) {
                                        if (changed.isInit === false) {
                                            demo.refs.layout.update({
                                                styles: {
                                                    justify: changed.newValue
                                                }
                                            })
                                        }
                                    }
                                }
                            },
                            {
                                component: 'Checkbox',
                                text: 'fills',
                                events: {
                                    valueChange: function (changed) {
                                        if (changed.isInit === false) {
                                            flexFills = changed.newValue;
                                            let flexArr = [flexDir];
                                            if (flexFills !== false) {
                                                flexArr.push('fills');
                                            }
                                            else {
                                                flexArr.push(false);
                                            }
                                            demo.refs.layout.update({
                                                styles: {
                                                    flex: flexArr
                                                }
                                            })
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ],
            }
        }
    }
})