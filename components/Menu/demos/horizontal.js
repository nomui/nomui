define([], function () {

    return {
        title: '水平菜单',
        file: 'horizontal',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Menu',
                        direction: 'horizontal',
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
                        ],
                    }
                ]
            };
        }
    };
});