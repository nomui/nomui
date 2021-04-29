选项卡切换组件，常用于平级区域大块内容的的收纳和展现。

## API

| 参数      | 说明               | 类型             | 默认值  |
| --------- | ------------------ | ---------------- | ------- |
| text      | 选项卡标题           | `string`         | -       |
| fit      | 让 tabs 拉伸充满父容器的高度，同时选项内容超过高度时出现滚动条     | `boolean`         | -       |
| uistyle      | 页签的基本样式     | `'plain'\|'hat'\|'card'\|'line'\|'pill'`         | plain       |
| onTabSelectionChange      | tab 被点击时触发 | `()=>{console.log('Tab Changed')}`         | -       |
