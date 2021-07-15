define([], function () {
  return function () {
    let javascriptMenuRef = null

    const highLight = () => {
      let { type = 'component' } = this.$route.query
      const { cat } = this.$route.query
      if (cat) {
        type += `/${cat}`
      }
      javascriptMenuRef && javascriptMenuRef.selectToItem(type)
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
                      id: 'component',
                      url: '#!components!index?type=component',
                    },
                    {
                      text: 'Styles',
                      subtext: '样式',
                      id: 'component/styles',
                      items: [
                        {
                          text: 'Color',
                          subtext: '颜色',
                          id: 'component/styles/color',
                          url: '#!components!index?type=component&cat=styles/color',
                        },
                        {
                          text: 'Text',
                          subtext: '文本',
                          id: 'component/styles/text',
                          url: '#!components!index?type=component&cat=styles/text',
                        },
                      ],
                    },
                    {
                      text: 'Events',
                      subtext: '事件',
                      id: 'component/events',
                      url: '#!components!index?type=component&cat=events',
                    },
                    {
                      text: 'Behavior',
                      subtext: '行为',
                      id: 'component/behavior',
                      items: [
                        {
                          text: 'Selectable',
                          subtext: '可选中',
                          id: 'component/behavior/selectable',
                          url: '#!components!index?type=component&cat=behavior/selectable',
                        },
                        {
                          text: 'Expandable',
                          subtext: '可展开',
                          id: 'component/behavior/expandable',
                          url: '#!components!index?type=component&cat=behavior/expandable',
                        },
                      ],
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
                      text: 'Layout',
                      subtext: '布局',
                      id: 'Layout',
                      url: '#!components!index?type=Layout',
                    },
                    {
                      text: 'Container',
                      subtext: '容器',
                      id: 'Container',
                      url: '#!components!index?type=Container',
                    },
                    {
                      text: 'Flex',
                      subtext: '弹性布局',
                      id: 'Flex',
                      url: '#!components!index?type=Flex',
                    },
                    {
                      text: 'Panel',
                      subtext: '面板',
                      id: 'Panel',
                      url: '#!components!index?type=Panel',
                    },
                    {
                      text: 'Divider',
                      subtext: '分割线',
                      id: 'Divider',
                      url: '#!components!index?type=Divider',
                    },
                  ],
                },
                {
                  text: '导航',
                  items: [
                    {
                      text: 'Menu',
                      subtext: '菜单',
                      id: 'Menu',
                      url: '#!components!index?type=Menu',
                    },
                    {
                      text: 'Dropdown',
                      subtext: '下拉菜单',
                      id: 'Dropdown',
                      url: '#!components!index?type=Dropdown',
                    },
                    {
                      text: 'Toolbar',
                      subtext: '工具按钮组',
                      id: 'Toolbar',
                      url: '#!components!index?type=Toolbar',
                    },
                    {
                      text: 'Navbar',
                      subtext: '导航条',
                      id: 'Navbar',
                      url: '#!components!index?type=Navbar',
                    },
                    {
                      text: 'Tabs',
                      subtext: '选项卡',
                      id: 'Tabs',
                      url: '#!components!index?type=Tabs',
                    },
                    {
                      text: 'Pager',
                      subtext: '分页',
                      id: 'Pager',
                      url: '#!components!index?type=Pager',
                    },
                    {
                      text: 'Breadcrumb',
                      subtext: '面包屑',
                      id: 'Breadcrumb',
                      url: '#!components!index?type=Breadcrumb',
                    },
                  ],
                },
                {
                  text: '浮层',
                  items: [
                    {
                      text: 'Layer',
                      subtext: '层',
                      id: 'Layer',
                      url: '#!components!index?type=Layer',
                    },
                    {
                      text: 'Popup',
                      subtext: '触发层',
                      id: 'Popup',
                      url: '#!components!index?type=Popup',
                    },
                    {
                      text: 'Popconfirm',
                      subtext: '弹出确认框',
                      id: 'Popconfirm',
                      url: '#!components!index?type=Popconfirm',
                    },
                    {
                      text: 'Modal',
                      subtext: '模态框',
                      id: 'Modal',
                      url: '#!components!index?type=Modal',
                    },
                    {
                      text: 'Drawer',
                      subtext: '抽屉',
                      id: 'Drawer',
                      url: '#!components!index?type=Drawer',
                    },
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
                      text: 'Message',
                      subtext: '消息',
                      id: 'Message',
                      url: '#!components!index?type=Message',
                    },
                    {
                      text: 'Notification',
                      subtext: '通知',
                      id: 'Notification',
                      url: '#!components!index?type=Notification',
                    },
                    {
                      text: 'Tooltip',
                      subtext: '文字提示',
                      id: 'Tooltip',
                      url: '#!components!index?type=Tooltip',
                    },
                    {
                      text: 'Loading',
                      subtext: '加载框',
                      id: 'Loading',
                      url: '#!components!index?type=Loading',
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
                      text: 'Timeline',
                      subtext: '时间轴',
                      id: 'Timeline',
                      url: '#!components!index?type=Timeline',
                    },
                    {
                      text: 'List',
                      subtext: '列表',
                      id: 'List',
                      url: '#!components!index?type=List',
                    },
                    {
                      text: 'Tag',
                      subtext: '标签',
                      id: 'Tag',
                      url: '#!components!index?type=Tag',
                    },
                    {
                      text: 'Tree',
                      subtext: '树',
                      id: 'Tree',
                      url: '#!components!index?type=Tree',
                    },
                    {
                      text: 'Table',
                      subtext: '普通表格',
                      id: 'Table',
                      url: '#!components!index?type=Table',
                    },
                    {
                      text: 'Grid',
                      subtext: '高级表格',
                      id: 'Grid',
                      url: '#!components!index?type=Grid',
                    },
                    {
                      text: 'Statistic',
                      subtext: '统计数值',
                      id: 'Statistic',
                      url: '#!components!index?type=Statistic',
                    },
                    {
                      text: 'Countdown',
                      id: 'Countdown',
                      subtext: '倒计时',
                      url: '#!components!index?type=Countdown',
                    },
                    {
                      text: 'Carousel',
                      id: 'Carousel',
                      subtext: '走马灯',
                      url: '#!components!index?type=Carousel',
                    },
                  ],
                },
                {
                  text: '数据录入',
                  items: [
                    {
                      text: 'Textbox',
                      subtext: '文本框',
                      id: 'Textbox',
                      url: '#!components!index?type=Textbox',
                    },
                    {
                      text: 'Password',
                      subtext: '密码框',
                      id: 'Password',
                      url: '#!components!index?type=Password',
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
                      text: 'NumberSpinner',
                      subtext: '数字微调器',
                      id: 'NumberSpinner',
                      url: '#!components!index?type=NumberSpinner',
                    },
                    {
                      text: 'Checkbox',
                      subtext: '复选框',
                      id: 'Checkbox',
                      url: '#!components!index?type=Checkbox',
                    },
                    {
                      text: 'Switch',
                      subtext: '开关',
                      id: 'Switch',
                      url: '#!components!index?type=Switch',
                    },
                    {
                      text: 'RadioList',
                      subtext: '单选列表',
                      id: 'RadioList',
                      url: '#!components!index?type=RadioList',
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
                      text: 'Select',
                      subtext: '下拉选择',
                      id: 'Select',
                      url: '#!components!index?type=Select',
                    },
                    {
                      text: 'Cascader',
                      subtext: '级联选择',
                      id: 'Cascader',
                      url: '#!components!index?type=Cascader',
                    },
                    {
                      text: 'TreeSelect',
                      subtext: '树选择',
                      id: 'TreeSelect',
                      url: '#!components!index?type=TreeSelect',
                    },
                    {
                      text: 'AutoComplete',
                      subtext: '自动完成',
                      id: 'AutoComplete',
                      url: '#!components!index?type=AutoComplete',
                    },
                    {
                      text: 'Transfer',
                      subtext: '穿梭框',
                      id: 'Transfer',
                      url: '#!components!index?type=Transfer',
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
                      text: 'Uploader',
                      subtext: '上传',
                      id: 'Uploader',
                      url: '#!components!index?type=Uploader',
                    },
                    {
                      text: 'Rate',
                      subtext: '评分',
                      id: 'Rate',
                      url: '#!components!index?type=Rate',
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
                      text: 'Field',
                      subtext: '字段',
                      id: 'field',
                      url: '#!components!index?type=field',
                    },
                    {
                      text: 'Group',
                      subtext: '字段组',
                      id: 'Group',
                      url: '#!components!index?type=Group',
                    },
                    {
                      text: 'GroupList',
                      subtext: '字段组列表',
                      id: 'GroupList',
                      url: '#!components!index?type=GroupList',
                    },
                    {
                      text: 'Form',
                      subtext: '表单',
                      id: 'form',
                      url: '#!components!index?type=form',
                    },
                  ],
                },
                {
                  text: '反馈',
                  items: [
                    {
                      text: 'Progress',
                      subtext: '进度条',
                      id: 'Progress',
                      url: '#!components!index?type=Progress',
                    },
                    {
                      text: 'Spinner',
                      subtext: '加载中',
                      id: 'Spinner',
                      url: '#!components!index?type=Spinner',
                    },
                    {
                      text: 'Empty',
                      subtext: '空状态',
                      id: 'Empty',
                      url: '#!components!index?type=Empty',
                    },
                    {
                      text: 'Result',
                      subtext: '结果',
                      id: 'Result',
                      url: '#!components!index?type=Result',
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
                      text: 'SlideCaptcha',
                      subtext: '拖拽验证码',
                      id: 'SlideCaptcha',
                      url: '#!components!index?type=SlideCaptcha',
                    },
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
                  ],
                },
              ],
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
          styles: {
            color: 'lprimary',
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
