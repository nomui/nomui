define(
    [
        './basic.js'
    ],
    function () {
        return {
            title: 'Pager',
            subtitle: '分页',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);