define([], function () {
  return {
    title: '联动显示上传列表',
    file: 'file-list',
    demo: function () {
      let uploaderRef,
        listRef = null

      const getListData = () => {
        const data = uploaderRef.getData()
        listRef.update({ data: data })
      }
      return {
        component: 'Flex',
        align: 'center',
        gutter: 'large',
        rows: [
          {
            tag: 'p',
            children: '组件本身不提供上传列表图形界面，可以通过List组件联动显示',
          },
          {
            component: 'UploaderCore',
            ref: (c) => {
              uploaderRef = c
            },
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            onChange: ({ file }) => {
              if (file.status === 'done') {
                getListData()
              }
            },
            button: {
              component: 'Button',
              text: '点我上传',
            },
          },
          {
            component: 'List',
            ref: (c) => {
              listRef = c
            },
            cols: 1,
            autoRender: false,
            itemRender: ({ itemData }) => {
              return {
                styles: {
                  padding: 1,
                },
                component: 'Flex',
                cols: [
                  {
                    tag: 'strong',
                    children: itemData.name,
                  },
                  {
                    styles: {
                      text: 'gray',
                    },
                    grow: true,
                    children: `(${itemData.url || 'NA'})`,
                  },
                  {
                    children: new Date(itemData.uploadTime).format('yyyy-MM-dd'),
                  },
                ],
              }
            },
            onCreated: () => {
              getListData()
            },
          },
        ],
      }
    },
  }
})
