define([], function () {

    return {
        title: '纵向列表',
        file: 'verticle',
        nav: {
            component: 'Flex',
            items: [
                {
                    component: 'RadioList',
                    options: [
                        { text: '无间隔', value: null },
                        { text: '小间隔', value: 'sm' },
                        { text: '中间隔', value: 'md' },
                        { text: '大间隔', value: 'lg' }
                    ],
                    type: 'button'
                },
                {
                    component: 'RadioList',
                    options: [
                        { text: '分隔线', value: 'sm' },
                        { text: '网格线', value: 'md' },
                    ],
                    type: 'button'
                }
            ]
        },
        demo: function () {
            return {
                component: 'Flex',
                items: [
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
                                items: [
                                    { title: '为什么金庸小说中的武林高手越来越弱' },
                                    { title: '笑傲江湖中的政治斗争' },
                                    { title: '论《葵花宝典》与《辟邪剑法》' },
                                    { title: '武侠世界中的医者' },
                                    { title: '《天龙八部》之文化思想的解读' },
                                    { title: '金庸小说中的八大经典战役回顾' }
                                ],
                                itemDefaults: {
                                    _config: function () {
                                        this.setProps({
                                            children: this.props.title
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
                                title: '按钮项目'
                            }
                        },
                        body: {
                            children: {
                                component: 'List',
                                items: [
                                    { text: '为什么金庸小说中的武林高手越来越弱' },
                                    { text: '笑傲江湖中的政治斗争' },
                                    { text: '论《葵花宝典》与《辟邪剑法》' },
                                    { text: '武侠世界中的医者' },
                                    { text: '《天龙八部》之文化思想的解读' },
                                    { text: '金庸小说中的八大经典战役回顾' }
                                ],
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