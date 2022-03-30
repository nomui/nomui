define([], function () {
  const INDICATOR_PROPS = {
    component: 'Icon',
    expandable: {
      expandedProps: {
        type: 'sort-down',
      },
      collapsedProps: {
        type: 'sort-right',
      },
    },
  }
  let rightRowsRef = null
  const rightContentRef = {}

  // 具体的 props, data 数据部分 key, value
  const getContentChildren = (data, level = 1) => {
    return Object.entries(data).map(([key, value]) => {
      let objectChildRef = null
      const isValueString = typeof value === 'string'
      const isValueNumber = typeof value === 'number'
      console.log('🚀 ~ file: basic.js ~  ~ level', level, isValueNumber)
      const isValueObject = nomui.utils.isPlainObject(value)
      const isValueArray = Array.isArray(value)

      const hasExpand = isValueArray || isValueObject

      const valueText = isValueObject
        ? 'Object'
        : isValueArray
        ? `Array[${value.length}]`
        : isValueString
        ? `"${value}"`
        : value

      return {
        component: 'Flex',
        attrs: { style: { paddingLeft: `20px` } },

        rows: [
          {
            gap: 'small',
            expandable: {
              byClick: true,
              target: () => {
                return objectChildRef
              },
              byIndicator: true,
              indicator: INDICATOR_PROPS,
            },
            onConfig: ({ inst }) => {
              inst.setProps({
                cols: [
                  hasExpand && inst.getExpandableIndicatorProps(false),
                  ...[
                    { tag: 'span', children: `${key}: `, styles: { text: 'indigo' } },
                    { tag: 'span', children: valueText },
                  ],
                ],
              })
            },
            cols: [
              { tag: 'span', children: `${key}: `, styles: { text: 'indigo' } },
              { tag: 'span', children: valueText },
            ],
          },
          hasExpand && {
            hidden: true,
            ref: (c) => {
              objectChildRef = c
            },
            children: getContentChildren(value),
          },
        ],
      }
    })
  }

  // 右侧的 props, data, methods等数据
  const getRightRows = (data) => {
    return ['props', 'data', 'methods'].map((item) => ({
      children: [
        { tag: 'hr' },
        {
          component: 'Flex',
          // value: item,
          // labelWidth: 30,
          gap: 'small',
          onConfig: ({ inst }) => {
            inst.setProps({
              cols: [inst.getExpandableIndicatorProps(true), item],
            })
          },
          expandable: {
            byClick: true,
            target: () => {
              return rightContentRef[`${item}Ref`]
            },
            // byIndicator: true,
            indicator: INDICATOR_PROPS,
          },
        },
        {
          // component: 'StaticText',
          // value: `${item}内容`,
          ref: (c) => {
            rightContentRef[`${item}Ref`] = c
          },
          children: data && data[item] && getContentChildren(data[item]),
        },
      ],
    }))
  }

  return {
    title: '基础用法',
    file: 'basic',
    description: '通过 `data` 配置树形数据',
    demo: function () {
      return {
        component: 'Cols',
        strechIndex: 1,
        align: 'start',
        items: [
          {
            component: 'Tree',
            initExpandLevel: 1,
            expandable: {
              byIndicator: true,
            },
            onNodeClick({ node }) {
              console.log('🚀 ~ file: basick ~ node', node)
              rightRowsRef.update({ items: getRightRows(node.props.data) })
            },
            dataFields: {
              key: 'key',
              text: 'componentType',
              children: 'props.children',
            },
            data: [
              {
                componentType: 'DemoPanel',
                props: {
                  children: [
                    {
                      componentType: 'Grid',
                      key: 'grid-pin-demo',
                      data: {
                        minWidth: 1550,
                        _gridColumsStoreKey: 'NOM_STORAGE_KEY_GRID_COLS_grid-pin-demo',
                        originColumns: [
                          {
                            field: 'name',
                            key: 'name',
                            title: '标题',
                            width: 200,
                          },
                          {
                            field: 'author',
                            key: 'author',
                            width: 100,
                            title: '作者',
                          },
                          {
                            field: 'sales',
                            key: 'sales',
                            title: '销量',
                            width: 100,
                          },
                          {
                            field: 'sales1',
                            key: 'sales1',
                            title: '销量1',
                            width: 200,
                          },
                          {
                            field: 'role',
                            key: 'role',
                            title: '主角',
                            width: 500,
                            showTitle: false,
                          },
                          {
                            field: 'sales3',
                            key: 'sales3',
                            title: '销量3',
                            width: 400,
                          },
                          {
                            field: 'sales2',
                            key: 'sales2',
                            title: '销量2',
                            width: 300,
                          },
                        ],
                      },
                      props: { renderIf: false, prefixClass: 'nom-' },
                      methods: {
                        appendRow: function (rowProps) {
                          this.body.table.appendRow(rowProps)
                        },
                        getDataKeys: function () {
                          const order = []
                          const trs = this.body.table.element.rows
                          for (let i = 0; i < trs.length; i++) {
                            order.push(trs[i].dataset.key)
                          }
                          return order
                        },
                      },
                    },
                    {
                      componentType: 'Grid',
                      key: 'grid-pin-demo1',
                    },
                  ],
                },
              },
              {
                componentType: '节点 2',
              },
            ],
          },
          {
            component: 'Rows',
            ref: (c) => {
              rightRowsRef = c
            },
            items: getRightRows(),
          },
        ],
      }
    },
  }
})
