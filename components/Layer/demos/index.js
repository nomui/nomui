define(
    [
        './basic.js',
        './align-inner.js',
        './align-outer.js',
        './offset.js',
        './backdrop.js',
    ],
    function () {
        return {
            title: 'Layer',
            subtitle: '层',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);