define([], function () {
  return {
    title: '带徽章',
    file: 'badge',
    demo: function () {
      let badge = 1
      let badgeButtonRef = null

      return {
        component: 'Flex',
        vertical: true,
        gap: 'large',
        align: 'start',
        items: [
          {
            component: 'Button',
            ref: (c) => {
              badgeButtonRef = c
            },
            text: '徽章',
            rightBadge: {
              number: badge,
            },
          },
          {
            component: 'Button',
            type: 'Primary',
            text: '徽章加 1',
            ghost: true,
            onClick: () => {
              badgeButtonRef.updateBadge({ number: ++badge })
            }
          },
        ],
      }
    },
  }
})
