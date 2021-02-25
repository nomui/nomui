define([], function () {
  return {
    title: '控件宽度',
    file: 'control-width',
    description: '',
    demo: function () {
      return {
        component: 'Group',
        fields: [
          {
            component: 'Textbox',
            label: 'xsmall',
            controlWidth: 'xsmall',
          },
          {
            component: 'Textbox',
            label: 'small',
            controlWidth: 'small',
          },
          {
            component: 'Textbox',
            label: 'medium',
            controlWidth: 'medium',
          },
          {
            component: 'Textbox',
            label: 'large',
            controlWidth: 'large',
          },
          {
            component: 'Textbox',
            label: 'xlarge',
            controlWidth: 'xlarge',
          },
        ],
      }
    },
  }
})
