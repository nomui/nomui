Component 组件是所有组件的基类组件，它定义了描述 html 元素的方式（json 对象格式），并且定义了一些所有组件都共有的状态和行为。

## props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tag | 标签类型 | `string` | `div` |
| reference | 参考元素 | `dom` | `document.body` |
| placement | 渲染位置 | `prepend`\|`append`\|`replace`\|`before`\|`after` | `append` |
| autoRender | 是否自动渲染 | `boolean` | `true` |
| renderIf | 是否渲染该组件 | `boolean` | `true` |
| animate | 组件动效开关，可单独在每个组件中配置 | `boolean` | `true` |
| hidden | 已隐藏 | `boolean` | `false` |
| disabled | 已禁用 | `boolean` | `false` |
| selected | 已选中 | `boolean` | `false` |
| expanded | 已展开 | `boolean` | `false` |
| ref | 组件实例引用配置回调。参数为组件自身实例，一般用法为在该函数里给某个变量赋予组件实例的引用，这样在其他地方就可以操作该组件了。 | `(c)=>{}` | - |
| styles | 样式设置，会组合生成样式类 | `object` | - |
| attrs | html 属性配置 | `object` | - |
| classes | 样式类设置，值为对象类型，属性值为 true 的会做为样式类应用到组件上,例如 `{ className1: true, className2: false }` 会应用样式名 className1 到组件上 | `object` | - |
| selectable | 可选择配置项 | `SelectProp` | `{byClick:false,byHover:false,canRevert:false,selectedProps:null,unselectedProps:null}` |
| expandable | 可展开配置项 | `ExpandableProp` | `{byClick: false,byHover: false,target: null,indicator: null,byIndicator: false,expandedProps: false,collapsedProps: false}` |
| childDefaults | 子组件默认属性配置，所有的子组件都会合并该属性值。 | `props` | - |
| onCreated | 组件实例创建后的回调，在组件实例化后调用，当组件更新时不会再次调用 | `({ inst, props }) => { }` | - |
| onConfig | 组件开始配置时的回调，在组件已创建，即将进行内部配置的时候调用，当组件更新时会再次调用 | `({ inst, props }) => { }` | - |
| onRendered | 渲染完成后回调 | `({ inst, props, isUpdate }) => { }` | - |
| onRemove | 组件移除前回调 | `({ inst, props }) => { }` | - |
| onClick | 点击组件回调 | `({ sender, event }) => { }` | - |
| onShow | 显示回调 | `({ sender }) => { }` | - |
| onHide | 隐藏回调 | `({ sender }) => { }` | - |
| onSelect | 选中回调 | `({ sender }) => { }` | - |
| onUnselect | 取消选中回调 | `({ sender }) => { }` | - |
| onSelectionChange | 选则状态变更回调 | `({ sender }) => { }` | - |
| placeholderProps | 组件渲染完成前的占位元素属性配置 | `object` | - |

### methods

| 名称 | 说明 | 类型 |
| --- | --- | --- |
| update | 更新，传入的 props 会跟现有 props 合并然后更新渲染 | `(props)=>{}` |
| replace | 替换，会用传入的 props 重新渲染 | `(props)=>{}` |
| remove | 移除，将组件从页面移除 | `()=>{}` |
| setProps | 设置属性，深拷贝，常用于 onConfig 回调里设置属性 | `(props)=>{}` |
| assignProps | 设置属性，浅拷贝，常用于 onConfig 回调里设置属性 | `(props)=>{}` |
| show | 显示 | `() => {}` |
| hide | 隐藏 | `() => {}` |
| disable | 禁用 | `() => {}` |
| enable | 启用 | `() => {}` |
| select | 选中 | `({triggerSelect, triggerSelectionChange}) => {}` |
| unselect | 取消选中 | `({triggerSelect, triggerSelectionChange}) => {}` |
| expand | 展开 | `() => {}` |
| collapse | 折叠 | `() => {}` |

### attrs props

`attrs` 用来配置 html 元素属性，例如 id，其中 style 属性用来配置元素对应的样式属性。与用 js dom api 操作元素的属性和样式时所用的属性名和属性值一致。

```javascript
{
    tag: 'div',
    attrs: {
        id: 'MyDiv'
        style: {
            width: '100px',
            padding: '1px'
        }
        onclick: ()=> {
        }
    }
}
```

上面代码渲染出来的 html 代码如下，注意，事件是通过 addEventListener 监听的，所以上面的 onclick 不会体现在渲染出来的代码里

```html
<div id="MyDiv" style="width: 100px; padding: 1px"></div>
```

### styles props

`styles` 配置的值类型为 object，会遍历处理该 object 的每个属性，每个属性处理完后的结果会做为样式类名应用到组件上。处理步骤为：

1. 初始化样式类名为空字符 ``；
2. 样式类名通过连字符连接属性名称 `-propName`；
3. 属性值类型为布尔型，若值为假则样式类名重置为空字符串，若值为真则样式类名为上一步的结果`；
4. 属性值类型为字符串或者数值，则样式类名通过连字符连接属性值 `-propName-propValue`；
5. 属性值类型为数组，则对每个数组元素按前述 3，4 步骤处理，有多少个元素就会得到多少个样式类名；
6. 属性值类型为对象，则对该对象的属性继续按前述 2，3，4，5 步骤处理。
7. 处理完后的样式类名为空字符串则丢弃，如果不为空字符串则在前面加上字符 `u` 做为最后的样式类名应用到组件上。

`styles` 设计成这样方便了针对样式的编程操作。系统预定义了大量样式原子类（ `u-` 开头），建议使用 `styles` 来设置组件的样式，而不是 `attrs.style`。

```javascript
{
    tag: 'div',
    styles: {
        padding: '1',
        text: 'center',
        rounded: true,
        text: [ 'primary', 'center' ]
        hover: {
            color: 'primary',
        }
  }
}
```

上面代码渲染出来的 html 代码如下

```html
<div
  class="u-padding-1 u-text-center u-rounded u-hover-color-primary u-text-primary u-text-center"
></div>
```

### selectable props

配置组件的可选择行为，可选择状态是界面最常见的一种状态，在基类组件提供该声明式的配置，可以大大简化选择操作的编程。例如菜单项的选中，下拉框的选中等等。

| 参数            | 说明             | 类型      | 默认值  |
| --------------- | ---------------- | --------- | ------- |
| byClick         | 点击触发选中     | `boolean` | `false` |
| byHover         | 鼠标悬浮触发选中 | `boolean` | `false` |
| canRevert       | 允许反选         | `boolean` | `false` |
| selectedProps   | 已选中的属性配置 | `props`   | -       |
| unselectedProps | 未选中的属性配置 | `props`   | -       |

### expandable props

配置组件的可展开行为，可展开状态是界面最常见的一种状态，在基类组件提供该声明式的配置，可以大大简化展开操作的编程。例如树形结构的展开折叠，操作栏的显隐等等。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| byClick | 点击触发展开 | `boolean` | `false` |
| byHover | 鼠标悬浮触发展开 | `boolean` | `false` |
| target | 展开折叠时操作的目标组件，可为单个组件或组件数组，或者为返回单个组件或组件数组的函数 | `Component`\|`Function` | - |
| indicator | 展开状态的指示器，可为任意组件配置，通常会使用图标做为指示器 | `props` | - |
| byIndicator | 通过指示器触发展开折叠操作，默认为 false，点击当前组件触发展开折叠操作 | `boolean` | `false` |
| expandedProps | 展开状态的属性配置 | `props` \| `boolean` | `false` |
| collapsedProps | 折叠状态的属性配置 | `props` \| `boolean` | `false` |

### placeholder props

每个组件在渲染完成前会在页面上拥有一个占位元素，该占位元素会在组件渲染完成后消失，通过本属性可以配置占位元素的宽高以及加载动效。

| 参数    | 说明                                                   | 类型      | 默认值 |
| ------- | ------------------------------------------------------ | --------- | ------ |
| width   | 宽度                                                   | `number`  | -      |
| height  | 高度                                                   | `number`  | -      |
| loading | 是否显示加载动画，为 true 时占位容器至少会占据 1rem 高 | `boolean` | -      |
