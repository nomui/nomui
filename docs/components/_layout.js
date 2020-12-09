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
                            { text: 'Structure', subtext: '结构', id: 'component', url: '#!components!demo?type=component' },
                            {
                                text: 'Styles', subtext: '样式', id: 'component/styles',
                                items: [
                                    { text: 'Layout', subtext: '布局', id: 'component/styles/layout', url: '#!components!demo?type=component&cat=styles/layout' }
                                ],
                            },
                            { text: 'Behavior', subtext: '行为', id: 'component/behavior', url: '#!components!demo?type=component/behavior' },
                            { text: 'Events', subtext: '事件', id: 'component/events', url: '#!components!demo?type=component/events' }
                        ],
                    },
                    {
                        text: '基本',
                        items: [
                            { text: 'Button', subtext: '按钮', id: 'Button', url: '#!components!demo?type=Button' },
                            { text: 'Cssicon', subtext: 'css 图标', id: 'Cssicon', url: '#!components!demo?type=Cssicon' },
                            { text: 'Icon', subtext: '图标', id: 'Icon', url: '#!components!demo?type=Icon' },
                        ]
                    },
                    {
                        text: '布局',
                        items: [
                            { text: 'Layout', subtext: '布局', id: 'Layout', url: '#!components!demo?type=Layout' },
                            { text: 'Container', subtext: '容器', id: 'Container', url: '#!components!demo?type=Container' },
                        ],
                    },
                    {
                        text: '浮层',
                        items: [
                            { text: 'Layer', subtext: '层', id: 'Layer', url: '#!components!demo?type=layer' },
                            { text: 'Popup', subtext: '触发层', id: 'Popup', url: '#!components!demo?type=Popup' },
                            { text: 'Modal', subtext: '模态框', id: 'Modal', url: '#!components!demo?type=Modal' },
                            { text: 'Drawer', subtext: '抽屉', id: 'Drawer', url: '#!components!demo?type=Drawer' },
                            { text: 'Alert', subtext: '警告框', id: 'Alert', url: '#!components!demo?type=Alert' },
                            { text: 'Message', subtext: '消息', id: 'Message', url: '#!components!demo?type=Message' },
                            { text: 'Loading', subtext: '加载框', id: 'Loading', url: '#!components!demo?type=Loading' }
                        ]
                    },
                    {
                        text: '导航',
                        items: [
                            { text: 'Menu', subtext: '菜单', id: 'Menu', url: '#!components!demo?type=Menu' },
                            { text: 'Dropdown', subtext: '下拉菜单', id: 'Dropdown', url: '#!components!demo?type=Dropdown' },
                            { text: 'Navbar', subtext: '导航条', id: 'Navbar', url: '#!components!demo?type=Navbar' },
                            { text: 'Tabs', subtext: '选项卡', id: 'Tabs', url: '#!components!demo?type=Tabs' },
                            { text: 'Steps', subtext: '步骤条', id: 'Steps', url: '#!components!demo?type=Steps' },
                            { text: 'Pager', subtext: '分页', id: 'Pager', url: '#!components!demo?type=Pager' },
                        ]
                    },
                    {
                        text: '数据展示',
                        items: [
                            { text: 'Avatar', subtext: '头像', id: 'Avatar', url: '#!components!demo?type=Avatar' },
                            { text: 'Badge', subtext: '徽标', id: 'Badge', url: '#!components!demo?type=Badge' },
                            { text: 'Collapse', subtext: '折叠面板', id: 'Collapse', url: '#!components!demo?type=Collapse' },
                            { text: 'Empty', subtext: '空状态', id: 'Avatar', url: '#!components!demo?type=Empty' },
                            { text: 'Badge', subtext: '徽标', id: 'Badge', url: '#!components!demo?type=Badge' },
                            { text: 'Timeline', subtext: '时间轴', id: 'Timeline', url: '#!components!demo?type=Timeline' },
                            { text: 'List', subtext: '列表', id: 'List', url: '#!components!demo?type=List' },
                            { text: 'Tree', subtext: '树', id: 'Tree', url: '#!components!demo?type=Tree' },
                            { text: 'Table', subtext: '普通表格', id: 'Table', url: '#!components!demo?type=Table' },
                            { text: 'Grid', subtext: '高级表格', id: 'Grid', url: '#!components!demo?type=Grid' },
                        ]
                    },
                    {
                        text: '数据录入',
                        items: [
                            { text: 'Textbox', subtext: '文本框', id: 'Textbox', url: '#!components!demo?type=Textbox' },
                            { text: 'Multiline Textbox', subtext: '多行文本框', id: 'MultilineTextbox', url: '#!components!demo?type=MultilineTextbox' },
                            { text: 'Numberbox', subtext: '数字框', id: 'Numberbox', url: '#!components!demo?type=Numberbox' },
                            { text: 'Checkbox', subtext: '复选框', id: 'Checkbox', url: '#!components!demo?type=Checkbox' },
                            { text: 'Switch', subtext: '开关', id: 'Switch', url: '#!components!demo?type=Switch' },
                            { text: 'RadioList', subtext: '单选列表', id: 'RadioList', url: '#!components!demo?type=RadioList' },
                            { text: 'CheckboxList', subtext: '多选列表', id: 'CheckboxList', url: '#!components!demo?type=CheckboxList' },
                            { text: 'Select', subtext: '下拉选择', id: 'Select', url: '#!components!demo?type=Select' },
                            { text: 'TreeSelect', subtext: '树选择', id: 'Select', url: '#!components!demo?type=TreeSelect' },
                            { text: 'AutoComplete', subtext: '自动完成', id: 'AutoComplete', url: '#!components!demo?type=AutoComplete' },
                            { text: 'Transfer', subtext: '穿梭框', id: 'Transfer', url: '#!components!demo?type=Transfer' },
                            { text: 'TimePicker', subtext: '时间选择', id: 'TimePicker', url: '#!components!demo?type=TimePicker' },
                            { text: 'DatePicker', subtext: '日期选择', id: 'DatePicker', url: '#!components!demo?type=DatePicker' },
                            { text: 'Uploader', subtext: '上传', id: 'Uploader', url: '#!components!demo?type=Uploader' },
                            { text: 'Rate', subtext: '评分', id: 'Rate', url: '#!components!demo?type=Rate' },
                            { text: 'Slider', subtext: '滑动输入条', id: 'Slider', url: '#!components!demo?type=Slider' },
                            { text: 'FieldRepeater', subtext: '重复字段组', id: 'forms/FieldRepeater', url: '#!components!demo?type=forms/FieldRepeater' },
                            { text: 'Field', subtext: '字段', id: 'field', url: '#!components!demo?type=field' },
                            { text: 'Form', subtext: '表单', id: 'form', url: '#!components!demo?type=form' },
                        ]
                    },
                    {
                        text: '反馈',
                        items: [
                            { text: 'Progress', subtext: '进度条', id: 'Progress', url: '#!components!demo?type=Progress' },
                            { text: 'Spin', subtext: '加载中', id: 'Spin', url: '#!components!demo?type=Spin' },
                            { text: 'Result', subtext: '结果', id: 'Result', url: '#!components!demo?type=Result' },
                        ]
                    },
                ],
                itemDefaults: {
                    key: function () {
                        return this.props.id
                    },
                    styles: {
                        hover: {
                            bg: 'darken'
                        },
                        selected: {
                            bg: 'darken'
                        }
                    },
                    submenu: {
                        styles: {
                            bg: 'lprimary-light'
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
            bg: 'lprimary'
        }
    },
    body: {
        children: [
            {
                component: 'View',
                defaultPath: 'demo'
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
            var componentType = this.route.query.type || 'component';
            if (this.route.query.cat) {
                componentType += '/' + this.route.query.cat;
            }
            this.refs.javascriptMenu.selectItem(componentType);
            this.refs.javascriptMenu.expandToItem(componentType);
        }
    }
});