有多个功能按钮时，使用此组件自动折叠靠后的按钮，保持界面清爽

## API

| 参数            | 说明                                      | 类型                   | 默认值    |
| --------------- | ----------------------------------------- | ---------------------- | --------- |
| type            | 按钮类型，参考 Button 组件                | `string`               | `default` |
| visibleItems    | 默认显示前几个按钮，超出的会被折叠起来    | `number`               | `2`       |
| forceVisible    | 即使没有选项也强制显示下拉图标            | `boolean`              | `false`   |
| gutter          | 按钮之间的间隔                            | `xs`\|`sm`\|`md`\|'lg' | `sm`      |
| size            | 按钮尺寸，参考 Button 组件                | `string`               | -         |
| inline          | 是否为行内元素，参考 Button 组件          | `boolean`              | `false`   |
| items           | 按钮列表数组                              | `array`                | []        |
| itemDefaults    | 自定义单个按钮属性                        | `{}`                   | -         |
| menuClasses     | 下拉菜单的 class 配置，格式参考基类 class | `{className:boolean}`  | -         |
| stopPropagation | 是否阻止组件自身的点击冒泡                | `boolean`              | true      |
