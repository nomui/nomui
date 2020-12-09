define([], function () {

    return {
        text: '基础用法',
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