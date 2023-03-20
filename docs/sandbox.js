/* eslint-disable no-undef */
define(['docs/helper.js'], function ({ SANDBOX_LIMIT, debounce }) {
  class Sandbox extends nomui.Component {
    constructor(props) {
      const defaults = {
        beautify: ace.require('ace/ext/beautify'),
        theme: ace.require('ace/theme/monokai'),
        Mode: ace.require('ace/mode/javascript').Mode,
      }

      super(nomui.Component.extendProps(defaults, props))
    }

    goRun() {
      // 更改
      const code = `(${this.editor.getValue()})`
      try {
        const demo = this.compartment.evaluate(code)
        this.viewer.update({ children: [demo.call(this)] })
      } catch (err) {
        // error goes here
        console.log('error', err)
      }
    }

    initEditor(code) {
      const { Mode, theme } = this.props
      const that = this

      const editor = ace.edit('editor', {
        mode: new Mode(),
        theme,
      })
      this.editor = editor

      this.handleValue(code)
      setTimeout(() => {
        this.viewer.update({ children: [this.props.demo.call(this)] })
      })

      editor.setOptions({
        enableBasicAutocompletion: true,
        enableSnippets: true,
        enableLiveAutocompletion: true,
      })
      editor.getSession().setUseWorker(false)
      editor.getSession().on('change', debounce(this.goRun.bind(that), 3000))
    }

    _created() {
      this.compartment = new Compartment({
        nomui,
        console: { ...console },
        setTimeout: window.setTimeout.bind(window),
        alert: window.alert.bind(window),
      })
      this.initalValue = `    ${this.props.demo.toString()}`
      ace.config.set('basePath', 'libs/ace')
      ace.require('ace/ext/language_tools')
    }

    reset() {
      this.handleValue(this.initalValue)
    }

    handleValue(value) {
      const { beautify } = this.props
      if (this.editor) {
        this.editor.setValue(value)
        beautify.beautify(this.editor.getSession())
      }
    }

    _config() {
      const that = this
      this.setProps({
        styles: {
          height: 'full',
        },
        children: [
          {
            attrs: {
              id: 'editor',
              style: { float: 'left' },
            },
            styles: {
              width: '1-2',
              height: 'full',
            },
            onRendered: () => {
              that.initEditor(this.initalValue)
            },
          },
          {
            tag: 'iframe',
            onCreated: ({ inst }) => {
              that.viewer = inst
            },
            styles: {
              width: '1-2',
              height: 'full',
            },
            attrs: {
              id: 'sandbox',
              Sandbox: SANDBOX_LIMIT,
              style: {
                width: '100%',
                height: '100%',
                border: 'none',
                float: 'right',
                padding: '0 1rem',
              },
            },
            onRendered({ inst }) {
              if (that.firstRender) {
                const frame_doc = inst.element.contentWindow.document
                that.frameBody = frame_doc.body
                const css = document.createElement('link')
                css.rel = 'stylesheet'
                css.href = 'dist/nomui.css'
                css.type = 'text/css'
                frame_doc.head.appendChild(css)
              }

              const child = inst.element.children.item(0)
              const oldChildren = that.frameBody.childNodes
              if (oldChildren && oldChildren.length > 0) {
                for (let i = 0; i < oldChildren.length; i++) {
                  that.frameBody.removeChild(oldChildren[i])
                }
              }
              child && that.frameBody.appendChild(child)
            },
          },
        ],
      })
    }
  }

  return Sandbox
})
