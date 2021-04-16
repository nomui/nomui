define([], function () {
    return {
      title: '选择类字段值采用数组形式',
      file: 'options-value-as-array',
      demo: function () {
        let group = null
  
        return {
          children: {
            component: 'Form',
            ref: (c) => {
              group = c
            },
            value: {
              country: '我是中国人',
              name: 'Jerry',
            },
            fields: [
              {
                component: 'StaticText',
                name: 'country',
                label: '国家',
              },
              {
                component: 'Textbox',
                name: 'name',
                label: '姓名',
                required: true,
                disabled: true,
                rules: [
                  { type: 'identifier' },
                  { type: 'minlength', value: 2 },
                  { type: 'maxlength', value: 12 },
                ],
              },
              {
                component: 'Numberbox',
                name: 'age',
                label: '年龄',
                required: true,
                min: 0,
                max: 100,
              },
              {
                component: 'Textbox',
                name: 'email',
                label: 'Email',
                required: true,
                rules: [{ type: 'email', message: 'Email 格式不正确' }],
              },
              {
                component: 'RadioList',
                name: 'gender',
                label: '性别',
                value: [1],
                valueOptions: {
                  asArray: true,
                },
                options: [
                  { text: '男', value: 0 },
                  { text: '女', value: 1 },
                ],
              },
              {
                component: 'DatePicker',
                name: 'birthDate',
                label: '出生日期',
              },
              {
                component: 'CheckboxList',
                name: 'hobbies',
                label: '爱好',
                value: [1, 3],
                options: [
                  { text: '唱歌', value: 1 },
                  { text: '跳舞', value: 2 },
                  { text: '旅游', value: 3 },
                ],
              },
              {
                component: 'Select',
                name: 'city',
                label: '城市',
                value: [3],
                valueOptions: {
                  asArray: true,
                },
                options: [
                  { text: '北京', value: 1 },
                  { text: '上海', value: 2 },
                  { text: '广州', value: 3 },
                ],
              },
              {
                component: 'Field',
                label: '',
                control: {
                  component: 'Cols',
                  items: [
                    {
                      component: 'Button',
                      type: 'primary',
                      text: '提 交',
                      onClick: () => {
                        console.log(group.getValue())
                      },
                    },
                    {
                      component: 'Button',
                      text: '重 置',
                      onClick: () => {
                        group.reset()
                      },
                    },
                    {
                      component: 'Button',
                      text: '清除',
                      onClick: () => {
                        group.clear()
                      },
                    },
                  ],
                },
              },
            ],
          },
        }
      },
    }
  })
  