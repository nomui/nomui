define([], function () {

    return {
        title: '横向列表换行',
        file: 'horizontal-wrap',
        demo: function () {
            let demo = this
            let items = [
                { text: '飞狐外传' },
                { text: '雪山飞狐' },
                { text: '连城诀' },
                { text: '天龙八部' },
                { text: '射雕英雄传' },
                { text: '白马啸西风' },
                { text: '鹿鼎记' }
            ]

            return {
                component: 'List',
                direction: 'vertical',
                gutter: 'md',
                items: [
                    {
                        component: 'Flex',
                        items: [
                            {
                                component: 'RadioList',
                                ref: 'gutterRadioList',
                                options: [
                                    { text: '无间隔', value: null },
                                    { text: '小间隔', value: 'sm' },
                                    { text: '中间隔', value: 'md' },
                                    { text: '大间隔', value: 'lg' }
                                ],
                                type: 'button',
                                events: {
                                    valueChange: function (changed) {
                                        demo.refs.textList.update({
                                            gutter: changed.newValue
                                        })
                                        demo.refs.buttonList.update({
                                            gutter: changed.newValue
                                        })
                                    }
                                },
                            },
                            {
                                component: 'RadioList',
                                ref: 'lineRadioList',
                                options: [
                                    { text: '没有线', value: null },
                                    { text: '分隔线', value: 'split' },
                                    { text: '网格线', value: 'grid' },
                                ],
                                type: 'button',
                                events: {
                                    valueChange: function (changed) {
                                        demo.refs.textList.update({
                                            line: changed.newValue
                                        })
                                        demo.refs.buttonList.update({
                                            line: changed.newValue
                                        })
                                    }
                                },
                            }
                        ]
                    },
                    {
                        component: 'Widget',
                        header: {
                            caption: {
                                title: '文本项'
                            }
                        },
                        body: {
                            children: {
                                component: 'List',
                                ref: 'textList',
                                direction: 'horizontal',
                                wrap: true,
                                items: items,
                                itemDefaults: {
                                    _config: function () {
                                        this.setProps({
                                            children: this.props.text
                                        })
                                    }
                                }
                            }
                        }
                    },
                    {
                        component: 'Widget',
                        header: {
                            caption: {
                                title: '按钮项'
                            }
                        },
                        body: {
                            children: {
                                component: 'List',
                                ref: 'buttonList',
                                direction: 'horizontal',
                                wrap: true,
                                items: items,
                                itemDefaults: {
                                    component: 'Button'
                                }
                            }
                        }
                    }
                ]
            }
        }
    }

})