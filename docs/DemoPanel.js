define(['./precode.js'], function (Precode) {
  class DemoPanel extends nomui.Panel {
    constructor(props, ...mixins) {
      const defaults = {
        title: 'title',
        description: null,
        uistyle: 'card',
        demo: function () { },
      }

      super(nomui.Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
      this._scoped = true
      const that = this
      const demo = this.props.demo.call(this)
      const code = `    ${this.props.demo.toString()}`
      const { title, description, nav, componentType, cat, file } = this.props
      let url = ''
      if (cat) {
        url = `#/components/demo?type=${componentType}&cat=${cat}&demo=${file}`
      } else {
        url = `#/components/demo?type=${componentType}&demo=${file}`
      }
      this.setProps({
        header: {
          caption: {
            title: title,
          },
          nav: nav,
        },
        body: {
          children: [
            demo,

          ],
        },
        endAddons: [
          description && {
            styles: {
              padding: '1',
              border: ['top', 'lt'],
            },
            children: `#${marked(description)}`,
          },
          {
            component: Precode,
            _created: function () {
              that.preCode = this
            },
            lang: 'js',
            code: code,
            hidden: true,
          },
        ],
        footer: {
          children: [
            {
              component: 'Cols',
              justify: 'between',
              attrs: {
                style: {
                  width: '100%',
                },
              },
              items: [
                '',
                {
                  children: '显示代码',
                  styles: {
                    text: ['muted'],
                  },
                  attrs: {
                    role: 'button',
                  },
                  expandable: {
                    target: function () {
                      return that.preCode
                    },
                    byClick: true,
                    collapsedProps: {
                      children: '显示代码',
                    },
                    expandedProps: {
                      children: '隐藏代码',
                    },
                  },
                  collapsed: true,
                },
                {
                  tag: 'a',
                  attrs: {
                    href: url,
                    target: '_blank',
                  },
                  children: '单独打开',
                },
              ],
            },
          ],
        },
      })

      super._config()
    }
  }

  return DemoPanel
})
