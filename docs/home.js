define([], function () {
  return {
    children: [
      {
        classes: {
          'docs-main-bg': true,
        },
        children: [
          {
            classes: {
              'docs-main-bg-image': true,
            },
          },
          {
            component: 'Flex',
            classes: {
              'docs-main-bg-inner': true,
            },
            rows: [
              {
                tag: 'h1',
                styles: {
                  margin: 'b-2',
                },
                children: {
                  component: 'Flex',
                  classes: {
                    'docs-main-title': true,
                  },
                  gutter: 'large',
                  cols: [
                    {
                      children: 'No Magic UI',
                    },
                    // {
                    //   classes: {
                    //     'docs-main-title-center': true,
                    //   },
                    //   children: 'Magic',
                    // },
                    // {
                    //   children: 'UI',
                    // },
                  ],
                },
              },
              {
                styles: {
                  margin: 'b-3',
                },
                children: '没有魔法，简单易用的 web 界面框架',
              },
              {
                justify: 'center',
                gutter: 'medium',
                cols: [
                  {
                    component: 'Button',
                    text: '开始使用',
                    href: '#!tutorials/index',
                    styles: {
                      shape: 'round',
                    },
                    type: 'primary',
                    size: 'medium',

                    attrs: {
                      style: {
                        width: '150px',
                      },
                    },
                  },
                  {
                    component: 'Button',
                    text: 'Github',
                    href: 'https://github.com/nomui/nomui',
                    styles: {
                      shape: 'round',
                    },

                    classes: {
                      'btn-bordered': true,
                    },
                    size: 'medium',
                    target: '_blank',

                    attrs: {
                      style: {
                        width: '150px',
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        classes: {
          'docs-nav-bg': true,
        },
      },

      {
        children: {
          component: 'Flex',
          rows: [
            {
              attrs: {
                style: {
                  background: 'var(--nom-color-white)',
                  padding: '6rem 0 10rem 0',
                },
              },
              children: {
                component: 'Container',
                fluid: true,
                children: {
                  component: 'Flex',
                  gap: 'large',
                  cols: [
                    {
                      attrs: {
                        style: {
                          flex: '1 1 50%',
                        },
                      },
                      children: '123123',
                    },
                    {
                      attrs: {
                        style: {
                          flex: '1 1 50%',
                        },
                      },
                      rows: [
                        {
                          tag: 'h2',

                          attrs: {
                            style: {
                              textAlign: 'left',
                              fontSize: '2rem',
                              marginBottom: '1rem',
                            },
                          },
                          children: '化繁为简',
                        },
                        {
                          tag: 'p',
                          attrs: {
                            style: {
                              color: 'var(--nom-color-text-2)',
                              marginBottom: '2rem',
                            },
                          },
                          children:
                            '你是否厌倦了创建一个项目首先需要安装各种模块，阅读复杂的配置说明，通过node.js才可以运行起来？NomUI舍弃了这些繁杂的操作，让你专注于内容的创作。',
                        },
                        {
                          gutter: 'medium',
                          rows: [
                            {
                              title: '没有新概念',
                              content: '没有创建新概念，html，css，javascript 三驾马车足矣。',
                            },
                            {
                              title: '没有构建',
                              content:
                                '不需要构建，不需要 node js，更不需要 webpack，直接引入即可使用。',
                            },
                            {
                              title: '没有魔法',
                              content: '没有看不懂的魔法，一切都是那么自然，即学即用。',
                            },
                          ],
                          itemDefaults: {
                            _config: function () {
                              const { icon, content } = this.props
                              this.setProps({
                                children: {
                                  component: 'List',
                                  items: [
                                    {
                                      component: 'Icon',
                                      type: icon,
                                    },
                                    // {
                                    //   tag: 'strong',

                                    //   children: title,
                                    // },
                                    {
                                      children: content,
                                    },
                                  ],
                                },
                              })
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
            {
              attrs: {
                style: {
                  background: 'var(--nom-color-fill-0)',
                  padding: '6rem 0 10rem 0',
                },
              },
              children: {
                component: 'Container',
                fluid: true,
                children: {
                  component: 'Flex',
                  rows: [
                    {
                      tag: 'h2',
                      classes: {
                        'docs-title': true,
                      },
                      children: 'NomUI有什么?',
                    },
                    {
                      gap: 'large',
                      fit: true,
                      cols: [
                        {
                          icon: 'edit',
                          title: '有组件体系',
                          content: '一切都是组件，整个页面或者页面的某个部分可由一颗组件树组成。',
                        },
                        {
                          icon: 'edit',
                          title: '有样式体系',
                          content:
                            '内置大量常用样式原子类，并以简单的组件配置方式使用，快速构造出漂亮的页面。',
                        },
                        {
                          icon: 'edit',
                          title: '有单页应用',
                          content: '有基于文件夹结构的约定式路由，无需特别配置即可实现单页应用。',
                        },
                      ],
                      itemDefaults: {
                        _config: function () {
                          const { icon, title, content } = this.props
                          this.setProps({
                            classes: {
                              'docs-card': true,
                            },
                            children: [
                              {
                                classes: {
                                  'docs-card-icon': true,
                                },
                                children: {
                                  component: 'Icon',
                                  type: icon,
                                },
                              },
                              {
                                tag: 'h4',
                                attrs: {
                                  style: {
                                    marginBottom: '1rem',
                                  },
                                },
                                children: title,
                              },
                              {
                                attrs: {
                                  style: {
                                    color: 'var(--nom-color-text-2)',
                                  },
                                },
                                children: content,
                              },
                            ],
                          })
                        },
                      },
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    ],
    onRendered: () => {
      document.querySelector('.main-nav').classList.add('float')
    },
  }
})
