'use strict';

(function (win) {
    requirejs.config({
        baseUrl: "/",
        paths: {
            'text': 'libs/text'
        }
    });

    require([], function () {
        win.nomapp = new nomui.App({
            viewsDir: '/docs'
        });
        const renderer = new marked.Renderer();
        marked.setOptions({
            renderer: renderer,
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: false,
            smartLists: true,
            smartypants: false,
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
    });

})(window);