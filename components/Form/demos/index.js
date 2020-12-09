define(
    [
        './basic.js',
        './value.js',
        './validation.js'
    ],
    function () {
        return {
            title: 'Form',
            subtitle: '表单',
            demos: Array.prototype.slice.call(arguments)
        }
    }
)