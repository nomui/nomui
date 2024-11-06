define([], function () {
    return {
        title: '自定义数据源',
        description: '自定义数据源是一个固定格式的二维数组，请参考示例代码',
        file: 'data',
        demo: function () {
            let group = null
            return {
                component: 'Form',
                ref: (c) => {
                    group = c
                },
                onValueChange: (args) => {
                    console.log(args)
                },
                fields: [
                    {
                        component: 'IconPicker',
                        name: 'ip',
                        label: '图标选择器',
                        data: [{
                            "category": "Prompt",
                            "text": "提示",
                            "icons": [
                                { "type": "square", "text": "正方形" },
                                { "type": "info-circle", "text": "信息" },
                                { "type": "question-circle", "text": "疑问" },
                                { "type": "exclamation-circle", "text": "警告" },
                                { "type": "close-circle", "text": "关闭" },
                                { "type": "check-circle", "text": "勾选" },
                                { "type": "check-circle-fill", "text": "填充勾选" },
                                { "type": "info-circle-fill", "text": "填充信息" },
                                { "type": "warning-circle-fill", "text": "填充警告" },
                                { "type": "help-circle-fill", "text": "填充帮助" },
                                { "type": "close-circle-fill", "text": "填充关闭" },
                                { "type": "up-circle", "text": "向上圆圈" },
                                { "type": "down-circle", "text": "向下圆圈" },
                                { "type": "check", "text": "勾选" },
                                { "type": "close", "text": "关闭" },
                                { "type": "ellipsis", "text": "省略号" },
                                { "type": "eye", "text": "眼睛" },
                                { "type": "eye-invisible", "text": "隐藏眼睛" },
                                { "type": "pin", "text": "图钉" },
                                { "type": "pin-fill", "text": "填充图钉" }
                            ]
                        },
                        {
                            "category": "Editor",
                            "text": "编辑器",
                            "icons": [
                                { "type": "form", "text": "表单" },
                                { "type": "plus", "text": "加号" },
                                { "type": "minus", "text": "减号" },
                                { "type": "edit", "text": "编辑" },
                                { "type": "delete", "text": "删除" },
                                { "type": "blank-square", "text": "空白正方形" },
                                { "type": "checked-square", "text": "勾选正方形" },
                                { "type": "half-square", "text": "半选正方形" },
                                { "type": "times", "text": "乘号" },
                                { "type": "search", "text": "搜索" },
                                { "type": "filter", "text": "过滤" },
                                { "type": "filter-remove", "text": "移除过滤" },
                                { "type": "sort", "text": "排序" },
                                { "type": "sort-down", "text": "向下排序" },
                                { "type": "sort-up", "text": "向上排序" },
                                { "type": "sort-right", "text": "向右排序" },
                                { "type": "sort-left", "text": "向左排序" }
                            ]
                        },]
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
                                    text: '提交',
                                    onClick: () => {
                                        group.validate()
                                        console.log(group.getValue())
                                    },
                                },
                                {
                                    component: 'Button',
                                    text: '赋值',
                                    onClick: () => {
                                        group.setValue({
                                            ip: 'times',
                                            ip2: 'upload'
                                        })
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
            }
        },
    }
})
