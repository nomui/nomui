漫游式引导

## 何时使用

- 用于需要创建一系列提示来引导用户操作界面时

## API

| 参数          | 说明             | 类型                          | 默认值 |
| ------------- | ---------------- | ----------------------------- | ------ |
| steps          | 步骤数组         | `array`                      | -      |
| allowSkip          | 是否允许中途跳过引导         | `boolean`                      | true      |
| padding          | 高亮区域周边的阴影边距           | `number`                      | 2      |
| current          | 当前显示的步骤           | `number`                      | -      |
| scrollIntoView          | 目标元素处于屏幕外时是否将其自动滚入视图           | `boolean`                      | true      |
| onClose          | 引导界面关闭时的回调           | `function`                      | -      |
| onChange          | 引导步骤发生改变时的回调           | `function`                      | -      |
| onFinish          | 点击完最后一步，完成整个引导时的回调           | `function`                      | -      |



## step item

| 参数          | 说明             | 类型                          | 默认值 |
| ------------- | ---------------- | ----------------------------- | ------ |
| target          | 步骤指向的dom元素或者nomui组件实例         | `dom element \| ()=>{}`                      | -      |
| title          | 步骤标题         | `string`                      | -      |
| description          | 步骤描述           | `string`                      | 2      |
| render          | 自定义步骤内容渲染           | `function`                      | -      |
