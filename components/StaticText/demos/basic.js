define([], function () {
    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                children: {
                    component: 'StaticText',
                    value: '我是静态文本',
                },
            }
        },
    }
})
