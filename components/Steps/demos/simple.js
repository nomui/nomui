define([], function () {
    return {
        title: '简洁模式',
        file: 'simple',
        demo: function () {
            return {
                children: {
                    component: 'Steps',
                    simple: true,
                    current: 1,
                    options: [
                        {
                            title: 'Finished',
                            description: 'This is description',
                        },
                        {
                            title: 'In Progress',
                            description: 'This is description',
                        },
                        {
                            title: 'Waiting',
                            description: 'This is description',
                        },
                    ],
                },
            }
        },
    }
})
