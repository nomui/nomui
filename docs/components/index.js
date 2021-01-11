define(['/docs/DemoPanel.js'], function (demoPanel) {

  const renderDemoIndex = function () {
    const { type = 'component', cat, tab = 'demo' } = nomapp.currentRoute.query
    let url = `/components/${type}/demos/index.js`
    if (cat) {
      url = `/components/${type}/demos/${cat}/index.js`
    }
    let docUrl = `text!/components/${type}/index.md`

    require([url], (props) => {
      require([docUrl], (docContent) => {
        props.docs = marked(docContent)
        props.tab = tab
        view.update(props)
      }, () => {
        props.docs = '敬请期待'
        view.update(props)
      })
    })
  }

  return {
    component: 'Layout',
    reffn: function (c) {
      view = c
    },
    title: null,
    subtitle: null,
    demos: [],
    docs: '敬请期待',
    tab: 'demo',
    _config: function () {
      this.setProps({
        header: {
          children: [
            {
              component: 'Navbar',
              stretch: true,
              caption: {
                title: this.props.title,
                subtitle: this.props.subtitle,
              },
              nav: {
                component: 'TabList',
                selectedTab: this.props.tab,
                stretch: true,
                uistyle: 'line',
                tabContent: function () {
                  return tabContent
                },
                items: [
                  {
                    key: 'demo',
                    text: '示例'
                  },
                  {
                    key: 'docs',
                    text: '文档'
                  }
                ]
              }
            },
          ],
        },
        body: {
          children: {
            component: 'TabContent',
            ref: 'tabContent',
            reffn: function (c) {
              tabContent = c
            },
            selectedPanel: this.props.tab,
            attrs: {
              id: 'DemoContent',
            },
            panels: [
              {
                key: 'demo',
                children: {
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
                              text: 'primary',
                            },
                          },
                        },
                      },
                    ],
                  },
                  body: {
                    children: Array.prototype.slice.call(this.props.demos),
                    childDefaults: {
                      component: demoPanel,
                      componentType: this.$route.query.type,
                      cat: this.$route.query.cat,
                    },
                    styles: {
                      padding: '1',
                      margins: 'x',
                    },
                  },
                }
              },
              {
                key: 'docs',
                attrs: {
                  id: 'nice'
                },
                children: this.props.docs
              }
            ]
          },
        },
      })
    },
    _created: function () {
      renderDemoIndex()
    },
    _rendered: function () {
      this.on('queryChange', () => {
        renderDemoIndex()
      })
    }
  }
})
