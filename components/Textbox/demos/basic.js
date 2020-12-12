define([], function () {

    return {
        title: '基础用法',
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