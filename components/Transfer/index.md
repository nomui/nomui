进行标记和分类的小标签。

## 何时使用

- 用于标记事物的属性和维度。
- 进行分类。

## API

| 参数          | 说明             | 类型                          | 默认值 |
| ------------- | ---------------- | ----------------------------- | ------ |
| icon          | 设置图标         | `string`                      | -      |
| text          | 文本值           | `string`                      | -      |
| number        | 设置数字         | `number`                      | -      |
| overflowCount | 展示封顶的数字值 | `number`                      | 99     |
| color         | 标签色           | `string`                      | -      |
| size          | 设置尺寸         | `xs\|sm\|lg\|xl`              | -      |
| type          | 设置标签类型     | `round\|square`               | square |
| removable     | 删除的回调       | `(key) => {console.log(key)}` | -      |
| onRemove     | 删除的回调(新) 建议使用 removable:true , onRemove:func 这种用法      | `(args) => {console.log(args)},` | -      |
