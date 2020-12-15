define([], function () {

    return {
        title: '基本用法',
        file: 'basic',
        demo: function () {
            return {
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
    }

})