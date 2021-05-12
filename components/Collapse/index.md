可以折叠/展开的内容区域。

## 何时使用

- 对复杂区域进行分组和隐藏，保持页面的整洁。

## API

| 参数      | 说明                             | 类型       | 默认值  |
| --------- | -------------------------------- | ---------- | ------- |
| key       | 对应 activeKey                   | `'number'` | -       |
| activeKey | 当前激活面板的 key               | `'number'` | 1       |
| bordered  | 带边框风格的折叠面板             | `boolean`  | false   |
| title     | 面板标题                         | `string`   | -       |
| content   | 面板内容                         | `string`   | -       |
| iconOnly  | 仅点击图标触发                   | `boolean`  | false   |
| onChange  | 折叠触发回调                     | `()=>{}`   | -       |
| accordion | 手风琴模式，一次只允许展开一个项 | `boolean`  | `false` |

### icon

| 参数    | 说明           | 类型                              | 默认值 |
| ------- | -------------- | --------------------------------- | ------ |
| default | 自定义切换图标 | `'plus'\|'right'`                 | right  |
| open    | 图标的方向     | `'up'\|'down'\|'right'\|'left'\|` | up     |
