define([], function () {

    return {
        title: '基础用法',
        file: 'basic',
        demo: function () {
            return {
                children:
                {
                    component: 'Textbox',
                    placeholder: 'basic usage',
                    _render: function () {
                        window.TextboxInst = this
                    }
                }
            }
        }
    }

})