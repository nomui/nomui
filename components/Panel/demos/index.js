define(
    [
        './basic.js',
        './uistyle.js',
        './fit.js',
    ],
    function () {
        return {
            title: 'Panel',
            subtitle: '面板',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);