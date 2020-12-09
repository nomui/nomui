define(
    [
        './basic.js',
        './multiple.js'
    ],
    function () {
        return {
            title: 'Select',
            subtitle: '下拉选择',
            demos: Array.prototype.slice.call(arguments)
        }
    }
)