define(
    [
        './template.js',
        './children.js'
    ],
    function () {
        return {
            title: 'Structure',
            subtitle: '结构',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);