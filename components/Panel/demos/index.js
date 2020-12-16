define(
    [
        './basic.js',
    ],
    function () {
        return {
            title: 'Panel',
            subtitle: '部件',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);