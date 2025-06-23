define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      let containerRef = null,
        groupRef = null,
        anchorRef = null

      const checkFormGroupStatus = (target, anchor) => {
        if (!target || !target.props || !Array.isArray(target.fields)) return

        for (const field of target.fields) {
          if (
            !field ||
            typeof field.getValue !== 'function' ||
            typeof field.validate !== 'function'
          )
            continue
          const key =
            field.element && field.element.getAttribute && field.element.getAttribute('anchor-key')
          if (!key) continue

          const value = field.getValue()
          const isFilled =
            value != null &&
            (typeof value !== 'object' || Object.values(value).every((v) => v != null && v !== ''))
          const isValid = field.validate()

          const item =
            anchor && anchor.menu && typeof anchor.menu.getItem === 'function'
              ? anchor.menu.getItem(key)
              : null
          const statusRef = item && item.statusRef

          if (
            statusRef &&
            typeof statusRef.show === 'function' &&
            typeof statusRef.hide === 'function'
          ) {
            if (isFilled && isValid) {
              statusRef.show()
            } else {
              statusRef.hide()
            }
          }
        }
      }

      return {
        component: 'Layout',
        attrs: {
          style: {
            height: '400px',
          },
        },
        header: {
          children: '群组',
        },
        body: {
          ref: (c) => {
            containerRef = c
          },
          children: {
            component: 'Flex',
            gap: 'small',
            // align: 'start',
            cols: [
              {
                component: 'Anchor',
                sticky: () => {
                  return containerRef
                },
                container: () => {
                  return containerRef
                },
                ref: (c) => {
                  anchorRef = c
                },
                activeKey: 'div1', // 默认高亮的key
                onChange: (args) => {
                  // 高亮内容发生变化时回调
                  // eslint-disable-next-line
                  console.log(`当前高亮的是${args.key}`) // 获取当前高亮的项目
                },
                itemDefaults: {
                  _config: function () {
                    this.setProps({
                      tools: {
                        component: 'Icon',
                        type: 'check',
                        styles: {
                          text: 'green',
                        },
                        ref: (c) => {
                          this.statusRef = c
                        },
                        hidden: true,
                      },
                    })
                  },
                },
                items: [
                  { text: '群组1', key: 'div1', approved: true },
                  {
                    text: '群组2',
                    key: 'div2',
                  },
                  { text: '群组3', key: 'div3' },
                  { text: '群组4', key: 'div4' },
                ],
              },
              {
                component: 'Group',
                ref: (c) => {
                  groupRef = c
                },
                onValueChange: () => {
                  checkFormGroupStatus(groupRef, anchorRef)
                },
                onRendered: () => {
                  checkFormGroupStatus(groupRef, anchorRef)
                },
                value: {
                  group1: { textbox1: '1', textbox2: '2' },
                },
                fields: [
                  {
                    component: 'Group',
                    label: '群组1',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div1', // 设置群组key
                    },
                    name: 'group1',
                    fields: [
                      {
                        name: 'textbox1',
                        component: 'Textbox',
                      },
                      {
                        name: 'textbox2',
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                  {
                    component: 'Group',
                    label: '群组2',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div2', // 设置群组key
                    },
                    name: 'group2',
                    fields: [
                      {
                        name: 'textbox3',
                        component: 'Textbox',
                      },
                      {
                        name: 'textbox4',
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                  {
                    component: 'Group',
                    label: '群组3',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div3', // 设置群组key
                    },
                    name: 'group3',
                    fields: [
                      {
                        name: 'textbox5',
                        component: 'Textbox',
                      },
                      {
                        name: 'textbox6',
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                  {
                    component: 'Group',
                    label: '群组4',
                    classes: {
                      'nom-anchor-content': true,
                    },
                    attrs: {
                      'anchor-key': 'div4', // 设置群组key
                    },
                    name: 'group4',
                    fields: [
                      {
                        name: 'textbox7',
                        component: 'Textbox',
                      },
                      {
                        name: 'textbox8',
                        component: 'MultilineTextbox',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        },
      }
    },
  }
})
