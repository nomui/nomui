define([], function () {
  return {
    title: '表单验证',
    file: 'validate',
    demo: function () {
      let formRef = null
      return {
        children: {
          component: 'Form',
          onCreated: ({ inst }) => {
            formRef = inst
          },
          fields: [
            {
              component: 'Uploader',
              required: true,
              label: '表单验证',
              action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            },
          ],
          controlAction: {
            component: 'Flex',
            gutter: 'medium',
            justify: 'end',
            cols: [
              {
                component: 'Button',
                type: 'primary',
                text: '验证',
                onClick: () => {
                  const isValidate = formRef.validate()
                  if (isValidate) {
                    new nomui.Alert({
                      type: 'success',
                      title: '表单验证通过',
                    })
                  }
                },
              },
            ],
          },
        },
      }
    },
  }
})
