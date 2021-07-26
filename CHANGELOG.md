# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
