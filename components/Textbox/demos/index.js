define(
    [
        './basic.js',
        './with-icon.js',
    ],
    function () {
        return {
            title: 'Textbox',
            subtitle: '文本框',
            demos: Array.prototype.slice.call(arguments)
        }
    }
)