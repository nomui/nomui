define(
    [
        './click-trigger.js',
        './mixin.js'
    ],
    function () {
        return {
            title: 'Popup',
            subtitle: '弹出层',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);