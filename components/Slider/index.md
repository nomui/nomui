Slider 滑动输入条

## 何时使用

滑动型输入器，展示当前值和可选范围。

## API

| 参数     | 说明                                      | 类型                  | 默认值           |
| -------- | ----------------------------------------- | --------------------- | ---------------- |
| disable  | 值为 true 时，滑块为禁用状态              | `boolean`             | `false`          |
| max      | 最大值                                    | `number`              | `100`            |
| showTip  | 设置 Tooltip 的展示,设置为 false 则不展示 | `(value)=>any\|false` | `(value)=>value` |
| getValue | 获取值                                    | `()=>value`           | `-`              |
| setValue | 设置值                                    | `(value)=>void`       | `-`              |
