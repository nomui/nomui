define([], function () {
  return {
    title: '下载进度案例',
    file: 'download-progress',
    demo: function () {
      return {
        children: {
          component: 'Flex',
          rows: [
            {
              component: 'Button',
              text: '下载文件',
              onClick: () => {
                const key = 'download-file'
                let progress = 0
                const interval = setInterval(() => {
                  progress++
                  nomui.Notification.open({
                    title: '下载进度',
                    description: {
                      component: 'Progress',
                      status: 'active',
                      percent: progress,
                    },
                    key,
                  })
                  if (progress >= 100) {
                    clearInterval(interval)
                    setTimeout(() => {
                      nomui.Notification.close(key)
                    }, 900)
                  }
                }, 30)
              },
            },
          ],
        },
      }
    },
  }
})
