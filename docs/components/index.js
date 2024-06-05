define(['docs/DemoPanel.js'], function (demoPanel) {
  return function () {
    let tabContent = null
    let bodyRef = null

    const renderDemoIndex = () => {
      const { type = 'Component', cat, tab = 'demo' } = this.$route.query
      let url = `components/${type}/demos/index.js`
      if (cat) {
        url = `components/${type}/demos/${cat}/index.js`
      }
      const docUrl = `text!components/${type}/index.md`

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
          const path = `#${this.$app.currentRoute.path}?`
          const query = this.$app.currentRoute.query

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
                    onTabSelectionChange: (e) => {
                      const tab = e.sender.getSelectedItem().key
                      window.location.href = `${path}${nomui.utils.parseToQueryString({
                        ...query,
                        tab: tab,
                      })}`
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
                      body: {
                        ref: (c) => {
                          bodyRef = c
                        },
                        children: {
                          children: Array.prototype.slice.call(this.props.demos),

                          childDefaults: {
                            component: 'AnchorContent',
                            keyField: 'file',
                            children: {
                              component: demoPanel,
                              _created: function () {
                                this.props = { ...this.props, ...this.parent.props }
                              },
                              componentType: this.$route.query.type,
                              cat: this.$route.query.cat,
                            },
                          },
                          styles: {
                            padding: '2',
                            margins: 'x',
                          },
                        },
                      },
                      asider: {
                        children: {
                          component: 'Anchor',
                          name: 'DemoMenu',
                          border: false,
                          items: this.props.demos,
                          keyField: 'file',
                          itemDefaults: {

                            _created: function () {
                              this.props.text = this.props.title
                            },
                          },
                          container: () => {
                            return bodyRef
                          },
                        },
                      },
                    },
                  },
                  {
                    key: 'docs',
                    attrs: {
                      id: 'nice',
                    },
                    classes: {
                      'markdown-article': true,
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
