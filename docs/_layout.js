define(['/docs/helper.js'], function ({ DOC_URL_KEY, GLOBAL_SEARCH_INTERVAL, debounce, polling }) {
  return function () {
    let topMenu = null
    let globalSearchRef = null
    let searchListRef = null

    let searchData = []
    let searchLoading = null

    const highLight = () => {
      topMenu && topMenu.selectItem(this.getSubpath())
      topMenu && topMenu.expandToItem(this.getSubpath())
    }

    const handleValueChange = (value) => {
      // 搜索逻辑
      const ret = searchData.filter(({ search }) => {
        const regex = new RegExp(value, 'i')
        return search.match(regex)
      })

      if (ret && ret.length !== 0) {
        searchListRef.update({
          hidden: false,
          rows: ret.map(({ key, text, url }) => ({
            component: 'Flex',
            styles: {
              align: 'center',
            },
            cols: [
              {
                children: key,
                span: 5,
                attrs: {
                  style: { width: '40px', borderRight: '1px solid #CFDCE5', paddingRight: '5px' },
                },
              },
              {
                tag: 'a',
                span: 7,
                attrs: {
                  href: url,
                  style: {
                    paddingLeft: '0.5rem',
                    textDecoration: 'none',
                  },
                },
                children: text,
              },
            ],
          })),
        })
      } else {
        searchListRef.update({ rows: [], hidden: true })
      }
    }

    // 如果数据准备好了，就去除遮罩
    const getSearchData = () => {
      if (localStorage.getItem(DOC_URL_KEY) && searchLoading && searchLoading.remove) {
        searchLoading.remove()
        searchData = JSON.parse(localStorage.getItem(DOC_URL_KEY))
        return true
      }
      return false
    }

    return {
      view: {
        component: 'Layout',
        header: {
          styles: {
            color: 'primary',
          },
          children: {
            component: 'Navbar',
            caption: {
              title: 'NomUI',
              href: '/',
            },
            nav: {
              component: 'Menu',
              ref: (c) => {
                topMenu = c
              },
              styles: {
                padding: 'l-2',
              },
              items: [
                {
                  text: '教程',
                  id: 'tutorials/index',
                  url: '#!tutorials/index',
                },
                {
                  text: '组件',
                  id: 'components',
                  url: '#!components!',
                },
                {
                  text: '文档',
                  id: 'documents/index',
                  url: '#!documents/index',
                },
              ],
              direction: 'horizontal',
              itemDefaults: {
                key: function () {
                  return this.props.id
                },
                styles: {
                  hover: {
                    color: 'lighten',
                  },
                  selected: {
                    color: 'lighten',
                  },
                },
              },
            },
            tools: [
              {
                component: 'Flex',
                attrs: {
                  style: { width: '400px', position: 'relative' },
                },
                rows: [
                  {
                    component: 'Textbox',
                    onCreated: ({ inst }) => {
                      globalSearchRef = inst
                    },
                    onRendered() {
                      searchLoading = new nomui.Loading({
                        container: globalSearchRef,
                      })
                      polling(getSearchData, 300)
                    },
                    id: 'globalSearchBar',
                    name: 'globalSearchBar',
                    placeholder: '搜索组件',
                    leftIcon: 'search',
                    onValueChange: debounce(
                      ({ newValue }) => handleValueChange(newValue),
                      GLOBAL_SEARCH_INTERVAL,
                    ),
                    onBlur: () => {
                      searchListRef &&
                        setTimeout(() => {
                          searchListRef.hide()
                        }, 300)
                    },
                  },
                  {
                    component: 'Flex',
                    onCreated: ({ inst }) => {
                      searchListRef = inst
                    },
                    attrs: {
                      style: {
                        width: '100%',
                        color: 'black',
                        position: 'absolute',
                        marginLeft: '0.5rem',
                        backgroundColor: '#DBE8F2',
                        padding: '1rem',
                        borderRadius: '1rem',
                        boxShadow:
                          '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d',
                      },
                    },
                    hidden: true,
                  },
                ],
              },
              {
                component: 'Button',
                icon: 'github',
                href: 'https://github.com/nomui/nomui',
                target: '_blank',
                type: 'text',
              },
            ],
          },
        },
        body: {
          children: {
            component: 'Router',
            defaultPath: 'home',
          },
        },
      },
      _rendered: function () {
        highLight()
      },
      onSubpathChange: () => {
        highLight()
      },
    }
  }
})
