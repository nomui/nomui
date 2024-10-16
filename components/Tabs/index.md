选项卡切换组件，常用于平级区域大块内容的的收纳和展现。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabs | 内容,格式为`[{item:{icon:'图标',text:'tab文字'},panel:{children:'tab内容区'}}]` | `array` | - |
| disabledItems | 禁用的 tab 页的 key 数组 | `[key]` | - |
| fit | 让 tabs 拉伸充满父容器的高度，同时选项内容超过高度时出现滚动条 | `boolean` | - |
| selectedTab | 选中的 tab 页 | `string` | - |
| uistyle | 页签的基本样式 | `'plain'\|'hat'\|'card'\|'line'\|'underline'\|'pill'` | plain |
| tools | 右侧工具栏，仅在一体 tab 时有用 | `component \| function` | - |
| onTabSelectionChange | tab 被点击时触发 | `({sender,selectedItem,key})=>{console.log('Tab Changed')}` | - |

### Method

| 参数             | 说明                  | 类型               | 默认值 |
| ---------------- | --------------------- | ------------------ | ------ |
| selectTab        | 选中某一项            | `(tab)=>void`      | -      |
| getSelectedTab | 获取当前选中tab项 | `()=>{key:string}` | -      |
| createTab | 新增tab项 | `({key,item,panel})=>{}` | -      |
| removeTab | 移除tab项 | `(key)=>{` | -      |
