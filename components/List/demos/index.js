define(
    [
        './basic.js',
        './integration.js',
        './scroll-to.js',
    ],
    function () {
        return {
            title: 'List',
            subtitle: '列表',
            demos: Array.prototype.slice.call(arguments)
        }
    }
)