锚点跳转

## 何时使用

- 用于需要锚点跳转以及高亮的页面

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项，其中 key 指向对应内容的 key | `{text,key}` | `[]` |
| border | 是否显示边框，以及边框位置 | `boolean` \| `left \| right` | `left` |
| onItemClick | 点击锚点时回调 | `(args)=>{}` | - |
| onChange | 高亮锚点内容发生变化时回调 | `(args)=>{}` | - |
| width | 锚点菜单宽度 | `number` | `180` |
| sticky | 是否固定锚点菜单，为`true`时以`window`作为滚动容器，否则传入锚点依附的滚动容器，false 的时候锚点菜单不固定 | `object \| function \| boolean` | - |
| container | 锚点内容依附的滚动容器 | `object` | - |
| activeKey | 默认高亮锚点的 key | `string` | - |

### AnchorContent 锚点内容组件

| 参数 | 说明               | 类型     | 默认值 |
| ---- | ------------------ | -------- | ------ |
| key  | 对应锚点菜单的 key | `string` | -      |

## Methods

| 名称        | 说明           | 类型        |
| ----------- | -------------- | ----------- |
| scrollToKey | 滚动到指定锚点 | `(key)=>{}` |
