define([], function () {

    return {
        title: '界面风格',
        file: 'uistyle',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Menu',
                        itemSelectable: {
                            byClick: true
                        },
                        uistyle: 'pill',
                        items: [
                            { text: '起步', id: 'css', url: '#!css!' },
                            {
                                text: '样式', id: 'css',
                                items:
                                    [
                                        { text: '起步', id: 'css', url: '#!css!' },
                                        {
                                            text: '样式', id: 'css', url: '#!css!',
                                            items:
                                                [
                                                    { text: '起步', id: 'css', url: '#!css!' },
                                                    { text: '样式', id: 'css', url: '#!css!' }
                                                ]
                                        }
                                    ]
                            },
                            { text: '组件', id: 'components', url: '#!components!' },
                            { text: '单页应用', id: 'javascript', url: '#!components!demo' }
                        ]
                    }
                ]
            };
        }
    };
});