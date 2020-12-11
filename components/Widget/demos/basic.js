define([], function () {

    return {
        text: '基本用法',
        file: 'basic',
        demo: function () {
            return {
                children: {
                    component: 'Widget',
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