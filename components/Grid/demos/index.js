define(
    [
        './basic.js',
        './frozen-header.js'
    ],
    function () {
        return {
            title: 'Grid',
            subtitle: '高级表格',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);