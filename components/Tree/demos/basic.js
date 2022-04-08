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
        {
          component: 'Flex',
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
        children: [
          {
            component: 'Flex',
            justify: 'between',
            align: 'center',
            styles: { border: ['bottom'] },
            cols: [
              {
                component: 'Button',
                text: 'NomDevtool',
                type: 'text',
                tooltip: '点击跳转',
              },
              {
                component: 'List',
                gutter: 'sm',
                items: [
                  {
                    type: 'focus',
                    tooltip: 'Select component in the page',
                    onClick(args) {
                      console.log('🚀 ~ file: basic.js ~ line 141 ~ onClick ~ args', args)
                    },
                  },
                  { type: 'refresh', tooltip: 'Force refresh' },
                ],
                itemDefaults: {
                  component: 'Icon',
                },
              },
            ],
          },
          {
            component: 'Cols',
            strechIndex: 1,
            align: 'start',
            items: [
              {
                component: 'Tree',
                // initExpandLevel: 1,
                attrs: {
                  style: {
                    height: '90vh',
                    overflowY: 'auto',
                  },
                  onmouseenter(event) {
                    console.log('🚀 ~ file: basic.js ~ line 162 ~ onmouseenter ~ event', event)
                  },
                },
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
                  // children: 'props.children',
                },
                data: [
                  {
                    componentType: 'App',
                    key: '__key1',
                    data: {
                      rendered: true,
                      key: '__key1',
                      componentType: 'App',
                      lastLevel: 1,
                      previousRoute: null,
                      currentRoute: {
                        hash: '#/components/demo?type=Grid&demo=frozen-header',
                        path: '/components/demo',
                        paths: ['/components/demo'],
                        query: {
                          type: 'Grid',
                          demo: 'frozen-header',
                        },
                        queryStr: 'type=Grid&demo=frozen-header',
                        maxLevel: 0,
                      },
                      routers: {
                        0: {
                          rendered: true,
                          key: '__key2',
                          componentType: 'Router',
                          currentView: {
                            rendered: true,
                            key: '__key3',
                            componentType: 'DemoPanel',
                            _scoped: true,
                            preCode: {
                              rendered: true,
                              key: '__key65',
                              componentType: 'Precode',
                            },
                          },
                          path: null,
                          level: 0,
                        },
                      },
                      contextGetted: true,
                      __events: {
                        hashChange: [null, null],
                      },
                    },
                    methods: {},
                    children: [
                      {
                        componentType: 'DemoPanel',
                        key: '__key3',
                        data: {
                          rendered: true,
                          key: '__key3',
                          componentType: 'DemoPanel',
                          _scoped: true,
                        },
                        methods: {},
                        children: [
                          {
                            componentType: 'PanelHeader',
                            key: '__key4',
                            data: {
                              rendered: true,
                              key: '__key4',
                              componentType: 'PanelHeader',
                            },
                            methods: {},
                          },
                          {
                            componentType: 'PanelBody',
                            key: '__key8',
                            data: {
                              rendered: true,
                              key: '__key8',
                              componentType: 'PanelBody',
                            },
                            methods: {},
                            children: [
                              {
                                componentType: 'Component',
                                key: '__key9',
                                data: {
                                  rendered: true,
                                  key: '__key9',
                                  componentType: 'Component',
                                },
                                methods: {},
                                children: [
                                  {
                                    componentType: 'Grid',
                                    key: '__key10',
                                    data: {
                                      rendered: true,
                                      key: '__key10',
                                      componentType: 'Grid',
                                      minWidth: 620,
                                      lastSortField: null,
                                      _alreadyProcessedFlat: false,
                                      rowsRefs: {
                                        1: {
                                          rendered: true,
                                          key: 1,
                                          componentType: 'Tr',
                                          table: {
                                            rendered: true,
                                            key: '__key34',
                                            componentType: 'Table',
                                            colRefs: [],
                                            thRefs: [],
                                            hasGrid: true,
                                            grid: {
                                              rendered: true,
                                              key: '__key10',
                                              componentType: 'Grid',
                                              minWidth: 620,
                                              lastSortField: null,
                                              _alreadyProcessedFlat: false,
                                              checkedRowRefs: {},
                                              _shouldAutoScroll: true,
                                              _customColumnFlag: false,
                                              _pinColumnFlag: false,
                                              pinColumns: [],
                                              originColumns: [
                                                {
                                                  field: 'name',
                                                  title: '标题',
                                                  width: 200,
                                                },
                                                {
                                                  field: 'brand',
                                                  title: '出版方',
                                                  width: 200,
                                                },
                                                {
                                                  field: 'author',
                                                  title: '作者',
                                                },
                                                {
                                                  field: 'role',
                                                  title: '主角',
                                                  width: 100,
                                                },
                                              ],
                                              _needSortColumnsFlag: false,
                                              sortUpdated: true,
                                              filter: {},
                                              _fixedCount: 0,
                                              nodeList: {},
                                              _gridColumsStoreKey: null,
                                              settingBtn: {
                                                rendered: true,
                                                key: '__key12',
                                                componentType: 'Button',
                                                __htmlEvents: {
                                                  click: [null],
                                                  mouseenter: [null, null],
                                                  mouseleave: [null, null],
                                                  focusin: [null],
                                                  focusout: [null],
                                                },
                                                tooltip: {
                                                  rendered: false,
                                                  key: '__key14',
                                                  componentType: 'Tooltip',
                                                  relativeElements: [null],
                                                  _openerFocusing: false,
                                                  showTimer: null,
                                                  hideTimer: null,
                                                  delay: 100,
                                                },
                                              },
                                              header: {
                                                rendered: true,
                                                key: '__key15',
                                                componentType: 'GridHeader',
                                                _summaryHeight: 0,
                                                table: {
                                                  rendered: true,
                                                  key: '__key16',
                                                  componentType: 'Table',
                                                  colRefs: [],
                                                  thRefs: [],
                                                  hasGrid: true,
                                                  hasRowGroup: false,
                                                  hasMultipleThead: false,
                                                  colGroup: {
                                                    rendered: true,
                                                    key: '__key17',
                                                    componentType: 'ColGroup',
                                                    columns: [
                                                      {
                                                        field: 'name',
                                                        title: '标题',
                                                        width: 200,
                                                        fixed: 'left',
                                                        lastLeft: true,
                                                      },
                                                      {
                                                        field: 'brand',
                                                        title: '出版方',
                                                        width: 200,
                                                        fixed: null,
                                                        lastLeft: null,
                                                        firstRight: null,
                                                        lastRight: null,
                                                      },
                                                      {
                                                        field: 'author',
                                                        title: '作者',
                                                        fixed: null,
                                                        lastLeft: null,
                                                        firstRight: null,
                                                        lastRight: null,
                                                      },
                                                      {
                                                        field: 'role',
                                                        title: '主角',
                                                        width: 100,
                                                        fixed: null,
                                                        lastLeft: null,
                                                        firstRight: null,
                                                        lastRight: null,
                                                      },
                                                    ],
                                                    colList: [
                                                      {
                                                        name: 'name',
                                                        index: 0,
                                                      },
                                                      {
                                                        name: 'brand',
                                                        index: 1,
                                                      },
                                                      {
                                                        name: 'author',
                                                        index: 2,
                                                      },
                                                      {
                                                        name: 'role',
                                                        index: 3,
                                                      },
                                                    ],
                                                    hasColumnGroup: false,
                                                  },
                                                  colLength: 4,
                                                },
                                              },
                                              _gridColumsWidthStoreKey: null,
                                            },
                                            hasRowGroup: false,
                                            hasMultipleThead: false,
                                            colGroup: {
                                              rendered: true,
                                              key: '__key35',
                                              componentType: 'ColGroup',
                                              colList: [
                                                {
                                                  name: 'name',
                                                  index: 0,
                                                },
                                                {
                                                  name: 'brand',
                                                  index: 1,
                                                },
                                                {
                                                  name: 'author',
                                                  index: 2,
                                                },
                                                {
                                                  name: 'role',
                                                  index: 3,
                                                },
                                              ],
                                              hasColumnGroup: false,
                                            },
                                            colLength: 4,
                                          },
                                          tdList: [
                                            {
                                              name: 'name',
                                              record: {
                                                id: 1,
                                                name: '飞狐外传',
                                                brand: '明报',
                                                author: '金庸',
                                                role: '胡斐',
                                              },
                                              data: '飞狐外传',
                                            },
                                            {
                                              name: 'brand',
                                              data: '明报',
                                            },
                                            {
                                              name: 'author',
                                              data: '金庸',
                                            },
                                            {
                                              name: 'role',
                                              data: '胡斐',
                                            },
                                          ],
                                          __htmlEvents: {
                                            click: [null],
                                            mouseenter: [null],
                                            mouseleave: [null],
                                          },
                                        },
                                        2: {
                                          rendered: true,
                                          key: 2,
                                          componentType: 'Tr',
                                          tdList: [
                                            {
                                              name: 'name',
                                              record: {
                                                id: 2,
                                                name: '雪山飞狐',
                                                brand: '明报',
                                                author: '金庸',
                                                role: '胡斐',
                                              },
                                              data: '雪山飞狐',
                                            },
                                            {
                                              name: 'brand',
                                              data: '明报',
                                            },
                                            {
                                              name: 'author',
                                              data: '金庸',
                                            },
                                            {
                                              name: 'role',
                                              data: '胡斐',
                                            },
                                          ],
                                          __htmlEvents: {
                                            click: [null],
                                            mouseenter: [null],
                                            mouseleave: [null],
                                          },
                                        },
                                        3: {
                                          rendered: true,
                                          key: 3,
                                          componentType: 'Tr',
                                          tdList: [
                                            {
                                              name: 'name',
                                              record: {
                                                id: 3,
                                                name: '连城诀',
                                                brand: '明报',
                                              },
                                              data: '连城诀',
                                            },
                                            {
                                              name: 'brand',
                                              data: '明报',
                                            },
                                            {
                                              name: 'author',
                                              data: null,
                                            },
                                            {
                                              name: 'role',
                                              data: null,
                                            },
                                          ],
                                          __htmlEvents: {
                                            click: [null],
                                            mouseenter: [null],
                                            mouseleave: [null],
                                          },
                                        },
                                        4: {
                                          rendered: true,
                                          key: 4,
                                          componentType: 'Tr',
                                          tdList: [
                                            {
                                              name: 'name',
                                              record: {
                                                id: 4,
                                                name: '天龙八部',
                                              },
                                              data: '天龙八部',
                                            },
                                            {
                                              name: 'brand',
                                              data: null,
                                            },
                                            {
                                              name: 'author',
                                              data: null,
                                            },
                                            {
                                              name: 'role',
                                              data: null,
                                            },
                                          ],
                                          __htmlEvents: {
                                            click: [null],
                                            mouseenter: [null],
                                            mouseleave: [null],
                                          },
                                        },
                                        5: {
                                          rendered: true,
                                          key: 5,
                                          componentType: 'Tr',
                                          tdList: [
                                            {
                                              name: 'name',
                                              record: {
                                                id: 5,
                                                name: '射雕英雄传',
                                              },
                                              data: '射雕英雄传',
                                            },
                                            {
                                              name: 'brand',
                                              data: null,
                                            },
                                            {
                                              name: 'author',
                                              data: null,
                                            },
                                            {
                                              name: 'role',
                                              data: null,
                                            },
                                          ],
                                          __htmlEvents: {
                                            click: [null],
                                            mouseenter: [null],
                                            mouseleave: [null],
                                          },
                                        },
                                        6: {
                                          rendered: true,
                                          key: 6,
                                          componentType: 'Tr',
                                          tdList: [
                                            {
                                              name: 'name',
                                              record: {
                                                id: 6,
                                                name: '白马啸西风',
                                              },
                                              data: '白马啸西风',
                                            },
                                            {
                                              name: 'brand',
                                              data: null,
                                            },
                                            {
                                              name: 'author',
                                              data: null,
                                            },
                                            {
                                              name: 'role',
                                              data: null,
                                            },
                                          ],
                                          __htmlEvents: {
                                            click: [null],
                                            mouseenter: [null],
                                            mouseleave: [null],
                                          },
                                        },
                                      },
                                      _shouldAutoScroll: true,
                                      _customColumnFlag: false,
                                      _pinColumnFlag: false,
                                      _needSortColumnsFlag: false,
                                      sortUpdated: true,
                                      _fixedCount: 0,
                                      _gridColumsStoreKey: null,
                                      _gridColumsWidthStoreKey: null,
                                    },
                                    methods: {},
                                    children: [
                                      {
                                        componentType: 'Component',
                                        key: '__key11',
                                        data: {
                                          rendered: true,
                                          key: '__key11',
                                          componentType: 'Component',
                                        },
                                        methods: {},
                                        children: [
                                          {
                                            componentType: 'Button',
                                            key: '__key12',
                                            data: {
                                              rendered: true,
                                              key: '__key12',
                                              componentType: 'Button',
                                            },
                                            methods: {},
                                            children: [
                                              {
                                                componentType: 'Icon',
                                                key: '__key13',
                                                data: {
                                                  rendered: true,
                                                  key: '__key13',
                                                  componentType: 'Icon',
                                                },
                                                methods: {},
                                                children: [],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        componentType: 'GridHeader',
                                        key: '__key15',
                                        data: {
                                          rendered: true,
                                          key: '__key15',
                                          componentType: 'GridHeader',
                                          _summaryHeight: 0,
                                        },
                                        methods: {},
                                        children: [
                                          {
                                            componentType: 'Table',
                                            key: '__key16',
                                            data: {
                                              rendered: true,
                                              key: '__key16',
                                              componentType: 'Table',
                                              hasGrid: true,
                                              hasRowGroup: false,
                                              hasMultipleThead: false,
                                              colLength: 4,
                                            },
                                            methods: {},
                                            children: [
                                              {
                                                componentType: 'ColGroup',
                                                key: '__key17',
                                                data: {
                                                  rendered: true,
                                                  key: '__key17',
                                                  componentType: 'ColGroup',
                                                  hasColumnGroup: false,
                                                },
                                                methods: {},
                                                children: [
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key18',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key18',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {},
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key19',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key19',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {},
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key20',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key20',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {},
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key21',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key21',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {},
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key22',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key22',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {},
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                ],
                                              },
                                              {
                                                componentType: 'Thead',
                                                key: '__key23',
                                                data: {
                                                  rendered: true,
                                                  key: '__key23',
                                                  componentType: 'Thead',
                                                },
                                                methods: {},
                                                children: [
                                                  {
                                                    componentType: 'TheadTr',
                                                    key: '__key24',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key24',
                                                      componentType: 'TheadTr',
                                                      thead: {
                                                        rendered: true,
                                                        key: '__key23',
                                                        componentType: 'Thead',
                                                      },
                                                    },
                                                    methods: {},
                                                    children: [
                                                      {
                                                        componentType: 'Th',
                                                        key: '__key25',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key25',
                                                          componentType: 'Th',
                                                          tr: {
                                                            rendered: true,
                                                            key: '__key24',
                                                            componentType: 'TheadTr',
                                                          },
                                                          resizer: null,
                                                          lastDistance: 0,
                                                          _stickyPos: 0,
                                                          resizable: false,
                                                          __htmlEvents: {
                                                            mouseenter: [null],
                                                            mouseleave: [null],
                                                          },
                                                        },
                                                        methods: {},
                                                        children: [
                                                          {
                                                            componentType: 'Component',
                                                            key: '__key26',
                                                            data: {
                                                              rendered: true,
                                                              key: '__key26',
                                                              componentType: 'Component',
                                                            },
                                                            methods: {},
                                                            children: [],
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        componentType: 'Th',
                                                        key: '__key27',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key27',
                                                          componentType: 'Th',
                                                          resizer: null,
                                                          lastDistance: 0,
                                                          _stickyPos: 0,
                                                          resizable: false,
                                                          __htmlEvents: {
                                                            mouseenter: [null],
                                                            mouseleave: [null],
                                                          },
                                                        },
                                                        methods: {},
                                                        children: [
                                                          {
                                                            componentType: 'Component',
                                                            key: '__key28',
                                                            data: {
                                                              rendered: true,
                                                              key: '__key28',
                                                              componentType: 'Component',
                                                            },
                                                            methods: {},
                                                            children: [],
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        componentType: 'Th',
                                                        key: '__key29',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key29',
                                                          componentType: 'Th',
                                                          resizer: null,
                                                          lastDistance: 0,
                                                          _stickyPos: 0,
                                                          resizable: false,
                                                          __htmlEvents: {
                                                            mouseenter: [null],
                                                            mouseleave: [null],
                                                          },
                                                        },
                                                        methods: {},
                                                        children: [
                                                          {
                                                            componentType: 'Component',
                                                            key: '__key30',
                                                            data: {
                                                              rendered: true,
                                                              key: '__key30',
                                                              componentType: 'Component',
                                                            },
                                                            methods: {},
                                                            children: [],
                                                          },
                                                        ],
                                                      },
                                                      {
                                                        componentType: 'Th',
                                                        key: '__key31',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key31',
                                                          componentType: 'Th',
                                                          resizer: null,
                                                          lastDistance: 0,
                                                          _stickyPos: 0,
                                                          resizable: false,
                                                          __htmlEvents: {
                                                            mouseenter: [null],
                                                            mouseleave: [null],
                                                          },
                                                        },
                                                        methods: {},
                                                        children: [
                                                          {
                                                            componentType: 'Component',
                                                            key: '__key32',
                                                            data: {
                                                              rendered: true,
                                                              key: '__key32',
                                                              componentType: 'Component',
                                                            },
                                                            methods: {},
                                                            children: [],
                                                          },
                                                        ],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                      {
                                        componentType: 'GridBody',
                                        key: '__key33',
                                        data: {
                                          rendered: true,
                                          key: '__key33',
                                          componentType: 'GridBody',
                                          __htmlEvents: {
                                            scroll: [null],
                                          },
                                        },
                                        methods: {},
                                        children: [
                                          {
                                            componentType: 'Table',
                                            key: '__key34',
                                            data: {
                                              rendered: true,
                                              key: '__key34',
                                              componentType: 'Table',
                                              hasGrid: true,
                                              hasRowGroup: false,
                                              hasMultipleThead: false,
                                              colLength: 4,
                                            },
                                            methods: {},
                                            children: [
                                              {
                                                componentType: 'ColGroup',
                                                key: '__key35',
                                                data: {
                                                  rendered: true,
                                                  key: '__key35',
                                                  componentType: 'ColGroup',
                                                  hasColumnGroup: false,
                                                },
                                                methods: {},
                                                children: [
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key36',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key36',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {
                                                        __key41: {
                                                          rendered: true,
                                                          key: '__key41',
                                                          componentType: 'Td',
                                                          col: {
                                                            rendered: true,
                                                            key: '__key36',
                                                            componentType: 'ColGroupCol',
                                                            maxTdWidth: 0,
                                                          },
                                                        },
                                                        __key45: {
                                                          rendered: true,
                                                          key: '__key45',
                                                          componentType: 'Td',
                                                        },
                                                        __key49: {
                                                          rendered: true,
                                                          key: '__key49',
                                                          componentType: 'Td',
                                                        },
                                                        __key53: {
                                                          rendered: true,
                                                          key: '__key53',
                                                          componentType: 'Td',
                                                        },
                                                        __key57: {
                                                          rendered: true,
                                                          key: '__key57',
                                                          componentType: 'Td',
                                                        },
                                                        __key61: {
                                                          rendered: true,
                                                          key: '__key61',
                                                          componentType: 'Td',
                                                        },
                                                      },
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key37',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key37',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {
                                                        __key42: {
                                                          rendered: true,
                                                          key: '__key42',
                                                          componentType: 'Td',
                                                          col: {
                                                            rendered: true,
                                                            key: '__key37',
                                                            componentType: 'ColGroupCol',
                                                            maxTdWidth: 0,
                                                          },
                                                        },
                                                        __key46: {
                                                          rendered: true,
                                                          key: '__key46',
                                                          componentType: 'Td',
                                                        },
                                                        __key50: {
                                                          rendered: true,
                                                          key: '__key50',
                                                          componentType: 'Td',
                                                        },
                                                        __key54: {
                                                          rendered: true,
                                                          key: '__key54',
                                                          componentType: 'Td',
                                                        },
                                                        __key58: {
                                                          rendered: true,
                                                          key: '__key58',
                                                          componentType: 'Td',
                                                        },
                                                        __key62: {
                                                          rendered: true,
                                                          key: '__key62',
                                                          componentType: 'Td',
                                                        },
                                                      },
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key38',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key38',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {
                                                        __key43: {
                                                          rendered: true,
                                                          key: '__key43',
                                                          componentType: 'Td',
                                                          col: {
                                                            rendered: true,
                                                            key: '__key38',
                                                            componentType: 'ColGroupCol',
                                                            maxTdWidth: 0,
                                                          },
                                                        },
                                                        __key47: {
                                                          rendered: true,
                                                          key: '__key47',
                                                          componentType: 'Td',
                                                        },
                                                        __key51: {
                                                          rendered: true,
                                                          key: '__key51',
                                                          componentType: 'Td',
                                                        },
                                                        __key55: {
                                                          rendered: true,
                                                          key: '__key55',
                                                          componentType: 'Td',
                                                        },
                                                        __key59: {
                                                          rendered: true,
                                                          key: '__key59',
                                                          componentType: 'Td',
                                                        },
                                                        __key63: {
                                                          rendered: true,
                                                          key: '__key63',
                                                          componentType: 'Td',
                                                        },
                                                      },
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                  {
                                                    componentType: 'ColGroupCol',
                                                    key: '__key39',
                                                    data: {
                                                      rendered: true,
                                                      key: '__key39',
                                                      componentType: 'ColGroupCol',
                                                      maxTdWidth: 0,
                                                      tdRefs: {
                                                        __key44: {
                                                          rendered: true,
                                                          key: '__key44',
                                                          componentType: 'Td',
                                                          col: {
                                                            rendered: true,
                                                            key: '__key39',
                                                            componentType: 'ColGroupCol',
                                                            maxTdWidth: 0,
                                                          },
                                                        },
                                                        __key48: {
                                                          rendered: true,
                                                          key: '__key48',
                                                          componentType: 'Td',
                                                        },
                                                        __key52: {
                                                          rendered: true,
                                                          key: '__key52',
                                                          componentType: 'Td',
                                                        },
                                                        __key56: {
                                                          rendered: true,
                                                          key: '__key56',
                                                          componentType: 'Td',
                                                        },
                                                        __key60: {
                                                          rendered: true,
                                                          key: '__key60',
                                                          componentType: 'Td',
                                                        },
                                                        __key64: {
                                                          rendered: true,
                                                          key: '__key64',
                                                          componentType: 'Td',
                                                        },
                                                      },
                                                    },
                                                    methods: {},
                                                    children: [],
                                                  },
                                                ],
                                              },
                                              {
                                                componentType: 'Tbody',
                                                key: '__key40',
                                                data: {
                                                  rendered: true,
                                                  key: '__key40',
                                                  componentType: 'Tbody',
                                                },
                                                methods: {},
                                                children: [
                                                  {
                                                    componentType: 'Tr',
                                                    key: 1,
                                                    data: {
                                                      rendered: true,
                                                      key: 1,
                                                      componentType: 'Tr',
                                                    },
                                                    methods: {},
                                                    children: [
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key41',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key41',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key42',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key42',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key43',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key43',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key44',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key44',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    componentType: 'Tr',
                                                    key: 2,
                                                    data: {
                                                      rendered: true,
                                                      key: 2,
                                                      componentType: 'Tr',
                                                    },
                                                    methods: {},
                                                    children: [
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key45',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key45',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key46',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key46',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key47',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key47',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key48',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key48',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    componentType: 'Tr',
                                                    key: 3,
                                                    data: {
                                                      rendered: true,
                                                      key: 3,
                                                      componentType: 'Tr',
                                                    },
                                                    methods: {},
                                                    children: [
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key49',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key49',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key50',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key50',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key51',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key51',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key52',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key52',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    componentType: 'Tr',
                                                    key: 4,
                                                    data: {
                                                      rendered: true,
                                                      key: 4,
                                                      componentType: 'Tr',
                                                    },
                                                    methods: {},
                                                    children: [
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key53',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key53',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key54',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key54',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key55',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key55',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key56',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key56',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    componentType: 'Tr',
                                                    key: 5,
                                                    data: {
                                                      rendered: true,
                                                      key: 5,
                                                      componentType: 'Tr',
                                                    },
                                                    methods: {},
                                                    children: [
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key57',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key57',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key58',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key58',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key59',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key59',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key60',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key60',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                    ],
                                                  },
                                                  {
                                                    componentType: 'Tr',
                                                    key: 6,
                                                    data: {
                                                      rendered: true,
                                                      key: 6,
                                                      componentType: 'Tr',
                                                    },
                                                    methods: {},
                                                    children: [
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key61',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key61',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key62',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key62',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key63',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key63',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                      {
                                                        componentType: 'Td',
                                                        key: '__key64',
                                                        data: {
                                                          rendered: true,
                                                          key: '__key64',
                                                          componentType: 'Td',
                                                        },
                                                        methods: {},
                                                        children: [],
                                                      },
                                                    ],
                                                  },
                                                ],
                                              },
                                            ],
                                          },
                                        ],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            componentType: 'Precode',
                            key: '__key65',
                            data: {
                              rendered: true,
                              key: '__key65',
                              componentType: 'Precode',
                            },
                            methods: {},
                            children: [
                              {
                                componentType: 'Component',
                                key: '__key66',
                                data: {
                                  rendered: true,
                                  key: '__key66',
                                  componentType: 'Component',
                                },
                                methods: {},
                                children: [
                                  {
                                    componentType: 'Component',
                                    key: '__key67',
                                    data: {
                                      rendered: true,
                                      key: '__key67',
                                      componentType: 'Component',
                                    },
                                    methods: {},
                                    children: [],
                                  },
                                ],
                              },
                            ],
                          },
                          {
                            componentType: 'PanelFooter',
                            key: '__key68',
                            data: {
                              rendered: true,
                              key: '__key68',
                              componentType: 'PanelFooter',
                            },
                            methods: {},
                            children: [
                              {
                                componentType: 'Cols',
                                key: '__key69',
                                data: {
                                  rendered: true,
                                  key: '__key69',
                                  componentType: 'Cols',
                                },
                                methods: {},
                                children: [
                                  {
                                    componentType: 'Col',
                                    key: '__key70',
                                    data: {
                                      rendered: true,
                                      key: '__key70',
                                      componentType: 'Col',
                                    },
                                    methods: {},
                                    children: [
                                      {
                                        componentType: 'Component',
                                        key: '__key71',
                                        data: {
                                          rendered: true,
                                          key: '__key71',
                                          componentType: 'Component',
                                        },
                                        methods: {},
                                        children: [],
                                      },
                                    ],
                                  },
                                  {
                                    componentType: 'Col',
                                    key: '__key72',
                                    data: {
                                      rendered: true,
                                      key: '__key72',
                                      componentType: 'Col',
                                    },
                                    methods: {},
                                    children: [
                                      {
                                        componentType: 'Component',
                                        key: '__key73',
                                        data: {
                                          rendered: true,
                                          key: '__key73',
                                          componentType: 'Component',
                                          __htmlEvents: {
                                            click: [null],
                                          },
                                        },
                                        methods: {},
                                        children: [],
                                      },
                                    ],
                                  },
                                  {
                                    componentType: 'Col',
                                    key: '__key74',
                                    data: {
                                      rendered: true,
                                      key: '__key74',
                                      componentType: 'Col',
                                    },
                                    methods: {},
                                    children: [
                                      {
                                        componentType: 'Component',
                                        key: '__key75',
                                        data: {
                                          rendered: true,
                                          key: '__key75',
                                          componentType: 'Component',
                                        },
                                        methods: {},
                                        children: [],
                                      },
                                    ],
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                component: 'Rows',
                attrs: {
                  style: {
                    height: '90vh',
                    overflowY: 'auto',
                  },
                },
                ref: (c) => {
                  rightRowsRef = c
                },
                items: getRightRows(),
              },
            ],
          },
        ],
      }
    },
  }
})
