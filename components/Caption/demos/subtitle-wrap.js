define([], function () {
    return {
        title: '子标题换行',
        file: 'subtitle-wrap',
        demo: function () {
            return {
                component: 'Caption',
                title: '标题',
                subtitle: '子标题换行显示',
                subtitleWrap: true,
                icon: {
                    type: 'github',
                    styles: {
                        text: '3'
                    }
                },
            }
        },
    }
})
