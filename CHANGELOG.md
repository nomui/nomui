# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.1.14](https://github.com/nomui/nomui/compare/v1.1.13...v1.1.14) (2022-11-18)


### Features

* **Cascader:** 兼容显示不存在于数据源的默认值 ([1868733](https://github.com/nomui/nomui/commit/18687337024e67e0bdb52981a378ae8b5e0ea6f6))
* **Grid:** 前端排序支持对数字、字符串进行自动排序 ([9eb467c](https://github.com/nomui/nomui/commit/9eb467c820c419cb80706332764b293ca04c8ef5))
* GroupGrid新增操作栏自定义 ([075420d](https://github.com/nomui/nomui/commit/075420d6e61988f3c16a781b2d0b92d554f6c805))
* **Select:** 支持配置最大显示标签数 ([f36360b](https://github.com/nomui/nomui/commit/f36360bff268e16e4752872a001e6481aab854a8))
* **TabList:** 支持不传入tabContent，单独使用 ([8995e88](https://github.com/nomui/nomui/commit/8995e88364165d6e9f541ad824f7c1e32ee6032f))


### Bug Fixes

* 优化GroupGrid操作栏自定义 ([456009b](https://github.com/nomui/nomui/commit/456009b2cde9cf2a40f6c9ad76ae1764e43899ce))
* 优化GroupGrid操作栏自定义 ([23bd55b](https://github.com/nomui/nomui/commit/23bd55b18cc34c733d5a1d5b87c6d8691f64e4cd))
* 优化GroupGrid操作栏自定义 ([3dd62aa](https://github.com/nomui/nomui/commit/3dd62aa3bedc8dcf9fc76df0fa677032ab55e317))
* 优化GroupGrid操作栏自定义 ([f480d28](https://github.com/nomui/nomui/commit/f480d2881aee6947a0f52a4af79f37c5ab8ced38))
* **Grid:** 排序与固定列冲突问题 ([aefecac](https://github.com/nomui/nomui/commit/aefecacd59e24ec36434f6eda2794fbebd33d6d7))
* **Meun:** Meun三级导航页面问题 ([899c46d](https://github.com/nomui/nomui/commit/899c46d818e980ead4e571a12f29d1aa5df94b23))
* **NumberSpinner:** 无法赋值为null的问题 ([4bc8a40](https://github.com/nomui/nomui/commit/4bc8a4083c61ab0f65657071299cce418eab9089))
* **NumberSpinner:** 修复取值与校验问题 ([0cab296](https://github.com/nomui/nomui/commit/0cab2964144abadf33ddd509bc46bf826652d4b0))
* **ParitalDatePicker:** 修复手动赋值非法值时js报错 ([68b4fce](https://github.com/nomui/nomui/commit/68b4fce44a674264121adf0b3c755d108f25b8b7))
* **Select:** 优化对自定义字段名的兼容性 ([959b309](https://github.com/nomui/nomui/commit/959b309d250a59c4b3ee3eae8e65a7bb7edce31c))


### Performance Improvements

* **Grid:** 优化前端排序逻辑 ([aaf0cd7](https://github.com/nomui/nomui/commit/aaf0cd72994feb71d454f153d21f4633584d7ca8))

### [1.1.13](https://github.com/nomui/nomui/compare/v1.1.12...v1.1.13) (2022-11-11)


### Features

* Cascader 添加非叶子节点选择的功能 ([5d938eb](https://github.com/nomui/nomui/commit/5d938eb3b4f35e0557624cbc15b817d6256c2a71))
* Cascader组件，添加非叶子节点可选的属性配置 ([6f5825d](https://github.com/nomui/nomui/commit/6f5825d87db75219af1a8e909906e1cdc4cbf8ef))
* **PartialDatePicker:** 支持自定义值格式 ([155012c](https://github.com/nomui/nomui/commit/155012c6cb91b3b1a9a9496f2d2846f00b02094a))
* TreeSelect组件，默认展开节点层级优化为搜索到结果时默认展开层级，不受initExpandLevel影响 ([95dd6e3](https://github.com/nomui/nomui/commit/95dd6e33c37c0e9d489ead76bb8891e6f1c8858a))


### Bug Fixes

* Cascader: 添加选取非叶子节点的需求 ([3699020](https://github.com/nomui/nomui/commit/3699020a4ad0c698fefd9ab4aff7e4216eb91811))
* **NumberSpinner:** 重复格式值造成NaN的问题 ([d79852b](https://github.com/nomui/nomui/commit/d79852bb0fa72424af6810245736065d7d432117))


### Performance Improvements

* 优化TreeSelect搜索显示 ([94d047a](https://github.com/nomui/nomui/commit/94d047abc1a3f5ce081778c45c957a69fd716453))
* **Menu:** 优化紧凑模式下交互逻辑 ([5058b80](https://github.com/nomui/nomui/commit/5058b80d2410f89cd39082db8b16e726f3d51fa0))

### [1.1.12](https://github.com/nomui/nomui/compare/v1.1.11...v1.1.12) (2022-11-04)


### Features

* **Grid:** 新增在清空排序时仍然触发onSort回调的配置 ([285e260](https://github.com/nomui/nomui/commit/285e260254c8c3a3a6c079abe5f361809f6304ef))


### Bug Fixes

* **Grid:** 行勾选与统计行兼容问题 ([ff6079e](https://github.com/nomui/nomui/commit/ff6079e81f83ee98345b8622c5556863ea3a434b))

### [1.1.11](https://github.com/nomui/nomui/compare/v1.1.10...v1.1.11) (2022-10-28)


### Features

* Cascader 添加新功能，配置子项的disable属性 ([993915f](https://github.com/nomui/nomui/commit/993915f1b0e8a99842a362935e75b3cc6f965bc9))
* Cascader 添加新功能，配置子项的disable属性 ([e567797](https://github.com/nomui/nomui/commit/e567797f1af40dfe2e9a14cdd1e248932591bcaf))
* **Grid:** 支持多级表头的排序 ([e7f66e3](https://github.com/nomui/nomui/commit/e7f66e3710c33d88e71b9a8800974b3f0758a06f))
* **TreeSelect:** 支持配置展开层级，以及多选支持仅勾选叶子节点 ([97feb8f](https://github.com/nomui/nomui/commit/97feb8f8580ad6bc5602403296023591cdfcf999))


### Bug Fixes

* 修复PartialDatePicker选中年份失效的bug ([ce7a01e](https://github.com/nomui/nomui/commit/ce7a01e23445f7bc812ba57b5e49b2dd82f70a34))
* 修复PartialDatePicker选中年份失效的bug ([1c15701](https://github.com/nomui/nomui/commit/1c157014069d99a29deaaa634573a024494364af))
* **Badge:** 优化角标计数为0时显示逻辑 ([ce421a0](https://github.com/nomui/nomui/commit/ce421a074eb2b7295f678ceb0817bad832e6176c))
* **Grid:** 数据为空时getData()异常以及部分场景js报错的问题 ([37fb886](https://github.com/nomui/nomui/commit/37fb8867d0abbdb23d2244de3d2c3a1409e8a062))
* **Grid:** 数据为空是getData()异常 ([f67b9d2](https://github.com/nomui/nomui/commit/f67b9d21d3f0026c599bee4b27199f6dac2143b2))
* **Grid:** 行勾选与合计功能冲突导致报错 ([3b0cf4c](https://github.com/nomui/nomui/commit/3b0cf4cb021e7504aefcd168f3b8e4c679a8ecfb))
* **Grid:** 修复多级表头下统计行异常，以及新增自定义列渲染功能 ([997aadf](https://github.com/nomui/nomui/commit/997aadf3ad6ada26f8b5d856bcdc3d9f6cc16038))
* **PartialDatePicker:** 取值异常时报错的问题 ([54eb4d3](https://github.com/nomui/nomui/commit/54eb4d390f03eb55bc58d87c9bd1d5af3bad39d0))
* **Password:** 控制明文按钮显隐的问题 ([b3fc222](https://github.com/nomui/nomui/commit/b3fc2229b7d9963884a498038a73635d3558806c))
* **Tooltip:** addClass报错 ([0696340](https://github.com/nomui/nomui/commit/06963405911aa9e75b54f1b9e764aac7bf5d5ec2))


### Performance Improvements

* **List:** 优化scrollIntoView效果 ([071ff97](https://github.com/nomui/nomui/commit/071ff9713062299b1302046cb0d2d1d4555fcd79))

### [1.1.10](https://github.com/nomui/nomui/compare/v1.1.9...v1.1.10) (2022-09-23)


### Bug Fixes

* **PartialDatePicker:** 部分情形getDateString方法报错 ([2940caa](https://github.com/nomui/nomui/commit/2940caa80d168e4261888fd6a9b8ce1721662b65))

### [1.1.9](https://github.com/nomui/nomui/compare/v1.1.8...v1.1.9) (2022-09-16)


### Bug Fixes

* **Grid:** appendRow与getData方法问题 ([4526d25](https://github.com/nomui/nomui/commit/4526d25797f706c555ee607a47aad7da7b3d7f7c))
* **Grid:** getData方法可能返回undefined ([fcbbee9](https://github.com/nomui/nomui/commit/fcbbee9d4da446692a8434136692f175a7457155))

### [1.1.8](https://github.com/nomui/nomui/compare/v1.1.7...v1.1.8) (2022-09-02)


### Bug Fixes

* 开放List组件的sortable更多功能 ([4814dbf](https://github.com/nomui/nomui/commit/4814dbfc7b307b65ae315a1178202ff1cf6f056c))

### [1.1.7](https://github.com/nomui/nomui/compare/v1.1.6...v1.1.7) (2022-08-26)


### Features

* **Field:** 支持自定义tabindex属性 ([226305e](https://github.com/nomui/nomui/commit/226305e593aa7b9086605a30ab132c82e98d6a67))
* **MaskInfo:** 新增配置是否显示切换全文按钮 ([e422fb9](https://github.com/nomui/nomui/commit/e422fb9b23e8715a48b47c44df130f7c9b1806f4))
* **RadioList:** 新增自定义fieldName ([e19cce3](https://github.com/nomui/nomui/commit/e19cce3992db3dde91eb3bcd07cd86d0fb00ecde))


### Bug Fixes

* **Grid:** 同时固定表头与右侧列会导致无法对齐 ([ff8c9ad](https://github.com/nomui/nomui/commit/ff8c9ad5956ca907fc3acabb0272a017e382a6c5))

### [1.1.6](https://github.com/nomui/nomui/compare/v1.1.5...v1.1.6) (2022-08-12)


### Features

* **Avatar:** 图像加载失败时会改为显示icon或者text ([49575e2](https://github.com/nomui/nomui/commit/49575e27f576d5ab1a06af99c1494274369b839a))


### Bug Fixes

* **DatePicker:** minDate maxDate不支持时分秒的问题 ([aa84e34](https://github.com/nomui/nomui/commit/aa84e34f8784a0e06fd673a3b710ca3ed7e582b7))
* **TreeSelect:** 子数组字段名不为'children'时选中异常 ([897c15b](https://github.com/nomui/nomui/commit/897c15bd00d02c3d8471d66e232bd32eae53b38f))

### [1.1.5](https://github.com/nomui/nomui/compare/v1.1.4...v1.1.5) (2022-08-05)


### Bug Fixes

* **DatePicker:** 修正一个词汇bug ([57eea1d](https://github.com/nomui/nomui/commit/57eea1df6a52bf22c7c19f2f3530ee6143e8091e))
* Uploader组件针对上传头像功能的部分修改 ([943b591](https://github.com/nomui/nomui/commit/943b59101ef1c2b55ef5e56d6fb4da5dc6534801))

### [1.1.4](https://github.com/nomui/nomui/compare/v1.1.3...v1.1.4) (2022-07-29)


### Features

* 新增uploader组件api( actionRender ) ([9c49f22](https://github.com/nomui/nomui/commit/9c49f2201f827502276086ccdc82aa89abe8bbfb))
* 优化Uploader组件的api (actionRender) ([c5453c6](https://github.com/nomui/nomui/commit/c5453c6f9dfc88789a26d7ca1e6c36dd580a9a51))
* **Grid:** 列设置面板新增全选功能 ([0dac27f](https://github.com/nomui/nomui/commit/0dac27f9852e1a2b7e63b35956c93fbd51729c99))
* Uploader支持自定义t头像上传按钮 ([1cf8ce7](https://github.com/nomui/nomui/commit/1cf8ce7d52b99d72df0d51d34e9995c48524ccab))


### Bug Fixes

* 修改uploading案例bug ([520a66c](https://github.com/nomui/nomui/commit/520a66ce5906b3c91a01132f24749bb5991afca6))
* **Avatar:** 解决某些场景js报错问题 ([b58dfee](https://github.com/nomui/nomui/commit/b58dfeef9d8fdf6f45ae76a93e16fc103746d8b3))
* DatePicker组件Safari兼容性bug修复 ([52cbf44](https://github.com/nomui/nomui/commit/52cbf448930ee1797e62e0b1161b76b57c6f940c))


### Performance Improvements

* 将unloader组件中的button和actionRander api合并 ([c652dd9](https://github.com/nomui/nomui/commit/c652dd94a0d82d630c45e38be02c9e46265629cc))

### [1.1.3](https://github.com/nomui/nomui/compare/v1.1.2...v1.1.3) (2022-07-22)


### Features

* 优化Tree，提供新的setCheckedNodeKeys 支持设置选中值 ([d5de48f](https://github.com/nomui/nomui/commit/d5de48fc2e1749a327a95ef3f4aa1ac01a98902e))


### Bug Fixes

* **Avatar:** 某些场景下Avatar计算文字位置尺寸失效 ([26b16e6](https://github.com/nomui/nomui/commit/26b16e60f21888f6cc121cf725fff2c9fa6aabbb))

### [1.1.2](https://github.com/nomui/nomui/compare/v1.1.1...v1.1.2) (2022-07-08)


### Bug Fixes

* autocomplete下拉信息从选中信息改为全部信息 ([e8ea65e](https://github.com/nomui/nomui/commit/e8ea65e49f46e98044aa04900c9df4b2d902539a))


### Performance Improvements

* **DatePicker:** 优化对非日期值的支持 ([daac7c7](https://github.com/nomui/nomui/commit/daac7c7f1899557353528c8fa58c2c9b0736bd9f))

### [1.1.1](https://github.com/nomui/nomui/compare/v1.1.0...v1.1.1) (2022-07-01)


### Features

* **DatePicker:** 支持额外的工具按钮 ([f2e8e8f](https://github.com/nomui/nomui/commit/f2e8e8fe00caaff97578d3a0523d9dea87c1837c))
* **PartialDatePicker:** 新增自定义底部工具按钮 ([1530573](https://github.com/nomui/nomui/commit/15305730ac196f78e55bf2d1f0599d3c71aa2db4))
* Step新增配置iconCustomized，使步骤图标可完全自由定制 ([9e97a8d](https://github.com/nomui/nomui/commit/9e97a8d65b5b5cfdea8d1fb9c9e5b1f211669e8d))


### Bug Fixes

* 修复一个低版本浏览器兼容性bug ([040c06d](https://github.com/nomui/nomui/commit/040c06d5d70c02f834b2687863ab55b23173624d))
* 修改Cascader组件disabled方法和属性无效 ([412133c](https://github.com/nomui/nomui/commit/412133c5874868743dbe56bbc626d8d3b09aaca3))
* 修改groupGrid组件没有默认值报错问题 ([9a4eeb4](https://github.com/nomui/nomui/commit/9a4eeb466ec9cc7059cd4f851aab2f7e28a990fc))


### Performance Improvements

* 优化iconCustomized思路 ([6ad31b3](https://github.com/nomui/nomui/commit/6ad31b39289f5e56f64f629b34daf48104bdb8cd))
* 优化iconRender思路 ([e14dee0](https://github.com/nomui/nomui/commit/e14dee0358e40017b9593724c83073b22a27ed8f))


### Docs

* 文档重复条目修复 ([c5a7c65](https://github.com/nomui/nomui/commit/c5a7c652b5fe88b38867cdb2d1284cbb03546a20))
* 新增国内镜像文档 ([a6cd7ed](https://github.com/nomui/nomui/commit/a6cd7ed92a80a815f2e11de1beec4f1dfff30d6f))

## [1.1.0](https://github.com/nomui/nomui/compare/v1.0.4...v1.1.0) (2022-06-24)


### Features

* **Image:** 新增Image图片组件 ([49effee](https://github.com/nomui/nomui/commit/49effee80c40a84c8853a2b016cc30630c087417))
* **Collapse:** Collapse的激活面板可以支持多个 ([f0a984b](https://github.com/nomui/nomui/commit/f0a984b99a9eade12467cc1487b52b25c7b6bb72))

### Bug Fixes

* 调整Image图片组件的排列顺序 ([c9e9f72](https://github.com/nomui/nomui/commit/c9e9f72350d8a34112b0bc6f68e75a9023d4b32a))
* 修复GroupGrid 新增默认值，第一行的时候无效 ([a2534a5](https://github.com/nomui/nomui/commit/a2534a57c78f1cc38a2f69c821b8e244e9a2134e))
* Image图片组件 ([2a677b9](https://github.com/nomui/nomui/commit/2a677b94fd63c81d83121e96e6c5fe172dd80953))


### Docs

* 完善 fieldDefaults 这个文档api ([a8ba884](https://github.com/nomui/nomui/commit/a8ba884e5df13815032d9abf10b86c5977338b78))
* release文档更新 ([21334cd](https://github.com/nomui/nomui/commit/21334cd215a71373964516514b1281fd437ddfd9))

### [1.0.4](https://github.com/nomui/nomui/compare/v1.0.3...v1.0.4) (2022-06-17)


### Performance Improvements

* 优化password不能输入*的情况 ([6c9e676](https://github.com/nomui/nomui/commit/6c9e676a7ea6c862645a16655f4dbf49517b5dfa))

### [1.0.3](https://github.com/nomui/nomui/compare/v1.0.2...v1.0.3) (2022-06-10)


### Features

* 平滑过渡 ([81d600a](https://github.com/nomui/nomui/commit/81d600a151abf7ef3ab0d59aa1da95409be6cef2))
* 首页彩蛋设计以及页面放大缩小适配优化 ([686920e](https://github.com/nomui/nomui/commit/686920ef1d13584aa2ba755a87e06d6522d19317))
* 首页彩蛋设计优化 ([12fda6f](https://github.com/nomui/nomui/commit/12fda6fa90a6f2f11b5b50f898dcce282b547e9b))
* 添加沙箱功能 ([82bb93d](https://github.com/nomui/nomui/commit/82bb93d712564ef91b7e473fcf1968d35dcfd4c9))
* password给eye按钮添加开关功能 ([26a9583](https://github.com/nomui/nomui/commit/26a95832ade7a0a97fef6a3f786706eafacb47dc))
* Password新增切换明文查看密码的开关 ([cd5b3ec](https://github.com/nomui/nomui/commit/cd5b3ec3f209b2f2485c3f0f0cd1c1d442d159a8))
* **TreeSelect:** 新增获取字面值方法 ([18269bc](https://github.com/nomui/nomui/commit/18269bc4a11bc8d370ea114a75f3d194443d91f2))


### Bug Fixes

* 调整password样式 ([fabed34](https://github.com/nomui/nomui/commit/fabed343f42ce56d9c4ab9a3b2602ea87c597c53))
* 动效的代码优化 ([54e3e88](https://github.com/nomui/nomui/commit/54e3e8846d1613b7de395d2265272643c30bc3be))
* 修复RadioList在谷歌49版本的样式bug ([214b7ad](https://github.com/nomui/nomui/commit/214b7ad218f43cf3c2105372f88fb04cb2478309))
* 优化Image组件 ([3133249](https://github.com/nomui/nomui/commit/3133249a1d2931868ae7cbf9c53fad59fb4979d5))

### Performance Improvements

* password的passwordPopup修改为继承于 Popup ([958f5fd](https://github.com/nomui/nomui/commit/958f5fd10ba928d4eaa6bea907f446ddf03542d8))


### Docs

* 修复RadioList文档目录大小写问题 ([3a4109a](https://github.com/nomui/nomui/commit/3a4109a9c3422452574aebead7d085b503bce16a))

### [1.0.2](https://github.com/nomui/nomui/compare/v1.0.1...v1.0.2) (2022-05-27)


### Bug Fixes

* 修复Table放大的样式兼容bug ([98a1f32](https://github.com/nomui/nomui/commit/98a1f32f2b8a2fa9080a7aa93eca6c8fdd8eafa5))
* **PartialDatePicker:** 获取字面值方法报错 ([556834d](https://github.com/nomui/nomui/commit/556834d72361db2490869a356e6359b8a850e6ad))


### Docs

* Grid开放autoScrollGrid方法 ([911f4cb](https://github.com/nomui/nomui/commit/911f4cbe9955025f461a672cf5655c8c1fb55748))

### [1.0.1](https://github.com/nomui/nomui/compare/v1.0.0-alpha.61...v1.0.1) (2022-05-20)


### Features

* **Grid:** 表尾合计功能支持统计多行数据 ([6ebfaea](https://github.com/nomui/nomui/commit/6ebfaea5e39014ef11800078d085d2232cdb2148))
* Group校验新增忽略必填规则的配置项 ([c8d5c8e](https://github.com/nomui/nomui/commit/c8d5c8eeb498c3c243a4af798f6d16d0eda3f3b8))


### Docs

* 文档界面更新 ([660c8ea](https://github.com/nomui/nomui/commit/660c8ea0b18bbdb4d41497844908c20817123e3e))

## [1.0.0-alpha.61](https://github.com/nomui/nomui/compare/v1.0.0-alpha.60...v1.0.0-alpha.61) (2022-05-13)


### Bug Fixes

* **Grid:** 列筛选部分类型组件字面值显示错误 ([82b3ee6](https://github.com/nomui/nomui/commit/82b3ee6d7ab66ebe22785a45fb7330d363d34094))


### Docs

* 修改主题色，文档界面更新 ([fa97c5c](https://github.com/nomui/nomui/commit/fa97c5c1b7a8096cedcc618876a074209244d57d))

## [1.0.0-alpha.60](https://github.com/nomui/nomui/compare/v1.0.0-alpha.59...v1.0.0-alpha.60) (2022-05-07)


### Features

* **Grid:** 列筛选模式支持保存搜索条件并高亮显示条件内容 ([6f8e28d](https://github.com/nomui/nomui/commit/6f8e28de511a2583fdff83ea33fbee587f362f57))


### Bug Fixes

* 修复元素不存在时延时报错的问题 ([9cfc9eb](https://github.com/nomui/nomui/commit/9cfc9eb62fe05c0476a6b128fe7f7efdc55a8404))
* 修复元素不存在时延时报错的问题 ([5d405b3](https://github.com/nomui/nomui/commit/5d405b39f30aa09f1b59d29e0489e5d4f62101c7))
* 修复Tooltip延时报错 ([8816b0d](https://github.com/nomui/nomui/commit/8816b0d763959a9514bd76a0880794f65da267bb))
* NumberSpinner数字微调器:修复数字微调器禁用后还能点击操作的bug ([8d68d5d](https://github.com/nomui/nomui/commit/8d68d5d731332e36895eae459a69d488b12a3e4b))

## [1.0.0-alpha.59](https://github.com/nomui/nomui/compare/v1.0.0-alpha.58...v1.0.0-alpha.59) (2022-04-29)


### Features

* 给List组件提供scrollIntoView配置并优化TimePicker自动滚动效果 ([90edf69](https://github.com/nomui/nomui/commit/90edf69550388d71f3d93128c761817e4d35a90c))
* 日期时间组件在手动键入非法值时会自动清空 ([1270f5b](https://github.com/nomui/nomui/commit/1270f5b2490a3854f268bb5bb8078fdc36b0ecfe))
* 添加组件全局搜索功能 ([712f70d](https://github.com/nomui/nomui/commit/712f70d8796c0c2f1db969289eb3527d6ebd75e1))
* **List:** 添加点击加载更多功能 ([5f408fa](https://github.com/nomui/nomui/commit/5f408fac85f8277e79b4d09c7b84e0814472cf04))
* Select显示隐藏增加动画效果以及Progress增加进度数值宽度配置项，Layer组件隐藏动画有bug暂时下线 ([a82d11f](https://github.com/nomui/nomui/commit/a82d11f1fb51288b46bfb7a6ef969f17da8bb996))


### Bug Fixes

* 全局搜索:修复点击组件名称没有跳转的问题 ([b2373a8](https://github.com/nomui/nomui/commit/b2373a8fe9fe49c87f296c72f3255da75ca901df))
* 优化nomappOverflow的位置 ([eddc490](https://github.com/nomui/nomui/commit/eddc490d98c49782e5bad72a3f9b401ae5e10c30))
* 组件全局搜索，修复弹层样式。修复bug ([2ed28a9](https://github.com/nomui/nomui/commit/2ed28a9111fb880ecacd943d7eb5e6b791e8d799))
* **CheckboxTree:** 级联取消选中父节点 ([04a657c](https://github.com/nomui/nomui/commit/04a657c2700278997b0d1c7046c2ccf54da1f502))
* **List:** 部分场景js报错 ([d05b2c1](https://github.com/nomui/nomui/commit/d05b2c1b5a7ab928a82e4551994ef9fac6070016))
* **Loading:** loading点击事件阻止冒泡 ([8a15e92](https://github.com/nomui/nomui/commit/8a15e9222485af6323e8a74e3349bca27bbb99a0))
* **Select:** 去掉多余注释代码 ([c4f041a](https://github.com/nomui/nomui/commit/c4f041ae60edceedb99bc327f8f3942fb8e96a80))
* **Tree:** TreeSelect组件，弹窗打开扁平化数据不生效 ([5b3e671](https://github.com/nomui/nomui/commit/5b3e6717669842407f2c5a402d9077e5830a6697))


### Docs

* 案例更新 ([8cf41c8](https://github.com/nomui/nomui/commit/8cf41c8500d81ad4bc9535d97cff8b92d1bcff32))

## [1.0.0-alpha.58](https://github.com/nomui/nomui/compare/v1.0.0-alpha.57...v1.0.0-alpha.58) (2022-04-15)


### Features

* Drawer显示隐藏增加动画效果以及优化Modal动画 ([54336ed](https://github.com/nomui/nomui/commit/54336ed5a276770a52f5d268f200e7a069817633))
* Layer Notification显示隐藏增加动画效果 ([edf4e6d](https://github.com/nomui/nomui/commit/edf4e6d9755202246c2e77d8b40b95f63756b8fb))
* **Modal:** 动画显隐优化 ([8531c3d](https://github.com/nomui/nomui/commit/8531c3df5c433c45d6bf1b0b7cbf0ce31a92689d))
* **Modal:** 增加动画显隐 ([e9844fe](https://github.com/nomui/nomui/commit/e9844fed413faae6bd9e5c9fc36805319bab7322))


### Bug Fixes

* **Select:** 搜索无数据后，下次展示需情况输入框 ([98d1f6c](https://github.com/nomui/nomui/commit/98d1f6c18ea83f7ca5760b0c8b9e538ce0ce2823))
* **Select:** select 弹出框隐藏后，其searchBox已被销毁导致的报错 ([2eea31c](https://github.com/nomui/nomui/commit/2eea31c2ac09e3bcd80e8a4fa02693886d4e9e7e))
* **Tooltip:** 自定义背景色时箭头颜色未自适应 ([f1429fd](https://github.com/nomui/nomui/commit/f1429fd4ae9e0f358a54e0933e45612216c816b5))

## [1.0.0-alpha.57](https://github.com/nomui/nomui/compare/v1.0.0-alpha.56...v1.0.0-alpha.57) (2022-04-08)


### Bug Fixes

* **List:** appendItem的数据，未加上拖拽类名，无法被拖拽 ([810e5a6](https://github.com/nomui/nomui/commit/810e5a640305c7facc0c441655e158c0b408f73a))
* **List:** data格式传入时无wrapper，removeItem时会报错 ([ad15f37](https://github.com/nomui/nomui/commit/ad15f372344c9ae80f025878eb0320af41fbf153))

## [1.0.0-alpha.56](https://github.com/nomui/nomui/compare/v1.0.0-alpha.55...v1.0.0-alpha.56) (2022-04-02)


### Docs

* 文档链接更新 ([eb53464](https://github.com/nomui/nomui/commit/eb534648d256e92abc2c14ee3102bef4019143c6))

## [1.0.0-alpha.55](https://github.com/nomui/nomui/compare/v1.0.0-alpha.54...v1.0.0-alpha.55) (2022-04-01)


### Features

* **Icon:** 添加 download图标 ([c903c3a](https://github.com/nomui/nomui/commit/c903c3ac1b89af7142a506bd9b6fde560989d1df))


### Bug Fixes

* 合并主分支版本，解决冲突 ([9351e1b](https://github.com/nomui/nomui/commit/9351e1b5418fe42425fcb9135b8df4725d9544ae))
* 解决冲突 ([e47d2ff](https://github.com/nomui/nomui/commit/e47d2ff6efc9ae805392528fa3a3bbcbd23e8cff))
* **Avatar:** 头像内容是图片时圆角可能不正常 ([2707e83](https://github.com/nomui/nomui/commit/2707e83feb6d8b462217852577bd477cbe49761e))
* **Grid:** 横向滚动时表头边缘区域显示效果不佳 ([22c296a](https://github.com/nomui/nomui/commit/22c296adad86b88c544bde62cb5372677300173b))
* **Grid:** 吸附表头下列设置按钮位置错误 ([e6d47e2](https://github.com/nomui/nomui/commit/e6d47e20044493ffb60d2a3f99c5079ac64f85ad))
* **Grid:** firefox浏览器下，Array.sort的表现不同，导致的列顺序出错 ([3fd4dfe](https://github.com/nomui/nomui/commit/3fd4dfe04c6be2a8f3196ef3cce355ea35b07fd6))
* **GroupList:** 修复GroupList造成的全局样式影响 ([04699e0](https://github.com/nomui/nomui/commit/04699e0d307aebe80f0ea2942aef4fe15bbc290e))
* **Steps:** 修复Steps垂直状态无连接线的bug以及优化案例与样式 ([8cae2ab](https://github.com/nomui/nomui/commit/8cae2ab08779799228117a6130b01a3e4df2481e))
* **Textbox:** 第一次点清空按钮未触发onValueChange，因为null === null ([3d25d2c](https://github.com/nomui/nomui/commit/3d25d2ca813e344c250c286f8d683b573654437c))
* **Textbox:** readonly为fale时，导致textbox样式变化 ([3057f0a](https://github.com/nomui/nomui/commit/3057f0a448aad4fae2bfdb36a8a5c4700ab3d133))

## [1.0.0-alpha.54](https://github.com/nomui/nomui/compare/v1.0.0-alpha.53...v1.0.0-alpha.54) (2022-03-25)


### Bug Fixes

* **DatePicker:** 年份默认可选范围太小的问题 ([73c08ac](https://github.com/nomui/nomui/commit/73c08acafde3f9e727a05587e188b8ddc0cb7f16))
* **GroupList:** 修复GroupList按钮不对称问题 ([6d80932](https://github.com/nomui/nomui/commit/6d809320b5a7cd585c216bfe499bd924b7b1a2bc))

## [1.0.0-alpha.53](https://github.com/nomui/nomui/compare/v1.0.0-alpha.52...v1.0.0-alpha.53) (2022-03-18)


### Features

* **Grid:** 缓存列固定列功能 ([a645825](https://github.com/nomui/nomui/commit/a645825b477d94618799565202d2c48abd8e68e1))


### Bug Fixes

* **CheckboxTree:** 修复获取不到值的问题 ([a3c72f6](https://github.com/nomui/nomui/commit/a3c72f6b49d56dc335d1323a47c9d27faeefab14))
* **Gird:**  保存列设置时，将customizable: false的列排至最后 ([36c188a](https://github.com/nomui/nomui/commit/36c188a84d9896cce418d882f8a9bb4913c71d04))
* **Grid-fixed:** 取消初始化固定列时的bug ([9d66302](https://github.com/nomui/nomui/commit/9d663027d6c6cae22196f578f2810b3b6c205445))
* **Grid:** 单独使用table时, th列宽判断导致的报错 ([22b9c52](https://github.com/nomui/nomui/commit/22b9c52694a136df8eaaacc9223764c4f9719ed8))
* **Grid:** 计算右侧固定位置时，考虑固定表头的情况 ([ab29f1c](https://github.com/nomui/nomui/commit/ab29f1cd39fba0d6e8bfea93a5b6101a0d0692cb))
* **Grid:** 每次展开自定义列弹窗时都重新获取 popupTreeData ([24342de](https://github.com/nomui/nomui/commit/24342de6c5734a530b4057b002d12c7f8d574cd6))
* **Grid:** 外部更新columns后，需要更新 pinColumns的数据 ([4ab6a67](https://github.com/nomui/nomui/commit/4ab6a67fbdd1a6f6c780e63fc024c0bb1804b512))
* **Grid:** 外部更新columns后，需要重新读取处理缓存中的列设置 ([61ccc07](https://github.com/nomui/nomui/commit/61ccc078df2fe9535fb50697bb6f91b4c589e43a))
* **Menu:** 紧凑模式下如果选中不存在的key会js报错 ([dc25724](https://github.com/nomui/nomui/commit/dc25724ee0791b332330bd835d48832ced95458b))


### Docs

* **Grid:** 添加固定列设置的缓存的文档 ([9f694f6](https://github.com/nomui/nomui/commit/9f694f649fb6b5351d454d7c8581302746672a14))

## [1.0.0-alpha.52](https://github.com/nomui/nomui/compare/v1.0.0-alpha.51...v1.0.0-alpha.52) (2022-03-11)


### Features

* **Grid-拖拽自定义列:** 增加allowFixedCol配置 ([a232b48](https://github.com/nomui/nomui/commit/a232b480ecd4f1b0b3bd9a8a59bf389a28b95feb))


### Bug Fixes

* (Uploader)文件上传beforeUpload方法优化 ([2e9efcc](https://github.com/nomui/nomui/commit/2e9efcccb74fa1be7582169b67eb2e369a3d943a))
* **Empty:** 修复Empty图标与文字不对齐的bug ([83abbf9](https://github.com/nomui/nomui/commit/83abbf9a52d89bec29943e9bb0c62b000c4db5d5))
* **Grid-固定列拖拽:** footer不存在时 ([40829f0](https://github.com/nomui/nomui/commit/40829f0c7619d95c08307b92058f7c31ac01b185))
* **Grid-highlightMask:** 悬浮表头时高亮列的展示bug ([f17b7c2](https://github.com/nomui/nomui/commit/f17b7c20fc2c655d6e4bd24b89cc106d416cfc4c))
* **Grid:** 解决拖拽列宽，导致固定列的展示bug ([e990f45](https://github.com/nomui/nomui/commit/e990f4535aa0b21fe51456e00fc49f68152539c6))
* **Grid:** 列设置排序功能 ([71ca986](https://github.com/nomui/nomui/commit/71ca98603f8dbe8336f5017870ada6ff358eb468))
* **Grid:** 去掉console ([c9570f2](https://github.com/nomui/nomui/commit/c9570f26db9d9151548c40576306e7a85c537692))
* **Grid:** 自定义列设置，originColumns的排序逻辑 ([e647ea5](https://github.com/nomui/nomui/commit/e647ea5b36dad4ea417897a00e98733095dfee94))
* **Select:** 搜索的filter返回为空时，未对optionList的数据进行更新 ([49b8dfc](https://github.com/nomui/nomui/commit/49b8dfc1fc2fe2208c7b7b7f55722852853f99a8))
* **sortable 兼容性:** 火狐浏览器下，拖拽会打开新的标签页 ([809c801](https://github.com/nomui/nomui/commit/809c8010f4926113a9a6299f3d01216cba15ab49))
* **Tooltip:** 修复 Tooltip 在有body滚动条时验证提示错位问题 ([20e01c1](https://github.com/nomui/nomui/commit/20e01c1afd1ecd7278821a2626803b5ccb26a2e6))


### Docs

* 调整组件的顺序 ([ce467db](https://github.com/nomui/nomui/commit/ce467db672327c8d73a9d7aa2e5cf95d8ae2260f))

## [1.0.0-alpha.51](https://github.com/nomui/nomui/compare/v1.0.0-alpha.50...v1.0.0-alpha.51) (2022-03-04)


### Features

* 校验规则支持更多的手机号段 ([1e11f3d](https://github.com/nomui/nomui/commit/1e11f3d2882e726dfce5b35588f3aa6f46123510))


### Bug Fixes

* **DatePicker:** 修复日期框可以手动输值的问题 ([bfc7bda](https://github.com/nomui/nomui/commit/bfc7bda122b38aea6de3c7e2653e3024728aeb8d))
* **Grid:** 当data为[]时，拖动列宽导致报错 ([7781bda](https://github.com/nomui/nomui/commit/7781bdaf00c5bdbe70b609cee15468deee8c6da5))
* **Grid:** 固定列的阴影会触发td点击事件 ([fbacfd1](https://github.com/nomui/nomui/commit/fbacfd116011d3267c069750876744e95c7537ca))
* **Grid:** 列设置按钮在滚动式消失 ([a3a09ae](https://github.com/nomui/nomui/commit/a3a09aec484d91f4f84fc91a6b00ddd1aadf98e6))
* **Grid:** 判断 sicky = window 时的情况 ([90e3b20](https://github.com/nomui/nomui/commit/90e3b2078012f3906698382142eb339c04a184ba))
* **Textbox:** 日期控件readonly时，支持清除按钮 ([23ad1ab](https://github.com/nomui/nomui/commit/23ad1ab2606b04de658c03143313c4dcdf02654d))

## [1.0.0-alpha.50](https://github.com/nomui/nomui/compare/v1.0.0-alpha.49...v1.0.0-alpha.50) (2022-02-25)


### Features

* **Grid auto scroll:** 添加sticky模式的竖向滚动 ([a2cab78](https://github.com/nomui/nomui/commit/a2cab788f3f2f868ce567a20b1345624148e61d0))
* **Grid:** 表格自动滚动，支持竖向的滚动记录 ([d8d461a](https://github.com/nomui/nomui/commit/d8d461aa72cfe5f54e7642520b8d192321441a85))
* **Grid:** 提供外部主动记录滚动位置的方法 ([1531db5](https://github.com/nomui/nomui/commit/1531db57c56d2cd2f1d24923580401169a30ddcb))


### Bug Fixes

* **Button:** danger按钮的样式问题 ([7e6dec7](https://github.com/nomui/nomui/commit/7e6dec7af4438b8ad0b9eaf9dfc12cccb9ea03d0))
* **Grid:** 列设置后，导致表格的操作列(未设置field)消失 ([7d52cc7](https://github.com/nomui/nomui/commit/7d52cc78619ae593761562f1643575de373c9121))

## [1.0.0-alpha.49](https://github.com/nomui/nomui/compare/v1.0.0-alpha.48...v1.0.0-alpha.49) (2022-02-18)


### Features

* **Pager:** 新增compact紧凑模式 ([d5f9407](https://github.com/nomui/nomui/commit/d5f94077e716e5bb1f9c584cc9d5c800257e51ea))
* **theme:** 颜色使用css变量+button组件的示例 ([5ce716e](https://github.com/nomui/nomui/commit/5ce716ee547d90027e544cad747b791efccbeb3f))
* **Tree:** 新增级联取消上级节点 ([3cddaf2](https://github.com/nomui/nomui/commit/3cddaf234f8582e6abd3a63b6cd14aa433b9c4d8))
* **Tree:** 新增级联取消上级节点 ([fe6b9e9](https://github.com/nomui/nomui/commit/fe6b9e95e9dacd4db4549d0c7b76e961e1b127c1))


### Bug Fixes

* **global css:** 类名修改 ([e053980](https://github.com/nomui/nomui/commit/e0539808599804e9b0392c166226864d21c303e6))
* **PartialDateRangePicker:** getValueText无效的问题 ([a595822](https://github.com/nomui/nomui/commit/a59582283e1faf0fa31dd2f00d24dfef9f4349d6))


### Docs

* **Pager:** 补充文档 ([438e038](https://github.com/nomui/nomui/commit/438e038dcbfa98897adfb200446d40afe5ffe768))
* **Tree:** 新增文档 ([f9f9757](https://github.com/nomui/nomui/commit/f9f97571f0eafd5cac4a603794ee6cde0b53636e))

## [1.0.0-alpha.48](https://github.com/nomui/nomui/compare/v1.0.0-alpha.47...v1.0.0-alpha.48) (2022-01-28)


### Features

* AutoComplete 给AutoComplete添加远程搜索功能 ([b4e4470](https://github.com/nomui/nomui/commit/b4e4470197ccda7142c087f0725b405770c5eef9))
* **Grid:** 根据浏览器的版本信息判断是否有固定列功能 ([ed02d6f](https://github.com/nomui/nomui/commit/ed02d6f53b35593dd88b21812fabfb93c702d83d))
* **Grid:** 添加默认排序功能 ([4440afd](https://github.com/nomui/nomui/commit/4440afd449ce1c6faf441de98d2a714878aaf15f))
* **RangePicker:** 范围选择器提供选完初始时间是否自动弹出结束时间面板的配置 ([cbb45e5](https://github.com/nomui/nomui/commit/cbb45e547ab2d2fbbbff2e133d32006c8fa857da))


### Bug Fixes

* 优化CheckboxTree低版本兼容性 ([a12d563](https://github.com/nomui/nomui/commit/a12d5630bb8eeeea1dc5fffd82d3bd5f51091517))
* **Grid:** 列设置问题 ([cdf3eeb](https://github.com/nomui/nomui/commit/cdf3eebd7320b4f7573c82e63363999ee7b077f6))
* **Grid:** chrome49版本下，表格的滚动条展示 ([a4668b2](https://github.com/nomui/nomui/commit/a4668b257e5b16786add2aa5193574da20ec27b6))
* **Layout:** flex: 1和 height: 100%在低版本浏览器上会显示多个滚动条的bug ([ee91c82](https://github.com/nomui/nomui/commit/ee91c82147313fb2f2bcfb408652481dbafbe6a8))
* **Select:** 使用internalOptions以后搜索无效 ([d5a41cd](https://github.com/nomui/nomui/commit/d5a41cdb9653e632ffb696f2b5b0a0fbc963e6db))
* **Textbox:** 使用 affix-wrapper包裹之后，导致背景色bug ([9a5e5d5](https://github.com/nomui/nomui/commit/9a5e5d58cb918c725fb3fa35d981ac719c5891e3))


### Performance Improvements

* 加强Chrome49版本下的css兼容性 ([14df0b4](https://github.com/nomui/nomui/commit/14df0b4412ab2d0e389162801213724bf4dc65c6))


### Docs

* **Grid:** 表格添加默认排序 ([d25679d](https://github.com/nomui/nomui/commit/d25679dfd886998dea6242e671a960b68d6fbe29))

## [1.0.0-alpha.47](https://github.com/nomui/nomui/compare/v1.0.0-alpha.46...v1.0.0-alpha.47) (2022-01-21)


### Features

* **NumberBox:** 新增maxPrecision规则 ([da21ade](https://github.com/nomui/nomui/commit/da21adeed4f198abb6cb3eda28bb4b5fcf9ad17c))
* **Textbox:** 添加allowClear可清除 ([80b2274](https://github.com/nomui/nomui/commit/80b227495e08dac2e69f160d0565cac533557482))


### Bug Fixes

* 修复Select有重复key的判断逻辑bug ([f7fc204](https://github.com/nomui/nomui/commit/f7fc204de1753dc3ce0271c39e93e4c060b4ced6))
* 修复Select有重复key的判断逻辑bug ([975ef53](https://github.com/nomui/nomui/commit/975ef536ec9b10b38cb903390df677806f7d08b5))
* **Grid:** 开启勾选列功能时，固定列功能未按预期工作 ([fbd68d1](https://github.com/nomui/nomui/commit/fbd68d18b7011fb887e423a267e4b4ece12659df))
* **Grid:** 列设置与列排序意外的冲突 ([fa26268](https://github.com/nomui/nomui/commit/fa26268c73843186d029cd11f6ef8217f84ad909))
* **Grid:** 内部更新columns时，不更新自定义列弹窗中的数据 ([0ea1652](https://github.com/nomui/nomui/commit/0ea165257670324296724a433ef2bb928e91c207))
* **Grid:** 内部更新Grid时，跳过columns的处理 ([f667655](https://github.com/nomui/nomui/commit/f667655abc8f192742a6555ff7c0fe081551cfef))
* **Grid:** 设置排序后，同时修改originColumns里的排序状态 ([66d5ec3](https://github.com/nomui/nomui/commit/66d5ec31ce29ef68c8b759e6a1210c41a2b2857d))
* **Grid:** 由Grid内部更新 columns时，不触发originColumns的改变 ([6200b41](https://github.com/nomui/nomui/commit/6200b41ed71a779c8b08cd0dbc0b0ea8bea017d6))
* **Grid:** frozenLeftCols在有列勾选功能时表现异常 ([92cce78](https://github.com/nomui/nomui/commit/92cce789031c0e632963262dd8ee98bb9ddfb95d))
* **Numberbox:** 低版本浏览器不支持幂操作符, 改为Math.pow ([7f7a37b](https://github.com/nomui/nomui/commit/7f7a37b334dc80b28062b47b1253911f88ef7dda))
* **Select:** select中直接使用的options, 导致需要处理value字段的数据传入时，会显示错误 ([904b42b](https://github.com/nomui/nomui/commit/904b42b6b6212931015e7f3c93a463ed48b5bcc6))
* **Textbox:** 继承至Textbox的组件出现两个清除按钮 ([d02d4ea](https://github.com/nomui/nomui/commit/d02d4ea7be80c9c120f69ab33c6ec14e864f76ba))


### Docs

* 完善文档 ([14ce220](https://github.com/nomui/nomui/commit/14ce220d354f132c1acb984d1902dcbd880fe718))

## [1.0.0-alpha.46](https://github.com/nomui/nomui/compare/v1.0.0-alpha.45...v1.0.0-alpha.46) (2022-01-14)


### Features

* **Grid:** 悬浮表头，对应列高亮 ([f509210](https://github.com/nomui/nomui/commit/f509210f89128c7ddd0ea6f0b15c8c5e1d79105a))


### Bug Fixes

* **chrome兼容:** 低版本浏览器的el.classList.value 的值不存在 ([9300078](https://github.com/nomui/nomui/commit/9300078a5d2014b90520cc2a938f240caf87fbe8))
* **Grid-scrollbar:** 改变列宽宽后, 悬浮的 scroller宽度未更新，导致列展示不全 ([b7238c4](https://github.com/nomui/nomui/commit/b7238c4a58eb5a91244749adc003ac1dfbdb1367))


### Docs

* **反馈和其他:** 补充反馈和其他部分的组件文档 ([e344b59](https://github.com/nomui/nomui/commit/e344b59d1767a5c51f171f12c45442e31553bd8b))
* **浮层相关:** 浮层类的组件文档补充 ([06b3224](https://github.com/nomui/nomui/commit/06b32246b89d3523d459c9459519c3a3bac15929))
* **数据展示:** 数据展示相关组件文档补充 ([3c7e70b](https://github.com/nomui/nomui/commit/3c7e70bbf0f55f697e6bbcc98f20b3ae4555081f))
* **文档:** 面包屑，折叠面板，Layer的文档补充 ([c645c8b](https://github.com/nomui/nomui/commit/c645c8bd19f2e98f1bea35673bf7e98136dedff4))
* **Gird:** highlightCol的文档补充 ([16bfc1d](https://github.com/nomui/nomui/commit/16bfc1d9a54b82a2f0ae733834282976ec5984cc))

## [1.0.0-alpha.45](https://github.com/nomui/nomui/compare/v1.0.0-alpha.44...v1.0.0-alpha.45) (2022-01-07)


### Features

* 表单类型组件都支持getValueText获取字面值 ([e602389](https://github.com/nomui/nomui/commit/e602389dcefa2cd50ddf0527b8c034a8eeb6faa6))
* **Checkbox:** 字面值支持自定义配置 ([a6a6fff](https://github.com/nomui/nomui/commit/a6a6fff07d86458cc11298d929f841700c5cbd9d))
* **Grid:** 默认显示条纹间隔，选中行支持背景高亮 ([bc8c1a0](https://github.com/nomui/nomui/commit/bc8c1a0d51496c5bc0a0e0f6238216f00818f9cd))
* **Pager:** 分页器添加缓存设置分页大小的功能 ([5325ee6](https://github.com/nomui/nomui/commit/5325ee67fa5f16ad754b17ae464935397fa67530))
* **Pager:** 添加分页器的排列方式和排列顺序 ([c32fdff](https://github.com/nomui/nomui/commit/c32fdffdd9285e395d39a882b04f303427dbd51c))
* **Tree:** 拖拽功能添加showHandler，开启后仅允许拖拽图标功能 ([6cff088](https://github.com/nomui/nomui/commit/6cff08817db16764dafc93fe63c4b07ce99d376a))


### Bug Fixes

* **Grid-scrollbar:** 表格滚动条的非空判断 ([d0e5a9f](https://github.com/nomui/nomui/commit/d0e5a9f5f3faba3d160a9959e0758d4d553c28c0))
* **Grid:** 切换页面,Grid被销毁，导致props为undefined 报错 ([f429727](https://github.com/nomui/nomui/commit/f429727f0a81ac99652eb2c2327d8ddce9074a58))


### Docs

* **Tree:** 补充排序功能文档 ([443c69e](https://github.com/nomui/nomui/commit/443c69edd3e600d5ce2b51014bf95ea89cd6f85d))
* **Tree:** 修复文档 ([e19b394](https://github.com/nomui/nomui/commit/e19b394d01f592c956726c818dfdda5bcc825ba6))

## [1.0.0-alpha.44](https://github.com/nomui/nomui/compare/v1.0.0-alpha.43...v1.0.0-alpha.44) (2021-12-31)


### Features

* **Ellipsis:** 添加多行文本的...省略功能 ([d79224f](https://github.com/nomui/nomui/commit/d79224f60ec30e9a3063354bfca12a9f7cc14bf9))
* **Ellipsis:** Ellipsis的多行文本展示功能 ([e97b2ea](https://github.com/nomui/nomui/commit/e97b2ea6efc62e9c6938f866f4cebd7990d09294))
* **Tree-tools:** tools可通过函数配置 ([5fac650](https://github.com/nomui/nomui/commit/5fac650978cd51730f6cc755770e2f069cf17a4e))
* **Tree:** node节点添加tools配置 ([bd991c7](https://github.com/nomui/nomui/commit/bd991c707b27b82602afef02d43eec83c2a5ef49))
* **Tree:** tools工具支持onClick事件返回 node和trees实例 ([2f2e884](https://github.com/nomui/nomui/commit/2f2e8845731dc19fd232f7f1bc5005a7339a8a34))


### Bug Fixes

* **Button:** 按钮外部设置的attrs被覆盖 ([dd007c2](https://github.com/nomui/nomui/commit/dd007c271a66fc624e039f097749471776665ec0))
* **Ellipsis:** 单词换行导致的省略展示失效 ([1a15187](https://github.com/nomui/nomui/commit/1a15187af07b6ee77b9724937304ce67b8f52077))
* **Ellipsis:** 将单词也换行 ([6e3c82b](https://github.com/nomui/nomui/commit/6e3c82b1195c9cb2a1b05610b728d892708c30ea))
* **Field:** 修复Field文档描述错误 ([168d753](https://github.com/nomui/nomui/commit/168d75385ed977b81c25c9236b7d9a0b3efb0065))
* NomUI文档页没有正确高亮的问题 ([ffa440a](https://github.com/nomui/nomui/commit/ffa440a79afad3493956cceddadb7b039b24525b))
* **Tree:** tools的样式展示 ([8643afd](https://github.com/nomui/nomui/commit/8643afd4fd21ad1f3a0696efa1a865a1dc128ee8))

## [1.0.0-alpha.43](https://github.com/nomui/nomui/compare/v1.0.0-alpha.42...v1.0.0-alpha.43) (2021-12-28)


### Bug Fixes

* **Gird-autoWidth:** td宽度不够时，操作文案换行 ([ec7bb99](https://github.com/nomui/nomui/commit/ec7bb9965da2fa5bdc06fd07b926bfe65fb8cdb7))
* **Grid-autoWidth:** 自动计算列宽的padding部分 ([db4f414](https://github.com/nomui/nomui/commit/db4f41416ca5b926befc270e135ec47d17e463f1))

## [1.0.0-alpha.42](https://github.com/nomui/nomui/compare/v1.0.0-alpha.41...v1.0.0-alpha.42) (2021-12-24)


### Features

* **Grid-autowidth:** 列根据子元素自动得出宽度 ([b276bb1](https://github.com/nomui/nomui/commit/b276bb1fa6d6484d1d9d143ea9ebc4e6a2588ef6))
* **Grid:** 添加列宽根据子元素自动计算得出功能 ([05fb483](https://github.com/nomui/nomui/commit/05fb483151bbb6a33f093f004be5bb68f2646b33))


### Bug Fixes

* **Gird-autoWidth:** 有自定义列按钮时，导致操作列宽度不够文字换行 ([6c02c12](https://github.com/nomui/nomui/commit/6c02c1275bae5bcd191365db764c22ec5f95537e))
* **Grid:** 固定列时的border展示问题 ([3770633](https://github.com/nomui/nomui/commit/3770633b1efc5e8fff169f8e645f903018d2292f))
* **Grid:** 兼容autoWidth和ellipsis ([14cf314](https://github.com/nomui/nomui/commit/14cf314b413b71a3681c4b94e73cacc127820629))
* **Grid:** 手动固定列应该忽略右侧已经固定的列 ([d5da1de](https://github.com/nomui/nomui/commit/d5da1de0837e7f71f5def3bb33beb4bbdcd8b3c0))
* **Grid:** 原始columns中的空对象没有正确被忽略掉 ([d312bad](https://github.com/nomui/nomui/commit/d312bad9b7b82ec4f7713dc726b4810c2e422342))
* **Grid:** autoWidth操作列文字按钮太少导致表头换行 ([d5660a8](https://github.com/nomui/nomui/commit/d5660a8de81def39ed3d3b254b384785804f59d1))
* **Toolbar:** 添加inline 配置 ([c4bb7d1](https://github.com/nomui/nomui/commit/c4bb7d1bf5363e3657bf3ee875e1db6943f1cd85))
* **TreeSelect:** 修复TreeSelect多选bug ([7e2fb04](https://github.com/nomui/nomui/commit/7e2fb04f5ac2dcc27ca1156e45da37d16fd52fe9))


### Docs

* **Grid-autoWidth:** autoWidth和width配置的优先级 ([10226e2](https://github.com/nomui/nomui/commit/10226e2527d274b7d284680dab592f6a379d89b7))
* **Grid:** 自动计算列宽title ([68b8281](https://github.com/nomui/nomui/commit/68b82818f18b91f47edaf995e150f9e928d94d54))

## [1.0.0-alpha.41](https://github.com/nomui/nomui/compare/v1.0.0-alpha.40...v1.0.0-alpha.41) (2021-12-17)


### Features

* **Gird-colwidth:** 实现列宽设置的本地存储 ([10e840c](https://github.com/nomui/nomui/commit/10e840c93c9af913ec1013be45da74b28a5c218e))
* **Gird-resizable:** 设置列宽缓存和总计行列宽兼容 ([786d46c](https://github.com/nomui/nomui/commit/786d46cd610affbc514d0437e75d8515567549cf))
* **Gird:** 添加尾部合计行 ([42c3529](https://github.com/nomui/nomui/commit/42c35292e61c6cef2d5374332ff83dec24be7150))
* **Grid-resizable:** 列设置和列宽设置的key都默认优先使用Grid的key ([9f1668e](https://github.com/nomui/nomui/commit/9f1668eff9c1b3d47bbc8ef16b2daa96015131c0))
* **Grid-summary:** 总计行和滚动的协同 ([5e47932](https://github.com/nomui/nomui/commit/5e4793217e3f771e0209e292f6c40e68ba31b93e))
* **Grid-summary:** 总计行和滚动等其他表格特性兼容 ([5c36d39](https://github.com/nomui/nomui/commit/5c36d3938b4dd9fc868627c1b62d2d06ac6a393c))
* **Grid:** 新增手动固定列功能 ([4a4c804](https://github.com/nomui/nomui/commit/4a4c8041cb6c3b18ab59d5cf627d2942a3f91589))
* **Grid:** 新增sortCacheable配置，缓存排序状态 ([1874ea0](https://github.com/nomui/nomui/commit/1874ea051eeddfea9b3594363183403555aa2efc))
* **Skeleton:** 新增骨架屏功能 ([26d397e](https://github.com/nomui/nomui/commit/26d397e6c594068bb1d042f7ed0a85e19d14d210))


### Bug Fixes

* **Gird-resizable:** 缓存的key不直接使用 Grid.porps.key ([e6f744e](https://github.com/nomui/nomui/commit/e6f744eb8e7975a02b88f22ccb0d75e859797009))
* **Gird-summary:** 变量名修改 ([24a2118](https://github.com/nomui/nomui/commit/24a211838f52c1143b808624641d91022921ffc5))
* **Grid-treeconfig:** 树表格 外部iupdate后导致数据错误 ([045313e](https://github.com/nomui/nomui/commit/045313ef7d55f3a4fcfc45598459fd7029f47fbb))
* **Grid:** 单词拼写错误 ([cac74e9](https://github.com/nomui/nomui/commit/cac74e922a3fd8cf2f6e729161009c4774579044))
* **Grid:** 将resizeCol函数抽离 ([b8e412d](https://github.com/nomui/nomui/commit/b8e412d9d82064416b822374d11748e88a6b21d1))
* **Grid:** 列设置面板高度自适应无效的问题 ([d677676](https://github.com/nomui/nomui/commit/d677676e0d1f15dbc770a6238b8fe6e8196f8f14))
* **style:** body设置了字体大小，导致Popup弹窗框内的文字换行 ([0b3d02f](https://github.com/nomui/nomui/commit/0b3d02f841f6cebe9e821d680502f02f4506e2b9))


### Docs

* 更新Skeleton文档 ([b2eb4eb](https://github.com/nomui/nomui/commit/b2eb4eb4c0aa00b1fe9c2d462cb82e71ca4e0eb5))
* **CheckboxList:** CheckboxList的文档补充 ([771ad45](https://github.com/nomui/nomui/commit/771ad4530beb0b3dadaa94e5f126447dd0d12811))
* **Field-rules:** 校验规则的文档补充 ([2666a40](https://github.com/nomui/nomui/commit/2666a40f1c73044912670ee989c7acd5f24d4698))
* **Grid:** cache属性的文档修改 ([2b40217](https://github.com/nomui/nomui/commit/2b40217c16e60a1c5f17546b2bb455c306965074))
* **RadioList:** RadioList 和 Switch 的文档补充 ([33930e6](https://github.com/nomui/nomui/commit/33930e6708ad949d6ab41e3c427bf7601d217b45))
* **Skeleton:** 完善示例以及文档 ([36d0443](https://github.com/nomui/nomui/commit/36d0443aa0832a9f919f6718a35cd7927dfc4dea))

## [1.0.0-alpha.40](https://github.com/nomui/nomui/compare/v1.0.0-alpha.39...v1.0.0-alpha.40) (2021-12-10)


### Features

* **DatePicker:** 添加minDate和minTime的联动示例 ([cfcaa8b](https://github.com/nomui/nomui/commit/cfcaa8b6b2fc0756e4e0e129f136dfee6cd1bc77))
* **Icon:** 添加 hospital 和 company的图标 ([27d719d](https://github.com/nomui/nomui/commit/27d719ddaedf4dadc03239383f67205d6bb891ae))


### Bug Fixes

* **DatePicker-TimePicker:** 添加日期选择器中时间部分的禁用的场景 ([643668b](https://github.com/nomui/nomui/commit/643668b58ca4d0258aa761e9ea6e57dab7fa7054))
* **DatePicker:** 当设置了 showTime且有默认值时，点开时输入框数据不对 ([bb2cd7e](https://github.com/nomui/nomui/commit/bb2cd7ef3eb8acf91d8f38575996c3481f92de0b))
* **DatePicker:** 日期选择器中对 minDate和showTime.minTime 之前的联动处理 ([0584c2a](https://github.com/nomui/nomui/commit/0584c2a8aa8c368b1082307be6ec78b949691b62))
* **Grid:** 优化sticky滚动条显示隐藏的逻辑 ([90134b2](https://github.com/nomui/nomui/commit/90134b2e58141323e9d2b0b4ea3853816e5c3515))
* **NumberSpiner:** input内部触发 blur的回调, 组件中添加对应的方法 ([8a9c41d](https://github.com/nomui/nomui/commit/8a9c41d305358174ba430cee549bbf57045e6f98))
* **TimePicker:** 补全timePicker的禁用场景 ([739c936](https://github.com/nomui/nomui/commit/739c93620fa8d98eb424fbd0074b93100f062806))


### Performance Improvements

* **Grid:** 优化滚动条显示隐藏逻辑 ([e62e4ab](https://github.com/nomui/nomui/commit/e62e4ab559213808ddbcd56a79946d2f8e558eea))
* **List:** 优化List虚拟列表与普通列表之间的转化支持 ([6afad20](https://github.com/nomui/nomui/commit/6afad209e5cb9fe531512e8779215dbb23c76101))
* **List:** 增加示例 ([2793e58](https://github.com/nomui/nomui/commit/2793e58a128dd7ace5d97136a5da64a9e6e58c74))

## [1.0.0-alpha.39](https://github.com/nomui/nomui/compare/v1.0.0-alpha.38...v1.0.0-alpha.39) (2021-12-03)


### Features

* **TreeSelect:** 树选择 搜索 ([ed964d7](https://github.com/nomui/nomui/commit/ed964d7d8adb2c484ca6fb1ab48cc0df5b29290d))
* **TreeSelect:** 支持搜索功能 ([d912069](https://github.com/nomui/nomui/commit/d912069525a7190c6695417161e517a9650ff0b2))
* **TreeSelect:** 支持搜索功能 ([77c2b60](https://github.com/nomui/nomui/commit/77c2b60b832642d646480356a45df577a80b9042))


### Bug Fixes

* **Grid:** 调整横向滚动条出现时机 ([878122c](https://github.com/nomui/nomui/commit/878122cc252cd7f35cbbbfc135090e958229944f))
* **Grid:** 调整Grid横向滚动条出现时机 ([a83d4b3](https://github.com/nomui/nomui/commit/a83d4b3d4a8289434ec2bf469c3b121023c26882))
* **line-height:** 行高统一设置为 [@line-height-base](https://github.com/line-height-base) ([64e0f31](https://github.com/nomui/nomui/commit/64e0f31da404575268fa7c55663fd9f5576d995a))
* **Notification:** align兼容旧配置 ([8c186a0](https://github.com/nomui/nomui/commit/8c186a0cb824ad9e2f7740e6185a6c8c807ca729))
* **Select:** Pager修改分页大小时，又主动调用了page的update，导致 select实例被更新，报错 ([7514456](https://github.com/nomui/nomui/commit/7514456e52bda93b4af718072a4ddcc611b597e8))
* **style:** 统一各个field的高度计算展示 ([f460846](https://github.com/nomui/nomui/commit/f4608465ed70b2e86fb7e7fff87fe4ca2d306107))
* **Tree:** 多选 cascadeCheckChildren 和 cascadeCheckParent冲突的问题 ([2892aca](https://github.com/nomui/nomui/commit/2892aca1eb55f81b133288428c0f361509a256f0))
* **TreeSelect:** 修改 nodeCheckable和selectable的优先级 ([9dcc062](https://github.com/nomui/nomui/commit/9dcc062c498777bede323c68428c512908eab458))
* **TreeSelect:** setValue后, 多选popup的内容不更新 ([b6045ba](https://github.com/nomui/nomui/commit/b6045ba0992a178f1febc983a7118e4c3bcb1925))


### Docs

* **TreeSelect, Tree:** 补充文档 ([f714fb6](https://github.com/nomui/nomui/commit/f714fb6c29cf431346c4c5bc6c4d4acd4de9178a))
* **TreeSelect:** 多选的demo修改 ([d017cb8](https://github.com/nomui/nomui/commit/d017cb802f499bea6f56f8209dc5f8da9166a8b0))
* **TreeSelect:** 添加searchable 的文档 ([4870c39](https://github.com/nomui/nomui/commit/4870c3959c96126cb5d0d16dbc6867177438169c))

## [1.0.0-alpha.38](https://github.com/nomui/nomui/compare/v1.0.0-alpha.37...v1.0.0-alpha.38) (2021-11-26)


### Features

* **Component:** 基类将props作为_update的参数，通知到每个组件中 ([e485b68](https://github.com/nomui/nomui/commit/e485b68df57bc791cdaa441c54695a131427475a))
* **Menu-selectable:** 是否选中配置，添加onlyleaf配置 ([fbb3c9d](https://github.com/nomui/nomui/commit/fbb3c9d052e5210132b671cbdfda2b8cd7b5d596))
* **Numberbox:** 添加onBlur方法 ([14d59d4](https://github.com/nomui/nomui/commit/14d59d45c5878c5e61949fe306e80197aa656b77))


### Bug Fixes

* **Field:** 当field被销毁时, 定时器报错 ([0a62935](https://github.com/nomui/nomui/commit/0a62935839101d292a6664b8958c157485b9ccc5))
* **Grid:** 开启列设置，外部更新 columns时，展示错误 ([b4f292b](https://github.com/nomui/nomui/commit/b4f292be520a8e34c9ff41db58e671ae25594403))
* **Grid:** 支持级联特性 ([d3c2ea3](https://github.com/nomui/nomui/commit/d3c2ea3279ee91330a2d4ff9088020ddee15fbcc))
* **Menu:**  Selectable.byClick 默认改为false ([f83fdbd](https://github.com/nomui/nomui/commit/f83fdbd7ee11aaf32124e89e6004e2cbd7cf61c8))
* **Menu-uistyle:** pill模式下，子menuItem被选中无样式 ([86166e9](https://github.com/nomui/nomui/commit/86166e9a604f00d775c596fd6388e453c2e08894))
* **Menu:** 菜单的默认展开配置 initExpandLevel ([35e821b](https://github.com/nomui/nomui/commit/35e821bedd1aa724607cbf686fefecf0091b5389))
* **Numberbox:** 当setValue(null) 时，会展示出undefined ([d11cafb](https://github.com/nomui/nomui/commit/d11cafbc4680682686a26aa1764802af3a9201d3))
* **Numberbox:** 去掉自身的onBlur方法，从textbox中有继承 ([36ac121](https://github.com/nomui/nomui/commit/36ac1214f624515a663583a0a7baf0f64815123e))
* **Select:** 多选模式下删除最后一项数据报错问题 ([ffc270d](https://github.com/nomui/nomui/commit/ffc270daf930e17ceab1bf007e764e830a38df5c))
* **TextBox:** 低版本浏览器不支持trimStart, 需使用trimLeft ([8c91e73](https://github.com/nomui/nomui/commit/8c91e7389441805ee4a5ae94a1bf352987995caa))
* **Tree:** 删除使用 leafOnly 的代码 ([9a6e7a7](https://github.com/nomui/nomui/commit/9a6e7a7271b0ce93bebdc3600567c31dbbf2ee0c))


### Docs

* **Menu:** 菜单的文档-methods部分 ([8eea3a2](https://github.com/nomui/nomui/commit/8eea3a2733fc0501606d63c19dde3364ca5fdd52))
* **Menu:** 菜单的文档补充 ([63ab713](https://github.com/nomui/nomui/commit/63ab71318b8cafd8674623695c5ff480a501f0ff))

## [1.0.0-alpha.37](https://github.com/nomui/nomui/compare/v1.0.0-alpha.36...v1.0.0-alpha.37) (2021-11-19)


### Features

* **Anchor:** 添加默认高亮某个锚点的功能 ([cc3d7ee](https://github.com/nomui/nomui/commit/cc3d7ee8a4ccb30a7769b5be16d8d6552f199d53))
* **Anchor:** 新增默认滚动到某个锚点位置 ([68b60a7](https://github.com/nomui/nomui/commit/68b60a7aa056d76dbe4a9abf5d62ea17421774c5))
* **Group:** setValue添加 ignoreFiels配置, 支持特定属性的不更新 ([8d6a825](https://github.com/nomui/nomui/commit/8d6a82510e836c3fccf0dc8253267aa485082ec6))
* **Select:** 支持额外options列表 ([97af3a1](https://github.com/nomui/nomui/commit/97af3a17b526ba142753287957feb3bc677d2275))
* **TextBox:** 添加trimValue配置，支持去除首尾空格 ([6794a86](https://github.com/nomui/nomui/commit/6794a863eb9b1a4bcaa9eb41952d43545b25e404))
* Tree树组件初始化也能自动感应全选状态 ([a6bc62d](https://github.com/nomui/nomui/commit/a6bc62de1b13dfae386ebaa459685d960aece6e4))
* Tree组件以及CheckboxTree组件支持勾选所有子节点和自动感应全选 ([c9bfcce](https://github.com/nomui/nomui/commit/c9bfcce205de9606452b6a2dd4c8d38c88f29c26))
* TreeSelect下拉树选择组件扩展fit滚动条功能 ([219316b](https://github.com/nomui/nomui/commit/219316b6bb52af730ee84e0401c36e823cea9f76))


### Bug Fixes

* 修复Uploader表单验证 ([d89b1f3](https://github.com/nomui/nomui/commit/d89b1f35b771e160060cf1835a8cb501489cf519))
* 修复Uploader组件编译报错的bug ([f3c0b2b](https://github.com/nomui/nomui/commit/f3c0b2bd5f85ae555143cc9607a4045135134e08))
* **AutoComplete:** 无值时则不展示删除图标 ([ad2c355](https://github.com/nomui/nomui/commit/ad2c355994ad0df23e43681303458be97c6a3bf0))
* **Component:** 解决某些情况_remove报错问题 ([0f6c3b0](https://github.com/nomui/nomui/commit/0f6c3b0393f016e283c87529d89b0127feeefe37))
* **Field:** 修复上下模式的Field内容宽度问题 ([c6acf37](https://github.com/nomui/nomui/commit/c6acf370979670ee7a2cd2ef94456b7b19b6edeb))
* **Gird-frozenHeader:** 配置固定表头时，列的不对齐问题 ([19aaee5](https://github.com/nomui/nomui/commit/19aaee55bbdd1196e9e4c261f6f22750f05ac12c))
* **Grid-empty-scroll:** 无数据时自动滚动到中间位置，计算方式改变 ([1e7de26](https://github.com/nomui/nomui/commit/1e7de262ebbf18d6a8c8908dcfa49d608be3488a))
* **Grid:** 表格列设置的保存按钮，设置为primary类型 ([d3d215d](https://github.com/nomui/nomui/commit/d3d215d469d4a92db26c06c815d1e4fba635c590))
* **Grid:** 修复Grid组件，在平面数据下父子数据排序打乱情况下，父子节点显示不正常的bug ([38120d5](https://github.com/nomui/nomui/commit/38120d52e17126acddb8828f84d5d9f6bb5db417))
* **GroupGrid:** 解决父组件校验时重复触发 Tr的validate的问题 ([ccf110e](https://github.com/nomui/nomui/commit/ccf110e4b52450b9629f1b960a8bcdc851c6e18e))
* **Select:** options有重复key时，添加wran提示，占位文案的展示根据getOption方法判断 ([d524a63](https://github.com/nomui/nomui/commit/d524a635a1f101bd84c7d0b55cb17065dede112b))
* **Textbox-trimvalue:** 单纯使用 trim 方法无法去除 \t 制表符 ([823e9fd](https://github.com/nomui/nomui/commit/823e9fdab64af6c26d99a8b1870fbd6cdb7af4ce))
* **Tree:** 修复Tree树组件，在平面数据下父子数据排序打乱情况下，父子节点显示不正常的bug ([5811737](https://github.com/nomui/nomui/commit/58117374088a54c97fe86aa0914e04d613e362e5))
* **Uploader:** 修复Uploader中按钮attrs不生效的bug ([ae6f23b](https://github.com/nomui/nomui/commit/ae6f23bd0a4d27986e04438e20a8e14cd7c27e6f))
* **Uploader:** 修复Uploader中按钮attrs不生效的bug ([7de5bff](https://github.com/nomui/nomui/commit/7de5bff7259f5d4765241314671fd0d080f5bc9c))
* **Uploader:** 修复Uploader中按钮attrs不生效的bug ([476856e](https://github.com/nomui/nomui/commit/476856e37c9acc333967be76511529e1136e7930))
* **Utils:** formatDate方法不支持yyyy/MM/dd格式问题 ([701b6af](https://github.com/nomui/nomui/commit/701b6af92b78c940c29a9fa4583ecdf2672a0049))


### Performance Improvements

* TreeSelect下拉树选择组件显示框固定高度范围 ([2c4d35f](https://github.com/nomui/nomui/commit/2c4d35f4e05c9583b1b476776e8cced54a925d93))
* TreeSelect下拉树选择组件显示框固定高度范围 ([d2219a7](https://github.com/nomui/nomui/commit/d2219a7817dd885c8f79351063e53be7265f1cf4))


### Docs

* **Tooltip:** 提供自定义配置的案例 ([99b671c](https://github.com/nomui/nomui/commit/99b671cc28f3c1cbc465c1956eeab899f30d4acb))

## [1.0.0-alpha.36](https://github.com/nomui/nomui/compare/v1.0.0-alpha.35...v1.0.0-alpha.36) (2021-11-05)


### Features

* **Cascader:** 文本溢出省略 ([f78c930](https://github.com/nomui/nomui/commit/f78c9305d2b7bc29722ad3536c47b739d527ee3b))
* **Cascader:** 新增高宽配置，并自动处理文字溢出省略 ([06aac2d](https://github.com/nomui/nomui/commit/06aac2db408c037f837dc8360d38f0a3fa27a42d))
* **color:** 修改颜色部分使用 css3的 var变量引用，方便扩展和修改 ([2cabf38](https://github.com/nomui/nomui/commit/2cabf38c5bfccac942133c8ce4a029c10a4b8259))


### Bug Fixes

* 修复Breadcrumb面包屑样式bug ([b582188](https://github.com/nomui/nomui/commit/b5821880cdc87bc3fd64b46dab33be591f29f6c0))
* 修复Cascader弹框选项右边箭头图标样式bug ([3c3a793](https://github.com/nomui/nomui/commit/3c3a793f9971608b51dc8717c1b2b0a24151c3cf))
* 修复Cascader示例的小bug ([df02c2b](https://github.com/nomui/nomui/commit/df02c2b4c2884845549a2aeaf295bcd83db719a2))
* **Cascader:** 修复Cascader在非单页应用中页面滑动bug ([a49c5be](https://github.com/nomui/nomui/commit/a49c5bee471c1a6fb14d4ea44a6c6f51c3ba3d7b))
* **Loading:** 修复当 container 为非 nomui 组件时添加移除 nom-loading-container 样式类的 bug。 ([fa1f432](https://github.com/nomui/nomui/commit/fa1f43248c1c308cc733387a3a342c9f5a7ee9bb))
* **position:** 修复position在非单页应用中定位计算问题 ([d8aba4f](https://github.com/nomui/nomui/commit/d8aba4f92ab47952d896f24676241c3a1f079a94))
* **Select:** 实例被更新后，导致optionList被销毁，无法正确赋值 ([763fd71](https://github.com/nomui/nomui/commit/763fd71770be7c941db1d13fd6985f9c0b96ad4c))


### Docs

* **Select:** 完善示例 ([246a7bf](https://github.com/nomui/nomui/commit/246a7bfab48241e50693e21ba1a07bf17843e4bc))

## [1.0.0-alpha.35](https://github.com/nomui/nomui/compare/v1.0.0-alpha.34...v1.0.0-alpha.35) (2021-10-29)


### Features

* **Grid-checkbox:** rowCheckable添加checkboxRender配置，函数返回该复选框的props属性 ([53076f4](https://github.com/nomui/nomui/commit/53076f49e80fb8b92a8158d78779add5e8116b1c))
* **Grid-row-checkable-render:** 示例和优化 ([e6844ed](https://github.com/nomui/nomui/commit/e6844edf54272da5a50c40fb0e54f158a45ad691))
* **GroupList:** 支持禁用 ([4fad812](https://github.com/nomui/nomui/commit/4fad8127e6b6bfb5b0376f4f1503b5803a11dc4e))
* **MaskInfoField:** 添加信息打码组件继承至Field，获得Field对应的方法 ([583cb0b](https://github.com/nomui/nomui/commit/583cb0b61f1d75ed40c90177810a9cc6989c9a95))
* **MultilineTextbox:** 支持onBlur事件 ([3aff1b6](https://github.com/nomui/nomui/commit/3aff1b65c89ebc5af2f5ba7e0633569515feaf9f))
* **Swtich:** 支持禁用 ([a64a6c1](https://github.com/nomui/nomui/commit/a64a6c17d1ee1308157abed8bfdf40cf6763b2af))
* **Tree:** nodeCheckable 的 cascadeCheckParent 和 cascadeUncheckChildren 生效 ([7ea7072](https://github.com/nomui/nomui/commit/7ea7072fdc86a0a9c50ba5bbe62a55e6dae9ea3e))
* **TreeSelect:** 添加只能选择叶子节点 onlyleaf的配置 ([f9164ff](https://github.com/nomui/nomui/commit/f9164ff0a4bb64a0c06bf665d60ba0682dbc3e7a))
* **Uploader:** 完善文件类型限制 ([8a77f3c](https://github.com/nomui/nomui/commit/8a77f3cf1ac3df521f330e686d82799b72cf4730))
* **Uploader:** 优化文件上传类型限制功能 ([674df61](https://github.com/nomui/nomui/commit/674df61e757b14278b73367c8df82a94e747b68c))


### Bug Fixes

* **Field:** 某些Field组件内部文字太长溢出的问题 ([d2d4344](https://github.com/nomui/nomui/commit/d2d4344e82df8ee1cee55828666fc1c56a27eb76))
* **Field:** 内容过长的时候content被撑开的问题 ([9a5341d](https://github.com/nomui/nomui/commit/9a5341d7c31b227eb209d8335c186bcf1411d824))
* **Field:** 校验提示不显示的问题 ([a035881](https://github.com/nomui/nomui/commit/a035881a172848ed743e20124d84018bec5fa29c))
* **Field:** flex内容过长撑开的问题 ([bef7686](https://github.com/nomui/nomui/commit/bef768630674d7c4aae42800fc73019d775e63f3))
* **Grid:** originColumns不能正确保存cellRender ([74dacd4](https://github.com/nomui/nomui/commit/74dacd4146811c813a1c69add528dfd7be00d8e0))
* **Select:** 选中时因为placeholder未即时清除造成的抖动 ([f008db2](https://github.com/nomui/nomui/commit/f008db226bcce09e833011308904da4c320b5a35))
* **Select:** 隐藏placeholder前添加判断 ([b8b95ea](https://github.com/nomui/nomui/commit/b8b95ea39c84d6b9e4cfece20d7bf1b962723eb5))
* **Select:** 有默认值的时候不能点X清空以及赋值问题 ([4f175ce](https://github.com/nomui/nomui/commit/4f175ce6656057999ea1ea0d3e136d609aa0bff4))
* **TreeSelect:** 编辑表单时，获取其value时为undefined的bug ([fe50472](https://github.com/nomui/nomui/commit/fe504729c5271e21262643dfc218204039bd2c88))
* **TreeSelect:** 弹窗框的宽度和padding ([97cf5c3](https://github.com/nomui/nomui/commit/97cf5c345dfe580163412feed4ac8adc1b84abcb))
* **TreeSelect:** 级联取消子节点关闭时，导致获取勾选节点有误 ([9c80c3a](https://github.com/nomui/nomui/commit/9c80c3aae8d6601abab248da25dc9284fe1a7a2f))


### Docs

* **Grid-row-checkable-render:** 文档内容补充 ([bc0b5aa](https://github.com/nomui/nomui/commit/bc0b5aaf0ee7690558e9a6629059fdf6427097ea))
* **TreeSelect:** 文档补充onlyleaf ([f434c68](https://github.com/nomui/nomui/commit/f434c688159ef12b513240859a7ef6615ae24fca))
* **Uploader:** 添加案例 ([786d8a3](https://github.com/nomui/nomui/commit/786d8a320878a07df4abe9323e5c999811dc7f13))

## [1.0.0-alpha.34](https://github.com/nomui/nomui/compare/v1.0.0-alpha.33...v1.0.0-alpha.34) (2021-10-22)


### Features

* **Flex:** 实现行布局换行 ([fb3637d](https://github.com/nomui/nomui/commit/fb3637dd0d04bb92f0eef8ecfe97605c5ab7455d))
* **Grid:** 支持配置 flatData 来实现treeGrid 的扁平数据传入 ([37ff25c](https://github.com/nomui/nomui/commit/37ff25c6d03a9c5763c02f33a98e5d55fcb8c9f3))
* **Menu:** 新增 uistyle：short-menu，当前只在 direction 为 horizontal 时有效 ([143432a](https://github.com/nomui/nomui/commit/143432a9ff96fb7fd02f714fa4423d59d7617178))
* **Select:** 多选时支持点击 icon删除已选中的选项，无需打开列表 ([5bb1cb2](https://github.com/nomui/nomui/commit/5bb1cb2e63cf591bd86c0fe2494b663e559331a6))
* **Tree:** 添加expandTo, 展开特定节点的方法，完善tree组建的文档 ([860cbbd](https://github.com/nomui/nomui/commit/860cbbdc26ab8b31cf02c73367cfe3c001e14d93))


### Bug Fixes

* **DatePicker:** 禁用状态下不再显示清空按钮 ([31c3fdd](https://github.com/nomui/nomui/commit/31c3fdd332340bd0bb17e60941a1555619e469d9))
* **Gird-scrollbar:** Gird未设置 sticky时，则无 scrollbar ([b2f7bfc](https://github.com/nomui/nomui/commit/b2f7bfc3b30365faa126fae74a88f235ff3ee82c))
* **Tree:** 展开特定节点，修改实现方式，通过调用expand方法，而不是 trigger('click') 实现 ([0505836](https://github.com/nomui/nomui/commit/050583625e80c431f33578214cd968f628f6b0b4))
* **TreeSelect:** 将options的数据存成map，优化选取之后的遍历算法 ([5f8ca3c](https://github.com/nomui/nomui/commit/5f8ca3cf763628bdb79aa1216330cfe07666b890))
* **TreeSelect:** 设置flatOption: true时，popup的更新会导致重复执行flagData操作 ([e108867](https://github.com/nomui/nomui/commit/e1088670fd34eae3e15167238367ba01034659ef))
* **TreeSelect:** 修复异步获取option的bug, 数据转换放至config中 ([230aebd](https://github.com/nomui/nomui/commit/230aebdbabd6e65816677db2c31e47fb38dc7afc))
* **TreeSelect:** 修改TreeSelect无法被选中的bug ([9d69b4d](https://github.com/nomui/nomui/commit/9d69b4d9924912c50ddc27bea9fc3f57a631a7a2))


### Docs

* **Grid, Tree:** flatData的字段文档补充 ([e3eed32](https://github.com/nomui/nomui/commit/e3eed3243f314f2469d4fedbb0a19daa17710fb0))

## [1.0.0-alpha.33](https://github.com/nomui/nomui/compare/v1.0.0-alpha.32...v1.0.0-alpha.33) (2021-10-15)


### Features

* **Grid:** 表格数据为空时，默认scroll滚动至中间位置 ([ceeff96](https://github.com/nomui/nomui/commit/ceeff9601b45b85ce56c3d6736d37ef7be6d0c19))
* **Numberbox:** 添加校验规则，支持逗号分隔符的小数形式 ([d253a2c](https://github.com/nomui/nomui/commit/d253a2cbc381270510a6239ba479dca12a8ccbd4))


### Bug Fixes

* 解决Cascader代码冲突 ([7174677](https://github.com/nomui/nomui/commit/71746778a44ae1e4efc1c673ddab6933b3244ae0))
* 修复bug[#444](https://github.com/nomui/nomui/issues/444) ([161fc1e](https://github.com/nomui/nomui/commit/161fc1e3dff38fe4f0a259c5b308ff1edb83daac))
* 修复Cascader组件Clear功能未能清除的问题 ([b97057d](https://github.com/nomui/nomui/commit/b97057d6bbfdecc23226a415a57b1ae85957cc79))
* 修复Cascader组件clear时内容未被清除的bug ([a4a2a8a](https://github.com/nomui/nomui/commit/a4a2a8a22233d88f6c594135e6bac600e56a1bf1))
* **Gird-Td:** 自定义渲染时，以#开头不将children处理为title ([890dd5b](https://github.com/nomui/nomui/commit/890dd5bf4d49b0b238b6f5f02e24d24df920e473))
* **Gird:** 后端排序后，表格自动回到之前的滚动位置 ([e2880ee](https://github.com/nomui/nomui/commit/e2880ee085fb89a108db4b70819f1516c85d47b1))
* **Gird:** 修改表格自动scroll的变量名，更加语义化 ([26916f9](https://github.com/nomui/nomui/commit/26916f950e256a51736de2990bfcadaf41af53c8))
* **Gird:** 自动滚动的判断 ([6de8e4d](https://github.com/nomui/nomui/commit/6de8e4d15507f8cfc09888fbb273ea2e14beb6a3))
* **Grid-Scrollbar:** Gridbody和sticky的滚动条的对其不一致的问题 ([392ea94](https://github.com/nomui/nomui/commit/392ea94ae5dd5bff2ea6206232f79eb938a8604b))
* **Grid-sort:** 点击排序后滚动至上次位置，兼容异步请求回的更新 ([9c0ed99](https://github.com/nomui/nomui/commit/9c0ed99604f11be0b3a1d5049f750c7c54e28e47))
* **Grid-Td:** 修改了Td的层级结构，导致设置ellipsis时的title无效了 ([42fb145](https://github.com/nomui/nomui/commit/42fb14547504bf5faaf390f455cfebd874d8e633))
* **Numberbox:** 使用replace 替换replaceAll 来保证兼容性 ([0adb883](https://github.com/nomui/nomui/commit/0adb883d9eb14e168ca14bba9ff16cac50916bc9))
* **Utils:** 解决utils.parseToQuery方法报错的问题 ([d5e2250](https://github.com/nomui/nomui/commit/d5e225044c8cb13f1f9c3e7fa3c324755b2e2a9c))


### Docs

* **Collapse:** 新增文档 ([da66ea8](https://github.com/nomui/nomui/commit/da66ea8a9652a8b804a8bc7d9879c3af186c4674))

## [1.0.0-alpha.32](https://github.com/nomui/nomui/compare/v1.0.0-alpha.31...v1.0.0-alpha.32) (2021-09-30)


### Bug Fixes

* **Gird:**  在点击列排序后，Tr重新渲染两次导致定时器中的this为空的处理 ([18d83f5](https://github.com/nomui/nomui/commit/18d83f55f6eb23e2b7eb8f2fa41628c564c5bbc1))
* **Grid:** 修复设置了ellipsis时，冻结列的伪元素未展示的bug ([feaa1ab](https://github.com/nomui/nomui/commit/feaa1ab3b2e880562458b4e1b26f1cff55a77f4e))
* **TheadTr:** 去掉滚动条占位 tr的代码 ([ece50e2](https://github.com/nomui/nomui/commit/ece50e24e15dc37d4f1838d722e47b7d64d986d0))

## [1.0.0-alpha.31](https://github.com/nomui/nomui/compare/v1.0.0-alpha.30...v1.0.0-alpha.31) (2021-09-24)


### Features

* **GroupList:** 右边操作区支持自定义渲染 ([aeacaa5](https://github.com/nomui/nomui/commit/aeacaa5b0f8f7822fa602dbe3408cd5ff793aafb))
* **Menu:** compact模式新增自动选中以及展开功能 ([ee19237](https://github.com/nomui/nomui/commit/ee192376cd4e30d73ccc2115ae3cf50af2c5e889))


### Bug Fixes

* **Button:** 修复超链接在表格省略模式下显示异常 ([5c710c8](https://github.com/nomui/nomui/commit/5c710c8bace20177c836a3ba2a562cf7590260c0))
* **Field校验:** Cascader和TreeSelect的content字段修改名称，content用于Field的 tooptip的校验，不能重名 ([642542c](https://github.com/nomui/nomui/commit/642542cc0ac89f801f3f53807913b10acc0a3ffa))
* **Grid:** 修复treeConfig.childrenField无效的问题 ([55c11f8](https://github.com/nomui/nomui/commit/55c11f887f5e38f5baa9a4d8c76035bd1af45a32))
* **GroupGrid:** 修复首行tr校验信息被遮挡的问题 ([303bac2](https://github.com/nomui/nomui/commit/303bac2622b31a16a19894f19741a291be6793d5))
* **rule-manager:** 校验rules时，func类型的不顾虑empty的值 ([bf8bd87](https://github.com/nomui/nomui/commit/bf8bd877a10387ab5405825520ecb45d8b7267d0))
* **Table:** 去掉设置 border-spacing的部分 ([b7bb5e0](https://github.com/nomui/nomui/commit/b7bb5e085b548af2b3b11fa4060a2139a68b5dae))
* **Table:** 设置frozenCols冻结列时，展示bug ([c8890b6](https://github.com/nomui/nomui/commit/c8890b62c7271e85a17050b53e85005abc8216bd))
* **TreeSelect:** 修改getValue的取值方式，在选择时触发onValueChange ([3477554](https://github.com/nomui/nomui/commit/3477554da20dac392a02cc7975e024882351e0d4))

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
