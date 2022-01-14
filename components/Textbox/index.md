通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 何时使用

- 需要用户输入表单域内容时。
- 提供组合型输入框，带搜索的输入框

## API

更多请[查看 Field 组件](#!components!index?type=Field&tab=docs)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| autofocus | 是否自动获得焦点 | `boolean` | false |
| htmlType | 设置原生的类型 | `text \| tel \| password \| email \| url` | text |
| trimValue | 是否去除首尾空格 | `boolean` | true |
| leftIcon | 左侧的图标 | `string\|Props` | - |
| rightIcon | 右侧的图标 | `string\|Props` | - |
| prefix | 前缀字符(优先展示 leftIcon) | `string` | - |
| suffix | 后缀字符(优先展示 rightIcon) | `string` | - |
| button | 按钮配置 | `Props` | - |
| maxlength | 原生属性，最大输入长度 | `number` | - |
| minlength | 原生属性，最小输入长度 | `number` | - |
| showWordLimit | 是否显示输入字数统计长度，只在 htmlType = "text" | `boolean` | false |

## 事件

更多请[查看 Field 组件](#!components!index?type=Field&tab=docs)
