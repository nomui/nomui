define([], function () {
  return {
    title: 'plan普通样式',
    subtitle: '使用 plain 可以设置为更轻量的分割文字样式。',
    file: 'orientation',
    demo: function () {
      return {
        component: 'Container',
        breakpoint: 'xxl',
        children: [
          {
            component: 'Divider',
            children: 'Text',
            orientation: 'left',
            plain: true,
          },
          {
            tag: 'p',
            children: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.`,
          },
          {
            component: 'Divider',
            children: 'Text',
            plain: true,
          },
          {
            tag: 'p',
            children: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.`,
          },
          {
            component: 'Divider',
            children: 'Text',
            orientation: 'right',
            plain: true,
          },
          {
            tag: 'p',
            children: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.`,
          },
        ],
      }
    },
  }
})
