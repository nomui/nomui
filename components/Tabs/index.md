选项卡切换组件，常用于平级区域大块内容的的收纳和展现。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tabs | 内容,格式为`[{item:{icon:'图标',text:'tab文字'},panel:{children:'tab内容区'}}]` | `array` | - |
| fit | 让 tabs 拉伸充满父容器的高度，同时选项内容超过高度时出现滚动条 | `boolean` | - |
| selectedTab | 选中的 tab 页 | `string` | - |
| uistyle | 页签的基本样式 | `'plain'\|'hat'\|'card'\|'line'\|'pill'` | plain |
| onTabSelectionChange | tab 被点击时触发 | `({sender,selectedItem,key})=>{console.log('Tab Changed')}` | - |

### Method

| 参数             | 说明                  | 类型               | 默认值 |
| ---------------- | --------------------- | ------------------ | ------ |
| selectTab        | 选中某一项            | `(tab)=>void`      | -      |
| getSelectedTab() | 获取当前选中 tab 对象 | `()=>{key:string}` | -      |
