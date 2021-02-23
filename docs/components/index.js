define(['/docs/DemoPanel.js'], function (demoPanel) {
  return function () {
    let tabContent = null

    const renderDemoIndex = () => {
      const { type = 'component', cat, tab = 'demo' } = this.$route.query
      let url = `/components/${type}/demos/index.js`
      if (cat) {
        url = `/components/${type}/demos/${cat}/index.js`
      }
      const docUrl = `text!/components/${type}/index.md`

      require([url], (props) => {
        require([docUrl], (docContent) => {
          props.docs = marked(docContent)
          props.tab = tab
          this.currentView.update(props)
        }, () => {
          props.docs = '敬请期待'
          this.currentView.props.demos = []
          this.currentView.update(props)
        })
      })
    }

    return {
      view: {
        component: 'Layout',
        title: null,
        subtitle: null,
        demos: [],
        docs: '敬请期待',
        tab: 'demo',
        autoRender: false,
        _config: function () {
          this.setProps({
            header: {
              children: [
                {
                  component: 'Navbar',
                  fit: true,
                  caption: {
                    title: this.props.title,
                    subtitle: this.props.subtitle,
                  },
                  nav: {
                    component: 'TabList',
                    selectedTab: this.props.tab,
                    fit: true,
                    uistyle: 'line',
                    tabContent: function () {
                      return tabContent
                    },
                    items: [
                      {
                        key: 'demo',
                        text: '示例',
                      },
                      {
                        key: 'docs',
                        text: '文档',
                      },
                    ],
                  },
                },
              ],
            },
            body: {
              children: {
                component: 'TabContent',
                ref: (c) => {
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
                    },
                  },
                  {
                    key: 'docs',
                    attrs: {
                      id: 'nice',
                    },
                    children: `#${this.props.docs}`,
                  },
                ],
              },
            },
          })
        },
      },
      _rendered: () => {
        if (this.firstRender) {
          renderDemoIndex()
        }
      },
      onQueryChange: () => {
        renderDemoIndex()
      },
    }
  }
})
