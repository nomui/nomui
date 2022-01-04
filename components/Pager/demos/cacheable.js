define([], function () {
  return {
    title: '缓存分页大小',
    file: 'cacheable',
    description:
      '可通过配置 `cacheable: true`，再配置其 `key`（唯一值） 来实现缓存分页器的分页大小',
    demo: function () {
      return {
        children: [
          {
            component: 'Pager',
            key: 'cache-pager',
            cacheable: true,
            totalCount: 100,
            onPageChange: function (e) {
              e.sender.update(e)
              console.log(e)
            },
          },
        ],
      }
    },
  }
})
