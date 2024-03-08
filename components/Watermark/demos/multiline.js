define([], function () {
    return {
        title: '多行文字水印',
        file: 'multiline',
        description: '',
        demo: function () {
            return {
                component: 'Watermark',
                text: ['NomUI Watermark', new Date().format('yyyy-MM-dd')],
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
