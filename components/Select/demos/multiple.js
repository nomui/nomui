define([], function () {

    return {
        text: '多选',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Select',
                        options: [
                            {
                                text: '金庸', value: 0
                            },
                            {
                                text: '古龙', value: 1
                            },
                            {
                                text: '梁羽生', value: 2
                            },
                            {
                                text: '温瑞安', value: 3
                            }
                        ],
                        multiple: true
                    }
                ]
            }
        }
    }

})