define(
    [
        './basic.js',
        './gap.js',
        './gutter.js'
    ],
    function () {
        return {
            title: 'Layout',
            subtitle: '布局',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);