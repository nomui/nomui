单选框组合，用于包裹一组 Radio。

## 何时使用

- 单选列表建议不宜超过 5 个，超过的情况请考虑使用下拉组件代替

## API

| 参数    | 说明       | 类型                                   | 默认值    |
| ------- | ---------- | -------------------------------------- | --------- |
| options | 单选项配置 | `[{text:string,value:number\|string}]` | -         |
| fieldName | 数据源字段名 | `object` | `{text:'text',value:'value'}`         |
| uistyle | 展示形式   | `'button'\|'radio'`                    | `'radio'` |
| cols    | 展示列数   | `number`                               | -         |

## Events

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| onValueChange | 值变化的时候触发 | `changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj}` |

## Methods

| 参数              | 说明               | 类型                    |
| ----------------- | ------------------ | ----------------------- |
| getSelectedOption | 获取选中的实例列表 | `() => radioOptionItem` |
