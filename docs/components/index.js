define(['/docs/DemoWidget.js'], function (demoWidget) {

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
                            caption: {
                                title: this.props.title,
                                subtitle: this.props.subtitle,
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
                                            _config: function () {
                                                this.props.text = this.props.title
                                            },
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
                                    component: demoWidget,
                                    componentType: this.route.query.type,
                                    cat: this.route.query.cat
                                },
                                styles: {
                                    padding: '1',
                                    margins: 'x'
                                }
                            }
                        }
                    ]
                }
            })
        },
        _create: function () {
            this.renderDemoIndex()
        },
        events: {
            queryChange: function () {
                this.renderDemoIndex()
            }
        },
        methods: {
            renderDemoIndex: function () {
                let { type = 'component', cat } = this.route.query
                var url = `/components/${type}/demos/index.js`
                if (cat) {
                    url = `/components/${type}/demos/${cat}/index.js`
                }

                require([url], (props) => {
                    this.update(props)
                })
            }
        }
    }
})