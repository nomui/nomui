当数据量较多时，使用分页可以快速进行数据切换。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| paramsType | 切换页码的方式,默认是 pageSize pageIndex 分页，配置为`skiptake`则以 skip & take 进行分页 | `string` | `default` |
| pageIndex | 默认的当前页数 | `number` | 1 |
| pageSize | 默认的每页条数 | `number` | 10 |
| totalCount | 数据总数 | `number` | 0 |
| displayItemCount | 缩略字符左边显示的页数 | `number` | 5 |
| edgeItemCount | 缩略字符右边显示的页数 | `number` | 1 |
| prevShowAlways | 切换到首页时是否隐藏上一页标识 | `boolean` | true |
| nextShowAlways | 切换到页尾时是否隐藏下一页标识 | `boolean` | true |
| simple | 简单模式，只展示数据总数，上一页和下一页 | `boolean` | false |
| compact | 紧凑模式，按钮尺寸与间距会更小 | `boolean` | false |
| justify | 排列方式(同`Flex`的配置) | `start\|end\|center\|between\|around` | end |
| itemsSort | 内部子组件的顺序 | `array` | `['count', 'pages', 'sizes']` |
| texts.prev | 替代图标显示的上一页文字 | `string` | 上一页 |
| texts.next | 替代图标显示的下一页文字 | `string` | 下一页 |
| texts.ellipse | 缩略字符 | `string` | ... |
| cacheable | 是否缓存分页大小设置(需对实例设置唯一值`key`) | `boolean` | false |
| onPageChange | 页码改变的回调，返回改变后的对象 | `function (e)=>{e.sender.update(e);console.log(e)}` | - |

## itemsSort

由以下三个值组成的数组，在数组中的位置即表示了其在`Pager`组件中的位置

- `count`: 共 xx 条数据
- `pages`: 分页数 List
- `sizes`: 分页大小 Select
