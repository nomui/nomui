define([], function () {
  return {
    title: '基本用法',
    file: 'basic',
    description:
      '最基本的组件 `Component` 可以用来描述任意 `html` 元素，其最基本的配置有：`tag`：元素标签名，`attrs`：元素属性，`attrs.style`：样式属性，`attrs.onxxx`：事件绑定，`children`：子组件，可为字符串或者子组件配置数组',
    demo: function () {
      return {
        tag: 'p',
        attrs: {
          id: 'AnPara',
          style: {
            padding: '5px',
            border: '1px solid var(--nom-color-primary)',
          },
          onclick: () => {
            // eslint-disable-next-line no-alert
            alert('hello nomui')
          },
        },
        children: '一段文本',
      }
    },
  }
})
