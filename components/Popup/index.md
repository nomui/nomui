继承至[Layer](./#!components!index?type=Layer&tab=docs)组件

## 何时使用

- Popup 弹出层

## API

### Popup

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| trigger | 触发元素 | `Object` | - |
| triggerAction | 触发方式 | `'click'\|'hover'` | `window` |
| align | 层对齐方式，参考 [Layer 组件文档](./#!components!index?type=Layer&tab=docs) | `top\|bottom\|left\|right\|left top\|right top\|left bottom\|right bottom\|center ` | - |
| alignOuter | 是否相对参照元素的外部对齐，层对齐位置相对于参照元素的外部 | `boolean` | `false` |
| closeOnClickOutside | 是否点击外部区域关闭层 | `boolean` | `false` |
