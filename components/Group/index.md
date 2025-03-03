字段组，组合一组字段，通过配置 `fields` 来配置一组子字段。字段组继承自 `Field`。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| fields | 子字段数组 | `Array` | - |
| fieldDefaults | 每个子 field 的默认配置，api 参考 field 的 api | `{}` | - |
| inline | 内联布局 | `Boolean` | - |
| striped | 条纹样式，标签栏有背景色 | `Boolean` | - |
| line | 线条样式 | `splitline`\|`outline` | - |
| valueOptions | getValue 取值时的默认参数 | `{}` | - |
| variant | 表单风格类型 | `default\|filled\|borderless` | `default` |

## Method

| 方法名称 | 说明 | 参数 |
| --- | --- | --- |
| getField | 获取子字段，参数为字段名，可有圆点分隔，例如`foo.bar`来获取多层级的子孙字段,如果传入第二位参数{byDom:true},则无需通过层级直接查找子孙字段(此情况需要保证 name 不重复) |  |
| findField | 通过 dom 元素 name 来获取子字段，此情况需要保证 name 不重复,效果与 getField 传入第二位参数{byDom:true} 一致 |  |

eg. 以下两种方式获取的组件实例相同,byDom 参数仅在子组件都已渲染完毕时才有用

```
const target = formRef.getField('race.class.warrior')
const target = formRef.getField('warrior',{byDom:true})
```

### valueOptions（也可作为 getValue 方法的参数）

| 方法名称       | 说明                                          | 类型      | 默认值  |
| -------------- | --------------------------------------------- | --------- | ------- |
| ignoreDisabled | 是否忽略禁用的字段                            | `boolean` | `true`  |
| ignoreHidden   | 是否忽略隐藏的字段                            | `boolean` | `true`  |
| merge          | 是否合并返回 group 初始值当中未使用的部分字段 | `boolean` | `false` |

### validate 方法的参数

| 方法名称       | 说明                     | 类型      | 默认值  |
| -------------- | ------------------------ | --------- | ------- |
| ignoreRequired | 校验过程是否忽略必填规则 | `boolean` | `false` |
