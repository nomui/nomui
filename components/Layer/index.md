## 何时使用

- 基础的层组件

## API

### Layer

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| align | 层对齐位置 | `'top'\|'bottom'\|'left'\|'right'\|'left top'\|'right top'\|'left bottom'\|'right bottom'\|'center' ` | - |
| alignTo | 层定位的参照元素 | `string` | `window` |
| alignOuter | 层对齐位置相对于参照元素的外部，应先指定`alignTo` | `boolean` | `false` |
| collision | 层位置超过边缘时候的处理方式 | `string` | `flipfit` |
| closeOnClickOutside | 是否点击外部区域关闭层 | `boolean` | `false` |
| closeToRemove | 是否关闭的同时移除元素 | `boolean` | `false` |
| backdrop | 是否显示遮罩层 | `boolean` | `false` |
| closeOnClickBackdrop | 是否点击遮罩触发关闭层 | `boolean` | `false` |
