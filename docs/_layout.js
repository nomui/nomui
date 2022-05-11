define(['/docs/helper.js', 'css!/docs/style.css'], function ({
  DOC_URL_KEY,
  GLOBAL_SEARCH_INTERVAL,
  debounce,
  polling,
  formatSearchText,
}) {
  return function () {
    let topMenu = null
    let globalSearchRef = null
    let searchListRef = null
    let mainHeader = null
    let searchbar = null
    let searchData = []
    let searchLoading = null

    const highLight = () => {
      topMenu && topMenu.selectItem(this.getSubpath())
      topMenu && topMenu.expandToItem(this.getSubpath())
    }

    const handleValueChange = (value) => {
      // 搜索逻辑
      const regex = new RegExp(value, 'ig')
      const ret = searchData.filter(({ search }) => {
        return regex.test(search)
      })

      if (ret && ret.length !== 0) {
        searchListRef.update({
          hidden: false,
          rows: ret.map(({ key, text, url }) => ({
            tag: 'a',
            attrs: {
              href: url,
              style: {
                textDecoration: 'none',
              },
            },
            children: {
              component: 'Flex',
              classes: {
                'nom-preset-hover': true,
                'nom-preset-pointer': true,
              },
              styles: {
                align: 'center',
                'padding-y': 1,
              },
              cols: [
                {
                  children: key ? `#${key.replace(regex, formatSearchText)}` : '',
                  span: 6,
                  styles: {
                    'padding-x': 1,
                    border: 'right',
                  },
                },
                {
                  tag: 'span',
                  span: 6,
                  styles: {
                    'padding-l': 1,
                  },
                  children: text ? `#${text.replace(regex, formatSearchText)}` : '',
                },
              ],
              onClick: () => {
                globalSearchRef.setValue(key, false)
              },
            },
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

    const setSearchbar = () => {
      if (window.nomapp.currentRoute.path.includes('!components')) {
        searchbar.show()
      } else {
        searchbar.hide()
      }
    }

    return {
      view: {
        component: 'Layout',
        header: {
          attrs: {
            style: {
              background: 'var(--nom-color-primary)',
              color: 'var(--nom-color-white)',
            },
          },
          classes: {
            'main-nav': true,
          },

          ref: (c) => {
            mainHeader = c
          },

          children: {
            component: 'Navbar',

            caption: {
              title: 'NomUI',
              href: '/',
              attrs: {
                style: {
                  color: 'var(--nom-color-white)',
                },
              },
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
                styles: {
                  'width-block': 'sm',
                },
                attrs: {
                  style: { position: 'relative' },
                },
                ref: (c) => {
                  searchbar = c
                },
                hidden: true,
                classes: {
                  'docs-searchbar': true,
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
                    onClick: ({ sender }) => {
                      sender.getValue() && sender.setValue(null, false)
                    },
                  },
                  {
                    component: 'Flex',
                    onCreated: ({ inst }) => {
                      searchListRef = inst
                    },
                    classes: {
                      'nom-preset-layer': true,
                    },
                    styles: {
                      width: 'full',
                      text: 'gray',
                      padding: 1,
                    },
                    attrs: {
                      style: {
                        zIndex: 1000,
                        position: 'absolute',
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
                attrs: {
                  style: {
                    color: '#fff',
                  },
                },
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
        setSearchbar()
        highLight()
      },
      onSubpathChange: () => {
        setSearchbar()
        highLight()
      },
      onHashChange: () => {
        mainHeader.update({
          classes: {
            float: false,
          },
        })
      },
    }
  }
})
