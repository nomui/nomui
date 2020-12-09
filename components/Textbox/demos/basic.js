define([], function () {

    return {
        text: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                children: [
                    {
                        component: 'Textbox'
                    },
                    {
                        component: 'Textbox',
                        value: 'jerry'
                    }
                ]
            }
        }
    }

})