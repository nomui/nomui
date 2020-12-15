define(['./Precode.js'], function (Precode) {

    class DemoWidget extends nomui.Widget {
        constructor(props, ...mixins) {
            const defaults = {
                title: 'title',
                description: 'description',
                demo: function () { },
            }

            super(nomui.Component.extendProps(defaults, props), ...mixins)
        }

        _config() {
            this._scoped = true
            var that = this
            var demo = this.props.demo.call(this)
            var code = '        ' + this.props.demo.toString()
            let { title, nav, componentType, cat, file } = this.props
            let url = ''
            if (cat) {
                url = `#/components/demo?type=${componentType}&cat=${cat}&demo=${file}`
            }
            else {
                url = `#/components/demo?type=${componentType}&demo=${file}`
            }
            this.setProps({
                header: {
                    attrs: {
                        style: {
                            background: '#eceff1'
                        }
                    },
                    caption: {
                        title: title
                    },
                    nav: nav
                },
                body: {
                    children: [
                        demo,
                        {
                            component: Precode,
                            _create: function () {
                                that.preCode = this;
                            },
                            lang: 'js',
                            code: code,
                            hidden: true,
                            classes: {
                                'u-attached': true
                            }
                        }
                    ]
                },
                footer: {
                    children: {
                        component: 'Flex',
                        justify: 'between',
                        attrs: {
                            style: {
                                width: '100%'
                            },
                        },
                        items: [
                            '',
                            {
                                children: '显示代码',
                                styles: {
                                    text: ['muted']
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
                            },
                            {
                                tag: 'a',
                                attrs: {
                                    href: url,
                                    target: '_blank'
                                },
                                children: '单独打开'
                            }
                        ]
                    }
                }
            })

            super._config()
        }
    }

    return DemoWidget

})