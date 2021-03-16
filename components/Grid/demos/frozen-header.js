define([], function () {
  return {
    title: '冻结表头',
    file: 'frozen-header',
    demo: function () {
      return {
        children: [
          {
            component: 'Grid',
            line: 'row',
            columns: [
              {
                field: 'name',
                title: '标题',
                width: 200,
              },
              {
                field: 'brand',
                title: '出版方',
                width: 200,
              },
              {
                field: 'author',
                title: '作者',
                width: 1000,
              },
              {
                field: 'role',
                title: '主角',
                width: 300,
              },
            ],
            data: [
              { id: 1, name: '飞狐外传', brand: '明报', author: '金庸', role: '胡斐' },
              { id: 2, name: '雪山飞狐', brand: '明报', author: '金庸', role: '胡斐' },
              { id: 3, name: '连城诀', brand: '明报' },
              { id: 4, name: '天龙八部' },
              { id: 5, name: '射雕英雄传' },
              { id: 6, name: '白马啸西风' },
            ],
            frozenHeader: true,
            frozenLeftCols: 1,
            frozenRightCols: 0,
            // allowFrozenCols: true,
            attrs: {
              style: {
                height: '170px',
              },
            },
          },
        ],
      }
    },
  }
})
