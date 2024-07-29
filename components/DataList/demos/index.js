define([
    './basic.js',
    './vertical.js',
    './wrap.js',
    './align-justify-fills',
    './gap.js',
    './crud.js',
    './item-selectable',
], function () {
    return {
        title: 'DataList',
        subtitle: '数据列表',
        demos: Array.prototype.slice.call(arguments),
    }
})
