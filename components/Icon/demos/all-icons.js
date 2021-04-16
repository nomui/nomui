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
            _config: (catInst) => {
              catInst.setProps({
                children: [
                  {
                    tag: 'h4',
                    styles: {
                      padding: 'y-1',
                    },
                    children: catInst.props.cat,
                  },
                  {
                    component: 'List',
                    cols: '6',
                    line: 'grid',
                    _config: (iconListInst) => {
                      iconListInst.setProps({
                        items: catInst.props.icons,
                        itemDefaults: {
                          _config: (iconInst) => {
                            iconInst.setProps({
                              children: [
                                {
                                  component: 'Icon',
                                  type: iconInst.props.type,
                                  styles: {
                                    text: '1d5',
                                  },
                                },
                                {
                                  children: iconInst.props.type,
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
