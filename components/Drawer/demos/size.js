define([], function () {
    return {
        title: '抽屉尺寸',
        file: 'size',
        description: '可以直接通过width（水平弹出）或height（垂直弹出）定义抽屉尺寸，也可以通过size配置不同的预设尺寸',
        demo: function () {
            const arr = ['xsmall', 'small', 'medium', 'large', 'xlarge']
            return {
                component: 'List',
                data: arr,
                gutter: 'md',
                itemRender: ({ itemData }) => {
                    return {
                        component: 'Button',
                        type: 'primary',
                        text: itemData,
                        onClick: () => {
                            new nomui.Drawer({
                                title: '标题',
                                size: itemData,
                                content: {}
                            })
                        }
                    }
                }


            }
        },
    }
})
