空状态时的展示占位图。

## 何时使用

- 当目前没有数据时，用于显式的用户提示。
- 初始化场景时的引导创建流程。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| description | 自定义描述内容，为`false`则不显示描述 | `string \| Props \| boolean` | - |
| image | 设置显示图片，为 string 时表示自定义图片地址。 | `string\| Props` | `nomui.Empty.PRESENTED_IMAGE_DEFAULT` |
| imageStyle | 图片样式 | `style` | - |
| size | 大小 | `xsmall\|small\|large\|xlarge` | xsmall |

## 内置图片

- nomui.Empty.PRESENTED_IMAGE_SIMPLE
- nomui.Empty.PRESENTED_IMAGE_DEFAULT
