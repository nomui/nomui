define(
    [
        './basic.js',
        './nest.js',
        './get-field.js',
        './value.js',
        './validate.js',
        './nowrap.js',
        './inline.js',
        './span.js',
        './striped.js',
        './splitline.js',
        './outline.js',
        './styles.js',
    ],
    function () {

        return {
            title: 'Group',
            subtitle: '字段组',
            demos: Array.prototype.slice.call(arguments),
        }

    })
