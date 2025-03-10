define(['../../Cascader/demos/data.js'], function (cascaderOptions) {
    return {
        title: '设置字段组值，忽略未提供值的字段',
        file: 'set-value-ignore-none',
        description: '设置字段组值，忽略未提供值的字段。通过设置 setValue 方法的 options 的 ignoreNone 值为 true，则未提供值的字段不会被设置。',
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
                        hobbies: [1, 3],
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
                            trimValue: false,
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
                        {
                            component: 'Field',
                            label: '',
                            control: {
                                component: 'Cols',
                                items: [
                                    {
                                        component: 'Button',
                                        type: 'primary',
                                        text: '设置 姓名，年龄和性别',
                                        onClick: () => {
                                            group.setValue({ name: 'Jerry', age: 100, gender: 0 }, { ignoreNone: true })
                                        },
                                    },
                                    {
                                        component: 'Button',
                                        text: '设置 爱好和城市',
                                        onClick: () => {
                                            group.setValue({ hobbies: [2], city: 1 }, { ignoreNone: true })
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
