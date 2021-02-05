表单元素项，可以用来组合 labe 跟 Control 类型组件

## API

| 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名称，未设置时会自动设置一个自增格式 | `string` | `__field` + 自增长序号 |
| value | 字段值 | `string` | - |
| label | 标签文本，当未定义或为 null 时不显示标签栏 | `string` | - |
| labelAlign | 标签对齐方式 | `left`\|`right`\|`top` | `right` |
| invalidTipAlign | 验证错误信息提示的位置 | `Layer层组合值` | `top right` |
| flatValue | 是否平面化数据 | `boolean` | `false` |
| notShowLabel | 不显示标签，不管 label 是否设置 | `boolean` | `false` |
| labelWidth | 表单元素项提示文字宽度 | `number` | `126` |
| controlWidth | 表单元素项的宽度 | `xsmall\|small\|mediu\|large\|xlarge` | `false` |
| rules | 配置的验证规则 | `Array` | `[]` |
| control | 关联的表单元素项 | `Props` | - |
| actions | 关联的表单元素项的操作按钮 | `Props[]` | - |
| onValueChange | 值变化的时候触发 | `(changed:{name:string,newValue:boolean,oldValue:boolean,sender:obj})=>void` | - |

## Method

| 名称     | 说明               | 类型          |
| -------- | ------------------ | ------------- |
| focus    | 获得焦点           |               |
| blur     | 失焦               |               |
| getValue | 获取 value 值      |               |
| setValue | 设置 value 值      | `(value)=>{}` |
| validate | 验证               | `()=>boolean` |
| reset    | 重置字段值为初始值 |               |
| clear    | 清除字段值         |               |
