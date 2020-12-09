define(['/docs/demo-widget.js'], function (demoWidget) {

    return {
        component: demoWidget,
        autoRender: false,
        _create: function () {

            let { type, cat, demo } = this.route.query
            let url = `/components/${type}/demos/${demo}.js`
            if (cat) {
                url = `/components/${type}/demos/${cat}/${demo}.js`
            }

            require([url], (props) => {
                this.update(props);
            })
        },
    }
})