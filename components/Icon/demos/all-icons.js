define([], function () {
  return {
    title: '所有图标',
    file: 'all-icons',
    demo: function () {
      const icons = []
      const catMap = new Map()
      Object.keys(nomui.Icon.svgs).forEach(function (key) {
        icons.push(nomui.Icon.svgs[key])
      })

      icons.forEach(function (icon) {
        let cat = catMap.get(icon.cat)
        if (!cat) {
          cat = { cat: icon.cat, icons: [] }
          catMap.set(icon.cat, cat)
        }
        cat.icons.push(icon)
      })

      const catArray = [...catMap.values()]

      return {
        children: {
          component: 'Rows',
          items: catArray,
          itemDefaults: {
            _config: function () {
              const cat = this
              this.setProps({
                children: [
                  {
                    tag: 'h4',
                    styles: {
                      padding: 'y-1',
                    },
                    children: cat.props.cat,
                  },
                  {
                    component: 'List',
                    cols: '6',
                    line: 'grid',
                    _config: function () {
                      this.setProps({
                        items: cat.props.icons,
                        itemDefaults: {
                          _config() {
                            this.setProps({
                              children: [
                                {
                                  component: 'Icon',
                                  type: this.props.type,
                                  styles: {
                                    text: '1d5'
                                  }
                                },
                                {
                                  children: this.props.type,
                                },
                              ],
                              styles: {
                                padding: '1',
                                text: 'center',
                                hover: {
                                  color: 'lprimary',
                                },
                              },
                            })
                          },
                        },
                      })
                    },
                  },
                ],
              })
            },
          },
        },
      }
    },
  }
})
