为页面和功能提供导航的菜单列表，常用于网站顶部和左侧。

## API

### Menu props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| items | 子菜单`MenuItem`的数据 | `'itemSelectable'` | - |
| direction | 菜单类型，可选值为水平和垂直 | `'horizontal'\|'vertical'` | vertical |
| uistyle | 鼠标悬浮在菜单上的效果 | `'pill'` | - |
| dropdown | 以传统下拉菜单的形式展现 | `boolean` \| `object` | - |
| itemSelectable | 菜单的可选中配置 | `boolean` \| `object` | - |
| itemExpandable | 菜单的可展开配置 | `boolean` \| `object` | - |
| itemDefaults | 菜单子项的配置项 | `boolean` \| `object` | - |
| indicatorIcon | 自定义展开折叠图标 | `object` \| `{up:'up',down:'down',right:'right'}` | - |
| compact | 紧凑模式(子菜单通过`popup`展示) | `boolean` | `false` |
| sortable | 菜单是否允许拖拽(仅垂直菜单允许多级排序) | `boolean,{onEnd:()=>{}}` | `false` |
| onResize | 水平菜单在大小改变时的回调，会返回被隐藏的子项 | `()=>{}` | - |

### MenuItem Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 子菜单类型，不填写则自动处理成 item 或者 submenu | `'item'\|'submenu'\|'group'\|'divider'` | - |
| text | 菜单标题 | `string` | - |
| target | 链接打开方式（同 html 超链接的 target 属性） | `string` | - |
| id | 菜单的唯一标识，必填 | `string` | - |
| url | 跳转的链接 | `string` | - |
| toolsRender | 工具栏渲染 | `(item,menu)=>` | - |
| items | 子菜单的数据 | `itemSelectable` | - |

### MenuItem Type

| 参数    | 说明             | 属性         | 说明                                   |
| ------- | ---------------- | ------------ | -------------------------------------- |
| item    | 默认菜单项       | -            | 不需配置，根据是否有 items 自动处理    |
| submenu | 带子层级的菜单项 | -            | 不需配置，根据是否有 items 自动处理    |
| group   | 菜单群组         | `text,items` | 水平模式中不支持在第一级菜单使用 group |
| divider | 分割线           | `dashed`     | 配置 dashed:true 则显示成虚线          |

### itemSelectable

菜单的可选中配置

| 参数     | 说明             | 类型      | 默认值 |
| -------- | ---------------- | --------- | ------ |
| onlyleaf | 仅叶子菜单可选中 | `boolean` | false  |
| byClick  | 点击菜单时选中   | `boolean` | true   |

### sortable

一级菜单拖拽配置

| 参数  | 说明                                             | 类型     | 默认值 |
| ----- | ------------------------------------------------ | -------- | ------ |
| onEnd | 拖拽完成后的回调,会返回新的一级菜单排序 key 数组 | `()=>{}` | -      |

### itemExpandable

菜单的可展开配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initExpandLevel | 菜单初始展开的层级。默认为 0 只展开第一层。值为`-1`展开所有菜单 | `boolean` | 0 |
| expandSingle | 同一父级菜单下, 是否只展开一个菜单 | `boolean` | true |

## Methods

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| getItem | 获取指菜单实例 | `(params: menuItemOption) => MenuItem` | - |
| selectItem | 选中指菜单 | - | - |
| expandToItem | 展开指定菜单 | - | - |
| scrollTo | 滚动到指定菜单 | - | - |
| selectToItem | 同时 选中,展开,滚动到指定菜单 | - | - |
| getSelectedItem | 获取当前选中菜单 | - | - |
| unselectItem | 取消选中指定菜单 | - | - |
| clearSelection | 清空选中 | - | - |
| getRootItemKeys | 获取一级菜单 key 数组，多用于拖拽后获取新的菜单排序 | - | - |

`menuItemOption`: 获取节点的参数，可以为一下三种情况

> - menuItem 的 `key`
> - menuItem 的对应实例 `menuItemRef`
> - 以 menuItemRef 为参数的`函数`，返回结果为`true`
