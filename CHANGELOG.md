# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0-alpha.25](https://github.com/nomui/nomui/compare/v1.0.0-alpha.24...v1.0.0-alpha.25) (2021-08-20)


### Features

* 添加uploader的列表显示方式 ([991d67f](https://github.com/nomui/nomui/commit/991d67fc4a66a14ef65bfb7bb24661e3fc2f45a0))
* 新增telephone校验规则 ([11c47c1](https://github.com/nomui/nomui/commit/11c47c1af395bb31416c79e83374c9198defa989))


### Bug Fixes

* **Badge:** 数字为0的时候不渲染的问题 ([d24136e](https://github.com/nomui/nomui/commit/d24136ea3ef47f5295da542d846f85d33dab4c2d))
* **Field:**  RadioList等组件，在group valid时的tip文案不展示 ([0e922e5](https://github.com/nomui/nomui/commit/0e922e57ed230e4f6b56b89e1e3ac851cb97dea4))
* **PartialDatePicker:** 解决时间范围选择时判断异常的问题 ([b6ab3c6](https://github.com/nomui/nomui/commit/b6ab3c62f04e74cf46e5d398f2a51f9c9da33bdc))


### Docs

* **Uploader:** callbak的demo示例修改 ([048efbd](https://github.com/nomui/nomui/commit/048efbdb0afa98ddeb9b3f3746233536a2574618))

## [1.0.0-alpha.24](https://github.com/nomui/nomui/compare/v1.0.0-alpha.23...v1.0.0-alpha.24) (2021-08-13)


### Features

* **Grid:** 当全部列都被隐藏的时候，提醒用户至少保留一列数据 ([a8f0d7c](https://github.com/nomui/nomui/commit/a8f0d7ca0735171bc8a73d32feea7438d412237a))
* **Group:** Group隐藏了，不会校验里面的fields ([2a362f9](https://github.com/nomui/nomui/commit/2a362f96c9bc9e7cbeddea499b007c9780460acb))
* **List:** 新增 overflow 样式设置 ([55360a6](https://github.com/nomui/nomui/commit/55360a62f0dae06a25c3eafd4c453686595b1b79))
* **List:** overflow 新增 visible 和 scroll 值 ([1007a04](https://github.com/nomui/nomui/commit/1007a04d3d5a5d6033e48b75b2bea731aa0a4752))


### Bug Fixes

* **Gird:** 列设置时修改了originColumns的bug ([d9e561e](https://github.com/nomui/nomui/commit/d9e561e7ffd0fd77eb042406dbb91533e432b525))
* **Grid:** 修复Grid配置列时，视图显示的排序不一致的bug ([90b8e77](https://github.com/nomui/nomui/commit/90b8e77761cf70d9616fc89e6958fc50bdbe042e))
* **Grid:** data中有children字段时，直接渲染出来导致意外表现 ([a9bae78](https://github.com/nomui/nomui/commit/a9bae78cfc8c9af6dad631d5e44cced112b7d276))
* **Group:** setValue 的选项参数默认值改为 {      ignoreDisabled: false,  ignoreHidden: false } ([1fc0dd7](https://github.com/nomui/nomui/commit/1fc0dd70caec96381105b84a722b2e7b7a19092a))
* **Icon:** 更新 upload 图标的 svg ([be9af82](https://github.com/nomui/nomui/commit/be9af825df8bbea51c0251a2398a70e8ea8114a0))
* **Tree:** getData时会返回空的children数据，非传入的data数据 ([462df77](https://github.com/nomui/nomui/commit/462df770410106fdbf82ac85fd09efd78be4c767))

## [1.0.0-alpha.23](https://github.com/nomui/nomui/compare/v1.0.0-alpha.22...v1.0.0-alpha.23) (2021-08-06)


### Features

* **Grid:** 可配置哪些列不需要加入可配置项中 ([4cfa421](https://github.com/nomui/nomui/commit/4cfa4210948dddc05710e3204e34e462f11a9456))
* **Textbox:** 添加onEnter回调函数 ([100c4e7](https://github.com/nomui/nomui/commit/100c4e7fa183e02226cd59e3f7e284b7e1368749))


### Bug Fixes

* **Component:** 修复 Component 底层函数变化引起的多个组件 bug ([2035067](https://github.com/nomui/nomui/commit/2035067c3f46bcd9b746ac71b3e95401263a7b97))
* **Grid:** 列设置排序后无效的bug ([19a8362](https://github.com/nomui/nomui/commit/19a8362530b23ea28ec044a0349b2f03293c8d16))
* **Grid:** 修复自定义列按钮会覆盖表头文字的问题 ([8d2cab3](https://github.com/nomui/nomui/commit/8d2cab3e8d71e1b2021d1b5efad0694226912ec1))
* **Grid:** 在开始解析自定义列时先清空visibleColumns ([0c322fc](https://github.com/nomui/nomui/commit/0c322fc8551eea4e745984d403d20bd69faf1b7d))
* **Grid:** 自定义列配置时无法正确展示勾选和展开 ([877913a](https://github.com/nomui/nomui/commit/877913a9dbceb21a1d17af0c1f5e10c14d58e375))
* **Grid:** 自定义列时只第一层column比较filter的bug ([485de75](https://github.com/nomui/nomui/commit/485de753d8cd6a2dad537097bd336b6e64fb2839))
* **Grid:** 自定义配置列时只存col的field属性 ([98d3189](https://github.com/nomui/nomui/commit/98d3189eec79b5aeec0e96c3a1eb81a4cd18b48d))
* **Select:** 修复Select清空，重置无效果的bug ([ba884ec](https://github.com/nomui/nomui/commit/ba884ec23900918aa3fadec0b4d2b8c5358a88bb))
* **Select:** 修改内容过长神略的样式，同时给 .nom-field-content 加上了 width:100% 的样式 ([a3d82f4](https://github.com/nomui/nomui/commit/a3d82f40e9bc2b5f859d6993b53c6e7702c93f52))


### Performance Improvements

* **Grid,tree:** 优化Grid可配置哪些列不需要加入可配置项中的特性，以及增加tree组件的可隐藏配置项 ([1653277](https://github.com/nomui/nomui/commit/1653277d8e1c8fc48ef1f1ceb942c68dfb25aa62))

## [1.0.0-alpha.22](https://github.com/nomui/nomui/compare/v1.0.0-alpha.21...v1.0.0-alpha.22) (2021-07-30)


### Features

* **Empty:** 默认显示暂无内容的文字提示 ([403fca3](https://github.com/nomui/nomui/commit/403fca393e65e565dab2c9d12aaa1aca6da899eb))
* **GroupList:** 提供addGroup方法，以及隐藏添加按钮的配置 ([dca2fb0](https://github.com/nomui/nomui/commit/dca2fb077f5804dcf10087578c6694b41b88420c))
* **Rate:** 评分组件改为继承至Field ([b2eb318](https://github.com/nomui/nomui/commit/b2eb318d2902ade29316b5610bdd55ac941a1027))
* **Rate:** 评分组件基础功能 ([9932657](https://github.com/nomui/nomui/commit/9932657c5e7a3c759556d19b3f217564fe7dff49))
* **Rate:** 添加onValueChange回调 ([6794e73](https://github.com/nomui/nomui/commit/6794e734834bda21a94b7767a58b2a03da3773c3))


### Bug Fixes

* **Component:** 优化销毁方法，解决某些情况下组件销毁报错的问题 ([aa2c8c9](https://github.com/nomui/nomui/commit/aa2c8c9ff8dac701df9bf167bd2ac4758fdab0f9))
* **Grid:** 点击分页更新表格数据后，导致全选报错 ([2342daf](https://github.com/nomui/nomui/commit/2342daf04b98676b7b3142d0765e266a0da934fa))
* **PartialDatePicker:** 日期组件选择周模式的placeholder展示 ([36b1bd9](https://github.com/nomui/nomui/commit/36b1bd9fe7575759a0ea0f87b378836d3af99718))
* **Select:** 修复可搜索时异步处理异常 loading 组件未关闭的 bug ([7415f97](https://github.com/nomui/nomui/commit/7415f977e9b1cba7977f05098bef0fb80a560897))


### Docs

* **Rate:** 添加character时为icon类型的示例 ([1c290a3](https://github.com/nomui/nomui/commit/1c290a30ab093ace6a83a716754878b0b1f000df))

## [1.0.0-alpha.21](https://github.com/nomui/nomui/compare/v1.0.0-alpha.20...v1.0.0-alpha.21) (2021-07-23)


### Features

* **CheckboxTree:** 文档补充 ([e8d0f2e](https://github.com/nomui/nomui/commit/e8d0f2e8fc6b3b94a11a675ef9863b3d014029cf))
* **Grid:** 自定义配置columns，添加保存到 storage中 ([66852ea](https://github.com/nomui/nomui/commit/66852ea6cd0a7c77dc15687a52e00e0973f399ae))
* **Tree:** 添加tree组件的单个node的checkabled的disabled设置 ([c4dc384](https://github.com/nomui/nomui/commit/c4dc38422f36cfa494d9800c00d1a599a0be8d2f))


### Bug Fixes

* 修复AutoComplete组件弹框过长的bug ([13f6eac](https://github.com/nomui/nomui/commit/13f6eac8155614904cab076d5dbb81ae0b94a1f6))
* **docs:** 修复文档菜单高亮 bug ([3671514](https://github.com/nomui/nomui/commit/36715141ae3fc65c8ce74d803fc50b6007fe34e8))
* **Grid:**  解决配置了treeConfig后，点击最后一层Td 控制台报错的bug ([b7c949f](https://github.com/nomui/nomui/commit/b7c949f53b6b83a1e0752e674033e57fc6500326))
* **Group:** field的control为空时的bug ([200280d](https://github.com/nomui/nomui/commit/200280d57fbac69bce7c7d06a52c00898972aa46))
* **List:** 修改 List 组件的 itemSelectable.scrollIntoView 默认设置为false ([3fb867d](https://github.com/nomui/nomui/commit/3fb867d0cd07528adda97fcf96e00a6fbd8b4e74))
* **PartialDatePicker:** 修改 PartialDatePicker 日期组件的onValueChange事件，在设置初始默认值情况下初始不触发 ([65deec6](https://github.com/nomui/nomui/commit/65deec6f199873f228515b0f29909c1f9e870d4b))
* **Select:** 下拉框搜索内容为空时无数据的bug ([ba524a0](https://github.com/nomui/nomui/commit/ba524a0e99943565e5c87c72f7d0c1d706583c3b))
* **Select:** 修复Select下拉框跟着滚动条跑的bug ([7c26a9b](https://github.com/nomui/nomui/commit/7c26a9b38bb5d6ef594264e18054818fc533a0e8))
* **Select:** 修复select组件disabled后，还能编辑的bug ([89a27ec](https://github.com/nomui/nomui/commit/89a27ecc73906d31ab804506a02a32a2844fc9d3))
* **Select:** 修复Select组件searchable模式，点清除、重置无法清掉原输入数据的bug ([91e8c8f](https://github.com/nomui/nomui/commit/91e8c8f8ad3c4436ba4de8aa882e66f149dac7ce))
* **Select:** Select组件提供popupContainer定位配置 ([665644e](https://github.com/nomui/nomui/commit/665644eb132b08204b49d4d00999179da227236d))
* **Tooltip:** 修复 Tooltip 特定情况下验证提示样式问题 ([56cf2f4](https://github.com/nomui/nomui/commit/56cf2f46c71f0f9f0fb405887d78b415317cbd9d))
* **Tree:** tree组件的expandable展开无效 ([88105e3](https://github.com/nomui/nomui/commit/88105e31c757fde100c01701205dfde429d8df8d))


### Performance Improvements

* **Select:** 优化Select清空和重置的时机 ([af266e0](https://github.com/nomui/nomui/commit/af266e0e071f456a9a029fc64d3c781b1256e08a))
* **Select:** 优化Select清空和重置时的判断 ([5d94bb1](https://github.com/nomui/nomui/commit/5d94bb146e7d9fbf24031aa34d482ed84c3b2413))


### Docs

* 添加文档 ([f35311f](https://github.com/nomui/nomui/commit/f35311f4395644abcb12e9929e7cb56cbdf61a5e))
* 组件文档菜单更新 ([caaa980](https://github.com/nomui/nomui/commit/caaa98096bf670de56cdf827e9814b0e881af470))
* **Component:** 更新 onConfig 示例 ([678777b](https://github.com/nomui/nomui/commit/678777b744490052c001213cfc76cd22f1da72dc))
* **Component:** 新增 onCreated 和 onConfig 示例 ([bf0babf](https://github.com/nomui/nomui/commit/bf0babf8b54ceb3182b0717a2100d5fd5d5129e1))
* **Component:** Component 内边距样式（padding）基本用法文档。 ([6cdb5b5](https://github.com/nomui/nomui/commit/6cdb5b540ece069c0a25c0e75b7385130a64353d))
* **Component:** Component 组件 onRemove 示例 ([9ed98bb](https://github.com/nomui/nomui/commit/9ed98bbaa8dc0c5b69c46def88bc19c09f4f85da))
* **Component:** Component 组件 onRendered 回调示例 ([906a000](https://github.com/nomui/nomui/commit/906a000a23219837125c30324a4bc6ce94ed36f6))
* **Component:** Component 组件边框（border）样式文档 ([8781000](https://github.com/nomui/nomui/commit/87810002af96f758f268b4a25630d5483910a715))
* **Component:** Component 组件文本（text）样式示例。 ([aced152](https://github.com/nomui/nomui/commit/aced1524e8dc255e8d847dda9b924f4437a8b33e))
* **Component:** Component 组件文档新增 remove 方法说明。 ([05c63c0](https://github.com/nomui/nomui/commit/05c63c0ac2f0e10536dd1cf7881d581a5344b843))
* **Field:** 修改 setValue 方法的说明 ([7e2aad5](https://github.com/nomui/nomui/commit/7e2aad51b069f1ca570bee79513acac53d8f7fab))
* **Grid:** 补充文档 ([4c12ae2](https://github.com/nomui/nomui/commit/4c12ae2189c5824cda77530f095f2fcc1c973844))
* **Grid:** 文档更新 ([8649161](https://github.com/nomui/nomui/commit/864916115e96c4f19a2cc9c02ed601d888512e1b))
* **Panel:** 增加工具栏示例以及补充文档 ([9309d45](https://github.com/nomui/nomui/commit/9309d45fdb0b5da4afb057de41bf06bbf6aaa8bc))
* **SPA:** 更新单页应用的文档。 ([c7df60d](https://github.com/nomui/nomui/commit/c7df60dc3ea3cdd9505756e36a766d91a4e4d131))

## [1.0.0-alpha.20](https://github.com/nomui/nomui/compare/v1.0.0-alpha.19...v1.0.0-alpha.20) (2021-07-15)


### Docs

* 《NomUI自动发布流程》文档更新 ([387bb41](https://github.com/nomui/nomui/commit/387bb4141026a0aaddfdecf530cdf8f46609805a))
* 自动发布流程文档更新 ([e40ab3b](https://github.com/nomui/nomui/commit/e40ab3b9b7b13c642a57196c16b5305f6e803893))
* 自动发布文档更新 ([02ea46c](https://github.com/nomui/nomui/commit/02ea46c4368c60014a1df9517aaa99c67da098c2))
* **Component:** component 组件新增更新组件示例 ([5700e9e](https://github.com/nomui/nomui/commit/5700e9e78d535f175c4243a06d5650bc5017bde9))

## [1.0.0-alpha.19](https://github.com/nomui/nomui/compare/v1.0.0-alpha.18...v1.0.0-alpha.19) (2021-07-15)


### Features

* **Field:** Field添加 extra属性 ([a1db802](https://github.com/nomui/nomui/commit/a1db8029e3a141f8bad1752cbd1839e9c38e5e12))
* **List:**  添加List拖拽的拖拽类名和禁用拖拽的item 设置 ([e74ddf2](https://github.com/nomui/nomui/commit/e74ddf24af8f60b12b804fd9166388a6b8d3c7d0))
* **List:** 添加sortable属性和示例文档 ([425f6db](https://github.com/nomui/nomui/commit/425f6dbf7d48a9d5f3b4d994d4e759e6ab63c1f1))
* **Modal:** 模态框 content 来自视图模块时，该视图模块支持返回 Promise（该 promise 返回模态框内容配置）。 ([6499536](https://github.com/nomui/nomui/commit/64995364a817a5c9b34bbd94c054353853564145))
* **Pager:** 添加 simple 简洁模式 和示例 ([adfa546](https://github.com/nomui/nomui/commit/adfa5463042181f250bd4cde0b4afefb74ca042e))
* **Pager:** simple模式添加总页数的展示 ([8b02e65](https://github.com/nomui/nomui/commit/8b02e65f85430b795ecd329fc541e7a50599028d))
* **textbox:** 文本框添加prefix 和 suffix 字符展示 ([34594a6](https://github.com/nomui/nomui/commit/34594a6d0db704acccc4b8b9e45afb4c8fbff33f))


### Bug Fixes

* **Grid:** getCheckedRowKeys filter 修改 ([8ddb994](https://github.com/nomui/nomui/commit/8ddb9946719d8b4b2a85bd60b3e41c48cdbd1a2e))
* **Grid:** Grid组件的checkable后，存rowData的数据，不存tr实例 ([c4ce8ba](https://github.com/nomui/nomui/commit/c4ce8ba70157f4182885fc70d9a7f65672ab3b66))
* **Grid:** Grid组件getCheckedRow 时去掉key为空的数据 ([c672abd](https://github.com/nomui/nomui/commit/c672abd20912972edc7871a602d70bd181466959))
* **List:** 修复自定义渲染时 getAllItems无法获取到数据的bug ([7886302](https://github.com/nomui/nomui/commit/7886302cbfa628a23bbe1a7f820cdf4c5b55c2f8))
* **Pager:** 点击分页的 ellipse 会跳转回第一页的数据 ([91d191f](https://github.com/nomui/nomui/commit/91d191f4dc13215b7be59bba8cf852e1f07cb282))


### Performance Improvements

* **Grid:** 列排序功能改为先降序再升序 ([f129852](https://github.com/nomui/nomui/commit/f12985238ab34618deedd6a012714fb49cd0db6b))


### Docs

* 文档修改 ([21c158f](https://github.com/nomui/nomui/commit/21c158f76cf4a99978011f2e89ec60f7d848b2c4))
* 新增commit-lint文档 ([804d3c5](https://github.com/nomui/nomui/commit/804d3c53a10713cd6f9d49880b876ad2cee316c9))
