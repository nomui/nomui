define([], function () {
  return {
    title: '默认已上传文件',
    file: 'default-file-list',
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
            children:
              '已上传列表，可以是数组也可以是个promise对象，当是promise对象时，resolve会触发onChange回调',
          },
          {
            component: 'UploaderCore',
            ref: (c) => {
              uploaderRef = c
            },
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            defaultFileList: new Promise((resolve) => {
              setTimeout(() => {
                resolve([
                  {
                    uuid: '-1',
                    name: 'text.txt',
                    status: 'done',
                    size: 1111,
                    url:
                      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                  },
                  {
                    uuid: '-2',
                    name: 'withPrintFile.png',
                    status: 'done',
                    size: 2222,
                    url:
                      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                  },
                ])
              }, 3000)
            }),
            onChange: ({ file }) => {
              if (!file || (file && file.status === 'done')) {
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
