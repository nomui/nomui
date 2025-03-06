下拉框组件

## 何时使用

- 需要下拉按钮的时候。

## API

| 参数          | 说明                                      | 类型                  | 默认值  |
| ------------- | ----------------------------------------- | --------------------- | ------- |
| triggerAction | 下拉框触发方式                            | `click` \|`hover`     | `click` |
| rightIcon     | 自定义下拉框图标                          | `string`              | `down`  |
| split         | 是否为分割按钮                            | `boolean`             | `false` |
| onClick       | 分割按钮模式下，左边按钮的点击回调        | `()=>{}`              | -       |
| items         | 下拉框内容，至少要包含`text`跟`onClick`   | `array`               | -       |
| menuClasses   | 下拉菜单的 class 配置，格式参考基类 class | `{className:boolean}` | -       |
| size          | 按钮尺寸，与 Button 组件一致              | `string`              | -       |
