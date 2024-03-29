define([], function () {
  return {
    title: '修改缺口的角度',
    description:
      '通过设置 type=dashboard，可以很方便地实现仪表盘样式的进度条。若想要修改缺口的角度，可以设置 gapDegree 为你想要的值',
    file: 'gap-degree',
    demo: function () {
      return {
        children: [
          {
            component: 'Flex',
            gap: 'small',
            cols: [
              {
                component: 'Progress',
                type: 'dashboard',
                percent: 75,
              },
              {
                component: 'Progress',
                type: 'dashboard',
                percent: 75,
                gapDegree: 45,
              },
            ],
          },
        ],
      }
    },
  }
})
