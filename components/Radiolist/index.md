单选框组合，用于包裹一组 Radio。

## 何时使用

- 单选列表建议不宜超过 5 个，超过的情况请考虑使用下拉组件代替

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| options | 单选项配置 | `[{text:string,value:number\|string}]` | - |
| uistyle | 展示形式 | `'button'\|'radio'` | radio |
| onValueChange | 值变化的时候触发 | `(changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj})=>void` | - |
