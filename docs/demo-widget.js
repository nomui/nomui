define(['./precode.js'], function (precode) {

    class DemoWidget extends nomui.Component {
        constructor(props, ...mixins) {
            const defaults = {
                title: 'title',
                description: 'description',
                demo: function () { },
                demoUrl: null,
                styles: {
                    border: 'all'
                }
            }

            super(nomui.Component.extendProps(defaults, props), ...mixins)
        }

        _config() {
            this._scoped = true
            var that = this
            var demo = this.props.demo.call(this)
            var code = '        ' + this.props.demo.toString()

            this.setProps({
                children: [
                    {
                        classes: {
                            'nom-demo-widget-header': true
                        },
                        styles: {
                            padding: '1',
                            bg: 'lgray',
                            border: 'bottom'
                        },
                        children: [
                            {
                                tag: 'h5',
                                children: this.props.text,
                                classes: {
                                    'nom-demo-widget-title': true
                                },
                                attrs: {
                                    onclick: () => {
                                        if (this.route.maxLevel === 0) {
                                            return
                                        }
                                        let { type, cat, file } = this.props
                                        if (!file) {
                                            return
                                        }
                                        if (cat) {
                                            window.open(`#/components/demo?type=${type}&cat=${cat}&demo=${file}`)
                                        }
                                        else {
                                            window.open(`#/components/demo?type=${type}&demo=${file}`)
                                        }
                                    }
                                }
                            }
                        ],
                    },
                    nomui.Component.extendProps(demo, {
                        classes: {
                            'nom-demo-widget-source': true
                        },
                        styles: {
                            padding: '1'
                        }
                    }),
                    {
                        component: precode,
                        _create: function () {
                            that.preCode = this;
                        },
                        lang: 'js',
                        code: code,
                        hidden: true
                    },
                    {
                        children: '显示代码',
                        classes: {
                            'nom-demo-widget-actions': true
                        },
                        styles: {
                            padding: '1',
                            border: ['top', 'lt'],
                            text: ['center', 'muted']
                        },
                        attrs: {
                            role: 'button'
                        },
                        expandable: {
                            target: function () {
                                return that.preCode;
                            },
                            byClick: true,
                            collapsedProps: {
                                children: '显示代码'
                            },
                            expandedProps: {
                                children: '隐藏代码'
                            }
                        },
                        collapsed: true
                    }
                ]
            })
        }
    }

    return DemoWidget

})