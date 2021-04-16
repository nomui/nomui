define([], function () {
  const list = [
    {
      label: '2021',
      isGroup: true,
    },
    {
      label: '04-12',
      versionNo: 'V6.0.1',
      versionInfo: `#<ol class=" list-paddingleft-2"><li>申办方列表</li><li>平台版本升级通知</li><li>系统性能优化</li><li>test<br></li></ol>`,
    },
    {
      label: '03-12',
      versionNo: 'V5.0.1',
      versionInfo: `#<ol class=" list-paddingleft-2"><li>申办方列表</li><li>平台版本升级通知</li><li>系统性能优化</li><li>test<br></li></ol>`,
    },
    {
      label: '2020',
      isGroup: true,
    },
    {
      label: '12-12',
      versionNo: 'V4.0.1',
      versionInfo: `#<ol class=" list-paddingleft-2"><li>申办方列表</li><li>平台版本升级通知</li><li>系统性能优化</li><li>test<br></li></ol>`,
    },
    {
      label: '10-12',
      versionNo: 'V3.0.1',
      versionInfo: `#<ol class=" list-paddingleft-2"><li>申办方列表</li><li>平台版本升级通知</li><li>系统性能优化</li><li>test<br></li></ol>`,
    },
  ]
  return {
    title: '版本历史',
    file: 'version-history',
    description: '',
    demo: function () {
      return {
        component: 'Timeline',
        items: list.map((item) => {
          let result = {}
          if (item.isGroup) {
            result = {
              color: 'green',
              label: {
                tag: 'h3',
                styles: {
                  'margin-r': 1,
                },
                children: item.label,
              },
              dot: {
                component: 'Icon',
                type: 'clock',
                styles: {},
                attrs: {
                  style: {
                    'font-size': '2rem',
                  },
                },
              },
              children: `#<br/><br/>`,
            }
          } else {
            result = {
              label: item.label,
              children: [
                {
                  tag: 'h5',
                  children: item.versionNo,
                },
                {
                  children: `${item.versionInfo}`,
                },
              ],
            }
          }
          return result
        }),
      }
    },
  }
})
