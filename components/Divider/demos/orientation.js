define([], function () {
  return {
    title: '带文字的分割线',
    subtitle: '分割线中带有文字，可以用 orientation 指定文字位置。',
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
          },
          {
            tag: 'p',
            children: ` Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista
            probare, quae sunt a te dicta? Refert tamen, quo modo.`,
          },
          {
            component: 'Divider',
            children: 'Text',
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
