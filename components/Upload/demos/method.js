define([], function () {
    return {
        title: '公开方法使用',
        file: 'method',
        description: '这里两个触发元素都不属于Upload组件，只是通过调用Upload组件实例的公开方法实现上传',
        demo: function () {
            let uploadRef = null
            return {
                component: 'Flex',
                align: 'center',
                gutter: 'large',
                rows: [
                    {
                        component: 'Upload',
                        hidden: true,
                        ref: (c) => {
                            uploadRef = c
                        },
                        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
                    },

                    {
                        component: 'Button',
                        text: '上传',
                        onClick: () => {
                            uploadRef.pickFile()
                        }
                    },
                    {
                        component: 'Avatar',
                        text: '上传',
                        onClick: () => {
                            uploadRef.pickFile()
                        }
                    }
                ],
            }
        },
    }
})
