图标右上角的圆形徽标数字。

## 何时使用

- 一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| icon | 带图标 | `string` | - |
| text | 设置状态点的文本 | `string` | - |
| autoHideZero | 数值为 0 时自动隐藏徽标 | `boolean` | false |
| number | 展示的数字，大于 overflowCount 时显示为 ${overflowCount}+，为 0 时隐藏 | `'number'` | - |
| overflowCount | 展示封顶的数字值 | `number` | 99 |
| size | 设置小圆点的大小 | `xs\|sm\|lg\|xl` | xs |
| color | 自定义小圆点的颜色 | `string` | danger |
| type | 徽标类型 | `round \| dot \| tag` | round |
| badge | 按钮带圆点 | `boolean\|BadgeProps` | - |

> - type: `round` 占据独立空间，相对于自身定位; `dot` 右上角小圆点，定位于第一个 relative `tag` 右上角文字标签，定位于第一个 relative
> - 以 `icon`, `text`, `number`|`overflowCount` 的顺序横向展示
> - 徽标类型'tag':请在 BadgeProps 中配置，不要直接在 badge 上配置使用

### 直接配置

可以给任意组件实例直接配置`badge`。
