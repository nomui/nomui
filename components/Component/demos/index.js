define(
    [
        './template.js',
        './children.js',
        './auto-render-false.js'
    ],
    function () {
        return {
            title: 'Structure',
            subtitle: '结构',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);