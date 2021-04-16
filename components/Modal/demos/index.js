define(
    [
        './basic.js',
        './view.js',
        './long-content.js'
    ],
    function () {
        return {
            title: 'Modal',
            subtitle: '模态框',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);