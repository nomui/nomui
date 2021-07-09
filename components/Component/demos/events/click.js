define([], function () {
  return {
    title: '点击事件',
    file: 'click',
    description:
      '通过 `onClick` 响应组件的点击事件。注意与 `attrs.onclick` 配置的区别。组件的事件监听是直接配置在组件的第一个层级里的，且命名规范为 `onXxx`。按照规范定义的组件事件回调参数为一个对象，参数对象的 `sender` 属性代表组件自身实例，如果事件与 html 元素事件对应，则一般还会传递一个 `event` 属性，代表原生的事件参数。打开开发者工具查看打印的参数信息。',
    demo: function () {
      return {
        tag: 'button',
        children: 'hello',
        onClick: ({ sender, event }) => {
          // eslint-disable-next-line no-console
          console.log(sender)
          // eslint-disable-next-line no-console
          console.log(event)
        },
      }
    },
  }
})
