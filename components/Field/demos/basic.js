define([], function () {
    return {
        text: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Field',
                        label: '标签',
                        control: {
                            component: 'Textbox'
                        }
                    }
                ]
            };
        }
    };
});