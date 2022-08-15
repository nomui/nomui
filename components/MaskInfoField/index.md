字符串加星号打码组件, 继承 Field 组件。

拥有 Field 的 `setValue`, `getValue`等方法

其他配置同`MaskInfo`

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| value | 文本内容 | `string` | - |
| text | 加密文字内容 | `string` | - |
| type | 加密文字类型 | `mobile \| phone \| fax \| mail \| identity \| card \| name \| middle \| other` | - |
| empty | 内容为空时显示的占位文字 | `string` | - |
| showTitle | 鼠标放上去是否显示全文 | `boolean` | `true` |
| toggle | 是否显示全文切换按钮 | `boolean` | `true` |

## Method

| 名称     | 说明          | 类型          |
| -------- | ------------- | ------------- |
| getValue | 获取 value 值 |               |
| setValue | 设置 value 值 | `(val) => {}` |
