# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.6.0](https://github.com/nomui/nomui/compare/v1.5.0...v1.6.0) (2025-04-02)


### Features

* 单选列表以及多选列表支持自定义内容渲染 ([5b068d3](https://github.com/nomui/nomui/commit/5b068d36200aaa91e7bc78749bed2301766f5123))
* 新增公共方法copyToClipboard ([31fa7e6](https://github.com/nomui/nomui/commit/31fa7e65b232f556953688e20946e8a0005eb285))
* 修改日期与年周转换的公共方法，支持返账年周字符串 ([e609ed4](https://github.com/nomui/nomui/commit/e609ed454d8a0842817b4e88399b92ae17322444))
* 优化公共方法 ([c5229a4](https://github.com/nomui/nomui/commit/c5229a4607dc95556db4573353edc3f82e309321))
* 组件支持配置placeholderProps ([03181a6](https://github.com/nomui/nomui/commit/03181a6b14869a0d030f9cf21b809507c5ebc8f6))
* **Cascader:** 支持多选并添加案例 ([3c8a526](https://github.com/nomui/nomui/commit/3c8a526ea644509e47773b974d33b06f184856d5))
* **Component:** 新增初始设置 selected 为 true 时是否触发事件；DataList 组件新增 itemSelectable.defaultSelectFirst 属性指示是否默认选择第一项。 ([17e583e](https://github.com/nomui/nomui/commit/17e583ec7cae00cf715093fd6279379ad45161e2))
* **DatePicker:** 交互方式对小白更友好 ([ccd8873](https://github.com/nomui/nomui/commit/ccd8873bf5f4cc9244f2a99e7a37e55f73431172))
* **DatePicker:** 新增周选择功能 ([0d1c496](https://github.com/nomui/nomui/commit/0d1c496b9f1074a2f85c8a0bd864ae0b9c49e5ee))
* **DatePicker:** 新增周选择模式 ([ddcb58b](https://github.com/nomui/nomui/commit/ddcb58b8259a042338a58d0f503c4637b75ac0d5))
* **DatePicker:** 周模式新增显示日期范围配置 ([9eac553](https://github.com/nomui/nomui/commit/9eac55369dc615de0a0a5eabf5cef562ab73ae02))
* **DatePicker:** 周选择模式下添加对象取值 ([f79925d](https://github.com/nomui/nomui/commit/f79925dc8de1bdf17e8ffbb1aacd630793a1a914))
* **Field:** 清空重置表单时不自动触发校验 ([ad114a3](https://github.com/nomui/nomui/commit/ad114a3755cbc7f32f71708017b6fbd3105a614c))
* **Field:** 新增独立配置action对齐方式 ([30191cc](https://github.com/nomui/nomui/commit/30191ccb303b02594b4995a35517661865336ef0))
* **Field:** 新增监听兄弟字段值变化钩子 ([f3dd925](https://github.com/nomui/nomui/commit/f3dd925c6aeeadff8ab02878cfc4ede0754bd526))
* **Field:** 新增紧凑模式配置 ([b0084f6](https://github.com/nomui/nomui/commit/b0084f63e146046cee7ca28afda6877488a305a6))
* **Grid:** 编辑模式支持修改值后立刻触发数据更新 ([7c0f5c0](https://github.com/nomui/nomui/commit/7c0f5c0c742acd03833c57a5661fbb6ced5beed5))
* **Grid:** 删除行的时候支持同时移除它的展开内容 ([a7b8505](https://github.com/nomui/nomui/commit/a7b850585d13ce82e509b5363cfdf60e8c37e2f3))
* **Grid:** 实现前端懒加载 ([5e91801](https://github.com/nomui/nomui/commit/5e91801c550879aaceb34ae3e9d86020c3877326))
* **Grid:** 新增后端懒加载 ([7c54390](https://github.com/nomui/nomui/commit/7c54390c8ac9081c604a23a43b01250a192dac63))
* **Grid:** 优化底层代码,新增树状结构小计与合计支持 ([44dc7c7](https://github.com/nomui/nomui/commit/44dc7c76ae76489f4081923a2fe622953ba6d37a))
* **Grid:** 自动滚动时支持自动查找父级overflow元素 ([48d1fae](https://github.com/nomui/nomui/commit/48d1fae61f9800d345f72ea4c7498e1bee989da1))
* **Group:** 优化getField方法 ([afed2aa](https://github.com/nomui/nomui/commit/afed2aa5d4fe3e9a6f6d901e074021c3d13ff731))
* **ListSetter:** 支持不显示列表项表单 ([9b48328](https://github.com/nomui/nomui/commit/9b48328629114ae6e72c208d1d9fc42018b1fec1))
* **Menu:** 实现菜单各级内部排序 ([c4e5037](https://github.com/nomui/nomui/commit/c4e5037b43c2ae5c159b5be5860e5e7f4a691eb0))
* **Menu:** 支持各级别排序 ([f09b03f](https://github.com/nomui/nomui/commit/f09b03f74e4d999ca7d474cf3f2cf7c09f1accc9))
* **Pager:** 简洁模式下有独立的浮层配置每页显示条数 ([be2ba65](https://github.com/nomui/nomui/commit/be2ba65b2d2df47a8a4799b019278c7462542c71))
* **Pager:** 新增自定义每页显示数量配置 ([7569c15](https://github.com/nomui/nomui/commit/7569c158f2585ca0795e69276295df5c1711fb24))
* **PartialDatePicker:** 支持UTC格式默认值 ([f4a183b](https://github.com/nomui/nomui/commit/f4a183b5087d31a030cdad0cef1b2db96998f776))
* **Select:** 新增额外工具栏配置 ([3bf1e87](https://github.com/nomui/nomui/commit/3bf1e8758a346ad553f0d8a33c076ca5bacf9680))
* **Select:** 新增搜索结果为空时的提示配置 ([983cf97](https://github.com/nomui/nomui/commit/983cf97aae4301270285ac4c3ce9c50bdc7ea78e))
* **Toolbar:** 支持自定义下拉菜单class ([57fde89](https://github.com/nomui/nomui/commit/57fde89772571e1ffd36929706882f22302cdcfc))
* **Tree:** 节点更新后会保存折叠状态 ([1b2f45a](https://github.com/nomui/nomui/commit/1b2f45a81b5c5847e74709168ceb5407c5df6364))
* **Uploader:** 上传成功与删除后会触发onValueChange事件 ([efc1ce0](https://github.com/nomui/nomui/commit/efc1ce0a21228fc24c2a31e18a16dec70372ab16))


### Bug Fixes

* 公共方法格式化时间不支持时区的问题 ([ec289b3](https://github.com/nomui/nomui/commit/ec289b3c27d9f01fe879aff73a106a783d461a04))
* 基类setProps方法如果参数内有children，不再合并children项 ([28e1507](https://github.com/nomui/nomui/commit/28e1507d293da0905f7fc5690d684312e4cc3fff))
* 监听位置错误 ([a0b4689](https://github.com/nomui/nomui/commit/a0b4689f4320c60ccb555016bc69363a3cd6bfd2))
* 修复一处js报错 ([58e5870](https://github.com/nomui/nomui/commit/58e587021b022cd21a840ada981e170eaae28ff5))
* 修复一个bug ([62ec051](https://github.com/nomui/nomui/commit/62ec051463eecc8119da64c44d503b2182056194))
* 组件内部报错导致没有正常渲染切换组件页面假死问题 ([bea6d8e](https://github.com/nomui/nomui/commit/bea6d8efcec1054c0172993e3dd6152da34ef3e8))
* 组件有onCreated方法并且返回Promise的时候表单中表单项顺序会变成最后的问题 ([1811fc8](https://github.com/nomui/nomui/commit/1811fc8bf8a291fa266876fb2799b901678001c3))
* **AutoComplete:** 修复一个bug ([22ed35d](https://github.com/nomui/nomui/commit/22ed35d869b459cd7021513bfe467d282be6c965))
* avatar 缩放以及位置计算在非可见状态下会计算错误；更换成监听可见状态来重置 scale ([9719d2f](https://github.com/nomui/nomui/commit/9719d2fc17a82c36ba21a66a2a6deafa1b685fe0))
* **Avatar:** 处理js报错 ([bcde7cc](https://github.com/nomui/nomui/commit/bcde7ccecf611bc04866fc6db2dcb76aa93975ad))
* **Carousel:** 解决不能更新图片的问题 ([d0f47d7](https://github.com/nomui/nomui/commit/d0f47d78bd05974ee11b04da3e8aba16caa48c33))
* **Carousel:** 自动播放多次更新时错乱 ([81593d3](https://github.com/nomui/nomui/commit/81593d3cd10ddf8b57af820d2d085feb198e3499))
* **Cascader:** 解决在屏幕空间不够的时候浮层错位问题 ([58ae3a0](https://github.com/nomui/nomui/commit/58ae3a02063d353a1c2fb9701a5867989ef04448))
* **ColorPicker:** 部分场景取值报错 ([adc3d06](https://github.com/nomui/nomui/commit/adc3d0695a020d64882f3919f78a44fc40c497ad))
* **DatePicker:** 部分场景报错的问题 ([b294866](https://github.com/nomui/nomui/commit/b294866ad4505291feee05a1f4c7496b233d9ea3))
* **DatePicker:** 处理一处跨年选择时间的错误 ([beef032](https://github.com/nomui/nomui/commit/beef0327a48cf2483dea162f74d2e1e8a7520ed3))
* **DatePicker:** 处理一处js报错 ([8081ebc](https://github.com/nomui/nomui/commit/8081ebce85cf8d5cd64f35b534b9c78562785ef0))
* **DatePicker:** 修复一个样式问题 ([3b7cf21](https://github.com/nomui/nomui/commit/3b7cf218c70430d7596c3308b5f6c600a6f2b159))
* **Field:** 字段校验提示被遮挡问题 ([22794ff](https://github.com/nomui/nomui/commit/22794ffd7dc32398a3f1b84a18e90f936815e97f))
* **Grid:** 编辑模式与树状表格的显示冲突 ([f5fc549](https://github.com/nomui/nomui/commit/f5fc54913e5dd8cfde0448e651af0ea4344a7323))
* **Grid:** 表格编辑功能与旧功能的样式冲突 ([fb8df0c](https://github.com/nomui/nomui/commit/fb8df0c16d3c9a85c3371a99da872647df80f136))
* **Grid:** 表格编辑模式显示问题 ([dc24cfa](https://github.com/nomui/nomui/commit/dc24cfa303ccf44d101da3e06621072ebf167e15))
* **Grid:** 勾选会触发行点击事件 ([41d57cb](https://github.com/nomui/nomui/commit/41d57cb7db79ce30e6616c677dc7258b0e66c786))
* **Grid:** 兼容列为空的情况 ([850f6f3](https://github.com/nomui/nomui/commit/850f6f3381289f4635e0d38a4bfa7b18e5342cde))
* **Grid:** 解决excelMode一个渲染bug ([bd38cdd](https://github.com/nomui/nomui/commit/bd38cdd74c76d56fa1cedfb0566cd773fd1679b0))
* **Grid:** 树状表格与其他新功能样式冲突 ([6017102](https://github.com/nomui/nomui/commit/6017102797318e2148a37ea873619c203471c37b))
* **Grid:** 拖拽列宽在特殊场景造成样式错误 ([343b799](https://github.com/nomui/nomui/commit/343b799f474c2ad75e3a2d59b921bd9cd97620eb))
* **Grid:** 行点击事件与编辑模式冲突 ([a9db550](https://github.com/nomui/nomui/commit/a9db550d65547073c48d9ddcad531a5f7b9db06e))
* **Grid:** 修复行展开功能下数据获取bug以及拖拽造成数据混乱问题 ([1965b6f](https://github.com/nomui/nomui/commit/1965b6f54a4a39e66e7209ba1a5353b1c7d84da6))
* **Grid:** 修复一个bug ([9eb3e0b](https://github.com/nomui/nomui/commit/9eb3e0bdfa4b8c57dfb2cc7c51db072583c7a8a9))
* **Group:** 访问fields可能导致报错的问题 ([7c88e82](https://github.com/nomui/nomui/commit/7c88e8206552980fb220930748c59778a31fb5a0))
* **GroupList:** 必填校验提示问题 ([fe66807](https://github.com/nomui/nomui/commit/fe66807b2843ff35245b1d34d46eda3951981603))
* **GroupList:** 必填校验bug ([7e346ff](https://github.com/nomui/nomui/commit/7e346ff26293e3799a4e65d509b7d963148910f1))
* **ListSetter:** 修复一个bug ([826ab17](https://github.com/nomui/nomui/commit/826ab17c57ea322d181c390427dc9079a852b9cd))
* **Loading:** 遮罩消失的bug ([126a4d2](https://github.com/nomui/nomui/commit/126a4d29220b10b44432b6cf0ef2f6c3ad73ceb7))
* **Menu:** 横向菜单与纵向菜单排序采用不同逻辑 ([b32e6b0](https://github.com/nomui/nomui/commit/b32e6b03b65d8a8f05826c7f1bce74713b1c9eb7))
* **Pager:** 修复一个bug ([f8f79ea](https://github.com/nomui/nomui/commit/f8f79eaa03949b067d13478b48e001c4da3db511))
* **Select:** 在下拉框显示状态时更新options会导致第一次赋值有问题 ([870848c](https://github.com/nomui/nomui/commit/870848cc56022d506a78de8ad762775d793a4b63))
* **Textbox:** minLength未正确校验的问题 ([d5bc4b9](https://github.com/nomui/nomui/commit/d5bc4b9e05d7ddf718782f4188e17193751c4747))
* **Tooltip:** 优化一个位置计算错误 ([08ba8fd](https://github.com/nomui/nomui/commit/08ba8fd29ad59b534c3efd888597ff50b737d730))
* **TreeSelect:** 修复一个多选单选切换bug ([95d661e](https://github.com/nomui/nomui/commit/95d661e8580b9e3889d91a558c1875d0f574da97))
* **TreeSelect:** 修复一系列历史bug ([4bb9e70](https://github.com/nomui/nomui/commit/4bb9e700300e7d7a01c9294ede5837c7f119288e))
* **Uploader:** 校验未通过时不能自动focus ([55d6104](https://github.com/nomui/nomui/commit/55d6104814b30dc61fc99510c6170dec5f4031b5))
* **Utils:** 优化deepEqual方法,并支持日期值对比 ([2872aeb](https://github.com/nomui/nomui/commit/2872aeb26515526318741a19fe67b4cda98bbbe8))


### Docs

* 更新多语言配置 ([8d68de8](https://github.com/nomui/nomui/commit/8d68de8a65a1db943171bdbf47c3a55b4ead5c03))
* 更新文档 ([33384c9](https://github.com/nomui/nomui/commit/33384c9943f17bbba49510489fae30ae886feb40))
* 文档案例更新 ([8308254](https://github.com/nomui/nomui/commit/83082543fa7732af73c48cb72ee67ab3eb6cf8ab))
* 文档更新 ([02bc569](https://github.com/nomui/nomui/commit/02bc5696d198f66f83e4b25ac95af82f74e3705d))
* 文档更新 ([f19b3a0](https://github.com/nomui/nomui/commit/f19b3a02bc10821f50991080b34befad64104350))
* 文档更新 ([dd9fd94](https://github.com/nomui/nomui/commit/dd9fd949b70f7366327a2ed8a6fa996df15e10de))
* 文档更新 ([18898f8](https://github.com/nomui/nomui/commit/18898f8858422ebdf55d23802671748b1a83eb4b))
* 新增级联案例 ([03cbf47](https://github.com/nomui/nomui/commit/03cbf47b4fc35bddf06f7504ef9905159a82682a))
* List案例更新 ([7f32aa6](https://github.com/nomui/nomui/commit/7f32aa632adb9e9d58ef38e5ed47e4835ad36265))

## [1.5.0](https://github.com/nomui/nomui/compare/v1.4.1...v1.5.0) (2024-12-24)


### Features

* 公共方法新增deepEqual判断两个对象是否内容相同 ([5b96786](https://github.com/nomui/nomui/commit/5b96786a2a39c18ca67fd4ebec6e405435f34a81))
* 修改children为 extra ([ad84a65](https://github.com/nomui/nomui/commit/ad84a65526ef29aed54ca58dfaaf4e78f954636d))
* 针对GroupList GroupGrid必填校验做特殊处理 ([62bfefb](https://github.com/nomui/nomui/commit/62bfefb0d916df6ad77d10ecb2dd97286fbd68c1))
* **AutoComplete:** 启用搜索时默认用自身组件作为搜索框 ([1922f3d](https://github.com/nomui/nomui/commit/1922f3d774d54de3d81cf7303b8b130cc09681b7))
* **AutoComplete:** 完善optionFields使用逻辑 ([7e00eb0](https://github.com/nomui/nomui/commit/7e00eb0c75ed17e491f25c2fbb14cacc3a2bacfa))
* **AutoComplete:** 新增配置项延迟触发valueChange ([c26ef34](https://github.com/nomui/nomui/commit/c26ef340b9b90aebe7bfb952490e78d56ccf190f))
* **AutoComplete:** 远程搜索支持使用共享输入框作为搜索框 ([e26379c](https://github.com/nomui/nomui/commit/e26379c50b35cf4f6801353791b1f45ed17dcc2e))
* avatar 支持追加自定义children ([a02c4ec](https://github.com/nomui/nomui/commit/a02c4eccb04e536f075429c4774d4c97ef029e73))
* **CheckboxList:** 新增fieldName配置 ([4649b0a](https://github.com/nomui/nomui/commit/4649b0af355b31d1a69f5630baeafe4643354001))
* **ColorPicker:** 支持hex色值以及自定义数据源 ([905cf78](https://github.com/nomui/nomui/commit/905cf78e27b1c6b266415cbce7ea5c892f46db24))
* **Grid:** 实现类似excel的单元格编辑功能 ([4c6b4a5](https://github.com/nomui/nomui/commit/4c6b4a535547ae97877afa0d1f9849f247695f74))
* **Grid:** 新增editable传统单元格编辑模式 & 字段类型组件新增triggetEdit方法 ([60a5385](https://github.com/nomui/nomui/commit/60a5385c9fc134128dde5ec844a35c76c3d788be))
* **Grid:** 行展开支持动态控制，并且无内容时不现实展开箭头 ([e3274ba](https://github.com/nomui/nomui/commit/e3274baead0e66f2213c710654b3442325234e5f))
* **Grid:** excelMode单元格编辑支持规则校验 ([ef5c572](https://github.com/nomui/nomui/commit/ef5c5729b00396e57952d779232c12bdf75907b5))
* **Grid:** excelMode回调同时传出旧值，优化文档 ([7aefa92](https://github.com/nomui/nomui/commit/7aefa9221b70335a1ec77cb58ef6d48e773ea2e9))
* **Grid:** excelMode支持部分单元格不编辑 ([79eaa83](https://github.com/nomui/nomui/commit/79eaa83b7808a9aaec0ec1c3abdfe8f6f9848739))
* **Group:** 通过设置 setValue 方法的 options 的 ignoreNone 值为 true，则未提供值的字段不会被设置。 ([596fea8](https://github.com/nomui/nomui/commit/596fea85378315c826cc9d8f0f287067047764eb))
* **ListSetter:** 新增选项是否可以删除的判断函数 ([7f017cb](https://github.com/nomui/nomui/commit/7f017cb66144f111038382e74578796127ba3add))
* **RadioList:** 新增canRevert取消选中配置,并默认为true ([edbdefd](https://github.com/nomui/nomui/commit/edbdefdcaa1f254a5c99dc49f929e40abf8915ef))
* Tag 组件新增边框颜色配置项 ([be01fda](https://github.com/nomui/nomui/commit/be01fda23539c5bf6430779cee4d56195e2a46ea))
* **Toolbar:** 新增配置是否阻止冒泡 ([e85983b](https://github.com/nomui/nomui/commit/e85983b0aaa35882fbd80a587404db75a906fd15))
* **Tooltip:** 新增配置忽略鼠标移入移出事件 ([f18e924](https://github.com/nomui/nomui/commit/f18e924cc5064c03795d5aa695d2e6b9f580c97f))


### Bug Fixes

* 计算 scale的时候使用的是 lastChildren 导致计算错位 ([6995417](https://github.com/nomui/nomui/commit/69954176cd9b4d05ad93f38dc9c94e60337c02e2))
* **AutoComplete:** 远程搜索判断函数 ([e7134e4](https://github.com/nomui/nomui/commit/e7134e435d6386040459d8793e2a238062b78db9))
* **Cascader:** excelMode下点击事件bug ([b76e83d](https://github.com/nomui/nomui/commit/b76e83dfac705755911b05f77d5ef17deea82827))
* **CheckboxList:** 修复赋值会合并旧值的问题 ([6dd2ae1](https://github.com/nomui/nomui/commit/6dd2ae15bd08635e4db58923df4119ec2123cde7))
* **Grid:** 列设置按钮引发的报错问题 ([14fd6e4](https://github.com/nomui/nomui/commit/14fd6e4668b19c70538fbcc981226793d1845500))
* **Grid:** appendRow时空提示不消失问题 ([bbbfe40](https://github.com/nomui/nomui/commit/bbbfe40d7ee79a4781512d72e36a9a24b3d7fae1))
* **Grid:** excel模式失焦判定优化 ([5fc9b2d](https://github.com/nomui/nomui/commit/5fc9b2db5b4addef278afda3360178885cd01bd6))
* **Grid:** excelMode结束编辑不再立刻更新单元格 ([f813e5d](https://github.com/nomui/nomui/commit/f813e5db4fc957f82f0ad36c6d7dffa642717692))
* **GroupGrid:** setValue方法options未生效问题 ([43176da](https://github.com/nomui/nomui/commit/43176dad38ccb950d9d0e9be7c32e6f4eac1be44))
* **GroupList:** 必填校验不会提示校验信息的问题 ([6d54d52](https://github.com/nomui/nomui/commit/6d54d52fbb0b8d7670a643a4fbcac746908b36ce))


### Performance Improvements

* **Field:** 优化字段组件验证提示在Panel以及弹窗内的显示不全的问题 ([e4a4e89](https://github.com/nomui/nomui/commit/e4a4e895f840c52554f36de69bbb7cd86ec195a8))
* **Group:** 优化excelMode新旧值比较 ([cfd1bc3](https://github.com/nomui/nomui/commit/cfd1bc312e0d7c898039e6633a1d072c71803c31))
* **Tooltip:** 优化Tooltip在字段组件当中的位置判断 ([07a0d09](https://github.com/nomui/nomui/commit/07a0d092895f40ad30590da1dd65140048ced380))


### Docs

* 文档更新 ([22408f9](https://github.com/nomui/nomui/commit/22408f9b4a2995d4293e139731d4b67e15c7bc77))
* 文档以及案例更新 ([a9e2f23](https://github.com/nomui/nomui/commit/a9e2f23692e47a5618e339bed6821035f80e8da5))
* 新增excelMode文档案例 ([7fd3707](https://github.com/nomui/nomui/commit/7fd3707750114d6f127dd81b62f989d8eb1ce926))

### [1.4.1](https://github.com/nomui/nomui/compare/v1.4.0...v1.4.1) (2024-11-14)


### Docs

* 更新文档案例 ([c3e9ccc](https://github.com/nomui/nomui/commit/c3e9ccc9742443b4263f894a4ab51bf262af7f88))

## [1.4.0](https://github.com/nomui/nomui/compare/v1.3.3...v1.4.0) (2024-11-14)


### Features

* 下拉框组件支持定义最大下拉框宽度 ([b1afe1c](https://github.com/nomui/nomui/commit/b1afe1cb3f78fb1f97157c5865640267db77acfd))
* 新增IconPicker组件 ([5d74aee](https://github.com/nomui/nomui/commit/5d74aee317bb1b7c3ab1a0fbf749a456d8de26b8))
* cascade valueType 为 single 的时候支持显示全路径 label ([b6afbb2](https://github.com/nomui/nomui/commit/b6afbb2512ea0c497560298b0af8cde919c5e926))
* **IconPicker:** 新增自定义选项渲染函数 ([e03ced2](https://github.com/nomui/nomui/commit/e03ced2cb02e3f64043e6bba55f5e5fe6de45a3c))
* **ListSetter:** 支持复杂场景自定义itemForm与listItemRender ([5fe378c](https://github.com/nomui/nomui/commit/5fe378cca6211802fcba0c1c6d60df35a9c77a51))


### Bug Fixes

* 解决搜索有正则元字符注入问题&配置了optionFields.text 的情况下搜索失效的问题 ([46b448b](https://github.com/nomui/nomui/commit/46b448b5753bf5912cbed13cdf2ca7e84bc05c44))
* **ColorPicker:** 修复 dataKey 属性不生效的 bug ([966101a](https://github.com/nomui/nomui/commit/966101a206cc9f5c42013fda8d55faf948faf993))
* **Grid:** 某些情况下获取title报错问题 ([e1c7b9c](https://github.com/nomui/nomui/commit/e1c7b9c9840c5932dcbb33345886597308d9015a))
* **IconPicker:** 修复默认赋值不存在于图标数据时的 bug。 ([9e5b1f0](https://github.com/nomui/nomui/commit/9e5b1f06c55cdc97a9f6fd3b6ee0c85ad1c9ece1))
* **PopConfirm:** 显示bug ([0285156](https://github.com/nomui/nomui/commit/0285156cd0685601ee96674cbc44f75b1d0bdb3f))
* **Progress:** 状态中途发生变化时不会正确显示的bug ([203a74c](https://github.com/nomui/nomui/commit/203a74cd7adf2fdf6998d507568f542298ba2e22))
* **Toolbar:** Toolbar容器本身不再触发点击事件 ([24a8814](https://github.com/nomui/nomui/commit/24a881495691f3185c7db494fba1653dd730eed3))


### Performance Improvements

* 基类渲染方法增加try catch容错 ([6df8ab7](https://github.com/nomui/nomui/commit/6df8ab77b38c029c54b2ffd96d36d12a8859dfd0))


### Docs

* 调整案例 ([9a89bed](https://github.com/nomui/nomui/commit/9a89bed073480f12ef95426516f6935bc98679dd))
* 添加文档 ([99fb90d](https://github.com/nomui/nomui/commit/99fb90d5f2cd778be6d174d5ea5cae7c556342b6))
* 文档补充 ([1ad585e](https://github.com/nomui/nomui/commit/1ad585eda767d9fb65cef7ee42c47fdaf8e54ef9))
* 文档更新 ([267bcb9](https://github.com/nomui/nomui/commit/267bcb947ad00bf0515a429678570e756880272d))
* api命名修改 ([8e357c1](https://github.com/nomui/nomui/commit/8e357c18866acb2907ed9ab5c8b40269d88af664))
* **IconPicker:** 新增案例 ([f6645dd](https://github.com/nomui/nomui/commit/f6645dda1704b55fa3534c6392b6f851aada4cef))

### [1.3.3](https://github.com/nomui/nomui/compare/v1.3.2...v1.3.3) (2024-10-30)


### Features

* 部分表单组件添加onClear事件 ([bba46fd](https://github.com/nomui/nomui/commit/bba46fdbfffa6eb149072e938cf903dde6a489b4))
* 下拉框类型表单组件支持自定义浮层宽度 ([1f8975d](https://github.com/nomui/nomui/commit/1f8975d06ef71f74319209dc935a10909975a671))
* **Anchor:** 新增控制滚动位置api ([0df12b6](https://github.com/nomui/nomui/commit/0df12b6b609b9b49fcdd692e9404e5f67fe94276))
* **Anchor:** 新增配置可以控制滚动到头部的偏移值 ([b1b8bd5](https://github.com/nomui/nomui/commit/b1b8bd56cebe66549d858d61a282574a5cf9723d))
* **Anchor:** 支持自定义offsetTop ([b612fa1](https://github.com/nomui/nomui/commit/b612fa12267395cbf7da81ae03b6ac1a94d7bd33))
* **AutoComplete:** 新增配置是否自动聚焦搜索框 ([ecf1c52](https://github.com/nomui/nomui/commit/ecf1c52cb2ac1545d6e71c7ba7281fa1364f85aa))
* **Button:** 新增 rightBadge 属性，及 updateBadge 方法。 ([db9f102](https://github.com/nomui/nomui/commit/db9f10252c8609ec92634a8bedebf823c256e044))
* **ColorPicker:** 新增 ColorPIcker 组件 ([00e2877](https://github.com/nomui/nomui/commit/00e28771ad47a44d6cbd271c21b4fc231670eb8e))
* **DataList:** 新增 DataList 组件 ([a025c8e](https://github.com/nomui/nomui/commit/a025c8ef05c62a67259074c637b7119a3adb421c))
* **DataList:** 新增 onItemSelected 事件 ([45bf02e](https://github.com/nomui/nomui/commit/45bf02e78dda4406c3e3abbed71a352b840dae0a))
* **DataList:** 新增 onItemUnselected 事件。 ([a1ad6e1](https://github.com/nomui/nomui/commit/a1ad6e1579d3ef7a4c556d55fc086b7140dac438))
* **DataList:** 支持拖拽排序。 ([71af49b](https://github.com/nomui/nomui/commit/71af49b4a8af5be4357dcfa8b1ddd505478e0cf9))
* **DataList:** DataList 组建新增获取子元素键数组的方法 getItemKeys。 ([5fd5272](https://github.com/nomui/nomui/commit/5fd527214236e7361fa5074bc4f24138e2c5bea9))
* **DataList:** onItemSelected 和 onItemUnselected 事件新增 key 参数。 ([053a282](https://github.com/nomui/nomui/commit/053a282bb13f8700f57cee55c5510c22581f6c13))
* **Drawer:** 支持自定义footer ([ec14e02](https://github.com/nomui/nomui/commit/ec14e027c06d2d40a9552a6aed70ad2c111ae74b))
* **Drawer:** 支持onClose回调 ([b477e9e](https://github.com/nomui/nomui/commit/b477e9e9ffa07f85084ae7281867a051b8e1dc28))
* **Field:** 表单类型组件全局添加只读属性配置 ([c96d34a](https://github.com/nomui/nomui/commit/c96d34a98961968eb64d8a8b6a062222a1abfaf0))
* **Field:** 表单类型组件新增defaultValue默认值 ([214ab0d](https://github.com/nomui/nomui/commit/214ab0d643673c15986f2ff397074de5bb560a6e))
* **Field:** 新增标签可折叠（labelExpandable）和标签样式（labelUiStyle）属性。 ([e4c63d7](https://github.com/nomui/nomui/commit/e4c63d773bc022542ad04e23e63ad6cbfd921ce9))
* **Field:** 新增uistyle配置 ([eeaa532](https://github.com/nomui/nomui/commit/eeaa5321e9afa1d4b98c1d311b81fd8277e345c9))
* **Field:** Field 新增 labelActions props ([e87d4fa](https://github.com/nomui/nomui/commit/e87d4fa0fdd4b054c2f4fee073994e63890c3616))
* **Field:** labelWidth 属性新增 'auto' 设置。 ([bb6a931](https://github.com/nomui/nomui/commit/bb6a9315f4f7468cc78a7d02a1bf6b8965fb2fb2))
* **Flex:** Flex 组件的新用法：通过 items 设置子元素数组。 ([6e1b513](https://github.com/nomui/nomui/commit/6e1b51340fd91e1ef46cff885cdbb87dbeb2822f))
* **Grid:** 列宽拖拽新增回调事件 ([a9c73df](https://github.com/nomui/nomui/commit/a9c73dfa2012670b2fdb9fbe237aff04926995ed))
* **Grid:** 列支持类型配置以及工具栏配置 ([db5a467](https://github.com/nomui/nomui/commit/db5a4676cb824f2710a147d23d76ca3ebceec57c))
* **Grid:** 添加行点击事件配置 ([bfc91a1](https://github.com/nomui/nomui/commit/bfc91a11d86851cfd1e9de5da871817edb9b510f))
* **Grid:** 优化行勾选逻辑，工具栏新增定位配置以及悬停显示 ([c50707f](https://github.com/nomui/nomui/commit/c50707f9dd1db53fa6a110d6d6e49e4100d76e1f))
* **Grid:** 优化Empty样式 ([7272364](https://github.com/nomui/nomui/commit/7272364db1bf4f04969565ad7890084c12500bfa))
* **Group:** 群组支持折叠配置 ([deb352f](https://github.com/nomui/nomui/commit/deb352f8fb1c116e7c5dc76536112b8f55639caf))
* **GroupList:** 如果提供了 controlAction  prop 则使用该配置替换内置的行为；weaddGroup 方法传入的参数类型由原来的 value 改为完整的 group props。 ([9852dc9](https://github.com/nomui/nomui/commit/9852dc910bfc8e2c21ee00aafd66eb7453af8248))
* **GroupList:** addGroup 方法加上可选的 value 参数。 ([b635e19](https://github.com/nomui/nomui/commit/b635e192830a19a4d0e29994fec19522b4b66f13))
* **Layer:** 新增不监听resize事件的方法 ([6843933](https://github.com/nomui/nomui/commit/68439331c298d00c312f32864079333baafa0ac6))
* **Layer:** 支持定位偏移配置 ([886df02](https://github.com/nomui/nomui/commit/886df029005cc8ac362a87b591904e67908e0442))
* **List:** 新增 getSelectedData 方法；新增 onItemSelected 事件 ([ef1b8b4](https://github.com/nomui/nomui/commit/ef1b8b47c94ca290a10e05d5018ae5d7c95ddea0))
* **ListSetter:** 新增 ListSetter 组件 ([32b21d2](https://github.com/nomui/nomui/commit/32b21d2c0cb46281f571979e1533379e50d0956f))
* **ListSetter:** 新增 minItems 属性，控制至少保留多少项。 ([6e493ce](https://github.com/nomui/nomui/commit/6e493ce951506dc8aa7e567ed62ef8f3814e533c))
* **ListSetter:** 修改文档 ([c4d5c44](https://github.com/nomui/nomui/commit/c4d5c44c8c43b985b3a0434cbc503313cdfc8e55))
* **Loading:** 新增结束动画，以及结束类型配置 ([8259bcf](https://github.com/nomui/nomui/commit/8259bcfc24226fcdb46199a27debdf33944b3b00))
* Menu Tree提供清空选择方法 ([a560356](https://github.com/nomui/nomui/commit/a560356aae2e3e175d1a22baf04468ede4c8dfd9))
* **Menu:** 水平菜单支持tools ([11ae68e](https://github.com/nomui/nomui/commit/11ae68ee39458bf224fa8f30e6bdf5cb75f0edc2))
* **Menu:** 新增 onItemSelect 事件。 ([b5de679](https://github.com/nomui/nomui/commit/b5de679eeef6995638485d12ae65e5ec0f441d6f))
* **Menu:** 新增一种更便捷配置tools的方式 ([491c375](https://github.com/nomui/nomui/commit/491c37552f0cc148f30bc7a7565285a0b615ba6f))
* **Menu:** 支持一级菜单拖拽排序 ([cf4b39c](https://github.com/nomui/nomui/commit/cf4b39cd2b806cbbbaeec2615d6f4052b9b7567a))
* **Menu:** 支持自动折叠项，并修复keyField配置不生效问题 ([a01292a](https://github.com/nomui/nomui/commit/a01292a30673dd4ef81ebead2c7a186a084f690b))
* **Menu:** Menu 新增 fit 属性，水平菜单时高度自适应。 ([fbc3871](https://github.com/nomui/nomui/commit/fbc3871c943931057d9c28f876cae942e52bf500))
* **Menu:** Menu onItemSelect 事件名改为 onItemSelected，并且增加 key 参数。 ([07f1bbe](https://github.com/nomui/nomui/commit/07f1bbe8064a8114eb98793f5eea00048ddc92bf))
* **Modal:** 新增 noHeader, noFooter props，控制是否不显示头部，底部。 ([68d61ad](https://github.com/nomui/nomui/commit/68d61adda458d4cd07e6ca904144fb4a5d03bf8e))
* **Modal:** 新增全屏尺寸 ([6ed376d](https://github.com/nomui/nomui/commit/6ed376da8d2a5f2962b646393752d2caeff50511))
* **Modal:** 新增一种自适应内部滚动条的配置 ([74279de](https://github.com/nomui/nomui/commit/74279de489698fb9b381d712eb8c016586f355b2))
* **NumberInput:** 新增数字输入组件，完善文档 ([c9dbc92](https://github.com/nomui/nomui/commit/c9dbc92fd1753e328ccd076fbdf9e31da222113b))
* **NumberInput:** blur触发onValueChange ([223771f](https://github.com/nomui/nomui/commit/223771fcd57a08fb8f691ec6332975a36d52ee38))
* **Popup:** 新增一种自适应屏幕高度的用法 ([2124e10](https://github.com/nomui/nomui/commit/2124e10d14b4fe719c36e2768e62440b187ae24f))
* **Router:** 新增 getParentRouter 方法，获取父路由组件。 ([22cb4c9](https://github.com/nomui/nomui/commit/22cb4c924355eb627f1cb487d517a0294cebad99))
* **Router:** 新增 refreshView 方法，刷新视图。用于不修改路由的情况下更新某个路由器的视图。 ([4e1a756](https://github.com/nomui/nomui/commit/4e1a756696abf90cb8c8a02edc3f35ed781fce21))
* **Styles:** 新增 position 类型的原子样式类。 ([518444c](https://github.com/nomui/nomui/commit/518444c1adfa4343cd34ae791ec6cf992b3481b1))
* **Tabs:** 新增添加删除tab项方法 ([6dc325d](https://github.com/nomui/nomui/commit/6dc325d6223069fbbae65a665fc42037e187537e))
* **Tabs:** 新增tab项移除事件 ([976b634](https://github.com/nomui/nomui/commit/976b6343faba3a0dae02a7ab72fd913f85b0db3e))
* **Tag:** 支持直接配置hex色值 ([ce6e28a](https://github.com/nomui/nomui/commit/ce6e28aa0d837681a087fa406a6fe2731e06b7f3))
* **Upload:** 丰富onChange参数 ([a6eaa8e](https://github.com/nomui/nomui/commit/a6eaa8e55efa716290762ad09add2a30c57b5147))
* **Uploader:** 新增 fileFieldName 和 fileResponseAsValue 属性。 ([eda6bdc](https://github.com/nomui/nomui/commit/eda6bdc680e4465281c92c410c1d83e5dc8f398b))


### Bug Fixes

* 级联组件有 popup 的情况下 cascade的 popup会被popup覆盖 ([bc289a9](https://github.com/nomui/nomui/commit/bc289a987d925c0bfa8506659cae3686a7f568d6))
* **Component:** replace 的时候不清空 ref 的值。 ([3a7c05e](https://github.com/nomui/nomui/commit/3a7c05e91c636eb0666290b638f68f8990380cbf))
* **Component:** replace 的时候不清空 ref 的值。 ([83acc68](https://github.com/nomui/nomui/commit/83acc6873aecf2db19df74b5a4192dc65b954afe))
* **DataLIst:** 修复 getSelected 方法没有任何选择项时返回报错的 bug ([7e890b6](https://github.com/nomui/nomui/commit/7e890b6ecbf484ee90f23b28962ae7316e30460c))
* **DataList:** 修复 showEmpty 的 bug。 ([3962b86](https://github.com/nomui/nomui/commit/3962b868245a25380068edb4a068c13b38911171))
* **DataList:** 修复多选时 onItemSelected 和 onItemUnselected 的 bug。 ([ce6543f](https://github.com/nomui/nomui/commit/ce6543f8e7ec238454aa3b09fdcaa582d647a7cb))
* **DataList:** 修改 DataList 组件示例 ([2afd477](https://github.com/nomui/nomui/commit/2afd47763d3ba805856ad6cbb1581ad25ec1ee0c))
* **Drawer:** zindex不能自动计算的问题 ([746ca66](https://github.com/nomui/nomui/commit/746ca667f69f1edc482ac22be7751c28365e6e55))
* **Field:** LabelAlign 为 top 时， labelWidth 不应该生效。 ([017d515](https://github.com/nomui/nomui/commit/017d5159bcd0a5435206694078f7f979dbaa8ae1))
* **Grid:** 工具栏配置bug ([450cc75](https://github.com/nomui/nomui/commit/450cc75473a47caa534544f5d215308e0da3911c))
* **Grid:** 列工具栏与列设置冲突问题 ([7fd0f5c](https://github.com/nomui/nomui/commit/7fd0f5c7ea20b220452073b2f6dc6e676db7f9d7))
* **Grid:** 列工具栏bug ([95858fa](https://github.com/nomui/nomui/commit/95858fa3ac5ad3466a57d16df6239bf86a9417a1))
* **Grid:** 列设置样式问题 ([391c93a](https://github.com/nomui/nomui/commit/391c93a6b79537d2aa1e223f5cfe3deb82771c3b))
* **Grid:** 数据为空时js报错 ([bfec228](https://github.com/nomui/nomui/commit/bfec2286645c5303b65625e7e4458285bd72a4d2))
* **Grid:** 新版暂无内容与其他功能冲突的问题 ([3aa717b](https://github.com/nomui/nomui/commit/3aa717b48572cf732e84ed96972b106054742691))
* **Grid:** 行勾选bug ([4ab7e1b](https://github.com/nomui/nomui/commit/4ab7e1be2ee375d82b938a7fe821dc7654e80537))
* **Grid:** 修复表头对齐问题并新增removeRow方法 ([5a9b0f9](https://github.com/nomui/nomui/commit/5a9b0f95ccf9d18408b05a7b677752931db3331d))
* **Grid:** 修复自动列宽bug ([09aa1d4](https://github.com/nomui/nomui/commit/09aa1d4555e9e4271f014012a687fd2176ec454f))
* **Grid:** 修复autoWidth与单元格省略冲突问题 ([ca7bf4f](https://github.com/nomui/nomui/commit/ca7bf4f6783e010d8eb15ab36d331f1561763906))
* **GroupLIst:** 多语言配置问题 ([602553a](https://github.com/nomui/nomui/commit/602553a6f73c739aa1741b0bc23bb0f3d382194c))
* **GroupList:** 修复 addGroup 方法会影响后续添加的 group 的 props 的 bug。 ([c65af45](https://github.com/nomui/nomui/commit/c65af45edae576d3b5dda90e8d175f5ed5bbbf7f))
* **GroupList:** 修复移除按钮文本读取错误的 bug。 ([af599bf](https://github.com/nomui/nomui/commit/af599bf21fc437073085cd4bfd4c6730c522ad1d))
* **Modal:** 修复 $modal 的 bug。 ([a7a3d9f](https://github.com/nomui/nomui/commit/a7a3d9f63fb366081b2b17e9b1a98ea0f965de5f))
* **Modal:** 修复自定义 footer 为函数时的 bug。 ([89a891d](https://github.com/nomui/nomui/commit/89a891d7352d00a782a702c5607a2abf7975b09f))
* **Navbar:** 修复 captionAfter prop 指定 component 无效的 bug。 ([d88e7fa](https://github.com/nomui/nomui/commit/d88e7fa4a00a4f3b2909f733eab24537bf08029e))
* **Navbar:** 修复 captionBefore prop 指定 component 无效的 bug。 ([1d7a4b4](https://github.com/nomui/nomui/commit/1d7a4b4a12c980f17d1699df185315dcde9c5b2c))
* **NumberInput:** 修复部分情况显示NaN的问题 ([69f69b3](https://github.com/nomui/nomui/commit/69f69b38189a627c0ef8a94f20343fbf578d7566))
* **NumberInput:** precision模式下bug ([8ad15df](https://github.com/nomui/nomui/commit/8ad15df1592d6090be12a5a48a59bb6308ec2d5e))
* **NumberSpinner:** 优化字符串模式下格式化函数的处理方式 ([4963a7a](https://github.com/nomui/nomui/commit/4963a7a8cc389a5fbf240478bca4603a8d5f221c))
* **Upload:** 修复上传失败列表文件信息不全的问题 ([f29725d](https://github.com/nomui/nomui/commit/f29725d466db7b9eaa09032a29afe854f268099a))
* **Uploader:**  修复获取值的bug ([aa01b4b](https://github.com/nomui/nomui/commit/aa01b4b6a2e2f8d38abc3fddb65654c2e1f2aaf7))


### Performance Improvements

* **Menu:** 优化折叠方法 ([ecb451d](https://github.com/nomui/nomui/commit/ecb451d405d1992c0be105bc514c487b6e2643a3))
* **Modal:** 新增配置不显示头部和底部的 demo ([ffcfa73](https://github.com/nomui/nomui/commit/ffcfa730a4583502bdbea98acd39db016b28cdc8))


### Docs

* 案例更新 ([8273e4a](https://github.com/nomui/nomui/commit/8273e4a2915de4ed3c9cf72c91f4adc93b2b4471))
* 文档补充 ([26d2208](https://github.com/nomui/nomui/commit/26d22085f0e7cdac9d94bda1ff06bf2a7a350598))
* 文档错误内容修复 ([9f043c0](https://github.com/nomui/nomui/commit/9f043c07146e7c957a7741ab62a38a3f3c395123))
* 文档更新 ([36f180f](https://github.com/nomui/nomui/commit/36f180f24be66cb8b02b22bae46366ad0923085c))
* 文档更新 ([fe56243](https://github.com/nomui/nomui/commit/fe562430ba0241c26fd64314a2a8d2b156508814))
* 修改api命名并更新文档 ([03fe6f4](https://github.com/nomui/nomui/commit/03fe6f428a82bfa44da14c30767d52d2e65b368f))
* Field以及Group新增uistyle范例 ([d034623](https://github.com/nomui/nomui/commit/d03462348aaa2010d4d2c5628d5ce79c4d668a84))
* **Grid:** 优化行点击事件，添加案例 ([52f2f5e](https://github.com/nomui/nomui/commit/52f2f5e87ee6bac58dbb4ef62cd04f9b2e026474))
* Loading文档案例更新 ([4acf8c3](https://github.com/nomui/nomui/commit/4acf8c37a1dab66e403fcf703552946ba778e019))

### [1.3.2](https://github.com/nomui/nomui/compare/v1.3.1...v1.3.2) (2024-06-27)


### Features

* **AutoComplete:** 新增optionDefaults自定义选项默认属性 ([4e08c25](https://github.com/nomui/nomui/commit/4e08c25c04608ebea6bfaf3e902829dfd77b09d5))
* **Router:** 新增onViewEnter和onViewLeave事件。 ([0a90cf0](https://github.com/nomui/nomui/commit/0a90cf02d102d917fd9f060f2a47dd87cdb9a559))
* **Upload:** 优化使用方式，丰富onChange事件提供的参数 ([44c9219](https://github.com/nomui/nomui/commit/44c921925ec70cb37d10331374503fac73ed3cdd))
* **Upload:** 支持通过方法实现上传 ([e4df4be](https://github.com/nomui/nomui/commit/e4df4be29f9d680032e04101758599d7eee94393))
* **Upload:** 支持文件夹上传 ([c4a6d9c](https://github.com/nomui/nomui/commit/c4a6d9cad1e5237ef2420e55d6224ccad5c49a35))


### Bug Fixes

* 修复高分辨率设备字体显示异常问题 ([b944740](https://github.com/nomui/nomui/commit/b944740a2e7d76ddf0178f48069fdab81337bc6f))
* **Grid:** 优化某些场景表头与表身无法对齐的问题 ([47c04a9](https://github.com/nomui/nomui/commit/47c04a94b1430e4cc8aa6e243f032237c7d339b3))
* **Layer:** 修复某些情况下移除层时js报错的问题 ([220bed2](https://github.com/nomui/nomui/commit/220bed2c06607378d905e82666e637da0c9e6406))
* **Router:** 修复 onViewEnter 事件的处理。 ([a3c664f](https://github.com/nomui/nomui/commit/a3c664f0608d463af82d74751cbe3101258a4737))


### Performance Improvements

* **Component:** 修改 create 函数及钩子，可返回 promise。 ([d0c4102](https://github.com/nomui/nomui/commit/d0c41026763b27ba136ae44af480d42d4a81119a))
* **Router:** 路径带参数的时候，如果路径有斜杠，则只取最后一个斜杠后面的字符串做为参数的键。 ([8c46820](https://github.com/nomui/nomui/commit/8c46820b4425084568ec4f3fa7a10a7492f4f1da))


### Docs

* 更新文档 ([f7ec76e](https://github.com/nomui/nomui/commit/f7ec76ec6f2d7d5a234f23ad2fef32bca76704d0))
* 文档更新 ([c22adaa](https://github.com/nomui/nomui/commit/c22adaadf5c10aa894ad4f43b4ecbf15000de0d2))

### [1.3.1](https://github.com/nomui/nomui/compare/v1.3.0...v1.3.1) (2024-06-12)


### Features

* **Menu:** Menu 组件新增 uistyle：hightlight-text ([adc14c4](https://github.com/nomui/nomui/commit/adc14c490bd0de99e9639d0a1c8e9b6b63ff6773))


### Bug Fixes

* **Anchor:** 修复异步方法报错以及滚动高亮不起作用的问题 ([3b8a01c](https://github.com/nomui/nomui/commit/3b8a01cfb80d96c7134231d43d31ef2361deb247))
* **Component:** 修改 replace 方法，接受 ComponentDescriptor 类型的参数。 ([a08e54f](https://github.com/nomui/nomui/commit/a08e54f9f9efc996ba5bb973f6237ab1ac6caea0))


### Performance Improvements

* 优化在不同DPR设备下的显示效果 ([1325a0e](https://github.com/nomui/nomui/commit/1325a0e95dd8f77cef32f8772c589a907db66072))


### Docs

* 文档补充 ([957ef89](https://github.com/nomui/nomui/commit/957ef899dba4f2d0e133804758332d15ea311c71))
* **Drawer:** 完善文档，统一api ([03dc2a8](https://github.com/nomui/nomui/commit/03dc2a89dc1f2704e9cc361be58c9eb42c5e3656))

## [1.3.0](https://github.com/nomui/nomui/compare/v1.2.3...v1.3.0) (2024-05-08)


### Features

* 将Sortable集成到utils ([9e12b13](https://github.com/nomui/nomui/commit/9e12b13af99d9e4d69b5ca7af9c1747f6c5fecfa))
* 新增多语言支持 ([c668a26](https://github.com/nomui/nomui/commit/c668a26c0c66b13fa89ae4386aef95ac9d4e0a0c))
* 新增水印组件 ([bd27ef2](https://github.com/nomui/nomui/commit/bd27ef2b5801177019abbce8388b8fc7a38ba8df))
* 新增Tour组件 ([96bb448](https://github.com/nomui/nomui/commit/96bb448e40f3ea71ddec7426378281fabeab615e))
* 新增Transfer组件 ([7facc5e](https://github.com/nomui/nomui/commit/7facc5e3e943440b254418181950d27d0e55c984))
* **Anchor:** 优化container使用场景，新增横向模式 ([ec58969](https://github.com/nomui/nomui/commit/ec589697fa49581b5d0376da45ce12bdc4e8a4c0))
* **Grid:** 列设置功能重构 ([cd0e34b](https://github.com/nomui/nomui/commit/cd0e34b5b493c8358c579f3647e8b06b9bddce57))
* **Grid:** 列设置新增配置固定列上限功能 ([3fa8cff](https://github.com/nomui/nomui/commit/3fa8cffff2475ee41e41b46014aa8a5b19403e08))
* **Grid:** 实现表格行内编辑功能 ([1c7dbe2](https://github.com/nomui/nomui/commit/1c7dbe2e0cfc56536ede0f4f846849a5c17c8565))
* **Grid:** 完善节点级联勾选行为 ([959f5c5](https://github.com/nomui/nomui/commit/959f5c5c7864c591aeea30256ed28bc561e49bc8))
* **Grid:** 新增勾选框位置跟随树级配置 ([128ec32](https://github.com/nomui/nomui/commit/128ec3204cfe392e2dd325f5de69226ddb026e61))
* **Menu:** 新增菜单项类型定义 ([4820e1b](https://github.com/nomui/nomui/commit/4820e1b7e2c937ab9b8d985c970cbcd4a370f1ff))


### Bug Fixes

* 修复pc浏览器模拟ipad模式报错 ([de6810f](https://github.com/nomui/nomui/commit/de6810f3ddbf4b5915205dda1f49bc50c1a097ef))
* **Cascader:** 叶子节点无法禁用的问题 ([5401829](https://github.com/nomui/nomui/commit/54018292216ef70e63b942f049555f2b2def7d18))
* **Grid:** 合计行与列宽拖动功能冲突 ([9784290](https://github.com/nomui/nomui/commit/9784290a4e2798046cfe501a9bdca7384ccb1aa4))
* **Grid:** 解决树形勾选框与列冻结功能的冲突 ([53102b5](https://github.com/nomui/nomui/commit/53102b5662bc91ec5524c385134f96acc8614c1e))
* **Grid:** 列设置搜索树级兼容性问题 ([8d87cc4](https://github.com/nomui/nomui/commit/8d87cc434c5df71869e630fd22a921a2eb0d0a89))
* **Grid:** 列设置重构后操作列丢失的问题 ([98b6201](https://github.com/nomui/nomui/commit/98b62013527a30b114662a6bc39ee508616e0d27))
* **Grid:** 新版列设置与本地列缓存冲突问题 ([c37d970](https://github.com/nomui/nomui/commit/c37d9700991789352befe4f18207ddabb88a763a))
* **Grid:** 修复拖动列与合计行冲突问题 ([9b7c253](https://github.com/nomui/nomui/commit/9b7c253753d8b267f02b6f7ca342e5dfbae435f7))
* **Grid:** 修复行勾选功能与列设置面板的冲突 ([87de123](https://github.com/nomui/nomui/commit/87de123d3ab88176ceac6cf7cc8522f40f6f68ae))
* **Menu:** 特殊情况下报错问题 ([c8de4f7](https://github.com/nomui/nomui/commit/c8de4f726268f6e2249bd01b8a6dc3bfbbc75bc0))
* **Pager:** 解决多语言bug ([32bb411](https://github.com/nomui/nomui/commit/32bb411464777714141aea6a7e6a16864912370f))
* **TreeSelect:** 修复某些情况下取值问题 ([2fb98f8](https://github.com/nomui/nomui/commit/2fb98f885a35f5d715efd0f2c3b1c38c521e07bb))
* **TreeSelelt:** getValue方法优化对null的处理 ([9a9b7f6](https://github.com/nomui/nomui/commit/9a9b7f6a219c1723008f74268cbf8837c28ea4b4))
* **Watermark:** 解决水印组件与Image组件冲突 ([11961d7](https://github.com/nomui/nomui/commit/11961d7d8e3b9fe53dd355e11d5b7c81b63bba70))


### Performance Improvements

* 优化表单tab键交互 ([20f71b3](https://github.com/nomui/nomui/commit/20f71b39c5a5f3f68aa41d4c21fd55a4d2ca61e1))
* **Grid:** 优化手动固定列逻辑 ([006068b](https://github.com/nomui/nomui/commit/006068b9dbd0b3c9fb597d903377a064726d74df))


### Docs

* 更新文档 ([1275730](https://github.com/nomui/nomui/commit/1275730aec959d4cfaca423d2b73d2e16620c03f))
* 文档更新 ([1f6c3a8](https://github.com/nomui/nomui/commit/1f6c3a8f091dc850467d64923bfbe4fe1ac3b8d8))
* 文档更新 ([3d742a1](https://github.com/nomui/nomui/commit/3d742a1999d2f813f2f72958f22c09f9e72eeab7))
* demo修改 ([e2e4736](https://github.com/nomui/nomui/commit/e2e4736c24a602fca67f7a4ba1f7a217edc4777c))
* **Grid:** 更新文档命名 ([ee91f93](https://github.com/nomui/nomui/commit/ee91f932e5b0d63fd6e5bd7f6285242788876085))
* **Tour:** 完善文档 ([5dab7b8](https://github.com/nomui/nomui/commit/5dab7b8734c9a31f1b087704964da796eb6430f3))

### [1.2.3](https://github.com/nomui/nomui/compare/v1.2.2...v1.2.3) (2023-04-14)


### Features

* **TreeSelect:** 新增valueOptions，提供始终以数组形式取值的配置 ([406e317](https://github.com/nomui/nomui/commit/406e317de8fc0441b98d8c05e18b8aa9e10b9ba9))


### Docs

* 文档更新 ([fdd6c13](https://github.com/nomui/nomui/commit/fdd6c13aef18de3f6a7737b6126b92e607b9d302))

### [1.2.2](https://github.com/nomui/nomui/compare/v1.2.1...v1.2.2) (2023-04-10)


### Features

* 新增GroupTree级联字段表组件 ([ece4c04](https://github.com/nomui/nomui/commit/ece4c04e66d6d5e28d081cd7ab49867f7325aa13))
* Select新增配置项，当value不存在于options源时，value重置为null ([a200673](https://github.com/nomui/nomui/commit/a200673981b84be07c3d9f703528e758feb9b466))


### Bug Fixes

* 修改nomui切换echarts 报错 ([c25de8e](https://github.com/nomui/nomui/commit/c25de8e3f80601f9171ce97072ea846463bddd29))
* 针对removeChild报错修改 ([7c20498](https://github.com/nomui/nomui/commit/7c204984e14877f8c4c6bf210f4b2b9f378cf21c))
* **GroupTree:** 优化外部赋值时新增按钮的显示逻辑 ([9567204](https://github.com/nomui/nomui/commit/9567204d243247063d993b9f7d32e5802459de07))
* **Tree:** 优化异步加载节点判断逻辑 ([07f65a3](https://github.com/nomui/nomui/commit/07f65a3bfb50e5ff426fcb749e1055937c624b4c))


### Docs

* GroupTree文档更新 ([52e7125](https://github.com/nomui/nomui/commit/52e7125ce3b21430d1527ed35c2699a300385809))
* **GroupTree:** 优化组件api命名 ([a8a3c9f](https://github.com/nomui/nomui/commit/a8a3c9f75fb549c2e0d20c3240884a8d310f0fdc))

### [1.2.1](https://github.com/nomui/nomui/compare/v1.2.0...v1.2.1) (2023-03-31)


### Features

* **Tree:** 节点工具栏支持悬停显示 ([533a6f7](https://github.com/nomui/nomui/commit/533a6f758a9f5cf25b5c07b6d3bd8a2fd8620c0c))
* **Tree:** 新增loadData异步加载节点 ([02479a6](https://github.com/nomui/nomui/commit/02479a6feccfc3a0bebefc787dc82bedea7a2790))
* **Tree:** 重构节点工具栏配置 ([4c4dc4d](https://github.com/nomui/nomui/commit/4c4dc4df9c18e4f36269898a5fd0d67bae7262a9))


### Bug Fixes

* 修改List组件，设置为showEmptyh virtual，使用update异常 ([b50269a](https://github.com/nomui/nomui/commit/b50269acaf454db7405e782c8aa6588e578e2168))
* 修改treeSelect组件报错 ([ac827ab](https://github.com/nomui/nomui/commit/ac827ab963e07d551ea8c620661f8da88d1c125f))
* 修改TreeSelect组件选中一个后滚动条不要滑动，应保持原位置不变 ([32ede31](https://github.com/nomui/nomui/commit/32ede31544c4903393595c0f8f3c6737e5131cba))
* **Component:** 修复 emptyChildren 方法当子节点是文本节点时不会移除的 bug。 ([e2ec62f](https://github.com/nomui/nomui/commit/e2ec62f3b6ecf91601b3e608c495c87ee2d82243))
* Grid set按钮居中展示 ([562ca18](https://github.com/nomui/nomui/commit/562ca18573a816cf2146a8cd17c1185cfc5424ea))
* Grid单独获取某行进行更新会导致固定列失效 ([eaa0fc0](https://github.com/nomui/nomui/commit/eaa0fc009e2d55c1355ee0a3e15ef542062cc37b))
* Grid由于margin布局导致set按钮背景色外漏 ([4a4c136](https://github.com/nomui/nomui/commit/4a4c1369d2e1ef14701011dd59e883e94f669ff3))


### Performance Improvements

* 修改Tree部分选中和部分取消的函数名和更新文档 ([1efd0cc](https://github.com/nomui/nomui/commit/1efd0ccddf5214ef02e50c2b84b8af3416b6cb97))
* 修改tree组件的checkNode和uncheckNode属性修改为复数形式 ([80bd1ac](https://github.com/nomui/nomui/commit/80bd1ac972361def70da1b08d67f09c1cd1bb3d8))
* 修改Uploader组件的previewRender属性修改为onPreview ([98aaa98](https://github.com/nomui/nomui/commit/98aaa98764e492054b206a35c86987e57a4027e9))


### Docs

* 文档优化 ([31b5148](https://github.com/nomui/nomui/commit/31b5148a83b52c66b5c2bef1ab22fefe7f40260c))
* 修改 Component 组件 onConfig 事件 demo 里的图片地址为相对路径。 ([7c80ecc](https://github.com/nomui/nomui/commit/7c80ecc8fc412a2470229de8821b1c6ae351d07f))
* **Component:** 修改事件 onConfig 的 demo。 ([8d9c50a](https://github.com/nomui/nomui/commit/8d9c50a6b82963786723470289575528036f532b))

## [1.2.0](https://github.com/nomui/nomui/compare/v1.1.32...v1.2.0) (2023-03-24)


### Features

* 新增UploaderCore组件 ([e1093db](https://github.com/nomui/nomui/commit/e1093dbec83eb8980af44ba5974d453049752fd5))


### Performance Improvements

* 优化上传失败时的处理逻辑 ([9ddca5a](https://github.com/nomui/nomui/commit/9ddca5a98e89da8c4d4a3df9972e3ac4771648b3))


### Docs

* 文档案例完善 ([c0f9ff2](https://github.com/nomui/nomui/commit/c0f9ff23d79257b73bbd6c29f485d526a118ab9e))
* 文档更新 ([83f941d](https://github.com/nomui/nomui/commit/83f941d9c86a01865a1b4890c538b1593241c51f))
* 文档命名更新 ([6f90941](https://github.com/nomui/nomui/commit/6f90941190b6f522ccd8010e9f11f498ad3a56a4))
* 文档校正 ([fef28e0](https://github.com/nomui/nomui/commit/fef28e0351986c0f40c68102da0f975861dfacc9))

### [1.1.17](https://github.com/nomui/nomui/compare/v1.1.16...v1.1.17) (2022-12-09)

### Features

- **Grid:** 新增列对齐方式配置 ([10a0dd0](https://github.com/nomui/nomui/commit/10a0dd058f226e4d92f5709edd9fe3f8dc5b7ccb))

### Bug Fixes

- 修复 Grid 选择框不居中的问题 ([fa2ecdf](https://github.com/nomui/nomui/commit/fa2ecdfcf53c147658bee637d91b9556e69a153b))
- 修复 Menu 紧凑模式下箭头方向不合理的问题 ([e0ecde3](https://github.com/nomui/nomui/commit/e0ecde36f6ba157d0a73ade6f4ed30099994fd3c))
- 优化修复 Grid 选择框不居中的问题 ([e25a9b2](https://github.com/nomui/nomui/commit/e25a9b26e2320b07283b92eca9757ddc6988a9ca))
- **Grid:** 列标题非字符串时不再显示 title ([f952738](https://github.com/nomui/nomui/commit/f952738033329af75319cab5abd177e29d390c20))

### [1.1.16](https://github.com/nomui/nomui/compare/v1.1.15...v1.1.16) (2022-12-02)

### Bug Fixes

- **Grid:** 列设置取消全选时操作列消失 ([72feb73](https://github.com/nomui/nomui/commit/72feb7390c8b4fd0f4ba0313cc9bf920e45be313))

### [1.1.15](https://github.com/nomui/nomui/compare/v1.1.14...v1.1.15) (2022-11-25)

### Features

- **TreeSelect:** 新增限制显示标签个数 ([ed99126](https://github.com/nomui/nomui/commit/ed99126e2e8f765896e92bcdab1d41f9ad52c474))

### Bug Fixes

- 优化 Popup ([54fcf39](https://github.com/nomui/nomui/commit/54fcf39153535c348c085726571a5723e0c013e9))
- **Grid:** 滚动到底部以后进行排序表头没浮动的问题 ([3e5cf9b](https://github.com/nomui/nomui/commit/3e5cf9bd6e1dbbcd5d5f6a1ee19d702a80a8e124))

### [1.1.14](https://github.com/nomui/nomui/compare/v1.1.13...v1.1.14) (2022-11-18)

### Features

- **Cascader:** 兼容显示不存在于数据源的默认值 ([1868733](https://github.com/nomui/nomui/commit/18687337024e67e0bdb52981a378ae8b5e0ea6f6))
- **Grid:** 前端排序支持对数字、字符串进行自动排序 ([9eb467c](https://github.com/nomui/nomui/commit/9eb467c820c419cb80706332764b293ca04c8ef5))
- GroupGrid 新增操作栏自定义 ([075420d](https://github.com/nomui/nomui/commit/075420d6e61988f3c16a781b2d0b92d554f6c805))
- **Select:** 支持配置最大显示标签数 ([f36360b](https://github.com/nomui/nomui/commit/f36360bff268e16e4752872a001e6481aab854a8))
- **TabList:** 支持不传入 tabContent，单独使用 ([8995e88](https://github.com/nomui/nomui/commit/8995e88364165d6e9f541ad824f7c1e32ee6032f))

### Bug Fixes

- 优化 GroupGrid 操作栏自定义 ([456009b](https://github.com/nomui/nomui/commit/456009b2cde9cf2a40f6c9ad76ae1764e43899ce))
- 优化 GroupGrid 操作栏自定义 ([23bd55b](https://github.com/nomui/nomui/commit/23bd55b18cc34c733d5a1d5b87c6d8691f64e4cd))
- 优化 GroupGrid 操作栏自定义 ([3dd62aa](https://github.com/nomui/nomui/commit/3dd62aa3bedc8dcf9fc76df0fa677032ab55e317))
- 优化 GroupGrid 操作栏自定义 ([f480d28](https://github.com/nomui/nomui/commit/f480d2881aee6947a0f52a4af79f37c5ab8ced38))
- **Grid:** 排序与固定列冲突问题 ([aefecac](https://github.com/nomui/nomui/commit/aefecacd59e24ec36434f6eda2794fbebd33d6d7))
- **Meun:** Meun 三级导航页面问题 ([899c46d](https://github.com/nomui/nomui/commit/899c46d818e980ead4e571a12f29d1aa5df94b23))
- **NumberSpinner:** 无法赋值为 null 的问题 ([4bc8a40](https://github.com/nomui/nomui/commit/4bc8a4083c61ab0f65657071299cce418eab9089))
- **NumberSpinner:** 修复取值与校验问题 ([0cab296](https://github.com/nomui/nomui/commit/0cab2964144abadf33ddd509bc46bf826652d4b0))
- **ParitalDatePicker:** 修复手动赋值非法值时 js 报错 ([68b4fce](https://github.com/nomui/nomui/commit/68b4fce44a674264121adf0b3c755d108f25b8b7))
- **Select:** 优化对自定义字段名的兼容性 ([959b309](https://github.com/nomui/nomui/commit/959b309d250a59c4b3ee3eae8e65a7bb7edce31c))

### Performance Improvements

- **Grid:** 优化前端排序逻辑 ([aaf0cd7](https://github.com/nomui/nomui/commit/aaf0cd72994feb71d454f153d21f4633584d7ca8))

### [1.1.13](https://github.com/nomui/nomui/compare/v1.1.12...v1.1.13) (2022-11-11)

### Features

- Cascader 添加非叶子节点选择的功能 ([5d938eb](https://github.com/nomui/nomui/commit/5d938eb3b4f35e0557624cbc15b817d6256c2a71))
- Cascader 组件，添加非叶子节点可选的属性配置 ([6f5825d](https://github.com/nomui/nomui/commit/6f5825d87db75219af1a8e909906e1cdc4cbf8ef))
- **PartialDatePicker:** 支持自定义值格式 ([155012c](https://github.com/nomui/nomui/commit/155012c6cb91b3b1a9a9496f2d2846f00b02094a))
- TreeSelect 组件，默认展开节点层级优化为搜索到结果时默认展开层级，不受 initExpandLevel 影响 ([95dd6e3](https://github.com/nomui/nomui/commit/95dd6e33c37c0e9d489ead76bb8891e6f1c8858a))

### Bug Fixes

- Cascader: 添加选取非叶子节点的需求 ([3699020](https://github.com/nomui/nomui/commit/3699020a4ad0c698fefd9ab4aff7e4216eb91811))
- **NumberSpinner:** 重复格式值造成 NaN 的问题 ([d79852b](https://github.com/nomui/nomui/commit/d79852bb0fa72424af6810245736065d7d432117))

### Performance Improvements

- 优化 TreeSelect 搜索显示 ([94d047a](https://github.com/nomui/nomui/commit/94d047abc1a3f5ce081778c45c957a69fd716453))
- **Menu:** 优化紧凑模式下交互逻辑 ([5058b80](https://github.com/nomui/nomui/commit/5058b80d2410f89cd39082db8b16e726f3d51fa0))

### [1.1.12](https://github.com/nomui/nomui/compare/v1.1.11...v1.1.12) (2022-11-04)

### Features

- **Grid:** 新增在清空排序时仍然触发 onSort 回调的配置 ([285e260](https://github.com/nomui/nomui/commit/285e260254c8c3a3a6c079abe5f361809f6304ef))

### Bug Fixes

- **Grid:** 行勾选与统计行兼容问题 ([ff6079e](https://github.com/nomui/nomui/commit/ff6079e81f83ee98345b8622c5556863ea3a434b))

### [1.1.11](https://github.com/nomui/nomui/compare/v1.1.10...v1.1.11) (2022-10-28)

### Features

- Cascader 添加新功能，配置子项的 disable 属性 ([993915f](https://github.com/nomui/nomui/commit/993915f1b0e8a99842a362935e75b3cc6f965bc9))
- Cascader 添加新功能，配置子项的 disable 属性 ([e567797](https://github.com/nomui/nomui/commit/e567797f1af40dfe2e9a14cdd1e248932591bcaf))
- **Grid:** 支持多级表头的排序 ([e7f66e3](https://github.com/nomui/nomui/commit/e7f66e3710c33d88e71b9a8800974b3f0758a06f))
- **TreeSelect:** 支持配置展开层级，以及多选支持仅勾选叶子节点 ([97feb8f](https://github.com/nomui/nomui/commit/97feb8f8580ad6bc5602403296023591cdfcf999))

### Bug Fixes

- 修复 PartialDatePicker 选中年份失效的 bug ([ce7a01e](https://github.com/nomui/nomui/commit/ce7a01e23445f7bc812ba57b5e49b2dd82f70a34))
- 修复 PartialDatePicker 选中年份失效的 bug ([1c15701](https://github.com/nomui/nomui/commit/1c157014069d99a29deaaa634573a024494364af))
- **Badge:** 优化角标计数为 0 时显示逻辑 ([ce421a0](https://github.com/nomui/nomui/commit/ce421a074eb2b7295f678ceb0817bad832e6176c))
- **Grid:** 数据为空时 getData()异常以及部分场景 js 报错的问题 ([37fb886](https://github.com/nomui/nomui/commit/37fb8867d0abbdb23d2244de3d2c3a1409e8a062))
- **Grid:** 数据为空是 getData()异常 ([f67b9d2](https://github.com/nomui/nomui/commit/f67b9d21d3f0026c599bee4b27199f6dac2143b2))
- **Grid:** 行勾选与合计功能冲突导致报错 ([3b0cf4c](https://github.com/nomui/nomui/commit/3b0cf4cb021e7504aefcd168f3b8e4c679a8ecfb))
- **Grid:** 修复多级表头下统计行异常，以及新增自定义列渲染功能 ([997aadf](https://github.com/nomui/nomui/commit/997aadf3ad6ada26f8b5d856bcdc3d9f6cc16038))
- **PartialDatePicker:** 取值异常时报错的问题 ([54eb4d3](https://github.com/nomui/nomui/commit/54eb4d390f03eb55bc58d87c9bd1d5af3bad39d0))
- **Password:** 控制明文按钮显隐的问题 ([b3fc222](https://github.com/nomui/nomui/commit/b3fc2229b7d9963884a498038a73635d3558806c))
- **Tooltip:** addClass 报错 ([0696340](https://github.com/nomui/nomui/commit/06963405911aa9e75b54f1b9e764aac7bf5d5ec2))

### Performance Improvements

- **List:** 优化 scrollIntoView 效果 ([071ff97](https://github.com/nomui/nomui/commit/071ff9713062299b1302046cb0d2d1d4555fcd79))

### [1.1.10](https://github.com/nomui/nomui/compare/v1.1.9...v1.1.10) (2022-09-23)

### Bug Fixes

- **PartialDatePicker:** 部分情形 getDateString 方法报错 ([2940caa](https://github.com/nomui/nomui/commit/2940caa80d168e4261888fd6a9b8ce1721662b65))

### [1.1.9](https://github.com/nomui/nomui/compare/v1.1.8...v1.1.9) (2022-09-16)

### Bug Fixes

- **Grid:** appendRow 与 getData 方法问题 ([4526d25](https://github.com/nomui/nomui/commit/4526d25797f706c555ee607a47aad7da7b3d7f7c))
- **Grid:** getData 方法可能返回 undefined ([fcbbee9](https://github.com/nomui/nomui/commit/fcbbee9d4da446692a8434136692f175a7457155))

### [1.1.8](https://github.com/nomui/nomui/compare/v1.1.7...v1.1.8) (2022-09-02)

### Bug Fixes

- 开放 List 组件的 sortable 更多功能 ([4814dbf](https://github.com/nomui/nomui/commit/4814dbfc7b307b65ae315a1178202ff1cf6f056c))

### [1.1.7](https://github.com/nomui/nomui/compare/v1.1.6...v1.1.7) (2022-08-26)

### Features

- **Field:** 支持自定义 tabindex 属性 ([226305e](https://github.com/nomui/nomui/commit/226305e593aa7b9086605a30ab132c82e98d6a67))
- **MaskInfo:** 新增配置是否显示切换全文按钮 ([e422fb9](https://github.com/nomui/nomui/commit/e422fb9b23e8715a48b47c44df130f7c9b1806f4))
- **RadioList:** 新增自定义 fieldName ([e19cce3](https://github.com/nomui/nomui/commit/e19cce3992db3dde91eb3bcd07cd86d0fb00ecde))

### Bug Fixes

- **Grid:** 同时固定表头与右侧列会导致无法对齐 ([ff8c9ad](https://github.com/nomui/nomui/commit/ff8c9ad5956ca907fc3acabb0272a017e382a6c5))

### [1.1.6](https://github.com/nomui/nomui/compare/v1.1.5...v1.1.6) (2022-08-12)

### Features

- **Avatar:** 图像加载失败时会改为显示 icon 或者 text ([49575e2](https://github.com/nomui/nomui/commit/49575e27f576d5ab1a06af99c1494274369b839a))

### Bug Fixes

- **DatePicker:** minDate maxDate 不支持时分秒的问题 ([aa84e34](https://github.com/nomui/nomui/commit/aa84e34f8784a0e06fd673a3b710ca3ed7e582b7))
- **TreeSelect:** 子数组字段名不为'children'时选中异常 ([897c15b](https://github.com/nomui/nomui/commit/897c15bd00d02c3d8471d66e232bd32eae53b38f))

### [1.1.5](https://github.com/nomui/nomui/compare/v1.1.4...v1.1.5) (2022-08-05)

### Bug Fixes

- **DatePicker:** 修正一个词汇 bug ([57eea1d](https://github.com/nomui/nomui/commit/57eea1df6a52bf22c7c19f2f3530ee6143e8091e))
- Uploader 组件针对上传头像功能的部分修改 ([943b591](https://github.com/nomui/nomui/commit/943b59101ef1c2b55ef5e56d6fb4da5dc6534801))

### [1.1.4](https://github.com/nomui/nomui/compare/v1.1.3...v1.1.4) (2022-07-29)

### Features

- 新增 uploader 组件 api( actionRender ) ([9c49f22](https://github.com/nomui/nomui/commit/9c49f2201f827502276086ccdc82aa89abe8bbfb))
- 优化 Uploader 组件的 api (actionRender) ([c5453c6](https://github.com/nomui/nomui/commit/c5453c6f9dfc88789a26d7ca1e6c36dd580a9a51))
- **Grid:** 列设置面板新增全选功能 ([0dac27f](https://github.com/nomui/nomui/commit/0dac27f9852e1a2b7e63b35956c93fbd51729c99))
- Uploader 支持自定义 t 头像上传按钮 ([1cf8ce7](https://github.com/nomui/nomui/commit/1cf8ce7d52b99d72df0d51d34e9995c48524ccab))

### Bug Fixes

- 修改 uploading 案例 bug ([520a66c](https://github.com/nomui/nomui/commit/520a66ce5906b3c91a01132f24749bb5991afca6))
- **Avatar:** 解决某些场景 js 报错问题 ([b58dfee](https://github.com/nomui/nomui/commit/b58dfeef9d8fdf6f45ae76a93e16fc103746d8b3))
- DatePicker 组件 Safari 兼容性 bug 修复 ([52cbf44](https://github.com/nomui/nomui/commit/52cbf448930ee1797e62e0b1161b76b57c6f940c))

### Performance Improvements

- 将 unloader 组件中的 button 和 actionRander api 合并 ([c652dd9](https://github.com/nomui/nomui/commit/c652dd94a0d82d630c45e38be02c9e46265629cc))

### [1.1.3](https://github.com/nomui/nomui/compare/v1.1.2...v1.1.3) (2022-07-22)

### Features

- 优化 Tree，提供新的 setCheckedNodeKeys 支持设置选中值 ([d5de48f](https://github.com/nomui/nomui/commit/d5de48fc2e1749a327a95ef3f4aa1ac01a98902e))

### Bug Fixes

- **Avatar:** 某些场景下 Avatar 计算文字位置尺寸失效 ([26b16e6](https://github.com/nomui/nomui/commit/26b16e60f21888f6cc121cf725fff2c9fa6aabbb))

### [1.1.2](https://github.com/nomui/nomui/compare/v1.1.1...v1.1.2) (2022-07-08)

### Bug Fixes

- autocomplete 下拉信息从选中信息改为全部信息 ([e8ea65e](https://github.com/nomui/nomui/commit/e8ea65e49f46e98044aa04900c9df4b2d902539a))

### Performance Improvements

- **DatePicker:** 优化对非日期值的支持 ([daac7c7](https://github.com/nomui/nomui/commit/daac7c7f1899557353528c8fa58c2c9b0736bd9f))

### [1.1.1](https://github.com/nomui/nomui/compare/v1.1.0...v1.1.1) (2022-07-01)

### Features

- **DatePicker:** 支持额外的工具按钮 ([f2e8e8f](https://github.com/nomui/nomui/commit/f2e8e8fe00caaff97578d3a0523d9dea87c1837c))
- **PartialDatePicker:** 新增自定义底部工具按钮 ([1530573](https://github.com/nomui/nomui/commit/15305730ac196f78e55bf2d1f0599d3c71aa2db4))
- Step 新增配置 iconCustomized，使步骤图标可完全自由定制 ([9e97a8d](https://github.com/nomui/nomui/commit/9e97a8d65b5b5cfdea8d1fb9c9e5b1f211669e8d))

### Bug Fixes

- 修复一个低版本浏览器兼容性 bug ([040c06d](https://github.com/nomui/nomui/commit/040c06d5d70c02f834b2687863ab55b23173624d))
- 修改 Cascader 组件 disabled 方法和属性无效 ([412133c](https://github.com/nomui/nomui/commit/412133c5874868743dbe56bbc626d8d3b09aaca3))
- 修改 groupGrid 组件没有默认值报错问题 ([9a4eeb4](https://github.com/nomui/nomui/commit/9a4eeb466ec9cc7059cd4f851aab2f7e28a990fc))

### Performance Improvements

- 优化 iconCustomized 思路 ([6ad31b3](https://github.com/nomui/nomui/commit/6ad31b39289f5e56f64f629b34daf48104bdb8cd))
- 优化 iconRender 思路 ([e14dee0](https://github.com/nomui/nomui/commit/e14dee0358e40017b9593724c83073b22a27ed8f))

### Docs

- 文档重复条目修复 ([c5a7c65](https://github.com/nomui/nomui/commit/c5a7c652b5fe88b38867cdb2d1284cbb03546a20))
- 新增国内镜像文档 ([a6cd7ed](https://github.com/nomui/nomui/commit/a6cd7ed92a80a815f2e11de1beec4f1dfff30d6f))

## [1.1.0](https://github.com/nomui/nomui/compare/v1.0.4...v1.1.0) (2022-06-24)

### Features

- **Image:** 新增 Image 图片组件 ([49effee](https://github.com/nomui/nomui/commit/49effee80c40a84c8853a2b016cc30630c087417))
- **Collapse:** Collapse 的激活面板可以支持多个 ([f0a984b](https://github.com/nomui/nomui/commit/f0a984b99a9eade12467cc1487b52b25c7b6bb72))

### Bug Fixes

- 调整 Image 图片组件的排列顺序 ([c9e9f72](https://github.com/nomui/nomui/commit/c9e9f72350d8a34112b0bc6f68e75a9023d4b32a))
- 修复 GroupGrid 新增默认值，第一行的时候无效 ([a2534a5](https://github.com/nomui/nomui/commit/a2534a57c78f1cc38a2f69c821b8e244e9a2134e))
- Image 图片组件 ([2a677b9](https://github.com/nomui/nomui/commit/2a677b94fd63c81d83121e96e6c5fe172dd80953))

### Docs

- 完善 fieldDefaults 这个文档 api ([a8ba884](https://github.com/nomui/nomui/commit/a8ba884e5df13815032d9abf10b86c5977338b78))
- release 文档更新 ([21334cd](https://github.com/nomui/nomui/commit/21334cd215a71373964516514b1281fd437ddfd9))

### [1.0.4](https://github.com/nomui/nomui/compare/v1.0.3...v1.0.4) (2022-06-17)

### Performance Improvements

- 优化 password 不能输入\*的情况 ([6c9e676](https://github.com/nomui/nomui/commit/6c9e676a7ea6c862645a16655f4dbf49517b5dfa))

### [1.0.3](https://github.com/nomui/nomui/compare/v1.0.2...v1.0.3) (2022-06-10)

### Features

- 平滑过渡 ([81d600a](https://github.com/nomui/nomui/commit/81d600a151abf7ef3ab0d59aa1da95409be6cef2))
- 首页彩蛋设计以及页面放大缩小适配优化 ([686920e](https://github.com/nomui/nomui/commit/686920ef1d13584aa2ba755a87e06d6522d19317))
- 首页彩蛋设计优化 ([12fda6f](https://github.com/nomui/nomui/commit/12fda6fa90a6f2f11b5b50f898dcce282b547e9b))
- 添加沙箱功能 ([82bb93d](https://github.com/nomui/nomui/commit/82bb93d712564ef91b7e473fcf1968d35dcfd4c9))
- password 给 eye 按钮添加开关功能 ([26a9583](https://github.com/nomui/nomui/commit/26a95832ade7a0a97fef6a3f786706eafacb47dc))
- Password 新增切换明文查看密码的开关 ([cd5b3ec](https://github.com/nomui/nomui/commit/cd5b3ec3f209b2f2485c3f0f0cd1c1d442d159a8))
- **TreeSelect:** 新增获取字面值方法 ([18269bc](https://github.com/nomui/nomui/commit/18269bc4a11bc8d370ea114a75f3d194443d91f2))

### Bug Fixes

- 调整 password 样式 ([fabed34](https://github.com/nomui/nomui/commit/fabed343f42ce56d9c4ab9a3b2602ea87c597c53))
- 动效的代码优化 ([54e3e88](https://github.com/nomui/nomui/commit/54e3e8846d1613b7de395d2265272643c30bc3be))
- 修复 RadioList 在谷歌 49 版本的样式 bug ([214b7ad](https://github.com/nomui/nomui/commit/214b7ad218f43cf3c2105372f88fb04cb2478309))
- 优化 Image 组件 ([3133249](https://github.com/nomui/nomui/commit/3133249a1d2931868ae7cbf9c53fad59fb4979d5))

### Performance Improvements

- password 的 passwordPopup 修改为继承于 Popup ([958f5fd](https://github.com/nomui/nomui/commit/958f5fd10ba928d4eaa6bea907f446ddf03542d8))

### Docs

- 修复 RadioList 文档目录大小写问题 ([3a4109a](https://github.com/nomui/nomui/commit/3a4109a9c3422452574aebead7d085b503bce16a))

### [1.0.2](https://github.com/nomui/nomui/compare/v1.0.1...v1.0.2) (2022-05-27)

### Bug Fixes

- 修复 Table 放大的样式兼容 bug ([98a1f32](https://github.com/nomui/nomui/commit/98a1f32f2b8a2fa9080a7aa93eca6c8fdd8eafa5))
- **PartialDatePicker:** 获取字面值方法报错 ([556834d](https://github.com/nomui/nomui/commit/556834d72361db2490869a356e6359b8a850e6ad))

### Docs

- Grid 开放 autoScrollGrid 方法 ([911f4cb](https://github.com/nomui/nomui/commit/911f4cbe9955025f461a672cf5655c8c1fb55748))

### [1.0.1](https://github.com/nomui/nomui/compare/v1.0.0-alpha.61...v1.0.1) (2022-05-20)

### Features

- **Grid:** 表尾合计功能支持统计多行数据 ([6ebfaea](https://github.com/nomui/nomui/commit/6ebfaea5e39014ef11800078d085d2232cdb2148))
- Group 校验新增忽略必填规则的配置项 ([c8d5c8e](https://github.com/nomui/nomui/commit/c8d5c8eeb498c3c243a4af798f6d16d0eda3f3b8))

### Docs

- 文档界面更新 ([660c8ea](https://github.com/nomui/nomui/commit/660c8ea0b18bbdb4d41497844908c20817123e3e))

## [1.0.0-alpha.61](https://github.com/nomui/nomui/compare/v1.0.0-alpha.60...v1.0.0-alpha.61) (2022-05-13)

### Bug Fixes

- **Grid:** 列筛选部分类型组件字面值显示错误 ([82b3ee6](https://github.com/nomui/nomui/commit/82b3ee6d7ab66ebe22785a45fb7330d363d34094))

### Docs

- 修改主题色，文档界面更新 ([fa97c5c](https://github.com/nomui/nomui/commit/fa97c5c1b7a8096cedcc618876a074209244d57d))

## [1.0.0-alpha.60](https://github.com/nomui/nomui/compare/v1.0.0-alpha.59...v1.0.0-alpha.60) (2022-05-07)

### Features

- **Grid:** 列筛选模式支持保存搜索条件并高亮显示条件内容 ([6f8e28d](https://github.com/nomui/nomui/commit/6f8e28de511a2583fdff83ea33fbee587f362f57))

### Bug Fixes

- 修复元素不存在时延时报错的问题 ([9cfc9eb](https://github.com/nomui/nomui/commit/9cfc9eb62fe05c0476a6b128fe7f7efdc55a8404))
- 修复元素不存在时延时报错的问题 ([5d405b3](https://github.com/nomui/nomui/commit/5d405b39f30aa09f1b59d29e0489e5d4f62101c7))
- 修复 Tooltip 延时报错 ([8816b0d](https://github.com/nomui/nomui/commit/8816b0d763959a9514bd76a0880794f65da267bb))
- NumberSpinner 数字微调器:修复数字微调器禁用后还能点击操作的 bug ([8d68d5d](https://github.com/nomui/nomui/commit/8d68d5d731332e36895eae459a69d488b12a3e4b))

## [1.0.0-alpha.59](https://github.com/nomui/nomui/compare/v1.0.0-alpha.58...v1.0.0-alpha.59) (2022-04-29)

### Features

- 给 List 组件提供 scrollIntoView 配置并优化 TimePicker 自动滚动效果 ([90edf69](https://github.com/nomui/nomui/commit/90edf69550388d71f3d93128c761817e4d35a90c))
- 日期时间组件在手动键入非法值时会自动清空 ([1270f5b](https://github.com/nomui/nomui/commit/1270f5b2490a3854f268bb5bb8078fdc36b0ecfe))
- 添加组件全局搜索功能 ([712f70d](https://github.com/nomui/nomui/commit/712f70d8796c0c2f1db969289eb3527d6ebd75e1))
- **List:** 添加点击加载更多功能 ([5f408fa](https://github.com/nomui/nomui/commit/5f408fac85f8277e79b4d09c7b84e0814472cf04))
- Select 显示隐藏增加动画效果以及 Progress 增加进度数值宽度配置项，Layer 组件隐藏动画有 bug 暂时下线 ([a82d11f](https://github.com/nomui/nomui/commit/a82d11f1fb51288b46bfb7a6ef969f17da8bb996))

### Bug Fixes

- 全局搜索:修复点击组件名称没有跳转的问题 ([b2373a8](https://github.com/nomui/nomui/commit/b2373a8fe9fe49c87f296c72f3255da75ca901df))
- 优化 nomappOverflow 的位置 ([eddc490](https://github.com/nomui/nomui/commit/eddc490d98c49782e5bad72a3f9b401ae5e10c30))
- 组件全局搜索，修复弹层样式。修复 bug ([2ed28a9](https://github.com/nomui/nomui/commit/2ed28a9111fb880ecacd943d7eb5e6b791e8d799))
- **CheckboxTree:** 级联取消选中父节点 ([04a657c](https://github.com/nomui/nomui/commit/04a657c2700278997b0d1c7046c2ccf54da1f502))
- **List:** 部分场景 js 报错 ([d05b2c1](https://github.com/nomui/nomui/commit/d05b2c1b5a7ab928a82e4551994ef9fac6070016))
- **Loading:** loading 点击事件阻止冒泡 ([8a15e92](https://github.com/nomui/nomui/commit/8a15e9222485af6323e8a74e3349bca27bbb99a0))
- **Select:** 去掉多余注释代码 ([c4f041a](https://github.com/nomui/nomui/commit/c4f041ae60edceedb99bc327f8f3942fb8e96a80))
- **Tree:** TreeSelect 组件，弹窗打开扁平化数据不生效 ([5b3e671](https://github.com/nomui/nomui/commit/5b3e6717669842407f2c5a402d9077e5830a6697))

### Docs

- 案例更新 ([8cf41c8](https://github.com/nomui/nomui/commit/8cf41c8500d81ad4bc9535d97cff8b92d1bcff32))

## [1.0.0-alpha.58](https://github.com/nomui/nomui/compare/v1.0.0-alpha.57...v1.0.0-alpha.58) (2022-04-15)

### Features

- Drawer 显示隐藏增加动画效果以及优化 Modal 动画 ([54336ed](https://github.com/nomui/nomui/commit/54336ed5a276770a52f5d268f200e7a069817633))
- Layer Notification 显示隐藏增加动画效果 ([edf4e6d](https://github.com/nomui/nomui/commit/edf4e6d9755202246c2e77d8b40b95f63756b8fb))
- **Modal:** 动画显隐优化 ([8531c3d](https://github.com/nomui/nomui/commit/8531c3df5c433c45d6bf1b0b7cbf0ce31a92689d))
- **Modal:** 增加动画显隐 ([e9844fe](https://github.com/nomui/nomui/commit/e9844fed413faae6bd9e5c9fc36805319bab7322))

### Bug Fixes

- **Select:** 搜索无数据后，下次展示需情况输入框 ([98d1f6c](https://github.com/nomui/nomui/commit/98d1f6c18ea83f7ca5760b0c8b9e538ce0ce2823))
- **Select:** select 弹出框隐藏后，其 searchBox 已被销毁导致的报错 ([2eea31c](https://github.com/nomui/nomui/commit/2eea31c2ac09e3bcd80e8a4fa02693886d4e9e7e))
- **Tooltip:** 自定义背景色时箭头颜色未自适应 ([f1429fd](https://github.com/nomui/nomui/commit/f1429fd4ae9e0f358a54e0933e45612216c816b5))

## [1.0.0-alpha.57](https://github.com/nomui/nomui/compare/v1.0.0-alpha.56...v1.0.0-alpha.57) (2022-04-08)

### Bug Fixes

- **List:** appendItem 的数据，未加上拖拽类名，无法被拖拽 ([810e5a6](https://github.com/nomui/nomui/commit/810e5a640305c7facc0c441655e158c0b408f73a))
- **List:** data 格式传入时无 wrapper，removeItem 时会报错 ([ad15f37](https://github.com/nomui/nomui/commit/ad15f372344c9ae80f025878eb0320af41fbf153))

## [1.0.0-alpha.56](https://github.com/nomui/nomui/compare/v1.0.0-alpha.55...v1.0.0-alpha.56) (2022-04-02)

### Docs

- 文档链接更新 ([eb53464](https://github.com/nomui/nomui/commit/eb534648d256e92abc2c14ee3102bef4019143c6))

## [1.0.0-alpha.55](https://github.com/nomui/nomui/compare/v1.0.0-alpha.54...v1.0.0-alpha.55) (2022-04-01)

### Features

- **Icon:** 添加 download 图标 ([c903c3a](https://github.com/nomui/nomui/commit/c903c3ac1b89af7142a506bd9b6fde560989d1df))

### Bug Fixes

- 合并主分支版本，解决冲突 ([9351e1b](https://github.com/nomui/nomui/commit/9351e1b5418fe42425fcb9135b8df4725d9544ae))
- 解决冲突 ([e47d2ff](https://github.com/nomui/nomui/commit/e47d2ff6efc9ae805392528fa3a3bbcbd23e8cff))
- **Avatar:** 头像内容是图片时圆角可能不正常 ([2707e83](https://github.com/nomui/nomui/commit/2707e83feb6d8b462217852577bd477cbe49761e))
- **Grid:** 横向滚动时表头边缘区域显示效果不佳 ([22c296a](https://github.com/nomui/nomui/commit/22c296adad86b88c544bde62cb5372677300173b))
- **Grid:** 吸附表头下列设置按钮位置错误 ([e6d47e2](https://github.com/nomui/nomui/commit/e6d47e20044493ffb60d2a3f99c5079ac64f85ad))
- **Grid:** firefox 浏览器下，Array.sort 的表现不同，导致的列顺序出错 ([3fd4dfe](https://github.com/nomui/nomui/commit/3fd4dfe04c6be2a8f3196ef3cce355ea35b07fd6))
- **GroupList:** 修复 GroupList 造成的全局样式影响 ([04699e0](https://github.com/nomui/nomui/commit/04699e0d307aebe80f0ea2942aef4fe15bbc290e))
- **Steps:** 修复 Steps 垂直状态无连接线的 bug 以及优化案例与样式 ([8cae2ab](https://github.com/nomui/nomui/commit/8cae2ab08779799228117a6130b01a3e4df2481e))
- **Textbox:** 第一次点清空按钮未触发 onValueChange，因为 null === null ([3d25d2c](https://github.com/nomui/nomui/commit/3d25d2ca813e344c250c286f8d683b573654437c))
- **Textbox:** readonly 为 fale 时，导致 textbox 样式变化 ([3057f0a](https://github.com/nomui/nomui/commit/3057f0a448aad4fae2bfdb36a8a5c4700ab3d133))

## [1.0.0-alpha.54](https://github.com/nomui/nomui/compare/v1.0.0-alpha.53...v1.0.0-alpha.54) (2022-03-25)

### Bug Fixes

- **DatePicker:** 年份默认可选范围太小的问题 ([73c08ac](https://github.com/nomui/nomui/commit/73c08acafde3f9e727a05587e188b8ddc0cb7f16))
- **GroupList:** 修复 GroupList 按钮不对称问题 ([6d80932](https://github.com/nomui/nomui/commit/6d809320b5a7cd585c216bfe499bd924b7b1a2bc))

## [1.0.0-alpha.53](https://github.com/nomui/nomui/compare/v1.0.0-alpha.52...v1.0.0-alpha.53) (2022-03-18)

### Features

- **Grid:** 缓存列固定列功能 ([a645825](https://github.com/nomui/nomui/commit/a645825b477d94618799565202d2c48abd8e68e1))

### Bug Fixes

- **CheckboxTree:** 修复获取不到值的问题 ([a3c72f6](https://github.com/nomui/nomui/commit/a3c72f6b49d56dc335d1323a47c9d27faeefab14))
- **Gird:** 保存列设置时，将 customizable: false 的列排至最后 ([36c188a](https://github.com/nomui/nomui/commit/36c188a84d9896cce418d882f8a9bb4913c71d04))
- **Grid-fixed:** 取消初始化固定列时的 bug ([9d66302](https://github.com/nomui/nomui/commit/9d663027d6c6cae22196f578f2810b3b6c205445))
- **Grid:** 单独使用 table 时, th 列宽判断导致的报错 ([22b9c52](https://github.com/nomui/nomui/commit/22b9c52694a136df8eaaacc9223764c4f9719ed8))
- **Grid:** 计算右侧固定位置时，考虑固定表头的情况 ([ab29f1c](https://github.com/nomui/nomui/commit/ab29f1cd39fba0d6e8bfea93a5b6101a0d0692cb))
- **Grid:** 每次展开自定义列弹窗时都重新获取 popupTreeData ([24342de](https://github.com/nomui/nomui/commit/24342de6c5734a530b4057b002d12c7f8d574cd6))
- **Grid:** 外部更新 columns 后，需要更新 pinColumns 的数据 ([4ab6a67](https://github.com/nomui/nomui/commit/4ab6a67fbdd1a6f6c780e63fc024c0bb1804b512))
- **Grid:** 外部更新 columns 后，需要重新读取处理缓存中的列设置 ([61ccc07](https://github.com/nomui/nomui/commit/61ccc078df2fe9535fb50697bb6f91b4c589e43a))
- **Menu:** 紧凑模式下如果选中不存在的 key 会 js 报错 ([dc25724](https://github.com/nomui/nomui/commit/dc25724ee0791b332330bd835d48832ced95458b))

### Docs

- **Grid:** 添加固定列设置的缓存的文档 ([9f694f6](https://github.com/nomui/nomui/commit/9f694f649fb6b5351d454d7c8581302746672a14))

## [1.0.0-alpha.52](https://github.com/nomui/nomui/compare/v1.0.0-alpha.51...v1.0.0-alpha.52) (2022-03-11)

### Features

- **Grid-拖拽自定义列:** 增加 allowFixedCol 配置 ([a232b48](https://github.com/nomui/nomui/commit/a232b480ecd4f1b0b3bd9a8a59bf389a28b95feb))

### Bug Fixes

- (Uploader)文件上传 beforeUpload 方法优化 ([2e9efcc](https://github.com/nomui/nomui/commit/2e9efcccb74fa1be7582169b67eb2e369a3d943a))
- **Empty:** 修复 Empty 图标与文字不对齐的 bug ([83abbf9](https://github.com/nomui/nomui/commit/83abbf9a52d89bec29943e9bb0c62b000c4db5d5))
- **Grid-固定列拖拽:** footer 不存在时 ([40829f0](https://github.com/nomui/nomui/commit/40829f0c7619d95c08307b92058f7c31ac01b185))
- **Grid-highlightMask:** 悬浮表头时高亮列的展示 bug ([f17b7c2](https://github.com/nomui/nomui/commit/f17b7c20fc2c655d6e4bd24b89cc106d416cfc4c))
- **Grid:** 解决拖拽列宽，导致固定列的展示 bug ([e990f45](https://github.com/nomui/nomui/commit/e990f4535aa0b21fe51456e00fc49f68152539c6))
- **Grid:** 列设置排序功能 ([71ca986](https://github.com/nomui/nomui/commit/71ca98603f8dbe8336f5017870ada6ff358eb468))
- **Grid:** 去掉 console ([c9570f2](https://github.com/nomui/nomui/commit/c9570f26db9d9151548c40576306e7a85c537692))
- **Grid:** 自定义列设置，originColumns 的排序逻辑 ([e647ea5](https://github.com/nomui/nomui/commit/e647ea5b36dad4ea417897a00e98733095dfee94))
- **Select:** 搜索的 filter 返回为空时，未对 optionList 的数据进行更新 ([49b8dfc](https://github.com/nomui/nomui/commit/49b8dfc1fc2fe2208c7b7b7f55722852853f99a8))
- **sortable 兼容性:** 火狐浏览器下，拖拽会打开新的标签页 ([809c801](https://github.com/nomui/nomui/commit/809c8010f4926113a9a6299f3d01216cba15ab49))
- **Tooltip:** 修复 Tooltip 在有 body 滚动条时验证提示错位问题 ([20e01c1](https://github.com/nomui/nomui/commit/20e01c1afd1ecd7278821a2626803b5ccb26a2e6))

### Docs

- 调整组件的顺序 ([ce467db](https://github.com/nomui/nomui/commit/ce467db672327c8d73a9d7aa2e5cf95d8ae2260f))

## [1.0.0-alpha.51](https://github.com/nomui/nomui/compare/v1.0.0-alpha.50...v1.0.0-alpha.51) (2022-03-04)

### Features

- 校验规则支持更多的手机号段 ([1e11f3d](https://github.com/nomui/nomui/commit/1e11f3d2882e726dfce5b35588f3aa6f46123510))

### Bug Fixes

- **DatePicker:** 修复日期框可以手动输值的问题 ([bfc7bda](https://github.com/nomui/nomui/commit/bfc7bda122b38aea6de3c7e2653e3024728aeb8d))
- **Grid:** 当 data 为[]时，拖动列宽导致报错 ([7781bda](https://github.com/nomui/nomui/commit/7781bdaf00c5bdbe70b609cee15468deee8c6da5))
- **Grid:** 固定列的阴影会触发 td 点击事件 ([fbacfd1](https://github.com/nomui/nomui/commit/fbacfd116011d3267c069750876744e95c7537ca))
- **Grid:** 列设置按钮在滚动式消失 ([a3a09ae](https://github.com/nomui/nomui/commit/a3a09aec484d91f4f84fc91a6b00ddd1aadf98e6))
- **Grid:** 判断 sicky = window 时的情况 ([90e3b20](https://github.com/nomui/nomui/commit/90e3b2078012f3906698382142eb339c04a184ba))
- **Textbox:** 日期控件 readonly 时，支持清除按钮 ([23ad1ab](https://github.com/nomui/nomui/commit/23ad1ab2606b04de658c03143313c4dcdf02654d))

## [1.0.0-alpha.50](https://github.com/nomui/nomui/compare/v1.0.0-alpha.49...v1.0.0-alpha.50) (2022-02-25)

### Features

- **Grid auto scroll:** 添加 sticky 模式的竖向滚动 ([a2cab78](https://github.com/nomui/nomui/commit/a2cab788f3f2f868ce567a20b1345624148e61d0))
- **Grid:** 表格自动滚动，支持竖向的滚动记录 ([d8d461a](https://github.com/nomui/nomui/commit/d8d461aa72cfe5f54e7642520b8d192321441a85))
- **Grid:** 提供外部主动记录滚动位置的方法 ([1531db5](https://github.com/nomui/nomui/commit/1531db57c56d2cd2f1d24923580401169a30ddcb))

### Bug Fixes

- **Button:** danger 按钮的样式问题 ([7e6dec7](https://github.com/nomui/nomui/commit/7e6dec7af4438b8ad0b9eaf9dfc12cccb9ea03d0))
- **Grid:** 列设置后，导致表格的操作列(未设置 field)消失 ([7d52cc7](https://github.com/nomui/nomui/commit/7d52cc78619ae593761562f1643575de373c9121))

## [1.0.0-alpha.49](https://github.com/nomui/nomui/compare/v1.0.0-alpha.48...v1.0.0-alpha.49) (2022-02-18)

### Features

- **Pager:** 新增 compact 紧凑模式 ([d5f9407](https://github.com/nomui/nomui/commit/d5f94077e716e5bb1f9c584cc9d5c800257e51ea))
- **theme:** 颜色使用 css 变量+button 组件的示例 ([5ce716e](https://github.com/nomui/nomui/commit/5ce716ee547d90027e544cad747b791efccbeb3f))
- **Tree:** 新增级联取消上级节点 ([3cddaf2](https://github.com/nomui/nomui/commit/3cddaf234f8582e6abd3a63b6cd14aa433b9c4d8))
- **Tree:** 新增级联取消上级节点 ([fe6b9e9](https://github.com/nomui/nomui/commit/fe6b9e95e9dacd4db4549d0c7b76e961e1b127c1))

### Bug Fixes

- **global css:** 类名修改 ([e053980](https://github.com/nomui/nomui/commit/e0539808599804e9b0392c166226864d21c303e6))
- **PartialDateRangePicker:** getValueText 无效的问题 ([a595822](https://github.com/nomui/nomui/commit/a59582283e1faf0fa31dd2f00d24dfef9f4349d6))

### Docs

- **Pager:** 补充文档 ([438e038](https://github.com/nomui/nomui/commit/438e038dcbfa98897adfb200446d40afe5ffe768))
- **Tree:** 新增文档 ([f9f9757](https://github.com/nomui/nomui/commit/f9f97571f0eafd5cac4a603794ee6cde0b53636e))

## [1.0.0-alpha.48](https://github.com/nomui/nomui/compare/v1.0.0-alpha.47...v1.0.0-alpha.48) (2022-01-28)

### Features

- AutoComplete 给 AutoComplete 添加远程搜索功能 ([b4e4470](https://github.com/nomui/nomui/commit/b4e4470197ccda7142c087f0725b405770c5eef9))
- **Grid:** 根据浏览器的版本信息判断是否有固定列功能 ([ed02d6f](https://github.com/nomui/nomui/commit/ed02d6f53b35593dd88b21812fabfb93c702d83d))
- **Grid:** 添加默认排序功能 ([4440afd](https://github.com/nomui/nomui/commit/4440afd449ce1c6faf441de98d2a714878aaf15f))
- **RangePicker:** 范围选择器提供选完初始时间是否自动弹出结束时间面板的配置 ([cbb45e5](https://github.com/nomui/nomui/commit/cbb45e547ab2d2fbbbff2e133d32006c8fa857da))

### Bug Fixes

- 优化 CheckboxTree 低版本兼容性 ([a12d563](https://github.com/nomui/nomui/commit/a12d5630bb8eeeea1dc5fffd82d3bd5f51091517))
- **Grid:** 列设置问题 ([cdf3eeb](https://github.com/nomui/nomui/commit/cdf3eebd7320b4f7573c82e63363999ee7b077f6))
- **Grid:** chrome49 版本下，表格的滚动条展示 ([a4668b2](https://github.com/nomui/nomui/commit/a4668b257e5b16786add2aa5193574da20ec27b6))
- **Layout:** flex: 1 和 height: 100%在低版本浏览器上会显示多个滚动条的 bug ([ee91c82](https://github.com/nomui/nomui/commit/ee91c82147313fb2f2bcfb408652481dbafbe6a8))
- **Select:** 使用 internalOptions 以后搜索无效 ([d5a41cd](https://github.com/nomui/nomui/commit/d5a41cdb9653e632ffb696f2b5b0a0fbc963e6db))
- **Textbox:** 使用 affix-wrapper 包裹之后，导致背景色 bug ([9a5e5d5](https://github.com/nomui/nomui/commit/9a5e5d58cb918c725fb3fa35d981ac719c5891e3))

### Performance Improvements

- 加强 Chrome49 版本下的 css 兼容性 ([14df0b4](https://github.com/nomui/nomui/commit/14df0b4412ab2d0e389162801213724bf4dc65c6))

### Docs

- **Grid:** 表格添加默认排序 ([d25679d](https://github.com/nomui/nomui/commit/d25679dfd886998dea6242e671a960b68d6fbe29))

## [1.0.0-alpha.47](https://github.com/nomui/nomui/compare/v1.0.0-alpha.46...v1.0.0-alpha.47) (2022-01-21)

### Features

- **NumberBox:** 新增 maxPrecision 规则 ([da21ade](https://github.com/nomui/nomui/commit/da21adeed4f198abb6cb3eda28bb4b5fcf9ad17c))
- **Textbox:** 添加 allowClear 可清除 ([80b2274](https://github.com/nomui/nomui/commit/80b227495e08dac2e69f160d0565cac533557482))

### Bug Fixes

- 修复 Select 有重复 key 的判断逻辑 bug ([f7fc204](https://github.com/nomui/nomui/commit/f7fc204de1753dc3ce0271c39e93e4c060b4ced6))
- 修复 Select 有重复 key 的判断逻辑 bug ([975ef53](https://github.com/nomui/nomui/commit/975ef536ec9b10b38cb903390df677806f7d08b5))
- **Grid:** 开启勾选列功能时，固定列功能未按预期工作 ([fbd68d1](https://github.com/nomui/nomui/commit/fbd68d18b7011fb887e423a267e4b4ece12659df))
- **Grid:** 列设置与列排序意外的冲突 ([fa26268](https://github.com/nomui/nomui/commit/fa26268c73843186d029cd11f6ef8217f84ad909))
- **Grid:** 内部更新 columns 时，不更新自定义列弹窗中的数据 ([0ea1652](https://github.com/nomui/nomui/commit/0ea165257670324296724a433ef2bb928e91c207))
- **Grid:** 内部更新 Grid 时，跳过 columns 的处理 ([f667655](https://github.com/nomui/nomui/commit/f667655abc8f192742a6555ff7c0fe081551cfef))
- **Grid:** 设置排序后，同时修改 originColumns 里的排序状态 ([66d5ec3](https://github.com/nomui/nomui/commit/66d5ec31ce29ef68c8b759e6a1210c41a2b2857d))
- **Grid:** 由 Grid 内部更新 columns 时，不触发 originColumns 的改变 ([6200b41](https://github.com/nomui/nomui/commit/6200b41ed71a779c8b08cd0dbc0b0ea8bea017d6))
- **Grid:** frozenLeftCols 在有列勾选功能时表现异常 ([92cce78](https://github.com/nomui/nomui/commit/92cce789031c0e632963262dd8ee98bb9ddfb95d))
- **Numberbox:** 低版本浏览器不支持幂操作符, 改为 Math.pow ([7f7a37b](https://github.com/nomui/nomui/commit/7f7a37b334dc80b28062b47b1253911f88ef7dda))
- **Select:** select 中直接使用的 options, 导致需要处理 value 字段的数据传入时，会显示错误 ([904b42b](https://github.com/nomui/nomui/commit/904b42b6b6212931015e7f3c93a463ed48b5bcc6))
- **Textbox:** 继承至 Textbox 的组件出现两个清除按钮 ([d02d4ea](https://github.com/nomui/nomui/commit/d02d4ea7be80c9c120f69ab33c6ec14e864f76ba))

### Docs

- 完善文档 ([14ce220](https://github.com/nomui/nomui/commit/14ce220d354f132c1acb984d1902dcbd880fe718))

## [1.0.0-alpha.46](https://github.com/nomui/nomui/compare/v1.0.0-alpha.45...v1.0.0-alpha.46) (2022-01-14)

### Features

- **Grid:** 悬浮表头，对应列高亮 ([f509210](https://github.com/nomui/nomui/commit/f509210f89128c7ddd0ea6f0b15c8c5e1d79105a))

### Bug Fixes

- **chrome 兼容:** 低版本浏览器的 el.classList.value 的值不存在 ([9300078](https://github.com/nomui/nomui/commit/9300078a5d2014b90520cc2a938f240caf87fbe8))
- **Grid-scrollbar:** 改变列宽宽后, 悬浮的 scroller 宽度未更新，导致列展示不全 ([b7238c4](https://github.com/nomui/nomui/commit/b7238c4a58eb5a91244749adc003ac1dfbdb1367))

### Docs

- **反馈和其他:** 补充反馈和其他部分的组件文档 ([e344b59](https://github.com/nomui/nomui/commit/e344b59d1767a5c51f171f12c45442e31553bd8b))
- **浮层相关:** 浮层类的组件文档补充 ([06b3224](https://github.com/nomui/nomui/commit/06b32246b89d3523d459c9459519c3a3bac15929))
- **数据展示:** 数据展示相关组件文档补充 ([3c7e70b](https://github.com/nomui/nomui/commit/3c7e70bbf0f55f697e6bbcc98f20b3ae4555081f))
- **文档:** 面包屑，折叠面板，Layer 的文档补充 ([c645c8b](https://github.com/nomui/nomui/commit/c645c8bd19f2e98f1bea35673bf7e98136dedff4))
- **Gird:** highlightCol 的文档补充 ([16bfc1d](https://github.com/nomui/nomui/commit/16bfc1d9a54b82a2f0ae733834282976ec5984cc))

## [1.0.0-alpha.45](https://github.com/nomui/nomui/compare/v1.0.0-alpha.44...v1.0.0-alpha.45) (2022-01-07)

### Features

- 表单类型组件都支持 getValueText 获取字面值 ([e602389](https://github.com/nomui/nomui/commit/e602389dcefa2cd50ddf0527b8c034a8eeb6faa6))
- **Checkbox:** 字面值支持自定义配置 ([a6a6fff](https://github.com/nomui/nomui/commit/a6a6fff07d86458cc11298d929f841700c5cbd9d))
- **Grid:** 默认显示条纹间隔，选中行支持背景高亮 ([bc8c1a0](https://github.com/nomui/nomui/commit/bc8c1a0d51496c5bc0a0e0f6238216f00818f9cd))
- **Pager:** 分页器添加缓存设置分页大小的功能 ([5325ee6](https://github.com/nomui/nomui/commit/5325ee67fa5f16ad754b17ae464935397fa67530))
- **Pager:** 添加分页器的排列方式和排列顺序 ([c32fdff](https://github.com/nomui/nomui/commit/c32fdffdd9285e395d39a882b04f303427dbd51c))
- **Tree:** 拖拽功能添加 showHandler，开启后仅允许拖拽图标功能 ([6cff088](https://github.com/nomui/nomui/commit/6cff08817db16764dafc93fe63c4b07ce99d376a))

### Bug Fixes

- **Grid-scrollbar:** 表格滚动条的非空判断 ([d0e5a9f](https://github.com/nomui/nomui/commit/d0e5a9f5f3faba3d160a9959e0758d4d553c28c0))
- **Grid:** 切换页面,Grid 被销毁，导致 props 为 undefined 报错 ([f429727](https://github.com/nomui/nomui/commit/f429727f0a81ac99652eb2c2327d8ddce9074a58))

### Docs

- **Tree:** 补充排序功能文档 ([443c69e](https://github.com/nomui/nomui/commit/443c69edd3e600d5ce2b51014bf95ea89cd6f85d))
- **Tree:** 修复文档 ([e19b394](https://github.com/nomui/nomui/commit/e19b394d01f592c956726c818dfdda5bcc825ba6))

## [1.0.0-alpha.44](https://github.com/nomui/nomui/compare/v1.0.0-alpha.43...v1.0.0-alpha.44) (2021-12-31)

### Features

- **Ellipsis:** 添加多行文本的...省略功能 ([d79224f](https://github.com/nomui/nomui/commit/d79224f60ec30e9a3063354bfca12a9f7cc14bf9))
- **Ellipsis:** Ellipsis 的多行文本展示功能 ([e97b2ea](https://github.com/nomui/nomui/commit/e97b2ea6efc62e9c6938f866f4cebd7990d09294))
- **Tree-tools:** tools 可通过函数配置 ([5fac650](https://github.com/nomui/nomui/commit/5fac650978cd51730f6cc755770e2f069cf17a4e))
- **Tree:** node 节点添加 tools 配置 ([bd991c7](https://github.com/nomui/nomui/commit/bd991c707b27b82602afef02d43eec83c2a5ef49))
- **Tree:** tools 工具支持 onClick 事件返回 node 和 trees 实例 ([2f2e884](https://github.com/nomui/nomui/commit/2f2e8845731dc19fd232f7f1bc5005a7339a8a34))

### Bug Fixes

- **Button:** 按钮外部设置的 attrs 被覆盖 ([dd007c2](https://github.com/nomui/nomui/commit/dd007c271a66fc624e039f097749471776665ec0))
- **Ellipsis:** 单词换行导致的省略展示失效 ([1a15187](https://github.com/nomui/nomui/commit/1a15187af07b6ee77b9724937304ce67b8f52077))
- **Ellipsis:** 将单词也换行 ([6e3c82b](https://github.com/nomui/nomui/commit/6e3c82b1195c9cb2a1b05610b728d892708c30ea))
- **Field:** 修复 Field 文档描述错误 ([168d753](https://github.com/nomui/nomui/commit/168d75385ed977b81c25c9236b7d9a0b3efb0065))
- NomUI 文档页没有正确高亮的问题 ([ffa440a](https://github.com/nomui/nomui/commit/ffa440a79afad3493956cceddadb7b039b24525b))
- **Tree:** tools 的样式展示 ([8643afd](https://github.com/nomui/nomui/commit/8643afd4fd21ad1f3a0696efa1a865a1dc128ee8))

## [1.0.0-alpha.43](https://github.com/nomui/nomui/compare/v1.0.0-alpha.42...v1.0.0-alpha.43) (2021-12-28)

### Bug Fixes

- **Gird-autoWidth:** td 宽度不够时，操作文案换行 ([ec7bb99](https://github.com/nomui/nomui/commit/ec7bb9965da2fa5bdc06fd07b926bfe65fb8cdb7))
- **Grid-autoWidth:** 自动计算列宽的 padding 部分 ([db4f414](https://github.com/nomui/nomui/commit/db4f41416ca5b926befc270e135ec47d17e463f1))

## [1.0.0-alpha.42](https://github.com/nomui/nomui/compare/v1.0.0-alpha.41...v1.0.0-alpha.42) (2021-12-24)

### Features

- **Grid-autowidth:** 列根据子元素自动得出宽度 ([b276bb1](https://github.com/nomui/nomui/commit/b276bb1fa6d6484d1d9d143ea9ebc4e6a2588ef6))
- **Grid:** 添加列宽根据子元素自动计算得出功能 ([05fb483](https://github.com/nomui/nomui/commit/05fb483151bbb6a33f093f004be5bb68f2646b33))

### Bug Fixes

- **Gird-autoWidth:** 有自定义列按钮时，导致操作列宽度不够文字换行 ([6c02c12](https://github.com/nomui/nomui/commit/6c02c1275bae5bcd191365db764c22ec5f95537e))
- **Grid:** 固定列时的 border 展示问题 ([3770633](https://github.com/nomui/nomui/commit/3770633b1efc5e8fff169f8e645f903018d2292f))
- **Grid:** 兼容 autoWidth 和 ellipsis ([14cf314](https://github.com/nomui/nomui/commit/14cf314b413b71a3681c4b94e73cacc127820629))
- **Grid:** 手动固定列应该忽略右侧已经固定的列 ([d5da1de](https://github.com/nomui/nomui/commit/d5da1de0837e7f71f5def3bb33beb4bbdcd8b3c0))
- **Grid:** 原始 columns 中的空对象没有正确被忽略掉 ([d312bad](https://github.com/nomui/nomui/commit/d312bad9b7b82ec4f7713dc726b4810c2e422342))
- **Grid:** autoWidth 操作列文字按钮太少导致表头换行 ([d5660a8](https://github.com/nomui/nomui/commit/d5660a8de81def39ed3d3b254b384785804f59d1))
- **Toolbar:** 添加 inline 配置 ([c4bb7d1](https://github.com/nomui/nomui/commit/c4bb7d1bf5363e3657bf3ee875e1db6943f1cd85))
- **TreeSelect:** 修复 TreeSelect 多选 bug ([7e2fb04](https://github.com/nomui/nomui/commit/7e2fb04f5ac2dcc27ca1156e45da37d16fd52fe9))

### Docs

- **Grid-autoWidth:** autoWidth 和 width 配置的优先级 ([10226e2](https://github.com/nomui/nomui/commit/10226e2527d274b7d284680dab592f6a379d89b7))
- **Grid:** 自动计算列宽 title ([68b8281](https://github.com/nomui/nomui/commit/68b82818f18b91f47edaf995e150f9e928d94d54))

## [1.0.0-alpha.41](https://github.com/nomui/nomui/compare/v1.0.0-alpha.40...v1.0.0-alpha.41) (2021-12-17)

### Features

- **Gird-colwidth:** 实现列宽设置的本地存储 ([10e840c](https://github.com/nomui/nomui/commit/10e840c93c9af913ec1013be45da74b28a5c218e))
- **Gird-resizable:** 设置列宽缓存和总计行列宽兼容 ([786d46c](https://github.com/nomui/nomui/commit/786d46cd610affbc514d0437e75d8515567549cf))
- **Gird:** 添加尾部合计行 ([42c3529](https://github.com/nomui/nomui/commit/42c35292e61c6cef2d5374332ff83dec24be7150))
- **Grid-resizable:** 列设置和列宽设置的 key 都默认优先使用 Grid 的 key ([9f1668e](https://github.com/nomui/nomui/commit/9f1668eff9c1b3d47bbc8ef16b2daa96015131c0))
- **Grid-summary:** 总计行和滚动的协同 ([5e47932](https://github.com/nomui/nomui/commit/5e4793217e3f771e0209e292f6c40e68ba31b93e))
- **Grid-summary:** 总计行和滚动等其他表格特性兼容 ([5c36d39](https://github.com/nomui/nomui/commit/5c36d3938b4dd9fc868627c1b62d2d06ac6a393c))
- **Grid:** 新增手动固定列功能 ([4a4c804](https://github.com/nomui/nomui/commit/4a4c8041cb6c3b18ab59d5cf627d2942a3f91589))
- **Grid:** 新增 sortCacheable 配置，缓存排序状态 ([1874ea0](https://github.com/nomui/nomui/commit/1874ea051eeddfea9b3594363183403555aa2efc))
- **Skeleton:** 新增骨架屏功能 ([26d397e](https://github.com/nomui/nomui/commit/26d397e6c594068bb1d042f7ed0a85e19d14d210))

### Bug Fixes

- **Gird-resizable:** 缓存的 key 不直接使用 Grid.porps.key ([e6f744e](https://github.com/nomui/nomui/commit/e6f744eb8e7975a02b88f22ccb0d75e859797009))
- **Gird-summary:** 变量名修改 ([24a2118](https://github.com/nomui/nomui/commit/24a211838f52c1143b808624641d91022921ffc5))
- **Grid-treeconfig:** 树表格 外部 iupdate 后导致数据错误 ([045313e](https://github.com/nomui/nomui/commit/045313ef7d55f3a4fcfc45598459fd7029f47fbb))
- **Grid:** 单词拼写错误 ([cac74e9](https://github.com/nomui/nomui/commit/cac74e922a3fd8cf2f6e729161009c4774579044))
- **Grid:** 将 resizeCol 函数抽离 ([b8e412d](https://github.com/nomui/nomui/commit/b8e412d9d82064416b822374d11748e88a6b21d1))
- **Grid:** 列设置面板高度自适应无效的问题 ([d677676](https://github.com/nomui/nomui/commit/d677676e0d1f15dbc770a6238b8fe6e8196f8f14))
- **style:** body 设置了字体大小，导致 Popup 弹窗框内的文字换行 ([0b3d02f](https://github.com/nomui/nomui/commit/0b3d02f841f6cebe9e821d680502f02f4506e2b9))

### Docs

- 更新 Skeleton 文档 ([b2eb4eb](https://github.com/nomui/nomui/commit/b2eb4eb4c0aa00b1fe9c2d462cb82e71ca4e0eb5))
- **CheckboxList:** CheckboxList 的文档补充 ([771ad45](https://github.com/nomui/nomui/commit/771ad4530beb0b3dadaa94e5f126447dd0d12811))
- **Field-rules:** 校验规则的文档补充 ([2666a40](https://github.com/nomui/nomui/commit/2666a40f1c73044912670ee989c7acd5f24d4698))
- **Grid:** cache 属性的文档修改 ([2b40217](https://github.com/nomui/nomui/commit/2b40217c16e60a1c5f17546b2bb455c306965074))
- **RadioList:** RadioList 和 Switch 的文档补充 ([33930e6](https://github.com/nomui/nomui/commit/33930e6708ad949d6ab41e3c427bf7601d217b45))
- **Skeleton:** 完善示例以及文档 ([36d0443](https://github.com/nomui/nomui/commit/36d0443aa0832a9f919f6718a35cd7927dfc4dea))

## [1.0.0-alpha.40](https://github.com/nomui/nomui/compare/v1.0.0-alpha.39...v1.0.0-alpha.40) (2021-12-10)

### Features

- **DatePicker:** 添加 minDate 和 minTime 的联动示例 ([cfcaa8b](https://github.com/nomui/nomui/commit/cfcaa8b6b2fc0756e4e0e129f136dfee6cd1bc77))
- **Icon:** 添加 hospital 和 company 的图标 ([27d719d](https://github.com/nomui/nomui/commit/27d719ddaedf4dadc03239383f67205d6bb891ae))

### Bug Fixes

- **DatePicker-TimePicker:** 添加日期选择器中时间部分的禁用的场景 ([643668b](https://github.com/nomui/nomui/commit/643668b58ca4d0258aa761e9ea6e57dab7fa7054))
- **DatePicker:** 当设置了 showTime 且有默认值时，点开时输入框数据不对 ([bb2cd7e](https://github.com/nomui/nomui/commit/bb2cd7ef3eb8acf91d8f38575996c3481f92de0b))
- **DatePicker:** 日期选择器中对 minDate 和 showTime.minTime 之前的联动处理 ([0584c2a](https://github.com/nomui/nomui/commit/0584c2a8aa8c368b1082307be6ec78b949691b62))
- **Grid:** 优化 sticky 滚动条显示隐藏的逻辑 ([90134b2](https://github.com/nomui/nomui/commit/90134b2e58141323e9d2b0b4ea3853816e5c3515))
- **NumberSpiner:** input 内部触发 blur 的回调, 组件中添加对应的方法 ([8a9c41d](https://github.com/nomui/nomui/commit/8a9c41d305358174ba430cee549bbf57045e6f98))
- **TimePicker:** 补全 timePicker 的禁用场景 ([739c936](https://github.com/nomui/nomui/commit/739c93620fa8d98eb424fbd0074b93100f062806))

### Performance Improvements

- **Grid:** 优化滚动条显示隐藏逻辑 ([e62e4ab](https://github.com/nomui/nomui/commit/e62e4ab559213808ddbcd56a79946d2f8e558eea))
- **List:** 优化 List 虚拟列表与普通列表之间的转化支持 ([6afad20](https://github.com/nomui/nomui/commit/6afad209e5cb9fe531512e8779215dbb23c76101))
- **List:** 增加示例 ([2793e58](https://github.com/nomui/nomui/commit/2793e58a128dd7ace5d97136a5da64a9e6e58c74))

## [1.0.0-alpha.39](https://github.com/nomui/nomui/compare/v1.0.0-alpha.38...v1.0.0-alpha.39) (2021-12-03)

### Features

- **TreeSelect:** 树选择 搜索 ([ed964d7](https://github.com/nomui/nomui/commit/ed964d7d8adb2c484ca6fb1ab48cc0df5b29290d))
- **TreeSelect:** 支持搜索功能 ([d912069](https://github.com/nomui/nomui/commit/d912069525a7190c6695417161e517a9650ff0b2))
- **TreeSelect:** 支持搜索功能 ([77c2b60](https://github.com/nomui/nomui/commit/77c2b60b832642d646480356a45df577a80b9042))

### Bug Fixes

- **Grid:** 调整横向滚动条出现时机 ([878122c](https://github.com/nomui/nomui/commit/878122cc252cd7f35cbbbfc135090e958229944f))
- **Grid:** 调整 Grid 横向滚动条出现时机 ([a83d4b3](https://github.com/nomui/nomui/commit/a83d4b3d4a8289434ec2bf469c3b121023c26882))
- **line-height:** 行高统一设置为 [@line-height-base](https://github.com/line-height-base) ([64e0f31](https://github.com/nomui/nomui/commit/64e0f31da404575268fa7c55663fd9f5576d995a))
- **Notification:** align 兼容旧配置 ([8c186a0](https://github.com/nomui/nomui/commit/8c186a0cb824ad9e2f7740e6185a6c8c807ca729))
- **Select:** Pager 修改分页大小时，又主动调用了 page 的 update，导致 select 实例被更新，报错 ([7514456](https://github.com/nomui/nomui/commit/7514456e52bda93b4af718072a4ddcc611b597e8))
- **style:** 统一各个 field 的高度计算展示 ([f460846](https://github.com/nomui/nomui/commit/f4608465ed70b2e86fb7e7fff87fe4ca2d306107))
- **Tree:** 多选 cascadeCheckChildren 和 cascadeCheckParent 冲突的问题 ([2892aca](https://github.com/nomui/nomui/commit/2892aca1eb55f81b133288428c0f361509a256f0))
- **TreeSelect:** 修改 nodeCheckable 和 selectable 的优先级 ([9dcc062](https://github.com/nomui/nomui/commit/9dcc062c498777bede323c68428c512908eab458))
- **TreeSelect:** setValue 后, 多选 popup 的内容不更新 ([b6045ba](https://github.com/nomui/nomui/commit/b6045ba0992a178f1febc983a7118e4c3bcb1925))

### Docs

- **TreeSelect, Tree:** 补充文档 ([f714fb6](https://github.com/nomui/nomui/commit/f714fb6c29cf431346c4c5bc6c4d4acd4de9178a))
- **TreeSelect:** 多选的 demo 修改 ([d017cb8](https://github.com/nomui/nomui/commit/d017cb802f499bea6f56f8209dc5f8da9166a8b0))
- **TreeSelect:** 添加 searchable 的文档 ([4870c39](https://github.com/nomui/nomui/commit/4870c3959c96126cb5d0d16dbc6867177438169c))

## [1.0.0-alpha.38](https://github.com/nomui/nomui/compare/v1.0.0-alpha.37...v1.0.0-alpha.38) (2021-11-26)

### Features

- **Component:** 基类将 props 作为\_update 的参数，通知到每个组件中 ([e485b68](https://github.com/nomui/nomui/commit/e485b68df57bc791cdaa441c54695a131427475a))
- **Menu-selectable:** 是否选中配置，添加 onlyleaf 配置 ([fbb3c9d](https://github.com/nomui/nomui/commit/fbb3c9d052e5210132b671cbdfda2b8cd7b5d596))
- **Numberbox:** 添加 onBlur 方法 ([14d59d4](https://github.com/nomui/nomui/commit/14d59d45c5878c5e61949fe306e80197aa656b77))

### Bug Fixes

- **Field:** 当 field 被销毁时, 定时器报错 ([0a62935](https://github.com/nomui/nomui/commit/0a62935839101d292a6664b8958c157485b9ccc5))
- **Grid:** 开启列设置，外部更新 columns 时，展示错误 ([b4f292b](https://github.com/nomui/nomui/commit/b4f292be520a8e34c9ff41db58e671ae25594403))
- **Grid:** 支持级联特性 ([d3c2ea3](https://github.com/nomui/nomui/commit/d3c2ea3279ee91330a2d4ff9088020ddee15fbcc))
- **Menu:** Selectable.byClick 默认改为 false ([f83fdbd](https://github.com/nomui/nomui/commit/f83fdbd7ee11aaf32124e89e6004e2cbd7cf61c8))
- **Menu-uistyle:** pill 模式下，子 menuItem 被选中无样式 ([86166e9](https://github.com/nomui/nomui/commit/86166e9a604f00d775c596fd6388e453c2e08894))
- **Menu:** 菜单的默认展开配置 initExpandLevel ([35e821b](https://github.com/nomui/nomui/commit/35e821bedd1aa724607cbf686fefecf0091b5389))
- **Numberbox:** 当 setValue(null) 时，会展示出 undefined ([d11cafb](https://github.com/nomui/nomui/commit/d11cafbc4680682686a26aa1764802af3a9201d3))
- **Numberbox:** 去掉自身的 onBlur 方法，从 textbox 中有继承 ([36ac121](https://github.com/nomui/nomui/commit/36ac1214f624515a663583a0a7baf0f64815123e))
- **Select:** 多选模式下删除最后一项数据报错问题 ([ffc270d](https://github.com/nomui/nomui/commit/ffc270daf930e17ceab1bf007e764e830a38df5c))
- **TextBox:** 低版本浏览器不支持 trimStart, 需使用 trimLeft ([8c91e73](https://github.com/nomui/nomui/commit/8c91e7389441805ee4a5ae94a1bf352987995caa))
- **Tree:** 删除使用 leafOnly 的代码 ([9a6e7a7](https://github.com/nomui/nomui/commit/9a6e7a7271b0ce93bebdc3600567c31dbbf2ee0c))

### Docs

- **Menu:** 菜单的文档-methods 部分 ([8eea3a2](https://github.com/nomui/nomui/commit/8eea3a2733fc0501606d63c19dde3364ca5fdd52))
- **Menu:** 菜单的文档补充 ([63ab713](https://github.com/nomui/nomui/commit/63ab71318b8cafd8674623695c5ff480a501f0ff))

## [1.0.0-alpha.37](https://github.com/nomui/nomui/compare/v1.0.0-alpha.36...v1.0.0-alpha.37) (2021-11-19)

### Features

- **Anchor:** 添加默认高亮某个锚点的功能 ([cc3d7ee](https://github.com/nomui/nomui/commit/cc3d7ee8a4ccb30a7769b5be16d8d6552f199d53))
- **Anchor:** 新增默认滚动到某个锚点位置 ([68b60a7](https://github.com/nomui/nomui/commit/68b60a7aa056d76dbe4a9abf5d62ea17421774c5))
- **Group:** setValue 添加 ignoreFiels 配置, 支持特定属性的不更新 ([8d6a825](https://github.com/nomui/nomui/commit/8d6a82510e836c3fccf0dc8253267aa485082ec6))
- **Select:** 支持额外 options 列表 ([97af3a1](https://github.com/nomui/nomui/commit/97af3a17b526ba142753287957feb3bc677d2275))
- **TextBox:** 添加 trimValue 配置，支持去除首尾空格 ([6794a86](https://github.com/nomui/nomui/commit/6794a863eb9b1a4bcaa9eb41952d43545b25e404))
- Tree 树组件初始化也能自动感应全选状态 ([a6bc62d](https://github.com/nomui/nomui/commit/a6bc62de1b13dfae386ebaa459685d960aece6e4))
- Tree 组件以及 CheckboxTree 组件支持勾选所有子节点和自动感应全选 ([c9bfcce](https://github.com/nomui/nomui/commit/c9bfcce205de9606452b6a2dd4c8d38c88f29c26))
- TreeSelect 下拉树选择组件扩展 fit 滚动条功能 ([219316b](https://github.com/nomui/nomui/commit/219316b6bb52af730ee84e0401c36e823cea9f76))

### Bug Fixes

- 修复 Uploader 表单验证 ([d89b1f3](https://github.com/nomui/nomui/commit/d89b1f35b771e160060cf1835a8cb501489cf519))
- 修复 Uploader 组件编译报错的 bug ([f3c0b2b](https://github.com/nomui/nomui/commit/f3c0b2bd5f85ae555143cc9607a4045135134e08))
- **AutoComplete:** 无值时则不展示删除图标 ([ad2c355](https://github.com/nomui/nomui/commit/ad2c355994ad0df23e43681303458be97c6a3bf0))
- **Component:** 解决某些情况\_remove 报错问题 ([0f6c3b0](https://github.com/nomui/nomui/commit/0f6c3b0393f016e283c87529d89b0127feeefe37))
- **Field:** 修复上下模式的 Field 内容宽度问题 ([c6acf37](https://github.com/nomui/nomui/commit/c6acf370979670ee7a2cd2ef94456b7b19b6edeb))
- **Gird-frozenHeader:** 配置固定表头时，列的不对齐问题 ([19aaee5](https://github.com/nomui/nomui/commit/19aaee55bbdd1196e9e4c261f6f22750f05ac12c))
- **Grid-empty-scroll:** 无数据时自动滚动到中间位置，计算方式改变 ([1e7de26](https://github.com/nomui/nomui/commit/1e7de262ebbf18d6a8c8908dcfa49d608be3488a))
- **Grid:** 表格列设置的保存按钮，设置为 primary 类型 ([d3d215d](https://github.com/nomui/nomui/commit/d3d215d469d4a92db26c06c815d1e4fba635c590))
- **Grid:** 修复 Grid 组件，在平面数据下父子数据排序打乱情况下，父子节点显示不正常的 bug ([38120d5](https://github.com/nomui/nomui/commit/38120d52e17126acddb8828f84d5d9f6bb5db417))
- **GroupGrid:** 解决父组件校验时重复触发 Tr 的 validate 的问题 ([ccf110e](https://github.com/nomui/nomui/commit/ccf110e4b52450b9629f1b960a8bcdc851c6e18e))
- **Select:** options 有重复 key 时，添加 wran 提示，占位文案的展示根据 getOption 方法判断 ([d524a63](https://github.com/nomui/nomui/commit/d524a635a1f101bd84c7d0b55cb17065dede112b))
- **Textbox-trimvalue:** 单纯使用 trim 方法无法去除 \t 制表符 ([823e9fd](https://github.com/nomui/nomui/commit/823e9fdab64af6c26d99a8b1870fbd6cdb7af4ce))
- **Tree:** 修复 Tree 树组件，在平面数据下父子数据排序打乱情况下，父子节点显示不正常的 bug ([5811737](https://github.com/nomui/nomui/commit/58117374088a54c97fe86aa0914e04d613e362e5))
- **Uploader:** 修复 Uploader 中按钮 attrs 不生效的 bug ([ae6f23b](https://github.com/nomui/nomui/commit/ae6f23bd0a4d27986e04438e20a8e14cd7c27e6f))
- **Uploader:** 修复 Uploader 中按钮 attrs 不生效的 bug ([7de5bff](https://github.com/nomui/nomui/commit/7de5bff7259f5d4765241314671fd0d080f5bc9c))
- **Uploader:** 修复 Uploader 中按钮 attrs 不生效的 bug ([476856e](https://github.com/nomui/nomui/commit/476856e37c9acc333967be76511529e1136e7930))
- **Utils:** formatDate 方法不支持 yyyy/MM/dd 格式问题 ([701b6af](https://github.com/nomui/nomui/commit/701b6af92b78c940c29a9fa4583ecdf2672a0049))

### Performance Improvements

- TreeSelect 下拉树选择组件显示框固定高度范围 ([2c4d35f](https://github.com/nomui/nomui/commit/2c4d35f4e05c9583b1b476776e8cced54a925d93))
- TreeSelect 下拉树选择组件显示框固定高度范围 ([d2219a7](https://github.com/nomui/nomui/commit/d2219a7817dd885c8f79351063e53be7265f1cf4))

### Docs

- **Tooltip:** 提供自定义配置的案例 ([99b671c](https://github.com/nomui/nomui/commit/99b671cc28f3c1cbc465c1956eeab899f30d4acb))

## [1.0.0-alpha.36](https://github.com/nomui/nomui/compare/v1.0.0-alpha.35...v1.0.0-alpha.36) (2021-11-05)

### Features

- **Cascader:** 文本溢出省略 ([f78c930](https://github.com/nomui/nomui/commit/f78c9305d2b7bc29722ad3536c47b739d527ee3b))
- **Cascader:** 新增高宽配置，并自动处理文字溢出省略 ([06aac2d](https://github.com/nomui/nomui/commit/06aac2db408c037f837dc8360d38f0a3fa27a42d))
- **color:** 修改颜色部分使用 css3 的 var 变量引用，方便扩展和修改 ([2cabf38](https://github.com/nomui/nomui/commit/2cabf38c5bfccac942133c8ce4a029c10a4b8259))

### Bug Fixes

- 修复 Breadcrumb 面包屑样式 bug ([b582188](https://github.com/nomui/nomui/commit/b5821880cdc87bc3fd64b46dab33be591f29f6c0))
- 修复 Cascader 弹框选项右边箭头图标样式 bug ([3c3a793](https://github.com/nomui/nomui/commit/3c3a793f9971608b51dc8717c1b2b0a24151c3cf))
- 修复 Cascader 示例的小 bug ([df02c2b](https://github.com/nomui/nomui/commit/df02c2b4c2884845549a2aeaf295bcd83db719a2))
- **Cascader:** 修复 Cascader 在非单页应用中页面滑动 bug ([a49c5be](https://github.com/nomui/nomui/commit/a49c5bee471c1a6fb14d4ea44a6c6f51c3ba3d7b))
- **Loading:** 修复当 container 为非 nomui 组件时添加移除 nom-loading-container 样式类的 bug。 ([fa1f432](https://github.com/nomui/nomui/commit/fa1f43248c1c308cc733387a3a342c9f5a7ee9bb))
- **position:** 修复 position 在非单页应用中定位计算问题 ([d8aba4f](https://github.com/nomui/nomui/commit/d8aba4f92ab47952d896f24676241c3a1f079a94))
- **Select:** 实例被更新后，导致 optionList 被销毁，无法正确赋值 ([763fd71](https://github.com/nomui/nomui/commit/763fd71770be7c941db1d13fd6985f9c0b96ad4c))

### Docs

- **Select:** 完善示例 ([246a7bf](https://github.com/nomui/nomui/commit/246a7bfab48241e50693e21ba1a07bf17843e4bc))

## [1.0.0-alpha.35](https://github.com/nomui/nomui/compare/v1.0.0-alpha.34...v1.0.0-alpha.35) (2021-10-29)

### Features

- **Grid-checkbox:** rowCheckable 添加 checkboxRender 配置，函数返回该复选框的 props 属性 ([53076f4](https://github.com/nomui/nomui/commit/53076f49e80fb8b92a8158d78779add5e8116b1c))
- **Grid-row-checkable-render:** 示例和优化 ([e6844ed](https://github.com/nomui/nomui/commit/e6844edf54272da5a50c40fb0e54f158a45ad691))
- **GroupList:** 支持禁用 ([4fad812](https://github.com/nomui/nomui/commit/4fad8127e6b6bfb5b0376f4f1503b5803a11dc4e))
- **MaskInfoField:** 添加信息打码组件继承至 Field，获得 Field 对应的方法 ([583cb0b](https://github.com/nomui/nomui/commit/583cb0b61f1d75ed40c90177810a9cc6989c9a95))
- **MultilineTextbox:** 支持 onBlur 事件 ([3aff1b6](https://github.com/nomui/nomui/commit/3aff1b65c89ebc5af2f5ba7e0633569515feaf9f))
- **Swtich:** 支持禁用 ([a64a6c1](https://github.com/nomui/nomui/commit/a64a6c17d1ee1308157abed8bfdf40cf6763b2af))
- **Tree:** nodeCheckable 的 cascadeCheckParent 和 cascadeUncheckChildren 生效 ([7ea7072](https://github.com/nomui/nomui/commit/7ea7072fdc86a0a9c50ba5bbe62a55e6dae9ea3e))
- **TreeSelect:** 添加只能选择叶子节点 onlyleaf 的配置 ([f9164ff](https://github.com/nomui/nomui/commit/f9164ff0a4bb64a0c06bf665d60ba0682dbc3e7a))
- **Uploader:** 完善文件类型限制 ([8a77f3c](https://github.com/nomui/nomui/commit/8a77f3cf1ac3df521f330e686d82799b72cf4730))
- **Uploader:** 优化文件上传类型限制功能 ([674df61](https://github.com/nomui/nomui/commit/674df61e757b14278b73367c8df82a94e747b68c))

### Bug Fixes

- **Field:** 某些 Field 组件内部文字太长溢出的问题 ([d2d4344](https://github.com/nomui/nomui/commit/d2d4344e82df8ee1cee55828666fc1c56a27eb76))
- **Field:** 内容过长的时候 content 被撑开的问题 ([9a5341d](https://github.com/nomui/nomui/commit/9a5341d7c31b227eb209d8335c186bcf1411d824))
- **Field:** 校验提示不显示的问题 ([a035881](https://github.com/nomui/nomui/commit/a035881a172848ed743e20124d84018bec5fa29c))
- **Field:** flex 内容过长撑开的问题 ([bef7686](https://github.com/nomui/nomui/commit/bef768630674d7c4aae42800fc73019d775e63f3))
- **Grid:** originColumns 不能正确保存 cellRender ([74dacd4](https://github.com/nomui/nomui/commit/74dacd4146811c813a1c69add528dfd7be00d8e0))
- **Select:** 选中时因为 placeholder 未即时清除造成的抖动 ([f008db2](https://github.com/nomui/nomui/commit/f008db226bcce09e833011308904da4c320b5a35))
- **Select:** 隐藏 placeholder 前添加判断 ([b8b95ea](https://github.com/nomui/nomui/commit/b8b95ea39c84d6b9e4cfece20d7bf1b962723eb5))
- **Select:** 有默认值的时候不能点 X 清空以及赋值问题 ([4f175ce](https://github.com/nomui/nomui/commit/4f175ce6656057999ea1ea0d3e136d609aa0bff4))
- **TreeSelect:** 编辑表单时，获取其 value 时为 undefined 的 bug ([fe50472](https://github.com/nomui/nomui/commit/fe504729c5271e21262643dfc218204039bd2c88))
- **TreeSelect:** 弹窗框的宽度和 padding ([97cf5c3](https://github.com/nomui/nomui/commit/97cf5c345dfe580163412feed4ac8adc1b84abcb))
- **TreeSelect:** 级联取消子节点关闭时，导致获取勾选节点有误 ([9c80c3a](https://github.com/nomui/nomui/commit/9c80c3aae8d6601abab248da25dc9284fe1a7a2f))

### Docs

- **Grid-row-checkable-render:** 文档内容补充 ([bc0b5aa](https://github.com/nomui/nomui/commit/bc0b5aaf0ee7690558e9a6629059fdf6427097ea))
- **TreeSelect:** 文档补充 onlyleaf ([f434c68](https://github.com/nomui/nomui/commit/f434c688159ef12b513240859a7ef6615ae24fca))
- **Uploader:** 添加案例 ([786d8a3](https://github.com/nomui/nomui/commit/786d8a320878a07df4abe9323e5c999811dc7f13))

## [1.0.0-alpha.34](https://github.com/nomui/nomui/compare/v1.0.0-alpha.33...v1.0.0-alpha.34) (2021-10-22)

### Features

- **Flex:** 实现行布局换行 ([fb3637d](https://github.com/nomui/nomui/commit/fb3637dd0d04bb92f0eef8ecfe97605c5ab7455d))
- **Grid:** 支持配置 flatData 来实现 treeGrid 的扁平数据传入 ([37ff25c](https://github.com/nomui/nomui/commit/37ff25c6d03a9c5763c02f33a98e5d55fcb8c9f3))
- **Menu:** 新增 uistyle：short-menu，当前只在 direction 为 horizontal 时有效 ([143432a](https://github.com/nomui/nomui/commit/143432a9ff96fb7fd02f714fa4423d59d7617178))
- **Select:** 多选时支持点击 icon 删除已选中的选项，无需打开列表 ([5bb1cb2](https://github.com/nomui/nomui/commit/5bb1cb2e63cf591bd86c0fe2494b663e559331a6))
- **Tree:** 添加 expandTo, 展开特定节点的方法，完善 tree 组建的文档 ([860cbbd](https://github.com/nomui/nomui/commit/860cbbdc26ab8b31cf02c73367cfe3c001e14d93))

### Bug Fixes

- **DatePicker:** 禁用状态下不再显示清空按钮 ([31c3fdd](https://github.com/nomui/nomui/commit/31c3fdd332340bd0bb17e60941a1555619e469d9))
- **Gird-scrollbar:** Gird 未设置 sticky 时，则无 scrollbar ([b2f7bfc](https://github.com/nomui/nomui/commit/b2f7bfc3b30365faa126fae74a88f235ff3ee82c))
- **Tree:** 展开特定节点，修改实现方式，通过调用 expand 方法，而不是 trigger('click') 实现 ([0505836](https://github.com/nomui/nomui/commit/050583625e80c431f33578214cd968f628f6b0b4))
- **TreeSelect:** 将 options 的数据存成 map，优化选取之后的遍历算法 ([5f8ca3c](https://github.com/nomui/nomui/commit/5f8ca3cf763628bdb79aa1216330cfe07666b890))
- **TreeSelect:** 设置 flatOption: true 时，popup 的更新会导致重复执行 flagData 操作 ([e108867](https://github.com/nomui/nomui/commit/e1088670fd34eae3e15167238367ba01034659ef))
- **TreeSelect:** 修复异步获取 option 的 bug, 数据转换放至 config 中 ([230aebd](https://github.com/nomui/nomui/commit/230aebdbabd6e65816677db2c31e47fb38dc7afc))
- **TreeSelect:** 修改 TreeSelect 无法被选中的 bug ([9d69b4d](https://github.com/nomui/nomui/commit/9d69b4d9924912c50ddc27bea9fc3f57a631a7a2))

### Docs

- **Grid, Tree:** flatData 的字段文档补充 ([e3eed32](https://github.com/nomui/nomui/commit/e3eed3243f314f2469d4fedbb0a19daa17710fb0))

## [1.0.0-alpha.33](https://github.com/nomui/nomui/compare/v1.0.0-alpha.32...v1.0.0-alpha.33) (2021-10-15)

### Features

- **Grid:** 表格数据为空时，默认 scroll 滚动至中间位置 ([ceeff96](https://github.com/nomui/nomui/commit/ceeff9601b45b85ce56c3d6736d37ef7be6d0c19))
- **Numberbox:** 添加校验规则，支持逗号分隔符的小数形式 ([d253a2c](https://github.com/nomui/nomui/commit/d253a2cbc381270510a6239ba479dca12a8ccbd4))

### Bug Fixes

- 解决 Cascader 代码冲突 ([7174677](https://github.com/nomui/nomui/commit/71746778a44ae1e4efc1c673ddab6933b3244ae0))
- 修复 bug[#444](https://github.com/nomui/nomui/issues/444) ([161fc1e](https://github.com/nomui/nomui/commit/161fc1e3dff38fe4f0a259c5b308ff1edb83daac))
- 修复 Cascader 组件 Clear 功能未能清除的问题 ([b97057d](https://github.com/nomui/nomui/commit/b97057d6bbfdecc23226a415a57b1ae85957cc79))
- 修复 Cascader 组件 clear 时内容未被清除的 bug ([a4a2a8a](https://github.com/nomui/nomui/commit/a4a2a8a22233d88f6c594135e6bac600e56a1bf1))
- **Gird-Td:** 自定义渲染时，以#开头不将 children 处理为 title ([890dd5b](https://github.com/nomui/nomui/commit/890dd5bf4d49b0b238b6f5f02e24d24df920e473))
- **Gird:** 后端排序后，表格自动回到之前的滚动位置 ([e2880ee](https://github.com/nomui/nomui/commit/e2880ee085fb89a108db4b70819f1516c85d47b1))
- **Gird:** 修改表格自动 scroll 的变量名，更加语义化 ([26916f9](https://github.com/nomui/nomui/commit/26916f950e256a51736de2990bfcadaf41af53c8))
- **Gird:** 自动滚动的判断 ([6de8e4d](https://github.com/nomui/nomui/commit/6de8e4d15507f8cfc09888fbb273ea2e14beb6a3))
- **Grid-Scrollbar:** Gridbody 和 sticky 的滚动条的对其不一致的问题 ([392ea94](https://github.com/nomui/nomui/commit/392ea94ae5dd5bff2ea6206232f79eb938a8604b))
- **Grid-sort:** 点击排序后滚动至上次位置，兼容异步请求回的更新 ([9c0ed99](https://github.com/nomui/nomui/commit/9c0ed99604f11be0b3a1d5049f750c7c54e28e47))
- **Grid-Td:** 修改了 Td 的层级结构，导致设置 ellipsis 时的 title 无效了 ([42fb145](https://github.com/nomui/nomui/commit/42fb14547504bf5faaf390f455cfebd874d8e633))
- **Numberbox:** 使用 replace 替换 replaceAll 来保证兼容性 ([0adb883](https://github.com/nomui/nomui/commit/0adb883d9eb14e168ca14bba9ff16cac50916bc9))
- **Utils:** 解决 utils.parseToQuery 方法报错的问题 ([d5e2250](https://github.com/nomui/nomui/commit/d5e225044c8cb13f1f9c3e7fa3c324755b2e2a9c))

### Docs

- **Collapse:** 新增文档 ([da66ea8](https://github.com/nomui/nomui/commit/da66ea8a9652a8b804a8bc7d9879c3af186c4674))

## [1.0.0-alpha.32](https://github.com/nomui/nomui/compare/v1.0.0-alpha.31...v1.0.0-alpha.32) (2021-09-30)

### Bug Fixes

- **Gird:** 在点击列排序后，Tr 重新渲染两次导致定时器中的 this 为空的处理 ([18d83f5](https://github.com/nomui/nomui/commit/18d83f55f6eb23e2b7eb8f2fa41628c564c5bbc1))
- **Grid:** 修复设置了 ellipsis 时，冻结列的伪元素未展示的 bug ([feaa1ab](https://github.com/nomui/nomui/commit/feaa1ab3b2e880562458b4e1b26f1cff55a77f4e))
- **TheadTr:** 去掉滚动条占位 tr 的代码 ([ece50e2](https://github.com/nomui/nomui/commit/ece50e24e15dc37d4f1838d722e47b7d64d986d0))

## [1.0.0-alpha.31](https://github.com/nomui/nomui/compare/v1.0.0-alpha.30...v1.0.0-alpha.31) (2021-09-24)

### Features

- **GroupList:** 右边操作区支持自定义渲染 ([aeacaa5](https://github.com/nomui/nomui/commit/aeacaa5b0f8f7822fa602dbe3408cd5ff793aafb))
- **Menu:** compact 模式新增自动选中以及展开功能 ([ee19237](https://github.com/nomui/nomui/commit/ee192376cd4e30d73ccc2115ae3cf50af2c5e889))

### Bug Fixes

- **Button:** 修复超链接在表格省略模式下显示异常 ([5c710c8](https://github.com/nomui/nomui/commit/5c710c8bace20177c836a3ba2a562cf7590260c0))
- **Field 校验:** Cascader 和 TreeSelect 的 content 字段修改名称，content 用于 Field 的 tooptip 的校验，不能重名 ([642542c](https://github.com/nomui/nomui/commit/642542cc0ac89f801f3f53807913b10acc0a3ffa))
- **Grid:** 修复 treeConfig.childrenField 无效的问题 ([55c11f8](https://github.com/nomui/nomui/commit/55c11f887f5e38f5baa9a4d8c76035bd1af45a32))
- **GroupGrid:** 修复首行 tr 校验信息被遮挡的问题 ([303bac2](https://github.com/nomui/nomui/commit/303bac2622b31a16a19894f19741a291be6793d5))
- **rule-manager:** 校验 rules 时，func 类型的不顾虑 empty 的值 ([bf8bd87](https://github.com/nomui/nomui/commit/bf8bd877a10387ab5405825520ecb45d8b7267d0))
- **Table:** 去掉设置 border-spacing 的部分 ([b7bb5e0](https://github.com/nomui/nomui/commit/b7bb5e085b548af2b3b11fa4060a2139a68b5dae))
- **Table:** 设置 frozenCols 冻结列时，展示 bug ([c8890b6](https://github.com/nomui/nomui/commit/c8890b62c7271e85a17050b53e85005abc8216bd))
- **TreeSelect:** 修改 getValue 的取值方式，在选择时触发 onValueChange ([3477554](https://github.com/nomui/nomui/commit/3477554da20dac392a02cc7975e024882351e0d4))

## [1.0.0-alpha.30](https://github.com/nomui/nomui/compare/v1.0.0-alpha.29...v1.0.0-alpha.30) (2021-09-13)

## [1.0.0-alpha.29](https://github.com/nomui/nomui/compare/v1.0.0-alpha.28...v1.0.0-alpha.29) (2021-09-13)

### Features

- **Menu:** 新增 compact 模式 ([66636d6](https://github.com/nomui/nomui/commit/66636d627a94b391381e66400c2e75b3f9629f4d))
- **Select:** Select 组件增加配置项 fieldsMapping ([d126408](https://github.com/nomui/nomui/commit/d1264082cb100890cfc7710cea332720b65b63e8))
- **TextBox:** 添加最大字符长度 maxlength 和 showWordLimit ([36d7835](https://github.com/nomui/nomui/commit/36d7835d7f4b60dcaba3806a7bd4c77e99ae4fb1))
- **TreeSelect:** 添加 TreeSelect 组件。 ps:待完善搜索功能 ([39adcff](https://github.com/nomui/nomui/commit/39adcffff3f02c6b9773d7c11a518a1dfde5ec96))

### Bug Fixes

- 修复 Cascader 组件清除按钮无效的 bug ([c6dbec8](https://github.com/nomui/nomui/commit/c6dbec8f93d64cce87719d8c60970783d18e3e11))
- **GroupGrid:** 默认值为空时新增按钮不起作用 ([c68ac8c](https://github.com/nomui/nomui/commit/c68ac8c0446505edc5c0d0eca7259729feb08e83))
- **Textbox:** 修改 wordLimit 的触发事件为\_onInput,导致搜索框 bug ([e0a20fc](https://github.com/nomui/nomui/commit/e0a20fccbe9d3a5fb6fd19c8297b93bd44b7b07a))
- **Tree:** 修复 Tree 组件展开 byIndicator 属性无效的 bug ([ff5bd80](https://github.com/nomui/nomui/commit/ff5bd801da188f14dd61e11fe017b16917a8ee1b))
- **TreeSelect:** 修改 treeData 属性为 options ([0c1db5e](https://github.com/nomui/nomui/commit/0c1db5ee522a35e3077dd92cfe84b5624c732fc3))
- **TreeSelect:** options 的值 key 字段改为 value 字段 ([5f71c66](https://github.com/nomui/nomui/commit/5f71c668bb9a17554b0c4c5e9bf1823b8767cb16))

### Docs

- 添加 Flex 布局的文档 ([dbaf517](https://github.com/nomui/nomui/commit/dbaf5177a17d4219539a3f330cffd78c679d5b9c))

## [1.0.0-alpha.28](https://github.com/nomui/nomui/compare/v1.0.0-alpha.27...v1.0.0-alpha.28) (2021-09-03)

### Features

- **Field:** Field 校验规则添加身份证 ([461f32c](https://github.com/nomui/nomui/commit/461f32c9058827d1c5b43a9461b3ac81776b6659))
- **MultilineTextBox:** 新增 readonly 属性 ([c8faae6](https://github.com/nomui/nomui/commit/c8faae6db145eb64aaef793dcd0570ae772ad9f0))

### Bug Fixes

- **Select:** 修复 select 的 placeholder 过长时导致的换行问题 ([ca732a3](https://github.com/nomui/nomui/commit/ca732a38c202a816e7627ca00b56022c557fcc2b))

## [1.0.0-alpha.27](https://github.com/nomui/nomui/compare/v1.0.0-alpha.29...v1.0.0-alpha.27) (2021-08-27)

### Features

- **Field:** controlWidth 属性支持设置数字，代表像素宽度 ([67603c8](https://github.com/nomui/nomui/commit/67603c8a8f847223c6c492e64e03d4a2d3947278))
- **GridGroup:** 新增 getField 方法 ([4337a25](https://github.com/nomui/nomui/commit/4337a25ad8c329222f0a5df25d47a8d90d99a45f))
- **GridGroup:** Grid 的 line 属性默认设为 both ([d9c9abe](https://github.com/nomui/nomui/commit/d9c9abe097212323b38c88056048f5814ddbcead))
- **GroupGrid:** 初始版本功能完成 ([fecea06](https://github.com/nomui/nomui/commit/fecea0668ea7c4bf2d59c3121c2fbeb0246a7824))
- **GroupGrid:** 字段的隐藏与列宽度设置 ([6a7c9d6](https://github.com/nomui/nomui/commit/6a7c9d6ab9d9fe572d0ebb25cc01005c96ccce56))

### Bug Fixes

- **Avatar:** 没有图片也没有文字的时候 js 报错 ([798f0e4](https://github.com/nomui/nomui/commit/798f0e4cb0043e01067b6ee4c6eae6199c9a65ff))
- **TimePicker:** 修复 TimePicker 不可编辑 bug ([45d1339](https://github.com/nomui/nomui/commit/45d1339f338a0b3109ac4974db82c484f2ab6328))
- **TimePicker:** 修复 TimePicker 不可编辑 bug ([bb6030a](https://github.com/nomui/nomui/commit/bb6030a3642b6451a628e39fa30f9128a18785cf))

## [1.0.0-alpha.26](https://github.com/nomui/nomui/compare/v1.0.0-alpha.25...v1.0.0-alpha.26) (2021-08-25)

### Features

- **Grid:** 新增 appendRow 方法 ([c167b4e](https://github.com/nomui/nomui/commit/c167b4e624cce7c524bfe0c006a816a64e61e988))
- **Grid:** 新增 getRows 方法 ([6ec6cd5](https://github.com/nomui/nomui/commit/6ec6cd50dc405472d245ef374b7b39b473f122ce))
- **GroupGrid:** GroupGrid 初始代码 ([9a84a5f](https://github.com/nomui/nomui/commit/9a84a5fd77f18720fae1974ef409d3c499d8f462))
- **Route:** 新增遍历处理 hash 的方法：iterateHash ([1fad45e](https://github.com/nomui/nomui/commit/1fad45e0aeb6404c8d676e9c2bfbd7265cedf728))
- **Table:** 新增 appendRow 方法 ([1dc39f4](https://github.com/nomui/nomui/commit/1dc39f43dab3d6b4da4ddb5edf8a71bca5e72525))

## [1.0.0-alpha.25](https://github.com/nomui/nomui/compare/v1.0.0-alpha.24...v1.0.0-alpha.25) (2021-08-20)

### Features

- 添加 uploader 的列表显示方式 ([991d67f](https://github.com/nomui/nomui/commit/991d67fc4a66a14ef65bfb7bb24661e3fc2f45a0))
- 新增 telephone 校验规则 ([11c47c1](https://github.com/nomui/nomui/commit/11c47c1af395bb31416c79e83374c9198defa989))

### Bug Fixes

- **Badge:** 数字为 0 的时候不渲染的问题 ([d24136e](https://github.com/nomui/nomui/commit/d24136ea3ef47f5295da542d846f85d33dab4c2d))
- **Field:** RadioList 等组件，在 group valid 时的 tip 文案不展示 ([0e922e5](https://github.com/nomui/nomui/commit/0e922e57ed230e4f6b56b89e1e3ac851cb97dea4))
- **PartialDatePicker:** 解决时间范围选择时判断异常的问题 ([b6ab3c6](https://github.com/nomui/nomui/commit/b6ab3c62f04e74cf46e5d398f2a51f9c9da33bdc))

### Docs

- **Uploader:** callbak 的 demo 示例修改 ([048efbd](https://github.com/nomui/nomui/commit/048efbdb0afa98ddeb9b3f3746233536a2574618))

## [1.0.0-alpha.24](https://github.com/nomui/nomui/compare/v1.0.0-alpha.23...v1.0.0-alpha.24) (2021-08-13)

### Features

- **Grid:** 当全部列都被隐藏的时候，提醒用户至少保留一列数据 ([a8f0d7c](https://github.com/nomui/nomui/commit/a8f0d7ca0735171bc8a73d32feea7438d412237a))
- **Group:** Group 隐藏了，不会校验里面的 fields ([2a362f9](https://github.com/nomui/nomui/commit/2a362f96c9bc9e7cbeddea499b007c9780460acb))
- **List:** 新增 overflow 样式设置 ([55360a6](https://github.com/nomui/nomui/commit/55360a62f0dae06a25c3eafd4c453686595b1b79))
- **List:** overflow 新增 visible 和 scroll 值 ([1007a04](https://github.com/nomui/nomui/commit/1007a04d3d5a5d6033e48b75b2bea731aa0a4752))

### Bug Fixes

- **Gird:** 列设置时修改了 originColumns 的 bug ([d9e561e](https://github.com/nomui/nomui/commit/d9e561e7ffd0fd77eb042406dbb91533e432b525))
- **Grid:** 修复 Grid 配置列时，视图显示的排序不一致的 bug ([90b8e77](https://github.com/nomui/nomui/commit/90b8e77761cf70d9616fc89e6958fc50bdbe042e))
- **Grid:** data 中有 children 字段时，直接渲染出来导致意外表现 ([a9bae78](https://github.com/nomui/nomui/commit/a9bae78cfc8c9af6dad631d5e44cced112b7d276))
- **Group:** setValue 的选项参数默认值改为 { ignoreDisabled: false, ignoreHidden: false } ([1fc0dd7](https://github.com/nomui/nomui/commit/1fc0dd70caec96381105b84a722b2e7b7a19092a))
- **Icon:** 更新 upload 图标的 svg ([be9af82](https://github.com/nomui/nomui/commit/be9af825df8bbea51c0251a2398a70e8ea8114a0))
- **Tree:** getData 时会返回空的 children 数据，非传入的 data 数据 ([462df77](https://github.com/nomui/nomui/commit/462df770410106fdbf82ac85fd09efd78be4c767))

## [1.0.0-alpha.23](https://github.com/nomui/nomui/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2021-08-06)

### Features

- **Grid:** 可配置哪些列不需要加入可配置项中 ([4cfa421](https://github.com/nomui/nomui/commit/4cfa4210948dddc05710e3204e34e462f11a9456))
- **Textbox:** 添加 onEnter 回调函数 ([100c4e7](https://github.com/nomui/nomui/commit/100c4e7fa183e02226cd59e3f7e284b7e1368749))

### Bug Fixes

- **Component:** 修复 Component 底层函数变化引起的多个组件 bug ([2035067](https://github.com/nomui/nomui/commit/2035067c3f46bcd9b746ac71b3e95401263a7b97))
- **Grid:** 列设置排序后无效的 bug ([19a8362](https://github.com/nomui/nomui/commit/19a8362530b23ea28ec044a0349b2f03293c8d16))
- **Grid:** 修复自定义列按钮会覆盖表头文字的问题 ([8d2cab3](https://github.com/nomui/nomui/commit/8d2cab3e8d71e1b2021d1b5efad0694226912ec1))
- **Grid:** 在开始解析自定义列时先清空 visibleColumns ([0c322fc](https://github.com/nomui/nomui/commit/0c322fc8551eea4e745984d403d20bd69faf1b7d))
- **Grid:** 自定义列配置时无法正确展示勾选和展开 ([877913a](https://github.com/nomui/nomui/commit/877913a9dbceb21a1d17af0c1f5e10c14d58e375))
- **Grid:** 自定义列时只第一层 column 比较 filter 的 bug ([485de75](https://github.com/nomui/nomui/commit/485de753d8cd6a2dad537097bd336b6e64fb2839))
- **Grid:** 自定义配置列时只存 col 的 field 属性 ([98d3189](https://github.com/nomui/nomui/commit/98d3189eec79b5aeec0e96c3a1eb81a4cd18b48d))
- **Select:** 修复 Select 清空，重置无效果的 bug ([ba884ec](https://github.com/nomui/nomui/commit/ba884ec23900918aa3fadec0b4d2b8c5358a88bb))
- **Select:** 修改内容过长神略的样式，同时给 .nom-field-content 加上了 width:100% 的样式 ([a3d82f4](https://github.com/nomui/nomui/commit/a3d82f40e9bc2b5f859d6993b53c6e7702c93f52))

### Performance Improvements

- **Grid,tree:** 优化 Grid 可配置哪些列不需要加入可配置项中的特性，以及增加 tree 组件的可隐藏配置项 ([1653277](https://github.com/nomui/nomui/commit/1653277d8e1c8fc48ef1f1ceb942c68dfb25aa62))

## [1.0.0-alpha.22](https://github.com/nomui/nomui/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2021-07-30)

### Features

- **Empty:** 默认显示暂无内容的文字提示 ([403fca3](https://github.com/nomui/nomui/commit/403fca393e65e565dab2c9d12aaa1aca6da899eb))
- **GroupList:** 提供 addGroup 方法，以及隐藏添加按钮的配置 ([dca2fb0](https://github.com/nomui/nomui/commit/dca2fb077f5804dcf10087578c6694b41b88420c))
- **Rate:** 评分组件改为继承至 Field ([b2eb318](https://github.com/nomui/nomui/commit/b2eb318d2902ade29316b5610bdd55ac941a1027))
- **Rate:** 评分组件基础功能 ([9932657](https://github.com/nomui/nomui/commit/9932657c5e7a3c759556d19b3f217564fe7dff49))
- **Rate:** 添加 onValueChange 回调 ([6794e73](https://github.com/nomui/nomui/commit/6794e734834bda21a94b7767a58b2a03da3773c3))

### Bug Fixes

- **Component:** 优化销毁方法，解决某些情况下组件销毁报错的问题 ([aa2c8c9](https://github.com/nomui/nomui/commit/aa2c8c9ff8dac701df9bf167bd2ac4758fdab0f9))
- **Grid:** 点击分页更新表格数据后，导致全选报错 ([2342daf](https://github.com/nomui/nomui/commit/2342daf04b98676b7b3142d0765e266a0da934fa))
- **PartialDatePicker:** 日期组件选择周模式的 placeholder 展示 ([36b1bd9](https://github.com/nomui/nomui/commit/36b1bd9fe7575759a0ea0f87b378836d3af99718))
- **Select:** 修复可搜索时异步处理异常 loading 组件未关闭的 bug ([7415f97](https://github.com/nomui/nomui/commit/7415f977e9b1cba7977f05098bef0fb80a560897))

### Docs

- **Rate:** 添加 character 时为 icon 类型的示例 ([1c290a3](https://github.com/nomui/nomui/commit/1c290a30ab093ace6a83a716754878b0b1f000df))

## [1.0.0-alpha.21](https://github.com/nomui/nomui/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2021-07-23)

### Features

- **CheckboxTree:** 文档补充 ([e8d0f2e](https://github.com/nomui/nomui/commit/e8d0f2e8fc6b3b94a11a675ef9863b3d014029cf))
- **Grid:** 自定义配置 columns，添加保存到 storage 中 ([66852ea](https://github.com/nomui/nomui/commit/66852ea6cd0a7c77dc15687a52e00e0973f399ae))
- **Tree:** 添加 tree 组件的单个 node 的 checkabled 的 disabled 设置 ([c4dc384](https://github.com/nomui/nomui/commit/c4dc38422f36cfa494d9800c00d1a599a0be8d2f))

### Bug Fixes

- 修复 AutoComplete 组件弹框过长的 bug ([13f6eac](https://github.com/nomui/nomui/commit/13f6eac8155614904cab076d5dbb81ae0b94a1f6))
- **docs:** 修复文档菜单高亮 bug ([3671514](https://github.com/nomui/nomui/commit/36715141ae3fc65c8ce74d803fc50b6007fe34e8))
- **Grid:** 解决配置了 treeConfig 后，点击最后一层 Td 控制台报错的 bug ([b7c949f](https://github.com/nomui/nomui/commit/b7c949f53b6b83a1e0752e674033e57fc6500326))
- **Group:** field 的 control 为空时的 bug ([200280d](https://github.com/nomui/nomui/commit/200280d57fbac69bce7c7d06a52c00898972aa46))
- **List:** 修改 List 组件的 itemSelectable.scrollIntoView 默认设置为 false ([3fb867d](https://github.com/nomui/nomui/commit/3fb867d0cd07528adda97fcf96e00a6fbd8b4e74))
- **PartialDatePicker:** 修改 PartialDatePicker 日期组件的 onValueChange 事件，在设置初始默认值情况下初始不触发 ([65deec6](https://github.com/nomui/nomui/commit/65deec6f199873f228515b0f29909c1f9e870d4b))
- **Select:** 下拉框搜索内容为空时无数据的 bug ([ba524a0](https://github.com/nomui/nomui/commit/ba524a0e99943565e5c87c72f7d0c1d706583c3b))
- **Select:** 修复 Select 下拉框跟着滚动条跑的 bug ([7c26a9b](https://github.com/nomui/nomui/commit/7c26a9b38bb5d6ef594264e18054818fc533a0e8))
- **Select:** 修复 select 组件 disabled 后，还能编辑的 bug ([89a27ec](https://github.com/nomui/nomui/commit/89a27ecc73906d31ab804506a02a32a2844fc9d3))
- **Select:** 修复 Select 组件 searchable 模式，点清除、重置无法清掉原输入数据的 bug ([91e8c8f](https://github.com/nomui/nomui/commit/91e8c8f8ad3c4436ba4de8aa882e66f149dac7ce))
- **Select:** Select 组件提供 popupContainer 定位配置 ([665644e](https://github.com/nomui/nomui/commit/665644eb132b08204b49d4d00999179da227236d))
- **Tooltip:** 修复 Tooltip 特定情况下验证提示样式问题 ([56cf2f4](https://github.com/nomui/nomui/commit/56cf2f46c71f0f9f0fb405887d78b415317cbd9d))
- **Tree:** tree 组件的 expandable 展开无效 ([88105e3](https://github.com/nomui/nomui/commit/88105e31c757fde100c01701205dfde429d8df8d))

### Performance Improvements

- **Select:** 优化 Select 清空和重置的时机 ([af266e0](https://github.com/nomui/nomui/commit/af266e0e071f456a9a029fc64d3c781b1256e08a))
- **Select:** 优化 Select 清空和重置时的判断 ([5d94bb1](https://github.com/nomui/nomui/commit/5d94bb146e7d9fbf24031aa34d482ed84c3b2413))

### Docs

- 添加文档 ([f35311f](https://github.com/nomui/nomui/commit/f35311f4395644abcb12e9929e7cb56cbdf61a5e))
- 组件文档菜单更新 ([caaa980](https://github.com/nomui/nomui/commit/caaa98096bf670de56cdf827e9814b0e881af470))
- **Component:** 更新 onConfig 示例 ([678777b](https://github.com/nomui/nomui/commit/678777b744490052c001213cfc76cd22f1da72dc))
- **Component:** 新增 onCreated 和 onConfig 示例 ([bf0babf](https://github.com/nomui/nomui/commit/bf0babf8b54ceb3182b0717a2100d5fd5d5129e1))
- **Component:** Component 内边距样式（padding）基本用法文档。 ([6cdb5b5](https://github.com/nomui/nomui/commit/6cdb5b540ece069c0a25c0e75b7385130a64353d))
- **Component:** Component 组件 onRemove 示例 ([9ed98bb](https://github.com/nomui/nomui/commit/9ed98bbaa8dc0c5b69c46def88bc19c09f4f85da))
- **Component:** Component 组件 onRendered 回调示例 ([906a000](https://github.com/nomui/nomui/commit/906a000a23219837125c30324a4bc6ce94ed36f6))
- **Component:** Component 组件边框（border）样式文档 ([8781000](https://github.com/nomui/nomui/commit/87810002af96f758f268b4a25630d5483910a715))
- **Component:** Component 组件文本（text）样式示例。 ([aced152](https://github.com/nomui/nomui/commit/aced1524e8dc255e8d847dda9b924f4437a8b33e))
- **Component:** Component 组件文档新增 remove 方法说明。 ([05c63c0](https://github.com/nomui/nomui/commit/05c63c0ac2f0e10536dd1cf7881d581a5344b843))
- **Field:** 修改 setValue 方法的说明 ([7e2aad5](https://github.com/nomui/nomui/commit/7e2aad51b069f1ca570bee79513acac53d8f7fab))
- **Grid:** 补充文档 ([4c12ae2](https://github.com/nomui/nomui/commit/4c12ae2189c5824cda77530f095f2fcc1c973844))
- **Grid:** 文档更新 ([8649161](https://github.com/nomui/nomui/commit/864916115e96c4f19a2cc9c02ed601d888512e1b))
- **Panel:** 增加工具栏示例以及补充文档 ([9309d45](https://github.com/nomui/nomui/commit/9309d45fdb0b5da4afb057de41bf06bbf6aaa8bc))
- **SPA:** 更新单页应用的文档。 ([c7df60d](https://github.com/nomui/nomui/commit/c7df60dc3ea3cdd9505756e36a766d91a4e4d131))

## [1.0.0-alpha.20](https://github.com/nomui/nomui/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2021-07-15)

### Docs

- 《NomUI 自动发布流程》文档更新 ([387bb41](https://github.com/nomui/nomui/commit/387bb4141026a0aaddfdecf530cdf8f46609805a))
- 自动发布流程文档更新 ([e40ab3b](https://github.com/nomui/nomui/commit/e40ab3b9b7b13c642a57196c16b5305f6e803893))
- 自动发布文档更新 ([02ea46c](https://github.com/nomui/nomui/commit/02ea46c4368c60014a1df9517aaa99c67da098c2))
- **Component:** component 组件新增更新组件示例 ([5700e9e](https://github.com/nomui/nomui/commit/5700e9e78d535f175c4243a06d5650bc5017bde9))

## [1.0.0-alpha.19](https://github.com/nomui/nomui/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2021-07-15)

### Features

- **Field:** Field 添加 extra 属性 ([a1db802](https://github.com/nomui/nomui/commit/a1db8029e3a141f8bad1752cbd1839e9c38e5e12))
- **List:** 添加 List 拖拽的拖拽类名和禁用拖拽的 item 设置 ([e74ddf2](https://github.com/nomui/nomui/commit/e74ddf24af8f60b12b804fd9166388a6b8d3c7d0))
- **List:** 添加 sortable 属性和示例文档 ([425f6db](https://github.com/nomui/nomui/commit/425f6dbf7d48a9d5f3b4d994d4e759e6ab63c1f1))
- **Modal:** 模态框 content 来自视图模块时，该视图模块支持返回 Promise（该 promise 返回模态框内容配置）。 ([6499536](https://github.com/nomui/nomui/commit/64995364a817a5c9b34bbd94c054353853564145))
- **Pager:** 添加 simple 简洁模式 和示例 ([adfa546](https://github.com/nomui/nomui/commit/adfa5463042181f250bd4cde0b4afefb74ca042e))
- **Pager:** simple 模式添加总页数的展示 ([8b02e65](https://github.com/nomui/nomui/commit/8b02e65f85430b795ecd329fc541e7a50599028d))
- **textbox:** 文本框添加 prefix 和 suffix 字符展示 ([34594a6](https://github.com/nomui/nomui/commit/34594a6d0db704acccc4b8b9e45afb4c8fbff33f))

### Bug Fixes

- **Grid:** getCheckedRowKeys filter 修改 ([8ddb994](https://github.com/nomui/nomui/commit/8ddb9946719d8b4b2a85bd60b3e41c48cdbd1a2e))
- **Grid:** Grid 组件的 checkable 后，存 rowData 的数据，不存 tr 实例 ([c4ce8ba](https://github.com/nomui/nomui/commit/c4ce8ba70157f4182885fc70d9a7f65672ab3b66))
- **Grid:** Grid 组件 getCheckedRow 时去掉 key 为空的数据 ([c672abd](https://github.com/nomui/nomui/commit/c672abd20912972edc7871a602d70bd181466959))
- **List:** 修复自定义渲染时 getAllItems 无法获取到数据的 bug ([7886302](https://github.com/nomui/nomui/commit/7886302cbfa628a23bbe1a7f820cdf4c5b55c2f8))
- **Pager:** 点击分页的 ellipse 会跳转回第一页的数据 ([91d191f](https://github.com/nomui/nomui/commit/91d191f4dc13215b7be59bba8cf852e1f07cb282))

### Performance Improvements

- **Grid:** 列排序功能改为先降序再升序 ([f129852](https://github.com/nomui/nomui/commit/f12985238ab34618deedd6a012714fb49cd0db6b))

### Docs

- 文档修改 ([21c158f](https://github.com/nomui/nomui/commit/21c158f76cf4a99978011f2e89ec60f7d848b2c4))
- 新增 commit-lint 文档 ([804d3c5](https://github.com/nomui/nomui/commit/804d3c53a10713cd6f9d49880b876ad2cee316c9))
