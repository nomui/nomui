## 何时使用

- 适合设置元素之间的间距。
- 适合设置各种水平、垂直对齐方式。

### 与之前用 rows 和 cols 来定义子元素的用法的区别

- rows/cols 定义子元素，其本身会为每一个子元素添加包裹元素用于内联对齐。适用于行、列中多个子元素的等距排列。
- itmes 定义子元素，其本身不会添加包裹元素。适用于垂直或水平方向上的子元素布局，并提供了更多的灵活性和控制能力。
- 新用法通过 gap 配置间隔，跟老用法的 gap 设置有冲突，所以老用法的 gap 用法应废弃掉，所有原来老用法的 gap 都需要改为 gutter。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 子元素数组 | `array` | - |
| vertical | 为 `true` 则纵向排列 | `boolean` | false |
| wrap | 是否换行 | `boolean` | false |
| justify | 排列方式 | `start\|end\|center\|between\|around` | - |
| align | 对齐方式 | `start\|end\|stretch` | - |
| fills | 是否按内容占满空间 | `boolean` | false |
| gap | 子项之间的间距大小 | `xsmall\|small\|medium\|large\|xlarge` | - |
