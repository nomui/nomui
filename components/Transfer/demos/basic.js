define([], function () {
  return {
    title: '基础用法',
    file: 'basic',

    demo: function () {
      const data = [
        {
          key: '001',
          text: '东方不败',
        },
        {
          key: '002',
          text: '任我行',
        },
        {
          key: '003',
          text: '令狐冲',
        },
        {
          key: '004',
          text: '乔峰',
        },
        {
          key: '005',
          text: '虚竹',
        },
      ]
      return {
        component: 'Form',
        fields: [
          {
            component: 'Transfer',
            label: '穿梭框',
            data: data,
          },
        ],
      }
    },
  }
})
