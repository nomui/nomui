define([], function () {
    return {
        title: '标题',
        file: 'size',
        description: '通过 `styles.text` 设置为大小相关的值来控制文本的大小',
        demo: function () {
            const sizes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h1-light', 'h2-light', 'h3-light', 'h4-light', 'h5-light']
            return {
                component: 'List',
                cols: 1,
                data: sizes,
                itemRender: ({ itemData }) => {
                    return {
                        styles: {
                            text: itemData,
                        },
                        children: `这是一段 '${itemData}'的标题`,
                    }
                },
            }
        },
    }
})
