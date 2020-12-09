define(
    [
        './basic.js'
    ],
    function () {
        return {
            title: 'Numberbox',
            subtitle: '数字框',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);