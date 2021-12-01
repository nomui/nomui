复选框组合，用于包裹一组 CheckBox。

## API

| 参数         | 说明               | 类型                                   | 默认值              |
| ------------ | ------------------ | -------------------------------------- | ------------------- |
| options      | 单选项数据列表     | `[{text:string,value:number\|string}]` | -                   |
| valueOptions | value 值，配置详情 | `{asArray: boolean}`                   | `{ asArray: true }` |

## Method

| 参数                 | 说明                 | 类型                                   |
| -------------------- | -------------------- | -------------------------------------- |
| getSelectedOptions   | 获取选中的实例列表   | `() => checkboxItem[]`                 |
| getUnselectedOptions | 获取未选中的实例列表 | `() => checkboxItem[]`                 |
| hideOption           | 隐藏某一选项         | `(value, alsoUnselect = true) => void` |
| showOption           | 展示某一选项         | `(value) => void`                      |
| setValue             | 设置复选框的数据     | `(value: array \| string) => void`     |
| getValue             | 取得复选框的数据     | `() => value: array \| string)`        |

## setValue 和 getValue

若设置`valueOptions.asArray: false`，则 setValue 传入的字符串类型的值会被 `.split(',')`分割；getValue 得到的值会被 `.join(',')`处理
