define([], function () {
    return {
      title: '预定义颜色',
      file: 'basic',
      description:
        '系统预定义了 12 种颜色，每种颜色又分为深色（对应颜色的英文名，例如 blue）和浅色（深色颜色名称前加字母 l，例如 lblue），深色和浅色又一步分为默认色，较浅色（加后缀-light），较深色(加后缀-dark)',
      demo: function () {
        return {
          component: 'List',
          cols: 1,
          gutter: 'sm',
          data: [
            'red',
            'orange',
            'yellow',
            'green',
            'teal',
            'blue',
            'indigo',
            'purple',
            'pink',
            'cyan',
            'brown',
            'gray',
          ],
          itemRender: ({ itemData: color }) => {
            return {
              component: 'Flex',
              gap: 'medium',
              align: 'center',
              cols: [
                {
                  attrs: {
                    style: {
                      width: '100px',
                    },
                  },
                  children: color,
                },
                {
                  grow: true,
                  children: {
                    component: 'List',
                    cols: 6,
                    data: [
                      `l${color}-light`,
                      `l${color}`,
                      `l${color}-dark`,
                      `${color}-light`,
                      `${color}`,
                      `${color}-dark`,
                    ],
                    itemRender: ({ itemData: subcolor }) => {
                      return {
                        styles: {
                          color: subcolor,
                          padding: 1,
                        },
                        children: subcolor,
                      }
                    },
                  },
                },
              ],
            }
          },
        }
      },
    }
  })
  