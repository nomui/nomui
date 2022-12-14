define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'Flex',
        cols: [
          {
            component: 'MaskInfo',
            type: 'mail',
            text: 'snoopdog@dogs.com',
            showTitle: true,
            icon: 'times',
          },
          {
            component: 'MaskInfo',
            type: 'name',
            text: '张小花',
          },
          {
            component: 'MaskInfo',
            type: 'mobile',
            text: '13548612345',
          },
          {
            component: 'MaskInfo',
            type: 'mobile',
            empty: '暂无内容',
            text: '',
          },
        ],
      }
    },
    description:
      '对敏感信息打码的基础用法，默认前方带有眼睛图标',
  }
})
