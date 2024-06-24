define([], function () {
    return {
        title: '文件夹上传',
        file: 'folder',
        description: '同时配置multiple与folder为true时可以选择文件夹上传其中所有文件，该功能通过浏览器原生的webkitdirectory属性实现，因此不兼容低版本的浏览器。',
        demo: function () {
            return {
                component: 'Flex',
                align: 'center',
                gutter: 'large',
                rows: [

                    {
                        component: 'Upload',
                        action: 'https://run.mocky.io/v3/74f2f759-ff23-48e0-a3c9-44c62a57842c',
                        multiple: true,
                        folder: true,

                    },
                ],
            }
        },
    }
})
