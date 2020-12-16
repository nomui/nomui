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
                            title: '部件标题'
                        }
                    },
                    body: {
                        children: '部件内容'
                    }
                }
            }
        }
    }

})