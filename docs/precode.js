define([],

    function () {

        class Precode extends nomui.Component {
            constructor(props) {
                const defaults = {
                    code: '',
                    lang: 'html',
                }

                super(nomui.Component.extendProps(defaults, props))
            }

            _config() {
                let { lang, code } = this.props
                let preClasses = {}
                preClasses[`lang-${lang}`] = true

                let codeClasses = {}
                codeClasses[lang] = true

                this.setProps({
                    children: {
                        tag: 'pre',
                        classes: preClasses,
                        styles: {
                            margin: '0'
                        },
                        children: {
                            tag: 'code',
                            classes: codeClasses,
                            children: code
                        }
                    }
                })
            }

            _render() {
                hljs.highlightBlock(this.element.querySelectorAll('code')[0]);
            }
        }

        return Precode;
    }
);