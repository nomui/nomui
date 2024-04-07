define([], function () {
    return {
        title: '改变文字配置',
        file: 'font',
        description: '',
        demo: function () {
            return {
                component: 'Watermark',
                text: ['NomUI Watermark', new Date().format('yyyy-MM-dd')],
                font: {
                    fontFamily: 'impact', // 字体
                    textAlign: 'left', // 对齐方式
                    fontSize: 30, // 字号
                    color: 'rgba(200,200,0,.25)', // 字色
                    fontWeight: '400' // 粗细
                },
                content: {
                    component: 'Timeline',
                    items: [
                        {
                            color: 'green',
                            children: 'Create a services site 2015-09-01',
                        },
                        {
                            color: 'green',
                            children: 'Solve initial network problems 2015-09-01',
                        },
                        {
                            color: 'red',
                            children: [
                                {
                                    tag: 'p',
                                    children: 'Solve initial network problems 1',
                                },
                                {
                                    tag: 'p',
                                    children: 'Solve initial network problems 2',
                                },
                                {
                                    tag: 'p',
                                    children: 'Solve initial network problems 3 2015-09-01',
                                },
                            ],
                        },
                        {
                            children: [
                                {
                                    tag: 'p',
                                    children: 'Technical testing 1',
                                },
                                {
                                    tag: 'p',
                                    children: 'Technical testing 2',
                                },
                                {
                                    tag: 'p',
                                    children: 'Technical testing 3 2015-09-01',
                                },
                            ],
                        },
                        {
                            color: 'gray',
                            children: [
                                {
                                    tag: 'p',
                                    children: 'Technical testing 1',
                                },
                                {
                                    tag: 'p',
                                    children: 'Technical testing 2',
                                },
                                {
                                    tag: 'p',
                                    children: 'Technical testing 3 2015-09-01',
                                },
                            ],
                        },
                        {
                            color: 'gray',
                            children: [
                                {
                                    tag: 'p',
                                    children: 'Technical testing 1',
                                },
                                {
                                    tag: 'p',
                                    children: 'Technical testing 2',
                                },
                                {
                                    tag: 'p',
                                    children: 'Technical testing 3 2015-09-01',
                                },
                            ],
                        },
                    ],
                }

            }
        },
    }
})
