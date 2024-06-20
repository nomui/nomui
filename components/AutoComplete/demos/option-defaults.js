define([], function () {
    return {
        title: '自定义选项props',
        file: 'option-defaults',
        demo: function () {
            return {
                component: 'AutoComplete',
                value: 'a',
                optionFields: { value: 'name' },
                optionDefaults: {
                    onConfig: ({ inst }) => {
                        inst.setProps({
                            children: {
                                component: 'Flex',
                                align: 'center',
                                cols: [
                                    {
                                        component: 'Avatar',
                                        size: 'small',
                                        text: inst.props.value
                                    },
                                    {
                                        component: 'StaticText',
                                        value: inst.props.value
                                    }
                                ]
                            }
                        })
                    }
                },
                options: [
                    { name: 'a' },
                    { name: 'aa' },
                    { name: 'ab' },
                    { name: 'aba' },
                    { name: 'ac' },
                    { name: 'aad' },
                    { name: 'aef' },
                    { name: 'ag' },
                    { name: 'ai' },
                    { name: 'bo' },
                    { name: 'ffc' },
                ],
            }
        },
    }
})
