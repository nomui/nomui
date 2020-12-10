define(
    [
        './basic.js',
        './value.js',
        './validation.js'
    ],
    function () {
        return {
            title: 'Flex',
            subtitle: '弹性布局',
            demos: Array.prototype.slice.call(arguments)
        }
    }
)