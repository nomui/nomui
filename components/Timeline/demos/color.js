define([], function () {
  return {
    title: '圆圈颜色',
    file: 'color',
    description:
      '圆圈颜色，绿色用于已完成、成功状态，红色表示告警或错误状态，蓝色可表示正在进行或其他默认状态，灰色表示未完成或失效状态。',
    demo: function () {
      return {
        component: 'Timeline',
        items: [
          {
            color: 'green',
            children: 'Create a services site 2015-09-01',
          },
          {
            color: 'green',
            children: 'Solve initial network problems 2015-09-01',
          },
          {
            color: 'red',
            children: [
              {
                tag: 'p',
                children: 'Solve initial network problems 1',
              },
              {
                tag: 'p',
                children: 'Solve initial network problems 2',
              },
              {
                tag: 'p',
                children: 'Solve initial network problems 3 2015-09-01',
              },
            ],
          },
          {
            children: [
              {
                tag: 'p',
                children: 'Technical testing 1',
              },
              {
                tag: 'p',
                children: 'Technical testing 2',
              },
              {
                tag: 'p',
                children: 'Technical testing 3 2015-09-01',
              },
            ],
          },
          {
            color: 'gray',
            children: [
              {
                tag: 'p',
                children: 'Technical testing 1',
              },
              {
                tag: 'p',
                children: 'Technical testing 2',
              },
              {
                tag: 'p',
                children: 'Technical testing 3 2015-09-01',
              },
            ],
          },
          {
            color: 'gray',
            children: [
              {
                tag: 'p',
                children: 'Technical testing 1',
              },
              {
                tag: 'p',
                children: 'Technical testing 2',
              },
              {
                tag: 'p',
                children: 'Technical testing 3 2015-09-01',
              },
            ],
          },
        ],
      }
    },
  }
})
