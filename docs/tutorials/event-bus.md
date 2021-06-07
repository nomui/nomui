# 事件总线

跨页面进行交互、针对后端推送的处理

## 监听

用来监听某种类型的事件,一般在\_created 里面监听，在\_remove 里面进行销毁

> 切记切记监

听的事件，请在当前组件的\_remove 里面进行移除监听

```javascript
function toggleMessagePanel(data){
  // 处理页面逻辑
}

{
  _created() {
    // 监听事件
    nomapp.$app.on("page.dashboard.toggle-message", toggleMessagePanel);
  },
  _remove() {
    // 移除事件监听
    nomapp.$app.off("page.dashboard.toggle-message", toggleMessagePanel);
  },
}

```

## 触发

在对应业务页面触发一个事件

```javascript
// 第一个参数，事件名称 防止与其他页面冲突，建议用路由+操作
// 第二个参数 传递的数据,考虑到扩展性建议使用对象
nomapp.$app.trigger('page.dashboard.toggle-message', {
  visible: true,
})
```
