define([],

    function () {

        class Precode extends nomui.Component {
            constructor(props){
                const defaults= {
                    code: '',
                    lang: 'html',
                    template: '<pre class="lang-{{this.props.lang}}"><code class="{{this.props.lang}}">{{this.props.code}}</code></pre>'
                }

                super(nomui.Component.extendProps(defaults, props))
            }

            _render () {
                hljs.highlightBlock(this.element.querySelectorAll('code')[0]);
                //Prism.highlightElement(this.element.querySelectorAll('code')[0]);
            }
        }

        return Precode;
    }
);