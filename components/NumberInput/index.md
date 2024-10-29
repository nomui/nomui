纯数字输入组件，可以输入Number或者String类型的合法数字，并附带一个微调器。

## 何时使用

- 当需要获取标准数值时。

## API

| 参数         | 说明                                    | 类型      | 默认值                  |
| ------------ | --------------------------------------- | --------- | ----------------------- |
| value        | 输入框内容                              | `number`  | -                       |
| showSpinner    | 是否显示微调控制器                                | `boolean`  | true                     |
| min          | 最小值                                  | `number`  | Number.MIN_SAFE_INTEGER |
| max          | 最大值                                  | `number`  | Number.MAX_SAFE_INTEGER |
| stringMode    | 是否以字符串模式赋值取值（当有precision或者formatter时强制此模式）                                | `boolean`  | false                      |
| ignoreInputChange    | 忽略输入过程中的onValueChange，只在失焦触发                           | `boolean`  | true                    |
| precision    | 数值精度                                | `number`  | -1                      |
| step    | 微调器点击一次的调整步长                                | `number`  | 1                      |
| formatter    | 控制组件的字面显示的格式化函数,必须与parser同时使用                                | `(value)=>{}`  | -                     |
| parser    | 控制组件的真实取值的格式化函数,必须与formatter同时使用                                | `(value)=>{}`  | -                     |
