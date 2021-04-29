图标右上角的圆形徽标数字。

## 何时使用

- 一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

## API

| 参数      | 说明               | 类型             | 默认值  |
| --------- | ------------------ | ---------------- | ------- |
| size      | 设置头像组的大小      | `number\|'x'\|'sm'\|'lg'\|'xl'`      | default      |
| maxCount      | 显示的最大头像个数      | `'number'`      | -      |
| maxPopoverPlacement      | 多余头像气泡弹出位置      | `'top'\|'bottom'`      | top      |
| items      | 显示的子头像列表      | `[]`      | -      |

> Tip：单个头像配置可参考 Avatar头像 文档

      key: null,
      tag: 'span',
      type: 'round',
      text: null,
      icon: null,
      number: null,
      overflowCount: 99,
      size: 'xs',