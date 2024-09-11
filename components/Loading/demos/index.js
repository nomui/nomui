define(
    [
        './basic.js',
        './container.js',
        './events.js'
    ],
    function () {
        return {
            title: 'Loading',
            subtitle: '加载框',
            demos: Array.prototype.slice.call(arguments)
        }
    }
)