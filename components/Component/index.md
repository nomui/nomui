所有组件的基类组件

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tag | 标签类型 | `string` | `div` |
| reference | 参考元素 | `dom` | `document.body` |
| placement | 渲染位置 | `prepend`\|`append`\|`replace`\|`before`\|`after` | `append` |
| autoRender | 是否自动渲染 | `boolean` | `true` |
| renderIf | 是否渲染该组件 | `boolean` | `true` |
| hidden | 是否隐藏 | `boolean` | `false` |
| disabled | 是否禁用状态 | `boolean` | `false` |
| selected | 已选中状态 | `boolean` | `false` |
| expanded | 已展开状态 | `boolean` | `false` |
| ref | 将当前组件映射出去 | `(c)=>{}` | - |
| styles | 样式设置，会组合生成样式类 | `object` | - |
| attrs | html 树形配置 | `object` | - |
| selectable | 可选择配置项 | `SelectProp` | `{byClick:false,byHover:false,canRevert:false,selectedProps:null,unselectedProps:null}` |
| expandable | 可展开配置项 | `ExpandableProp` | `{byClick: false,byHover: false,target: null,indicator: null,byIndicator: false,expandedProps: false,collapsedProps: false}` |
| onCreated | 已创建回调，在组件实例化后调用，当组件更新时不会再次调用 | `({ inst, props }) => { }` | - |
| onConfig | 开始配置回调，在组件已创建，即将进行内部配置的时候调用，当组件更新时会再次调用 | `({ inst, props }) => { }` | - |
| onRendered | 渲染完成后回调 | `({ inst, props, isUpdate }) => { }` | - |
| onRemove | 组件移除前回调 | `({ inst, props }) => { }` | - |
| onClick | 点击组件回调 | `({ sender, event }) => { }` | - |

### SelectProp

| 参数            | 说明             | 类型      | 默认值  |
| --------------- | ---------------- | --------- | ------- |
| byClick         | 点击触发选中     | `boolean` | `false` |
| byHover         | 鼠标悬浮触发选中 | `boolean` | `false` |
| canRevert       | 允许反选         | `boolean` | `false` |
| selectedProps   | 选择的属性值     |           | -       |
| unselectedProps | 反选的属性值     |           | -       |

### ExpandableProp

| 参数           | 说明               | 类型                    | 默认值  |
| -------------- | ------------------ | ----------------------- | ------- |
| byClick        | 点击触发展开       | `boolean`               | `false` |
| byHover        | 鼠标悬浮触发展开   | `boolean`               | `false` |
| target         | 展开时显示的元素   | `Component`\|`Function` | -       |
| indicator      | 展开图标           | `Props`                 | -       |
| byIndicator    | 点击图标展开       | `boolean`               | `false` |
| expandedProps  | 展开状态的属性配置 | `Object`\|`boolean`     | `false` |
| collapsedProps | 折叠状态的属性配置 | `Object`\| `boolean`    | `false` |

> 生命周期

- constructor
- \_created
- \_rendered
