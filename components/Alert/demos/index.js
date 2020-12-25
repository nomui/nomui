define(
    [
        './basic.js',
        './type.js',
    ],
    function () {
        return {
            title: 'Alert',
            subtitle: '警告框',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);