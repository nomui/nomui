define(['../../Cascader/demos/data.js'], function (cascaderOptions) {
  return {
    title: '字段UI风格',
    file: 'field-uistyle',
    demo: function () {
      let group = null

      return {
        children: {
          component: 'Flex',
          gap: 'small',
          rows: [
            {
              component: 'Flex',
              attrs: {
                style: {
                  minHeight: '40px',
                },
              },
              cols: [
                {
                  component: 'RadioList',
                  options: [
                    {
                      text: 'default',
                      value: 'default',
                    },
                    {
                      text: 'filled',
                      value: 'filled',
                    },
                    {
                      text: 'borderless',
                      value: 'borderless',
                    },
                  ],
                  value: 'right',
                  uistyle: 'button',
                  onValueChange: (args) => {
                    group.update({
                      fieldDefaults: {
                        variant: args.newValue,
                      },
                    })
                  },
                },
              ],
            },
            {
              component: 'Form',
              ref: (c) => {
                group = c
              },
              value: {
                country: '我是中国人',
                name: 'Jerry',
              },
              readonly: true,
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
                  trimValue: false,
                  // disabled: true,
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
                  precision: 2,
                  min: 999,
                  max: 10000,
                },
                {
                  component: 'Textbox',
                  name: 'email',
                  label: 'Email',
                  required: true,
                  rules: [{ type: 'email', message: 'Email 格式不正确' }],
                },
                {
                  component: 'MaskInfoField',
                  name: 'mobile',
                  type: 'mobile',
                  label: '联系方式',
                  value: '13548612345',
                },
                {
                  component: 'RadioList',
                  name: 'gender',
                  label: '性别',
                  value: 0,
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
                  component: 'Cascader',
                  placeholder: '请选择',
                  name: 'cascader',
                  label: '病症',
                  required: true,
                  fieldsMapping: {
                    key: 'Id',
                    label: 'Name',
                    value: 'Name',
                    children: 'Childs',
                  },
                  options: cascaderOptions,
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
                  value: 3,
                  options: [
                    { text: '北京', value: 1 },
                    { text: '上海', value: 2 },
                    { text: '广州', value: 3 },
                  ],
                },
                {
                  component: 'Rate',
                  label: '性格评分',
                  value: 3,
                  name: 'characterRate',
                },
                {
                  component: 'TreeSelect',
                  name: 'dept',
                  required: true,
                  label: '部门权限',
                  value: '0-0',
                  allowClear: true,
                  multiple: true,
                  treeCheckable: {
                    cascadeCheckParent: true,
                    cascadeUncheckChildren: false,
                  },
                  options: [
                    {
                      text: '总经办',
                      value: '0-0',
                      children: [
                        {
                          text: '人事部',
                          value: '0-0-1',
                        },
                        {
                          text: '行政部',
                          value: '0-0-2',
                        },
                      ],
                    },
                    {
                      text: '技术中心',
                      value: '0-1',
                      children: [
                        {
                          text: '后端组',
                          value: '0-1-1',
                          children: [
                            {
                              text: '开发一组',
                              value: '0-1-1-1',
                            },
                            {
                              text: '开发二组',
                              value: '0-1-1-2',
                            },
                          ],
                        },
                        {
                          text: '前端组',
                          value: '0-1-2',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      }
    },
  }
})
