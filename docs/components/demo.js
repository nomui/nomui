define(['/docs/demo-widget.js'], function (demoWidget) {

    return {
        component: 'Layout',
        title: null,
        subtitle: null,
        demos: [],
        _config: function () {
            this.setProps({
                header: {
                    children: [
                        {
                            component: 'Navbar',
                            title: {
                                heading: { text: this.props.title },
                                subheading: { text: this.props.subtitle }
                            }
                        }
                    ]
                },
                body: {
                    children: [
                        {
                            component: 'Layout',
                            sider: {
                                children: [
                                    {
                                        component: 'Menu',
                                        name: 'DemoMenu',
                                        items: this.props.demos,
                                        itemDefaults: {
                                            styles: {
                                                hover: {
                                                    text: 'primary'
                                                }
                                            }
                                        }
                                    }
                                ]
                            },
                            body: {
                                children: Array.prototype.slice.call(this.props.demos),
                                childDefaults: {
                                    component: demoWidget
                                },
                                styles: {
                                    padding: '1',
                                    margins: 'x'
                                }
                            }
                        }
                    ]
                }
            });
        },
        _create: function () {
            if (this.updating) return;
            var that = this;

            this.demoType = this.route.query.type || 'component';
            var cat = this.route.query.cat;
            var url = '/components/' + this.demoType + '/demos/index.js';
            if (cat) {
                url = '/components/' + this.demoType + '/demos/' + cat + '/index.js';
            }

            return new Promise(function (resolve, reject) {
                require([url], function (props) {
                    that.update(props);
                });
            });
        },
        events: {
            queryChange: function () {
                var that = this;

                this.demoType = this.route.query.type || 'component';
                var cat = this.route.query.cat;
                var url = '/components/' + this.demoType + '/demos/index.js';
                if (cat) {
                    url = '/components/' + this.demoType + '/demos/' + cat + '/index.js';
                }

                return new Promise(function (resolve, reject) {
                    require([url], function (props) {
                        that.update(props);
                    });
                });
            }
        }
    };
});