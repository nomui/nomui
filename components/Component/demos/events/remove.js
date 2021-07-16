define([], function () {
  return {
    title: 'onRemove',
    file: 'remove',
    description: '`onRemove` 在组件被删除后调用。一般在这里做一些销毁工作，例如删除定时器。',
    demo: function () {
      let seconds = 0,
        hasCounter = true

      let counterRef = null,
        counterContainerRef = null

      const getCounter = () => {
        seconds = 0
        return {
          ref: (c) => {
            counterRef = c
          },
          onConfig: ({ inst }) => {
            inst.setProps({
              children: seconds,
            })
          },
          onCreated: ({ inst }) => {
            inst.interval = setInterval(() => {
              seconds += 1
              inst.update()
            }, 1000)
          },
          onRemove: ({ inst }) => {
            clearInterval(inst.interval)
          },
        }
      }

      return {
        component: 'Flex',
        gap: 'large',
        rows: [
          {
            ref: (c) => {
              counterContainerRef = c
            },
            children: getCounter(),
          },
          {
            component: 'Button',
            onConfig: ({ inst }) => {
              inst.setProps({
                text: hasCounter ? '删除计时器' : '创建计时器',
              })
            },
            onClick: ({ sender }) => {
              if (hasCounter) {
                counterRef && counterRef.remove()
                hasCounter = false
              } else {
                counterContainerRef.appendChild(getCounter())
                hasCounter = true
              }
              sender.update()
            },
          },
        ],
      }
    },
  }
})
