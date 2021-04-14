Steps 步骤条:引导用户按照流程完成任务的导航条。

## 何时使用

当任务复杂或者存在先后关系时，将其分解成一系列步骤，从而简化任务。

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| current | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过`options`属性的 `status` 覆盖状态 | `number` | `0` |
| direction | 指定步骤条方向。支持水平`horizontal`和竖直`vertical`两种方向 | `string` | `horizontal` |
| onChange | 点击切换步骤时触发 | `(current) => void` | - |

## Steps.options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | `string` | - |
| subTitle | 副标题,可选 | `string` | - |
| description | 步骤的详情描述，可选 | `string` | - |
| icon | 自定义步骤图标,可选 | `Icon` | - |
| status | 指定状态。当不配置该属性时，会使用 Steps 的 current 来自动指定状态。可选：wait process finish error | `string` | `wait` |
