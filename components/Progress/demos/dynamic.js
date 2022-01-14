define([], function () {
  let circleProgressRef, lineProgressRef
  return {
    title: '会动的进度条',
    description: '会动的进度条才是好进度条度',
    file: 'dynamic',
    demo: function () {
      return {
        children: [
          {
            component: 'Rows',
            items: [
              {
                children: [
                  {
                    component: 'Progress',
                    type: 'circle',
                    ref: (c) => {
                      circleProgressRef = c
                    },
                    percent: 0,
                  },
                  {
                    component: 'Button',
                    icon: 'plus',
                    shape: 'round',
                    onClick: () => {
                      let percent = circleProgressRef.props.percent
                      percent += 5
                      percent = Math.min(100, percent)
                      if (percent <= 100) {
                        circleProgressRef.update({
                          percent,
                        })
                      }
                    },
                  },
                  {
                    component: 'Button',
                    icon: 'minus',
                    shape: 'round',
                    onClick: () => {
                      let percent = circleProgressRef.props.percent
                      percent -= 5
                      percent = Math.max(0, percent)
                      if (percent >= 0) {
                        circleProgressRef.update({
                          percent,
                        })
                      }
                    },
                  },
                ],
              },
              {
                component: 'Rows',
                items: [
                  {
                    component: 'Progress',
                    ref: (c) => {
                      lineProgressRef = c
                    },
                    percent: 5,
                  },
                  {
                    children: [
                      {
                        component: 'Button',
                        icon: 'plus',
                        shape: 'round',
                        onClick: () => {
                          let percent = lineProgressRef.props.percent
                          percent += 5
                          percent = Math.min(100, percent)
                          if (percent <= 100) {
                            lineProgressRef.update({
                              percent,
                            })
                          }
                        },
                      },
                      {
                        component: 'Button',
                        icon: 'minus',
                        shape: 'round',
                        onClick: () => {
                          let percent = lineProgressRef.props.percent
                          percent -= 5
                          percent = Math.min(0, percent)
                          if (percent >= 0) {
                            lineProgressRef.update({
                              percent,
                            })
                          }
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
})
