define(
    [
        './basic.js',
        './nest.js',
        './get-field.js',
        './validate.js',
        './inline.js',
    ],
    function () {

        return {
            title: 'Group',
            subtitle: '字段组',
            demos: Array.prototype.slice.call(arguments),
        }

    })
