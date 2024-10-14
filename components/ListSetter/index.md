## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | 标题字段 | `string` | - |
| addDefaultValue | 配置默认值 | `{}` | - |
| fields | 子字段数组 | `[]` | - |
| onValueChange | 数据发生改变回调 | `()=>{}` | - |
| GroupDefaults | 每个子 Group 的默认配置，api 参考 Group 的 api | `{}` | - |
| GroupDefaults.actionRender | 自定义每个子 Group 右边的操作栏 | `({group,groupList})=>{}` | - |

> .tips 可参考字段组
