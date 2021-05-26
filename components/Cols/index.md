## 何时使用

- 用于横向布局

## API

### Cols

| 参数        | 说明                                         | 类型             | 默认值  |
| ----------- | -------------------------------------------- | ---------------- | ------- |
| items       | 子级对象                                     | `array `         | []      |
| gutter      | 栅格间距                                     | `sm \| md \| lg` | `md`    |
| align       | 子对象在纵轴的对齐方式，参考 flex 布局文档   | `string`         | -       |
| justify     | 子对象在横轴的对齐方式，参考 flex 布局文档   | `string`         | -       |
| inline      | 显示方式改为 inline-flex，参考 flex 布局文档 | `string`         | -       |
| fills       | 子对象会自动占满空间，参考 flex 布局文档     | `string`         | -       |
| strechIndex | 拉伸对应索引值的子对象，让其占满空余空间     | `number`         | -       |
| showEmpty   | 数据为空的时候是否显示空信息提示             | `boolean`        | `false` |

## 参考文档

[flex 布局教程](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
