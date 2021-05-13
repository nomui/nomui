define(['/docs/DemoPanel.js'], function (demoPanel) {
  return function () {
    let tabContent = null
    let bodyRef = null

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
                      sider: {
                        children: [
                          {
                            component: 'Menu',
                            name: 'DemoMenu',
                            items: this.props.demos,
                            itemDefaults: {
                              _config: function () {
                                this.props.text = this.props.title
                                this.setProps({
                                  attrs: {
                                    'data-target-key': this.props.file,
                                  },
                                })
                              },
                              styles: {
                                hover: {
                                  text: 'primary',
                                },
                              },
                              onClick: ({ event }) => {
                                const targetFile = event.currentTarget.dataset.targetKey
                                const targetDemo = bodyRef.element.querySelector(
                                  `[data-target-demo='${targetFile}']`,
                                )
                                targetDemo.scrollIntoView(true)
                              },
                            },
                          },
                        ],
                      },
                      body: {
                        children: Array.prototype.slice.call(this.props.demos),
                        ref: (c) => {
                          bodyRef = c
                        },
                        childDefaults: {
                          _config: function () {
                            this.setProps({
                              attrs: {
                                'data-target-demo': this.props.file,
                              },
                            })
                          },
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
