单选框组合，用于包裹一组 Radio。

## 何时使用

- 单选列表建议不宜超过 5 个，超过的情况请考虑使用下拉组件代替

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 单选项配置 | `[{text:string,value:number\|string}]` | - |
| canRevert | 选项是否可以再次点击反选 | `boolean` | true |
| fieldName | 数据源字段名 | `object` | `{text:'text',value:'value'}` |
| uistyle | 展示形式 | `'button'\|'radio'` | `'radio'` |
| cols | 展示列数 | `number` | - |
| itemRender | 自定义选项渲染函数(仅支持内容部分的自定义) | `({itemData})=>{}` | - |

## Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| onValueChange | 值变化的时候触发 | `changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj}` |

## Methods

| 参数              | 说明               | 类型                    |
| ----------------- | ------------------ | ----------------------- |
| getSelectedOption | 获取选中的实例列表 | `() => radioOptionItem` |
