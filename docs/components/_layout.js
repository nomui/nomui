define(['docs/helper.js'], function ({ DOC_URL_KEY }) {
  return function () {
    let javascriptMenuRef = null

    const highLight = () => {
      let { type = 'Component' } = this.$route.query
      const { cat } = this.$route.query

      if (cat) {
        type += `/${cat}`
      }
      javascriptMenuRef && javascriptMenuRef.selectToItem(type)
    }

    const getAllDocs = (cmps) => {
      const doc_suffix = '&tab=docs'
      return Array.isArray(cmps)
        ? cmps.reduce((prevs, { text, subtext, url, items }) => {
            if (url) {
              return [
                ...prevs,
                {
                  key: text,
                  text: subtext,
                  search: `${text}${subtext}`,
                  url: `${url}${doc_suffix}`,
                },
              ]
            }

            if (items) {
              return [...prevs, ...getAllDocs(items)]
            }

            return [...prevs]
          }, [])
        : []
    }

    return {
      view: {
        component: 'Layout',
        sider: {
          children: [
            {
              component: 'Menu',
              ref: (c) => {
                javascriptMenuRef = c
              },
              items: [
                {
                  text: '通用',
                  id: 'Common',
                  items: [
                    {
                      text: 'Structure',
                      subtext: '结构',
                      id: 'Component',
                      url: '#!components!index?type=Component',
                    },
                    {
                      text: 'Styles',
                      subtext: '样式',
                      id: 'Component/styles',
                      items: [
                        {
                          text: 'Color',
                          subtext: '颜色',
                          id: 'Component/styles/color',
                          url: '#!components!index?type=Component&cat=styles/color',
                        },
                        {
                          text: 'Text',
                          subtext: '文本',
                          id: 'Component/styles/text',
                          url: '#!components!index?type=Component&cat=styles/text',
                        },
                        {
                          text: 'Border',
                          subtext: '边框',
                          id: 'Component/styles/border',
                          url: '#!components!index?type=Component&cat=styles/border',
                        },
                        {
                          text: 'Padding',
                          subtext: '内边距',
                          id: 'Component/styles/padding',
                          url: '#!components!index?type=Component&cat=styles/padding',
                        },
                        {
                          text: 'Position',
                          subtext: '定位',
                          id: 'Component/styles/position',
                          url: '#!components!index?type=Component&cat=styles/position',
                        },
                      ],
                    },
                    {
                      text: 'Events',
                      subtext: '事件',
                      id: 'Component/events',
                      url: '#!components!index?type=Component&cat=events',
                    },
                    {
                      text: 'Behavior',
                      subtext: '行为',
                      id: 'Component/behavior',
                      items: [
                        {
                          text: 'Selectable',
                          subtext: '可选中',
                          id: 'component/behavior/selectable',
                          url: '#!components!index?type=Component&cat=behavior/selectable',
                        },
                        {
                          text: 'Expandable',
                          subtext: '可展开',
                          id: 'Component/behavior/expandable',
                          url: '#!components!index?type=Component&cat=behavior/expandable',
                        },
                      ],
                    },
                    {
                      text: 'Contexts',
                      subtext: '上下文管理',
                      id: 'Component/contexts',
                      url: '#!components!index?type=Component&cat=contexts',
                    },
                  ],
                },
                {
                  text: '基本',
                  items: [
                    {
                      text: 'Button',
                      subtext: '按钮',
                      id: 'Button',
                      url: '#!components!index?type=Button',
                    },
                    {
                      text: 'Icon',
                      subtext: '图标',
                      id: 'Icon',
                      url: '#!components!index?type=Icon',
                    },
                  ],
                },
                {
                  text: '布局',
                  items: [
                    {
                      text: 'Container',
                      subtext: '容器',
                      id: 'Container',
                      url: '#!components!index?type=Container',
                    },
                    {
                      text: 'Divider',
                      subtext: '分割线',
                      id: 'Divider',
                      url: '#!components!index?type=Divider',
                    },
                    {
                      text: 'Flex',
                      subtext: '弹性布局',
                      id: 'Flex',
                      url: '#!components!index?type=Flex',
                    },
                    {
                      text: 'Flex2',
                      subtext: '弹性布局',
                      id: 'Flex2',
                      url: '#!components!index?type=Flex2',
                    },
                    {
                      text: 'Layout',
                      subtext: '布局',
                      id: 'Layout',
                      url: '#!components!index?type=Layout',
                    },
                    {
                      text: 'Panel',
                      subtext: '面板',
                      id: 'Panel',
                      url: '#!components!index?type=Panel',
                    },
                  ],
                },
                {
                  text: '导航',
                  items: [
                    {
                      text: 'Breadcrumb',
                      subtext: '面包屑',
                      id: 'Breadcrumb',
                      url: '#!components!index?type=Breadcrumb',
                    },
                    {
                      text: 'Collapse',
                      subtext: '折叠',
                      id: 'Collapse',
                      url: '#!components!index?type=Collapse',
                    },
                    {
                      text: 'Dropdown',
                      subtext: '下拉菜单',
                      id: 'Dropdown',
                      url: '#!components!index?type=Dropdown',
                    },
                    {
                      text: 'Menu',
                      subtext: '菜单',
                      id: 'Menu',
                      url: '#!components!index?type=Menu',
                    },
                    {
                      text: 'Navbar',
                      subtext: '导航条',
                      id: 'Navbar',
                      url: '#!components!index?type=Navbar',
                    },
                    {
                      text: 'Pager',
                      subtext: '分页',
                      id: 'Pager',
                      url: '#!components!index?type=Pager',
                    },
                    {
                      text: 'Tabs',
                      subtext: '选项卡',
                      id: 'Tabs',
                      url: '#!components!index?type=Tabs',
                    },
                    {
                      text: 'Toolbar',
                      subtext: '工具按钮组',
                      id: 'Toolbar',
                      url: '#!components!index?type=Toolbar',
                    },
                  ],
                },
                {
                  text: '浮层',
                  items: [
                    {
                      text: 'Alert',
                      subtext: '警告框',
                      id: 'Alert',
                      url: '#!components!index?type=Alert',
                    },
                    {
                      text: 'Confirm',
                      subtext: '确认框',
                      id: 'Confirm',
                      url: '#!components!index?type=Confirm',
                    },
                    {
                      text: 'Drawer',
                      subtext: '抽屉',
                      id: 'Drawer',
                      url: '#!components!index?type=Drawer',
                    },
                    {
                      text: 'Layer',
                      subtext: '层',
                      id: 'Layer',
                      url: '#!components!index?type=Layer',
                    },
                    {
                      text: 'Loading',
                      subtext: '加载框',
                      id: 'Loading',
                      url: '#!components!index?type=Loading',
                    },
                    {
                      text: 'Message',
                      subtext: '消息',
                      id: 'Message',
                      url: '#!components!index?type=Message',
                    },
                    {
                      text: 'Modal',
                      subtext: '模态框',
                      id: 'Modal',
                      url: '#!components!index?type=Modal',
                    },
                    {
                      text: 'Notification',
                      subtext: '通知',
                      id: 'Notification',
                      url: '#!components!index?type=Notification',
                    },
                    {
                      text: 'Popconfirm',
                      subtext: '弹出确认框',
                      id: 'Popconfirm',
                      url: '#!components!index?type=Popconfirm',
                    },
                    {
                      text: 'Popup',
                      subtext: '触发层',
                      id: 'Popup',
                      url: '#!components!index?type=Popup',
                    },
                    {
                      text: 'Tooltip',
                      subtext: '文字提示',
                      id: 'Tooltip',
                      url: '#!components!index?type=Tooltip',
                    },
                  ],
                },
                {
                  text: '数据展示',
                  items: [
                    {
                      text: 'Avatar',
                      subtext: '头像',
                      id: 'Avatar',
                      url: '#!components!index?type=Avatar',
                    },
                    {
                      text: 'AvatarGroup',
                      subtext: '头像组',
                      id: 'AvatarGroup',
                      url: '#!components!index?type=AvatarGroup',
                    },
                    {
                      text: 'Badge',
                      subtext: '徽标',
                      id: 'Badge',
                      url: '#!components!index?type=Badge',
                    },
                    {
                      text: 'Carousel',
                      id: 'Carousel',
                      subtext: '走马灯',
                      url: '#!components!index?type=Carousel',
                    },
                    {
                      text: 'Countdown',
                      id: 'Countdown',
                      subtext: '倒计时',
                      url: '#!components!index?type=Countdown',
                    },
                    {
                      text: 'DataList',
                      subtext: '数据列表',
                      id: 'DataList',
                      url: '#!components!index?type=DataList',
                    },
                    {
                      text: 'Grid',
                      subtext: '高级表格',
                      id: 'Grid',
                      url: '#!components!index?type=Grid',
                    },
                    {
                      text: 'Image',
                      subtext: '图片',
                      id: 'Image',
                      url: '#!components!index?type=Image',
                    },
                    {
                      text: 'List',
                      subtext: '列表',
                      id: 'List',
                      url: '#!components!index?type=List',
                    },
                    {
                      text: 'Statistic',
                      subtext: '统计数值',
                      id: 'Statistic',
                      url: '#!components!index?type=Statistic',
                    },
                    {
                      text: 'Table',
                      subtext: '普通表格',
                      id: 'Table',
                      url: '#!components!index?type=Table',
                    },
                    {
                      text: 'Tag',
                      subtext: '标签',
                      id: 'Tag',
                      url: '#!components!index?type=Tag',
                    },
                    {
                      text: 'Timeline',
                      subtext: '时间轴',
                      id: 'Timeline',
                      url: '#!components!index?type=Timeline',
                    },
                    {
                      text: 'Tree',
                      subtext: '树',
                      id: 'Tree',
                      url: '#!components!index?type=Tree',
                    },
                  ],
                },
                {
                  text: '数据录入',
                  items: [
                    {
                      text: 'AutoComplete',
                      subtext: '自动完成',
                      id: 'AutoComplete',
                      url: '#!components!index?type=AutoComplete',
                    },
                    {
                      text: 'Cascader',
                      subtext: '级联选择',
                      id: 'Cascader',
                      url: '#!components!index?type=Cascader',
                    },
                    {
                      text: 'Checkbox',
                      subtext: '复选框',
                      id: 'Checkbox',
                      url: '#!components!index?type=Checkbox',
                    },
                    {
                      text: 'CheckboxList',
                      subtext: '多选列表',
                      id: 'CheckboxList',
                      url: '#!components!index?type=CheckboxList',
                    },
                    {
                      text: 'CheckboxTree',
                      subtext: '多选树',
                      id: 'CheckboxTree',
                      url: '#!components!index?type=CheckboxTree',
                    },
                    {
                      text: 'ColorPicker',
                      subtext: '颜色选择器',
                      id: 'ColorPicker',
                      url: '#!components!index?type=ColorPicker',
                    },
                    {
                      text: 'DatePicker',
                      subtext: '日期选择',
                      id: 'DatePicker',
                      url: '#!components!index?type=DatePicker',
                    },
                    {
                      text: 'DateRangePicker',
                      subtext: '日期范围选择',
                      id: 'DateRangePicker',
                      url: '#!components!index?type=DateRangePicker',
                    },
                    {
                      text: 'Field',
                      subtext: '字段',
                      id: 'Field',
                      url: '#!components!index?type=Field',
                    },
                    {
                      text: 'Form',
                      subtext: '表单',
                      id: 'Form',
                      url: '#!components!index?type=Form',
                    },
                    {
                      text: 'Group',
                      subtext: '字段组',
                      id: 'Group',
                      url: '#!components!index?type=Group',
                    },
                    {
                      text: 'GroupGrid',
                      subtext: '字段组表格',
                      id: 'GroupGrid',
                      url: '#!components!index?type=GroupGrid',
                    },
                    {
                      text: 'GroupTree',
                      subtext: '多级字段组',
                      id: 'GroupTree',
                      url: '#!components!index?type=GroupTree',
                    },
                    {
                      text: 'GroupList',
                      subtext: '字段组列表',
                      id: 'GroupList',
                      url: '#!components!index?type=GroupList',
                    },
                    {
                      text: 'IconPicker',
                      subtext: '图标选择器',
                      id: 'IconPicker',
                      url: '#!components!index?type=IconPicker',
                    },
                    {
                      text: 'ListSetter',
                      subtext: '列表设置器',
                      id: 'ListSetter',
                      url: '#!components!index?type=ListSetter',
                    },
                    {
                      text: 'MaskInfoField',
                      subtext: '敏感信息打码字段',
                      id: 'MaskInfoField',
                      url: '#!components!index?type=MaskInfoField',
                    },
                    {
                      text: 'Multiline Textbox',
                      subtext: '多行文本框',
                      id: 'MultilineTextbox',
                      url: '#!components!index?type=MultilineTextbox',
                    },
                    {
                      text: 'Numberbox',
                      subtext: '数字框',
                      id: 'Numberbox',
                      url: '#!components!index?type=Numberbox',
                    },
                    {
                      text: 'NumberInput',
                      subtext: '数字输入框',
                      id: 'NumberInput',
                      url: '#!components!index?type=NumberInput',
                    },
                    // {
                    //   text: 'NumberSpinner',
                    //   subtext: '数字微调器',
                    //   id: 'NumberSpinner',
                    //   url: '#!components!index?type=NumberSpinner',
                    // },
                    {
                      text: 'PartialDatePicker',
                      subtext: '部分日期选择',
                      id: 'PartialDatePicker',
                      url: '#!components!index?type=PartialDatePicker',
                    },
                    {
                      text: 'PartialDateRangePicker',
                      subtext: '部分日期选择',
                      id: 'PartialDateRangePicker',
                      url: '#!components!index?type=PartialDateRangePicker',
                    },
                    {
                      text: 'Password',
                      subtext: '密码框',
                      id: 'Password',
                      url: '#!components!index?type=Password',
                    },
                    {
                      text: 'RadioList',
                      subtext: '单选列表',
                      id: 'RadioList',
                      url: '#!components!index?type=RadioList',
                    },
                    {
                      text: 'Rate',
                      subtext: '评分',
                      id: 'Rate',
                      url: '#!components!index?type=Rate',
                    },
                    {
                      text: 'Select',
                      subtext: '下拉选择',
                      id: 'Select',
                      url: '#!components!index?type=Select',
                    },
                    {
                      text: 'Slider',
                      subtext: '滑动输入条',
                      id: 'Slider',
                      url: '#!components!index?type=Slider',
                    },
                    {
                      text: 'StaticText',
                      subtext: '纯文本显示',
                      id: 'StaticText',
                      url: '#!components!index?type=StaticText',
                    },
                    {
                      text: 'Switch',
                      subtext: '开关',
                      id: 'Switch',
                      url: '#!components!index?type=Switch',
                    },
                    {
                      text: 'Textbox',
                      subtext: '文本框',
                      id: 'Textbox',
                      url: '#!components!index?type=Textbox',
                    },
                    {
                      text: 'TimePicker',
                      subtext: '时间选择',
                      id: 'TimePicker',
                      url: '#!components!index?type=TimePicker',
                    },
                    {
                      text: 'TimeRangePicker',
                      subtext: '时间选择',
                      id: 'TimeRangePicker',
                      url: '#!components!index?type=TimeRangePicker',
                    },
                    {
                      text: 'Transfer',
                      subtext: '穿梭框',
                      id: 'Transfer',
                      url: '#!components!index?type=Transfer',
                    },
                    {
                      text: 'TreeSelect',
                      subtext: '树选择',
                      id: 'TreeSelect',
                      url: '#!components!index?type=TreeSelect',
                    },
                    {
                      text: 'Uploader',
                      subtext: '上传',
                      id: 'Uploader',
                      url: '#!components!index?type=Uploader',
                    },
                    {
                      text: 'Upload',
                      subtext: '基础上传组件',
                      id: 'Upload',
                      url: '#!components!index?type=Upload',
                    },
                  ],
                },
                {
                  text: '反馈',
                  items: [
                    {
                      text: 'Empty',
                      subtext: '空状态',
                      id: 'Empty',
                      url: '#!components!index?type=Empty',
                    },
                    {
                      text: 'Progress',
                      subtext: '进度条',
                      id: 'Progress',
                      url: '#!components!index?type=Progress',
                    },
                    {
                      text: 'Result',
                      subtext: '结果',
                      id: 'Result',
                      url: '#!components!index?type=Result',
                    },
                    {
                      text: 'Spinner',
                      subtext: '加载中',
                      id: 'Spinner',
                      url: '#!components!index?type=Spinner',
                    },
                    {
                      text: 'Steps',
                      subtext: '步骤条',
                      id: 'Steps',
                      url: '#!components!index?type=Steps',
                    },
                  ],
                },
                {
                  text: '其他',
                  items: [
                    {
                      text: 'Anchor',
                      subtext: '锚点',
                      id: 'Anchor',
                      url: '#!components!index?type=Anchor',
                    },
                    {
                      text: 'BackTop',
                      subtext: '回到顶部',
                      id: 'BackTop',
                      url: '#!components!index?type=BackTop',
                    },
                    {
                      text: 'Caption',
                      subtext: '标题',
                      id: 'Caption',
                      url: '#!components!index?type=Caption',
                    },
                    {
                      text: 'Ellipsis',
                      subtext: '文字溢出省略',
                      id: 'Ellipsis',
                      url: '#!components!index?type=Ellipsis',
                    },
                    {
                      text: 'MaskInfo',
                      subtext: '敏感信息打码',
                      id: 'MaskInfo',
                      url: '#!components!index?type=MaskInfo',
                    },
                    {
                      text: 'Skeleton',
                      subtext: '骨架屏',
                      id: 'Skeleton',
                      url: '#!components!index?type=Skeleton',
                    },
                    {
                      text: 'SlideCaptcha',
                      subtext: '拖拽验证码',
                      id: 'SlideCaptcha',
                      url: '#!components!index?type=SlideCaptcha',
                    },
                    {
                      text: 'Tour',
                      subtext: '漫游式引导',
                      id: 'Tour',
                      url: '#!components!index?type=Tour',
                    },
                    {
                      text: 'Watermark',
                      subtext: '水印',
                      id: 'Watermark',
                      url: '#!components!index?type=Watermark',
                    },
                  ],
                },
              ],
              onRendered: ({ props: { items } }) => {
                const doc_urls_str = localStorage.getItem(DOC_URL_KEY)
                if (!doc_urls_str) {
                  localStorage.setItem(DOC_URL_KEY, JSON.stringify(getAllDocs(items)))
                }
              },
              itemDefaults: {
                key: function () {
                  return this.props.id
                },
                styles: {
                  hover: {
                    color: 'darken',
                  },
                  selected: {
                    color: 'darken',
                  },
                },
                submenu: {
                  styles: {
                    color: 'lprimary-light',
                  },
                },
              },
              itemExpandable: {
                expandSingle: true,
                initCollapseLevel: 1,
              },
            },
          ],
          attrs: {
            style: {
              background: 'var(--nom-color-white)',
            },
          },
        },
        body: {
          children: [
            {
              component: 'Router',
              defaultPath: 'index',
            },
          ],
        },
      },
      _rendered: function () {
        highLight()
      },
      onQueryChange: function () {
        highLight()
      },
    }
  }
})
