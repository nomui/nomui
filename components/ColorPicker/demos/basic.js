define([], function () {
    return {
        title: '基本用法',
        file: 'basic',
        description: '渲染一组数据，通过传入 data 数组及 itemRender 数组元素渲染函数，通过 css flex 样式来控制元素的排列。',
        demo: function () {
            return {
                component: 'ColorPicker',
            }
        },
    }
})
