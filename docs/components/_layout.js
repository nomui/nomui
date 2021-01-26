define([], function () {
  return function () {
    let javascriptMenu = null

    const highLight = () => {
      let { type = 'component' } = this.$route.query
      const { cat } = this.$route.query
      if (cat) {
        type += `/${cat}`
      }
      javascriptMenu && javascriptMenu.selectItem(type)
      javascriptMenu && javascriptMenu.expandToItem(type)
    }

    return {
      view: {
        component: 'Layout',
        sider: {
          children: [
            {
              component: 'Menu',
              ref: (c) => {
                javascriptMenu = c
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
                          text: 'Layout',
                          subtext: '布局',
                          id: 'component/styles/layout',
                          url: '#!components!index?type=component&cat=styles/layout',
                        },
                      ],
                    },
                    {
                      text: 'Behavior',
                      subtext: '行为',
                      id: 'component/behavior',
                      url: '#!components!index?type=component/behavior',
                    },
                    {
                      text: 'Events',
                      subtext: '事件',
                      id: 'component/events',
                      url: '#!components!index?type=component/events',
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
                      text: 'Rows',
                      subtext: '行布局',
                      id: 'Rows',
                      url: '#!components!index?type=Rows',
                    },
                    {
                      text: 'Cols',
                      subtext: '列布局',
                      id: 'Cols',
                      url: '#!components!index?type=Cols',
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
                      text: 'Steps',
                      subtext: '步骤条',
                      id: 'Steps',
                      url: '#!components!index?type=Steps',
                    },
                    {
                      text: 'Pager',
                      subtext: '分页',
                      id: 'Pager',
                      url: '#!components!index?type=Pager',
                    },
                  ],
                },
                {
                  text: '数据展示',
                  items: [
                    {
                      text: 'Panel',
                      subtext: '面板',
                      id: 'Panel',
                      url: '#!components!index?type=Panel',
                    },
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
                      text: 'Collapse',
                      subtext: '折叠面板',
                      id: 'Collapse',
                      url: '#!components!index?type=Collapse',
                    },
                    {
                      text: 'Empty',
                      subtext: '空状态',
                      id: 'Empty',
                      url: '#!components!index?type=Empty',
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
                      text: 'Select',
                      subtext: '下拉选择',
                      id: 'Select',
                      url: '#!components!index?type=Select',
                    },
                    {
                      text: 'TreeSelect',
                      subtext: '树选择',
                      id: 'TreeSelect',
                      url: '#!components!index?type=TreeSelect',
                    },
                    {
                      text: 'Cascader',
                      subtext: '级联选择',
                      id: 'Cascader',
                      url: '#!components!index?type=Cascader',
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
                      text: 'DatePicker',
                      subtext: '日期选择',
                      id: 'DatePicker',
                      url: '#!components!index?type=DatePicker',
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
                      text: 'Result',
                      subtext: '结果',
                      id: 'Result',
                      url: '#!components!index?type=Result',
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
