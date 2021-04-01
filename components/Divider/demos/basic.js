define([], function () {
  return {
    title: '基础用法',
    subtitle: '默认为水平分割线，可在中间加入文字。',
    file: 'basic',
    demo: function () {
      return {
        component: 'Container',
        breakpoint: 'xxl',
        children: [
          {
            tag: 'p',
            children: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.`,
          },
          {
            component: 'Divider',
          },
          {
            tag: 'p',
            children: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.`,
          },
          {
            component: 'Divider',
            dashed: true,
          },
        ],
      }
    },
  }
})
