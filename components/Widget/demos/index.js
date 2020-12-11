define(
    [
        './basic.js',
    ],
    function () {
        return {
            title: 'Widget',
            subtitle: '部件',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);