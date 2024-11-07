define([], function () {
    return {
        title: '自定义下拉框图标渲染',
        file: 'item-render',
        demo: function () {
            return {
                component: 'Form',
                fields: [
                    {
                        component: 'IconPicker',
                        name: 'ip',
                        label: '图标选择器',
                        popupWidth: 380,
                        itemRender: (type) => {
                            return {
                                component: 'Icon',
                                type: type,
                                attrs: {
                                    style: {
                                        fontSize: '1.5rem',
                                        padding: '1rem 1.25rem',
                                        color: '#555'
                                    }
                                },
                            }
                        }
                    },

                ],
            }
        },
    }
})
