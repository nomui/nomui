define(
    [
        './basic.js'
    ],
    function () {
        return {
            title: 'Message',
            subtitle: '消息',
            demos: Array.prototype.slice.call(arguments)
        }
    }
);