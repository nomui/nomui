define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Cols',
        items: [
          {
            children: [
              {
                component: 'Tag',
                text: '如果是块元素，设置ellipsis:true即可',
                ellipsis: true,
                tooltip: '结合Tooltip组件实现hover查看全文',
              },
            ],
          },
          {
            component: 'Ellipsis',
            text:
              '也可以作为单独组件使用，比如这样：下面是一段超长文字系统定义了大量原子类，如果直接做为字符串类型 prop 应用到组件上，使用起来会非常不方便，所以设计了一个机制来应用原子类，即通过 object 类型的名为 styles 的 prop 来应用各种原子类系统定义了大量原子类，如果直接做为字符串类型 prop 应用到组件上，使用起来会非常不方便，所以设计了一个机制来应用原子类，即通过 object 类型的名为 styles 的 prop 来应用各种原子类系统定义了大量原子类，如果直接做为字符串类型 prop 应用到组件上，使用起来会非常不方便，所以设计了一个机制来应用原子类，即通过 object 类型的名为 styles 的 prop 来应用各种原子类',
          },
          {
            component: 'Ellipsis',
            children: [
              {
                tag: 'span',
                children: 'children可以是几个行内元素的集合体',
              },
              {
                tag: 'span',
                children: '比如span inline-block 等',
              },
              { tag: 'span', children: '会自动将溢出部分省略' },
            ],
          },
        ],
      }
    },
  }
})
