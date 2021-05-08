所有组件的基类组件

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tag | 标签类型 | `string` | `div` |
| reference | 父级元素 | `dom` | `document.body` |
| placement | 渲染方式 | `prepend`\|`append`\|`replace`\|`before`\|`after` | `append` |
| autoRender | 是否自动渲染 | `boolean` | `true` |
| hidden | 是否隐藏 | `boolean` | `false` |
| disabled | 是否禁用状态 | `boolean` | `false` |
| selected | 是否可选择 | `boolean` | `false` |
| expanded | 是否可展开 | `boolean` | `false` |
| ref | 将当前组件映射出去 | `(c)=>{}` | - |
| selectable | 选择配置项 | `SelectProp` | `{byClick:false,byHover:false,canRevert:false,selectedProps:null,unselectedProps:null}` |
| expandable | 展开配置项 | `ExpandableProp` | `{byClick: false,byHover: false,target: null,indicator: null,byIndicator: false,expandedProps: false,collapsedProps: false}` |

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
