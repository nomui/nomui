define(['./precode.js', './sandbox.js'], function (Precode, Sandbox) {
  class DemoPanel extends nomui.Panel {
    constructor(props, ...mixins) {
      const defaults = {
        title: 'title',
        description: null,
        uistyle: 'plain',
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
            title: {
              component: 'Flex',
              align: 'center',
              gap: 'small',
              cols: [
                {
                  attrs: {
                    style: {
                      background: 'var(--nom-color-primary)',
                      width: '5px',
                      height: '1rem',
                    }
                  },
                },
                {
                  styles: {
                    text: 'h5',
                  },

                  children: title
                }
              ]
            },
          },
          nav: nav,
        },
        body: {
          children: {
            component: 'Panel',
            header: false,
            body: {
              children: [demo],
            },
            attrs: {
              style: {
                marginBottom: '3rem'
              }
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
              attrs: {
                style: {
                  background: '#f8f8f8'
                }
              },
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
                      component: 'Flex',
                      gap: 'small',
                      cols: [
                        {
                          tag: 'a',
                          attrs: {
                            href: url,
                            target: '_blank',
                          },
                          children: '单独打开',
                        },
                        {
                          component: 'Icon',
                          type: 'sandbox',
                          tooltip: '在线编辑',
                          attrs: {
                            style: { cursor: 'pointer' },
                          },
                          onClick: () => {
                            new nomui.Drawer({
                              width: '100%',
                              height: '100%',
                              title: {
                                component: 'Flex',
                                attrs: {
                                  style: {
                                    margin: '0 100px',
                                  },
                                },
                                justify: 'between',
                                cols: [
                                  {
                                    tag: 'h3',
                                    children: title,
                                  },
                                  {
                                    component: 'Button',
                                    text: '重置',
                                    type: 'primary',
                                    onClick: () => {
                                      that.sandboxRef.reset()
                                    },
                                  },
                                ],
                              },
                              footer: null,
                              content: {
                                component: Sandbox,
                                onCreated: ({ inst }) => {
                                  that.sandboxRef = inst
                                },
                                demo: that.props.demo,
                              },
                            })
                          },
                        },
                      ],
                    },
                    // {
                    //   tag: 'a',
                    //   attrs: {
                    //     href: url,
                    //     target: '_blank',
                    //   },
                    //   children: '单独打开',
                    // },
                  ],
                },
              ],
            },
          }
        }
      })

      super._config()
    }
  }

  return DemoPanel
})
