define([], function () {
    return {
        title: '图片水印',
        file: 'image',
        description: '注意使用图片的时候需要配置width与height，同时图片须为半透明png格式',
        demo: function () {
            return {
                component: 'Watermark',
                width: 60,
                height: 30,
                image: 'https://p1.mingdaoyun.cn/ProjectLogo/emptylogo.png',
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
