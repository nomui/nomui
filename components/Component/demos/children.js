define([], function () {

    return {
        title: '子组件',
        file: 'children',
        demo: function () {
            return {
                children: [
                    {
                        tag: 'h4',
                        children: '金庸作品集',
                    },
                    {
                        tag: 'ul',
                        children: [
                            {
                                tag: 'li',
                                children: '飞狐外传'
                            },
                            {
                                tag: 'li',
                                children: '雪山飞狐'
                            },
                            {
                                tag: 'li',
                                children: '连城诀'
                            },
                            {
                                tag: 'li',
                                children: '射雕英雄传'
                            }
                        ]
                    }
                ]
            };
        }
    };
});