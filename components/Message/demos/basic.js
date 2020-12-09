define([], function () {
    return {
        text: '基本用法',
        file: 'basic',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Message',
                        content: '天下武功，唯快不破',
                        duration: false,
                        position: null
                    },
                    {
                        component: 'Message',
                        type: 'info',
                        content: '信息提示的文案',
                        duration: false,
                        position: null
                    },
                    {
                        component: 'Message',
                        type: 'success',
                        content: '成功提示的文案',
                        duration: false,
                        position: null
                    },
                    {
                        component: 'Message',
                        type: 'error',
                        content: '错误提示的文案',
                        duration: false,
                        position: null
                    },
                    {
                        component: 'Message',
                        type: 'warning',
                        content: '警告提示的文案',
                        duration: false,
                        position: null
                    }
                ]
            };
        }
    }
});