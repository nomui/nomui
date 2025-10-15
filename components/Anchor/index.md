锚点跳转

## 何时使用

- 用于需要锚点跳转以及高亮的页面

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 菜单项，其中 key 指向对应内容的 key | `{text,key}` | `[]` |
| border | 是否显示边框，以及边框位置 | `boolean` \| `left \| right \| bottom` | `left` |
| offsetTop | 锚点距离顶部位置 | `number` \| `0` |
| containerOffsetTop | 锚点容器距离顶部留白距离(用于顶部有遮挡或者希望不要滚动到父容器最顶部时) | `number` \| `0` |
| onItemClick | 点击锚点时回调 | `(args)=>{}` | - |
| onChange | 高亮锚点内容发生变化时回调 | `(args)=>{}` | - |
| width | 锚点菜单宽度 | `number` | `180` |
| sticky | 是否固定锚点菜单，为`true`时以`window`作为滚动容器，否则传入锚点依附的滚动容器，false 的时候锚点菜单不固定，'auto'则自动判断 | `'auto' \| object \| function \| boolean` | - |
| container | 锚点内容依附的滚动容器，'auto'则自动判断滚动容器 | `'auto' \| object \| function \| boolean` | - |
| activeKey | 默认高亮锚点的 key | `string` | - |
| menuProps | 锚点菜单的配置，参考 Menu 组件 | `object` | - |
| keyField | key 字段名配置 | `string` | `'key'` |
| autoHide | 所有内容都不在可视区域则不会固定锚点导航 | `boolean` \| - |

### AnchorContent 锚点内容组件

| 参数     | 说明               | 类型     | 默认值  |
| -------- | ------------------ | -------- | ------- |
| key      | 对应锚点菜单的 key | `string` | -       |
| keyField | key 字段名配置     | `string` | `'key'` |

## Methods

| 名称           | 说明             | 类型        |
| -------------- | ---------------- | ----------- |
| scrollToItem   | 滚动到指定锚点   | `(key)=>{}` |
| getCurrentItem | 获取当前高亮锚点 | `()=>{}`    |
