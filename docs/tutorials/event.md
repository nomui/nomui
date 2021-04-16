# 事件
组件的事件有两种类型，一种是原生的 dom 事件，一种是组件自定义的事件
## 原生事件
原生事件通过配置属性（props）里的 { attrs: { onxxx: function(){ } } 来定义。
例如：
```javascript
{
    component:'Button',
    attrs:{
        onclick:()=>{

        }
    }
}
```
注意事件响应代码的 this 指向没有做特殊处理。
## 组件自定义事件
组件自定义事件通过配置属性 (props) 里的 { onXxx } 来定义
例如：
```javascript
{
    component:'Button',
    onSelect: (e)=>{
        console.log(e)
    }
}
```
props 里的 onXxx，我们称之为事件回调。固定接收一个对象参数。该对象参数会自动附加一个 sender 属性，代表触发事件的组件实例。这也是因为 this 指向不明确的需要。