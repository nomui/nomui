define([], {
    component: 'Layout',
    sider: {
        children: [
            {
                component: 'Menu',
                ref: 'javascriptMenu',
                items: [
                    {
                        text: '通用', id: 'Common',
                        items: [
                            { text: 'Structure', subtext: '结构', id: 'component', url: '#!components!index?type=component' },
                            {
                                text: 'Styles', subtext: '样式', id: 'component/styles',
                                items: [
                                    { text: 'Layout', subtext: '布局', id: 'component/styles/layout', url: '#!components!index?type=component&cat=styles/layout' }
                                ],
                            },
                            { text: 'Behavior', subtext: '行为', id: 'component/behavior', url: '#!components!index?type=component/behavior' },
                            { text: 'Events', subtext: '事件', id: 'component/events', url: '#!components!index?type=component/events' }
                        ],
                    },
                    {
                        text: '基本',
                        items: [
                            { text: 'Button', subtext: '按钮', id: 'Button', url: '#!components!index?type=Button' },
                            { text: 'ThemifyIcon', subtext: 'Themify 图标', id: 'ThemifyIcon', url: '#!components!index?type=ThemifyIcon' },
                            { text: 'Cssicon', subtext: 'css 图标', id: 'Cssicon', url: '#!components!index?type=Cssicon' },
                            { text: 'Icon', subtext: '图标', id: 'Icon', url: '#!components!index?type=Icon' },
                        ]
                    },
                    {
                        text: '布局',
                        items: [
                            { text: 'Layout', subtext: '布局', id: 'Layout', url: '#!components!index?type=Layout' },
                            { text: 'Container', subtext: '容器', id: 'Container', url: '#!components!index?type=Container' },
                            { text: 'Rows', subtext: '行布局', id: 'Rows', url: '#!components!index?type=Rows' },
                            { text: 'Cols', subtext: '列布局', id: 'Cols', url: '#!components!index?type=Cols' },
                        ],
                    },
                    {
                        text: '浮层',
                        items: [
                            { text: 'Layer', subtext: '层', id: 'Layer', url: '#!components!index?type=layer' },
                            { text: 'Popup', subtext: '触发层', id: 'Popup', url: '#!components!index?type=Popup' },
                            { text: 'Modal', subtext: '模态框', id: 'Modal', url: '#!components!index?type=Modal' },
                            { text: 'Drawer', subtext: '抽屉', id: 'Drawer', url: '#!components!index?type=Drawer' },
                            { text: 'Alert', subtext: '警告框', id: 'Alert', url: '#!components!index?type=Alert' },
                            { text: 'Message', subtext: '消息', id: 'Message', url: '#!components!index?type=Message' },
                            { text: 'Tooltip', subtext: '文字提示', id: 'Tooltip', url: '#!components!index?type=Tooltip' },
                            { text: 'Loading', subtext: '加载框', id: 'Loading', url: '#!components!index?type=Loading' }
                        ]
                    },
                    {
                        text: '导航',
                        items: [
                            { text: 'Menu', subtext: '菜单', id: 'Menu', url: '#!components!index?type=Menu' },
                            { text: 'Dropdown', subtext: '下拉菜单', id: 'Dropdown', url: '#!components!index?type=Dropdown' },
                            { text: 'Navbar', subtext: '导航条', id: 'Navbar', url: '#!components!index?type=Navbar' },
                            { text: 'Tabs', subtext: '选项卡', id: 'Tabs', url: '#!components!index?type=Tabs' },
                            { text: 'Steps', subtext: '步骤条', id: 'Steps', url: '#!components!index?type=Steps' },
                            { text: 'Pager', subtext: '分页', id: 'Pager', url: '#!components!index?type=Pager' },
                        ]
                    },
                    {
                        text: '数据展示',
                        items: [
                            { text: 'Panel', subtext: '部件', id: 'Panel', url: '#!components!index?type=Panel' },
                            { text: 'Avatar', subtext: '头像', id: 'Avatar', url: '#!components!index?type=Avatar' },
                            { text: 'Badge', subtext: '徽标', id: 'Badge', url: '#!components!index?type=Badge' },
                            { text: 'Collapse', subtext: '折叠面板', id: 'Collapse', url: '#!components!index?type=Collapse' },
                            { text: 'Empty', subtext: '空状态', id: 'Avatar', url: '#!components!index?type=Empty' },
                            { text: 'Badge', subtext: '徽标', id: 'Badge', url: '#!components!index?type=Badge' },
                            { text: 'Timeline', subtext: '时间轴', id: 'Timeline', url: '#!components!index?type=Timeline' },
                            { text: 'List', subtext: '列表', id: 'List', url: '#!components!index?type=List' },
                            { text: 'Tree', subtext: '树', id: 'Tree', url: '#!components!index?type=Tree' },
                            { text: 'Table', subtext: '普通表格', id: 'Table', url: '#!components!index?type=Table' },
                            { text: 'Grid', subtext: '高级表格', id: 'Grid', url: '#!components!index?type=Grid' },
                        ]
                    },
                    {
                        text: '数据录入',
                        items: [
                            { text: 'Textbox', subtext: '文本框', id: 'Textbox', url: '#!components!index?type=Textbox' },
                            { text: 'Multiline Textbox', subtext: '多行文本框', id: 'MultilineTextbox', url: '#!components!index?type=MultilineTextbox' },
                            { text: 'Numberbox', subtext: '数字框', id: 'Numberbox', url: '#!components!index?type=Numberbox' },
                            { text: 'Checkbox', subtext: '复选框', id: 'Checkbox', url: '#!components!index?type=Checkbox' },
                            { text: 'Switch', subtext: '开关', id: 'Switch', url: '#!components!index?type=Switch' },
                            { text: 'RadioList', subtext: '单选列表', id: 'RadioList', url: '#!components!index?type=RadioList' },
                            { text: 'CheckboxList', subtext: '多选列表', id: 'CheckboxList', url: '#!components!index?type=CheckboxList' },
                            { text: 'Select', subtext: '下拉选择', id: 'Select', url: '#!components!index?type=Select' },
                            { text: 'TreeSelect', subtext: '树选择', id: 'Select', url: '#!components!index?type=TreeSelect' },
                            { text: 'AutoComplete', subtext: '自动完成', id: 'AutoComplete', url: '#!components!index?type=AutoComplete' },
                            { text: 'Transfer', subtext: '穿梭框', id: 'Transfer', url: '#!components!index?type=Transfer' },
                            { text: 'TimePicker', subtext: '时间选择', id: 'TimePicker', url: '#!components!index?type=TimePicker' },
                            { text: 'DatePicker', subtext: '日期选择', id: 'DatePicker', url: '#!components!index?type=DatePicker' },
                            { text: 'Uploader', subtext: '上传', id: 'Uploader', url: '#!components!index?type=Uploader' },
                            { text: 'Rate', subtext: '评分', id: 'Rate', url: '#!components!index?type=Rate' },
                            { text: 'Slider', subtext: '滑动输入条', id: 'Slider', url: '#!components!index?type=Slider' },
                            { text: 'FieldRepeater', subtext: '重复字段组', id: 'forms/FieldRepeater', url: '#!components!index?type=forms/FieldRepeater' },
                            { text: 'Field', subtext: '字段', id: 'field', url: '#!components!index?type=field' },
                            { text: 'Form', subtext: '表单', id: 'form', url: '#!components!index?type=form' },
                        ]
                    },
                    {
                        text: '反馈',
                        items: [
                            { text: 'Progress', subtext: '进度条', id: 'Progress', url: '#!components!index?type=Progress' },
                            { text: 'Spinner', subtext: '加载中', id: 'Spinner', url: '#!components!index?type=Spinner' },
                            { text: 'Result', subtext: '结果', id: 'Result', url: '#!components!index?type=Result' },
                        ]
                    },
                ],
                itemDefaults: {
                    key: function () {
                        return this.props.id
                    },
                    styles: {
                        hover: {
                            color: 'darken'
                        },
                        selected: {
                            color: 'darken'
                        }
                    },
                    submenu: {
                        styles: {
                            color: 'lprimary-light'
                        }
                    }
                },
                itemExpandable: {
                    expandSingle: true,
                    initCollapseLevel: 1
                }
            }
        ],
        styles: {
            color: 'lprimary'
        }
    },
    body: {
        children: [
            {
                component: 'View',
                defaultPath: 'index'
            }
        ]
    },
    _render: function () {
        this.highLight();
    },
    events: {
        queryChange: function () {
            this.highLight();
        }
    },
    methods: {
        highLight: function () {
            var componentType = this.$route.query.type || 'component';
            if (this.$route.query.cat) {
                componentType += '/' + this.$route.query.cat;
            }
            this.refs.javascriptMenu.selectItem(componentType);
            this.refs.javascriptMenu.expandToItem(componentType);
        }
    }
});