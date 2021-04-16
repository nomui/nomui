define([], function () {

    return {
        title: '基本用法',
        file: 'basic',
        demo: function () {
            return {
                children: {
                    component: 'Panel',
                    header: {
                        caption: {
                            title: '面板标题'
                        }
                    },
                    body: {
                        children: '面板内容'
                    }
                }
            }
        }
    }

})