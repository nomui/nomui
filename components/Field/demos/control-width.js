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
          {
            component: 'Textbox',
            label: '100',
            controlWidth: 100,
          },
          {
            component: 'Textbox',
            label: '150',
            controlWidth: 150,
          },
          {
            component: 'Textbox',
            label: '200',
            controlWidth: 200,
          },
        ],
      }
    },
  }
})
