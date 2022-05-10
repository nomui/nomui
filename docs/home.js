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
        component: 'Container',
        fluid: true,
        children: {
          component: 'List',
          cols: 3,
          items: [
            {
              title: '没有新概念',
              content: '没有创建新概念，html，css，javascript 三驾马车足矣。',
            },
            {
              title: '没有构建',
              content: '不需要构建，不需要 node js，更不需要 webpack，直接引入即可使用。',
            },
            {
              title: '没有魔法',
              content: '没有看不懂的魔法，一切都是那么自然，即学即用。',
            },
            {
              title: '有组件体系',
              content: '一切都是组件，整个页面或者页面的某个部分可由一颗组件树组成。',
            },
            {
              title: '有样式体系',
              content: '内置大量常用样式原子类，并以简单的组件配置方式使用，快速构造出漂亮的页面。',
            },
            {
              title: '有单页应用',
              content: '有基于文件夹结构的约定式路由，无需特别配置即可实现单页应用。',
            },
          ],
          itemDefaults: {
            _config: function () {
              const { icon, title, content } = this.props
              this.setProps({
                children: [
                  {
                    component: 'Icon',
                    type: icon,
                  },
                  {
                    tag: 'h4',
                    styles: {
                      margin: 'b-d5',
                    },
                    children: title,
                  },
                  {
                    children: content,
                  },
                ],
              })
            },
            styles: {
              padding: '1',
              text: 'center',
            },
          },
        },
      },
    ],
    onRendered: () => {
      document.querySelector('.main-nav').classList.add('float')
    },
  }
})
