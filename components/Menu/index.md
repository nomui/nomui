为页面和功能提供导航的菜单列表，常用于网站顶部和左侧。

## API

### Menu props

| 参数           | 说明                            | 类型                       | 默认值   |
| -------------- | ------------------------------- | -------------------------- | -------- |
| items          | 子菜单`MenuItem`的数据          | `'itemSelectable'`         | -        |
| direction      | 菜单类型，可选值为水平和垂直    | `'horizontal'\|'vertical'` | vertical |
| uistyle        | 鼠标悬浮在菜单上的效果          | `'pill'`                   | -        |
| itemSelectable | 菜单的可选中配置                | `boolean` \| `object`      | -        |
| itemExpandable | 菜单的可展开配置                | `boolean` \| `object`      | -        |
| itemDefaults   | 菜单子项的配置项                | `boolean` \| `object`      | -        |
| compact        | 紧凑模式(子菜单通过`popup`展示) | `boolean`                  | `false`  |

### MenuItem Props

| 参数        | 说明                 | 类型             | 默认值 |
| ----------- | -------------------- | ---------------- | ------ |
| text        | 菜单标题             | `string`         | -      |
| id          | 菜单的唯一标识，必填 | `string`         | -      |
| url         | 跳转的链接           | `string`         | -      |
| toolsRender | 工具栏渲染           | `(item,menu)=>`  | -      |
| items       | 子菜单的数据         | `itemSelectable` | -      |

### itemSelectable

菜单的可选中配置

| 参数     | 说明             | 类型      | 默认值 |
| -------- | ---------------- | --------- | ------ |
| onlyleaf | 仅叶子菜单可选中 | `boolean` | false  |
| byClick  | 点击菜单时选中   | `boolean` | true   |

### itemExpandable

菜单的可展开配置

| 参数            | 说明                                                    | 类型      | 默认值 |
| --------------- | ------------------------------------------------------- | --------- | ------ |
| initExpandLevel | 菜单初始展开的层级(`-1`表示第一级菜单, `0`表示二级菜单) | `boolean` | -1     |
| expandSingle    | 同一父级菜单下, 是否只展开一个菜单                      | `boolean` | true   |

## Methods

| 名称            | 说明                          | 类型  |
| --------------- | ----------------------------- | ----- | ----------------------- |
| getItem         | 获取指菜单实例                | `(key | () => key) => MenuItem` |
| selectItem      | 选中指菜单                    | -     |
| expandToItem    | 展开指定菜单                  | -     |
| scrollTo        | 滚动到指定菜单                | -     |
| selectToItem    | 同时 选中,展开,滚动到指定菜单 | -     |
| getSelectedItem | 获取当前选中菜单              | -     |
| unselectItem    | 取消选中指定菜单              | -     |
