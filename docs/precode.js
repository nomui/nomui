define([],

    function () {

        class Precode extends nomui.Component {
            constructor(props){
                const defaults= {
                    code: '',
                    lang: 'html',
                    template: '<pre class="lang-{{this.props.lang}} u-margin-0"><code class="{{this.props.lang}}">{{this.props.code}}</code></pre>'
                }

                super(nomui.Component.extendProps(defaults, props))
            }

            _render () {
                hljs.highlightBlock(this.element.querySelectorAll('code')[0]);
            }
        }

        return Precode;
    }
);