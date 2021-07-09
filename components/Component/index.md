Component 组件时所有组件的基类组件，其定义了一些所有组件都共有的状态和行为。

## props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tag | 标签类型 | `string` | `div` |
| reference | 参考元素 | `dom` | `document.body` |
| placement | 渲染位置 | `prepend`\|`append`\|`replace`\|`before`\|`after` | `append` |
| autoRender | 是否自动渲染 | `boolean` | `true` |
| renderIf | 是否渲染该组件 | `boolean` | `true` |
| hidden | 已隐藏 | `boolean` | `false` |
| disabled | 已禁用 | `boolean` | `false` |
| selected | 已选中 | `boolean` | `false` |
| expanded | 已展开 | `boolean` | `false` |
| ref | 组件实例引用配置回调。参数为组件自身实例，一般用法为在该函数里给某个变量赋予组件实例的引用，这样在其他地方就可以操作该组件了。 | `(c)=>{}` | - |
| styles | 样式设置，会组合生成样式类 | `object` | - |
| attrs | html 属性配置 | `object` | - |
| selectable | 可选择配置项 | `SelectProp` | `{byClick:false,byHover:false,canRevert:false,selectedProps:null,unselectedProps:null}` |
| expandable | 可展开配置项 | `ExpandableProp` | `{byClick: false,byHover: false,target: null,indicator: null,byIndicator: false,expandedProps: false,collapsedProps: false}` |
| onCreated | 组件实例创建后的回调，在组件实例化后调用，当组件更新时不会再次调用 | `({ inst, props }) => { }` | - |
| onConfig | 组件开始配置时的回调，在组件已创建，即将进行内部配置的时候调用，当组件更新时会再次调用 | `({ inst, props }) => { }` | - |
| onRendered | 渲染完成后回调 | `({ inst, props, isUpdate }) => { }` | - |
| onRemove | 组件移除前回调 | `({ inst, props }) => { }` | - |
| onClick | 点击组件回调 | `({ sender, event }) => { }` | - |

### methods
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| tag | 标签类型 | `string` | `div` |
| reference | 参考元素 | `dom` | `document.body` |
| placement | 渲染位置 | `prepend`\|`append`\|`replace`\|`before`\|`after` | `append` |
| autoRender | 是否自动渲染 | `boolean` | `true` |
| renderIf | 是否渲染该组件 | `boolean` | `true` |

### attrs props

`attrs` 用来配置 html 元素属性，例如 id，其中 style 属性用来配置元素对应的样式属性。与 js 操作元素的属性和样式类似。

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

`styles` 配置会将每个属性加上前缀 `u-`,如果属性本身是对象类型，则会继续用连字符连接下去，所有属性生成的字符串会做为样式类应用到组件上。

```javascript
{
    tag: 'div',
    styles: {
        padding: '1',
        text: 'center',
        rounded: true,
        hover: {
            color: 'primary'
        }
  }
}
```

上面代码渲染出来的 html 代码如下

```html
<div class="u-padding-1 u-text-center u-rounded u-hover-color-primary"></div>
```

### selectable props

| 参数            | 说明             | 类型      | 默认值  |
| --------------- | ---------------- | --------- | ------- |
| byClick         | 点击触发选中     | `boolean` | `false` |
| byHover         | 鼠标悬浮触发选中 | `boolean` | `false` |
| canRevert       | 允许反选         | `boolean` | `false` |
| selectedProps   | 已选中的属性配置 | `props`   | -       |
| unselectedProps | 未选中的属性配置 | `props`   | -       |

### expandable props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| byClick | 点击触发展开 | `boolean` | `false` |
| byHover | 鼠标悬浮触发展开 | `boolean` | `false` |
| target | 展开折叠时操作的目标组件，可为单个组件或组件数组，或者为返回单个组件或组件数组的函数 | `Component`\|`Function` | - |
| indicator | 展开状态的指示器，可为任意组件配置，通常会使用图标做为指示器 | `props` | - |
| byIndicator | 通过指示器触发展开折叠操作，默认为 false，点击当前组件触发展开折叠操作 | `boolean` | `false` |
| expandedProps | 展开状态的属性配置 | `props` \| `boolean` | `false` |
| collapsedProps | 折叠状态的属性配置 | `props` \| `boolean` | `false` |
