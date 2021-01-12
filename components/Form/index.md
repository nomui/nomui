高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

- 用于创建一个实体或收集信息。
- 需要对输入的数据类型进行校验时。

## API

| 参数   | 说明             | 类型      | 默认值  |
| ------ | ---------------- | --------- | ------- |
| inline | 是否内联形式展示 | `boolean` | `false` |
| fields | 表单项配置       | `Props[]` | `[]`    |

<!-- | requiredMark | 必填标记 | `string`            | `*`  | -->
<!-- | striped      |                  | `boolean`            | `false` |
| bordered     |                  | `boolean`            | `false` |
| splitline    |                  | `boolean`            | `false` |
| space        | 是否显示必填标记 | `xs\|sm\|md\|lg\|xl` | `md`    |
| size         | 是否显示必填标记 | `xs\|sm\|md\|lg\|xl` | `md`    | -->

## Method

| 参数     | 说明                           | 类型                 |
| -------- | ------------------------------ | -------------------- |
| getField | 获取指定表单中指定 name 的组件 | `Props`              |
| getValue | 获取表单的数据                 | `()=>{}`             |
| setValue | 设置表单的数据                 | `(value:Object)=>{}` |
| validate | 验证表单                       | `boolean`            |
| getField | 获取指定表单中指定 name 的组件 | `boolean`            |
