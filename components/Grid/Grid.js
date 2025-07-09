import Component from '../Component/index'
import Loading from '../Loading/index'
import ExpandedTr from '../Table/ExpandedTr'
import {
  STORAGE_KEY_GRID_COLS_FIXED,
  STORAGE_KEY_GRID_COLS_WIDTH,
  STORAGE_KEY_GRID_COLUMNS,
} from '../util/constant'
import {
  ascCompare,
  defaultSortableOndrop,
  extend,
  isBrowerSupportSticky,
  isFunction,
  isNullish,
  isNumeric,
  isPlainObject,
  isString,
  localeCompareString,
} from '../util/index'
import ExpandIndicator from './expandIndicator'
import GridBody from './GridBody'
import GridFooter from './GridFooter'
import GridHeader from './GridHeader'
import GridSettingPopup from './GridSettingPopup'

class Grid extends Component {
  constructor(props, ...mixins) {
    Grid._loopSetValue(props.treeConfig, [
      'cascadeCheckParent',
      'cascadeCheckChildren',
      'cascadeUncheckParent',
      'cascadeUncheckChildren',
    ])
    super(Component.extendProps(Grid.defaults, props), ...mixins)
  }

  _created() {
    this.minWidth = 0
    this.lastSortField = null
    this._alreadyProcessedFlat = false
    this.rowsRefs = {}
    this.checkedRowRefs = {}
    this.partCheckedRowRefs = {}
    this._shouldAutoScroll = true
    this._customColumnFlag = false // 是否已经自定义处理过列
    this._pinColumnFlag = false // 是否已经处理过列缓存

    this._defaultData = extend([], this.props.data)

    this.props.columns = this.props.columns.filter((n) => {
      return Object.keys(n).length
    })
    this.pinColumns = []
    this.originColumns = [...this.props.columns]
    this._needSortColumnsFlag = true // 是否需要对列进行排序

    this.sortUpdated = false

    this.filter = {}
    this.filterValueText = {}
    this._resetFixCount()

    this.pageIndex = 1

    this.modifiedRowKeys = []
    this.addedRowKeys = []
    this.removedRowKeys = []
    this.removedRowData = []

    if (this.props.frozenLeftCols > 0) {
      this.props.rowCheckable &&
        !this.props.rowCheckable.checkboxOnNodeColumn &&
        this.props.frozenLeftCols++
      this.props.rowExpandable && this.props.frozenLeftCols++
    }
  }

  _update(props) {
    // 外部 update了columns, 需要重新计算得到
    if (props.columns) {
      const c = props.columns.filter((n) => {
        return Object.keys(n)
      })
      this._customColumnFlag = false
      this._pinColumnFlag = false
      this._needSortColumnsFlag = true
      this.originColumns = [...c]
    }
    // 更新了data
    if (props.data && this.props) {
      this.pageIndex = 1
      const { treeConfig } = this.props
      // data更新, flatData需要重新组装成Tree结构
      if (treeConfig && treeConfig.flatData) {
        this._alreadyProcessedFlat = false
      }
      // 重置modifiedRowKeys
      this._resetChangeCache()
      this._defaultData = extend([], props.data)
    }
    if (
      (props.hasOwnProperty('rowCheckable') && !props.rowCheckable.checkboxOnNodeColumn) ||
      props.hasOwnProperty('rowExpandable')
    ) {
      this._resetFixCount()
    }
  }

  _resetFixCount() {
    this._fixedCount = 0
    this.props.rowCheckable && !this.props.rowCheckable.checkboxOnNodeColumn && this._fixedCount++
    this.props.rowExpandable && this._fixedCount++
  }

  _config() {
    this.nodeList = {}

    if (this.props.lazyLoadLimit && this.props.lazyLoadLimit > 0) {
      const current = this.props.data.slice(0, this.props.lazyLoadLimit)
      this._storedData = this.props.data.slice(this.props.lazyLoadLimit)
      this.props.data = current
    }

    if (this.props.frozenLeftCols || this.props.frozenRightCols) {
      this.props.forceSort = true
    }

    // 切换分页 data数据更新时 此两项不重置会导致check表现出错
    this.rowsRefs = {}
    this.checkedRowRefs = {}
    this._propStyleClasses = ['bordered']
    if (this.props.ellipsis === true) {
      this.props.ellipsis = 'both'
    }

    // 同时配置excelMode和editable时, editable视为无效
    if (this.props.excelMode && this.props.editable) {
      this.props.editable = false
    }

    this._processData()
    // 更新列的排序部分内容
    this.checkSortInfo()

    this._processColumns()

    this._calcMinWidth()

    const { line, rowDefaults, scrollbarWidth } = this.props
    if (!scrollbarWidth || !isNumeric(scrollbarWidth)) {
      this.props.scrollbarWidth = this._getScrollbarWidth() || 8
    }
    this.setProps({
      classes: {
        'm-frozen-header': this.props.frozenHeader,
        'm-with-setting': !!this.props.columnsCustomizable,
        'm-excel-mode': !!this.props.excelMode,
        'm-editable': !!this.props.editable,
      },
      children: [
        {
          ref: (c) => {
            this.settingContainer = c
          },
          classes: {
            'nom-grid-setting': true,
            [`p-line-${this.props.line}`]: true,
          },
          renderIf: !!this.props.columnsCustomizable,
          children: {
            component: 'Button',
            ref: (c) => {
              this.settingBtn = c
            },
            icon: 'setting',
            size: 'small',
            type: 'text',
            classes: {
              'nom-grid-setting-btn': true,
            },
            attrs: {
              title: this.props.columnSettingText,
            },
            onClick: () => {
              this.showSetting()
            },
          },
        },
        this.props.header !== false && { component: GridHeader, line: line },
        { component: GridBody, line: line, rowDefaults: rowDefaults },
        this.props.summary && { component: GridFooter, line: line },
      ],
    })
  }

  _processData() {
    const { treeConfig } = this.props

    // 还未处理过 flatData
    if (treeConfig && treeConfig.flatData && !this._alreadyProcessedFlat) {
      this.setProps({
        data: this._setTreeGridData(this.props.data),
      })
      this._alreadyProcessedFlat = true
    }
  }

  // 列部分的各种处理
  _processColumns() {
    this._processColumnsCustom()
    this._processPinColumn()
    this._processColumnSort()
    this._processCheckableColumn()
    this._processExpandableColumn()
    this._processFrozenColumn()
  }

  _processPinColumn() {
    const { columnFrozenable } = this.props
    if (this._pinColumnFlag || !columnFrozenable || !columnFrozenable.cache) return
    this._gridColumsFixedStoreKey = this._getStoreKey(true, STORAGE_KEY_GRID_COLS_FIXED)
    if (!this._gridColumsFixedStoreKey) return

    // 读取缓存中的上一次固定列的配置
    let storeFields = localStorage.getItem(this._gridColumsFixedStoreKey)
    if (storeFields && storeFields.length) {
      storeFields = JSON.parse(storeFields)

      // 从columns 二次过滤storeFields存在的列
      this.pinColumns = this._getColsFromFields(this.props.columns, storeFields, false)

      this.setProps({
        frozenLeftCols: this.pinColumns.length ? this._fixedCount + this.pinColumns.length : 0,
      })
      this._pinColumnFlag = true
    }
  }

  _getScrollbarWidth() {
    const outer = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'

    document.body.appendChild(outer)

    // 获取滚动条的宽度
    const scrollbarWidth = outer.offsetWidth - outer.clientWidth

    document.body.removeChild(outer)

    return scrollbarWidth
  }

  _sortColumnsOrder(arr) {
    arr.sort((curr, next) => {
      if (next.customizable === false) return -1
      return 0
    })
    return arr
  }

  // 根据缓存，对originColumns和 columns排序
  _processColumnSort() {
    if (this._needSortColumnsFlag) {
      let customFields = localStorage.getItem(this._gridColumsStoreKey)
      let fixedFields = localStorage.getItem(this._gridColumsFixedStoreKey)
      customFields = JSON.parse(customFields)
      // 无缓存则读取内存中 pinColumns的值做排序
      fixedFields = JSON.parse(fixedFields) || this.pinColumns.map((item) => item.field)

      this._sortColumnsFromFields(this.originColumns, customFields)
      this._sortColumnsFromFields(this.originColumns, fixedFields)
      this._sortColumnsFromFields(this.props.columns, customFields)
      this._sortColumnsFromFields(this.props.columns, fixedFields)

      this._needSortColumnsFlag = false
    }
  }

  _processFrozenColumn() {
    this._parseBrowerVersion()

    const { frozenLeftCols, frozenRightCols } = this.props

    if (frozenLeftCols !== null || frozenRightCols !== null) {
      const rev = this.props.columns.length - frozenRightCols

      const c = this.props.columns.map(function (n, i, arr) {
        if (i + 1 <= frozenLeftCols) {
          return {
            ...n,
            fixed: 'left',
            lastLeft: i + 1 === frozenLeftCols ? true : null,
          }
        }

        if (i >= rev) {
          return {
            ...n,
            fixed: 'right',
            firstRight: i === rev ? true : null,
            lastRight: i === arr.length - 1 ? true : null,
          }
        }

        return { ...n, fixed: null, lastLeft: null, firstRight: null, lastRight: null }
      })

      this.setProps({ columns: c })
    }
  }

  _setTreeGridData(arr) {
    const { keyField } = this.props
    const { parentField, childrenField } = this.props.treeConfig

    if (!keyField || keyField === '' || !arr) return []
    //  删除所有 childrenField,以防止多次调用
    arr.forEach(function (item) {
      delete item[childrenField]
    })
    const map = {} // 构建map
    arr.forEach((i) => {
      map[i[keyField]] = i // 构建以keyField为键 当前数据为值
    })

    const treeData = []
    arr.forEach((child) => {
      const mapItem = map[child[parentField]] // 判断当前数据的parentField是否存在map中

      if (mapItem) {
        // 存在则表示当前数据不是最顶层数据

        // 这里的map中的数据是引用了arr的它的指向还是arr，当mapItem改变时arr也会改变
        ;(mapItem[childrenField] || (mapItem[childrenField] = [])).push(child) // 这里判断mapItem中是否存在childrenField, 存在则插入当前数据, 不存在则赋值childrenField为[]然后再插入当前数据
      } else {
        // 不存在则是组顶层数据
        treeData.push(child)
      }
    })

    return treeData
  }

  _resetChangeCache() {
    this.modifiedRowKeys = []
    this.addedRowKeys = []
    this.removedRowKeys = []
    this.removedRowData = []

    if (this.element) {
      this.element.querySelectorAll('.nom-grid-tr-modified').forEach((n) => {
        n.classList.remove('nom-grid-tr-modified')
      })
    }
  }

  _processModifedRows(key) {
    if (!this.addedRowKeys.includes(key) && !this.modifiedRowKeys.includes(key)) {
      this.modifiedRowKeys.push(key)
    }
  }

  _processAddedRows(key) {
    if (!this.addedRowKeys.includes(key)) {
      this.addedRowKeys.push(key)
    }
  }

  _processRemovedRows(data) {
    const key = data[this.props.keyField]
    if (this.addedRowKeys.includes(key)) {
      this.addedRowKeys = this.addedRowKeys.filter((n) => {
        return n !== key
      })
    } else if (!this.removedRowKeys.includes(key)) {
      if (this.modifiedRowKeys.includes(key)) {
        this.modifiedRowKeys = this.modifiedRowKeys.filter((n) => {
          return n !== key
        })
      }
      this.removedRowKeys.push(key)
      this.removedRowData.push(data)
    }
  }

  updateSummary() {
    if (this.props.summary) {
      this.footer.update({})
    }
  }

  getRemovedRowKeys() {
    return this.removedRowKeys
  }

  validate() {
    const keys = Object.keys(this.rowsRefs)
    let validated = true
    keys.forEach((n) => {
      if (validated === true && this.rowsRefs[n].validate() === false) {
        validated = false
      }
    })
    return validated
  }

  edit() {
    const keys = Object.keys(this.rowsRefs)
    keys.forEach((n) => {
      this.rowsRefs[n].edit()
    })
  }

  endEdit(options) {
    if (!options) {
      options = { ignoreChange: false }
    }
    const keys = Object.keys(this.rowsRefs)
    keys.forEach((n) => {
      this.rowsRefs[n].endEdit({ ignoreChange: options.ignoreChange })
    })
  }

  saveEditData() {
    const keys = Object.keys(this.rowsRefs)
    keys.forEach((n) => {
      this.rowsRefs[n].saveEditData()
    })
  }

  acceptChange() {
    this._resetChangeCache()
  }

  reset() {
    this.update({
      data: this._defaultData,
      isSelfUpdate: true,
    })
  }

  getChangedData() {
    this.saveEditData()
    const data = this.getData()
    const result = {}
    result.addedData = data.filter((n) => {
      return this.addedRowKeys.includes(n[this.props.keyField])
    })
    result.modifiedData = data.filter((n) => {
      return this.modifiedRowKeys.includes(n[this.props.keyField])
    })
    result.removedData = this.removedRowData

    return result
  }

  _parseBrowerVersion() {
    // 不支持sticky，需要将frozen 置为null
    if (!isBrowerSupportSticky()) {
      this.props.frozenLeftCols = null
      this.props.frozenRightCols = null
      this.props.allowFrozenCols = false
      this.props.columnFrozenable = false
    }
  }

  _processColumnsCustom() {
    const { columnsCustomizable } = this.props
    // 未设置自定义列展示
    if (!columnsCustomizable) return
    // 设置过后，无需再从selected和cache中取值
    if (this._customColumnFlag) return

    const { selected, cache } = columnsCustomizable

    if (selected && selected.length) {
      // 从originColumns 过滤selected存在的列
      this.setProps({ columns: this._getColsFromSelectCols(this.originColumns, selected) })
      this._customColumnFlag = true
    }
    // 自定义列设置缓存的 key
    this._gridColumsStoreKey = this._getStoreKey(cache, STORAGE_KEY_GRID_COLUMNS)
    if (!this._gridColumsStoreKey) return

    // 缓存中有数据则读取缓存中的col的field数据
    let storeFields = localStorage.getItem(this._gridColumsStoreKey)
    if (storeFields && storeFields.length) {
      storeFields = JSON.parse(storeFields)

      this.setProps({
        columns: this._sortColumnsOrder(this._getColsFromFields(this.originColumns, storeFields)),
      })
      this._customColumnFlag = true
    }
  }

  _getStoreKey(cache, prefix) {
    if (!cache) return null

    const _isAutoKey = this.key.startWith('__key')
    if (_isAutoKey && !isString(cache)) {
      console.warn(`Please set a key for Grid or set the cache to a unique value of string type.`)
      return null
    }
    return `${prefix}_${_isAutoKey ? cache : this.key}`
  }

  _calcMinWidth() {
    this.minWidth = 0
    const { props } = this
    for (let i = 0; i < props.columns.length; i++) {
      const column = props.columns[i]
      if (column.width) {
        this.minWidth += column.width
      } else {
        this.minWidth += 120
      }
    }
  }

  _setScrollbarOnResize() {
    const updateScrollbarCol = () => {
      const body = this.element.querySelector('.nom-grid-body')
      // 判断纵向滚动条
      const hasVScrollbar = body && body.scrollHeight > body.clientHeight
      // 头部和footer的colgroup都可能有 nomui-grid-scrollbar-col
      const scrollbarCols = this.element.querySelectorAll('.nomui-grid-scrollbar-col')
      scrollbarCols.forEach((col) => {
        col.style.display = hasVScrollbar ? '' : 'none'
      })
    }

    // 首次执行
    updateScrollbarCol()

    // 监听尺寸变化
    if (!this._resizeObserver) {
      this._resizeObserver = new ResizeObserver(updateScrollbarCol)
      this._resizeObserver.observe(this.element)
    }
  }

  _rendered() {
    const me = this
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }

    this._setScrollbarOnResize()

    if (this.props.rowCheckable && this._checkboxAllRef) {
      this.changeCheckAllState()
    }

    if (this.props.data && this.props.autoMergeColumns && this.props.autoMergeColumns.length > 0) {
      this.autoMergeCols()
    }

    // 点击表格外部结束单元格编辑
    if (this.props.excelMode || this.props.editable) {
      document.addEventListener('click', ({ target }) => {
        if (!me || !me.props) {
          return
        }
        let outSider = true
        if (target.closest('.nom-grid') && target.closest('.nom-grid') === this.element) {
          if (target.classList.contains('nom-grid-body') || target.classList.contains('nom-th')) {
            outSider = true
          } else {
            outSider = false
          }
        } else if (target.closest('.nom-popup')) {
          outSider = this._findPopupRoot(target)
        }

        if (outSider && this.lastEditTd) {
          this.lastEditTd.props && this.lastEditTd.endEdit()
          this.lastEditTd = null
        }
      })
    }

    this._processColumnsWidth()
    this._processAutoScroll()
    this.overflowAncestor = this._checkOverflowAncestor()

    this.props.rowSortable && defaultSortableOndrop()

    if (this.props.lazyLoadLimit > 0 || this.props.lazyLoadRemote) {
      this._watchLazyLoad()
    }
  }

  _watchLazyLoad() {
    let ele = this.body.element
    if (!this.element.style.height && this.overflowAncestor) {
      ele = this.overflowAncestor
    }

    // Remove previous listener if it exists
    if (this._lazyLoadScrollHandler) {
      ele.removeEventListener('scroll', this._lazyLoadScrollHandler)
      this._lazyLoadScrollHandler = null
    }

    // Create new handler
    this._lazyLoadScrollHandler = () => {
      if (ele.scrollHeight - ele.scrollTop === ele.clientHeight) {
        if (this.props.lazyLoadLimit) {
          this._storedData.length > 0 && this._addFromStoredData()
        }
        if (this.props.lazyLoadRemote) {
          this._addFromRemote()
        }
      }
    }

    // Add new listener
    ele.addEventListener('scroll', this._lazyLoadScrollHandler)

    // Return cleanup function
    return () => {
      if (this._lazyLoadScrollHandler) {
        ele.removeEventListener('scroll', this._lazyLoadScrollHandler)
        this._lazyLoadScrollHandler = null
      }
    }
  }

  _addFromRemote() {
    const { pageSize, loadData } = this.props.lazyLoadRemote
    if (!isFunction(loadData)) {
      return
    }
    loadData({ pageSize, pageIndex: this.pageIndex + 1 }).then((res) => {
      if (!res || !res.length) {
        return
      }
      this.pageIndex += 1
      res.forEach((n) => {
        this.appendRow({ data: n })
      })
    })
  }

  _addFromStoredData() {
    const arr = this._storedData.slice(0, this.props.lazyLoadLimit)
    this._storedData = this._storedData.slice(this.props.lazyLoadLimit)
    arr.forEach((n) => {
      this.appendRow({ data: n })
    })
  }

  _checkOverflowAncestor() {
    let currentElement = this.element
    let overflowAncestor = null

    while (currentElement !== null && currentElement instanceof Element) {
      const style = window.getComputedStyle(currentElement)

      // 检查 overflow-y 或 overflow 是否为 auto 或 scroll
      if (
        ['auto', 'scroll'].includes(style.overflowY) ||
        ['auto', 'scroll'].includes(style.overflow)
      ) {
        overflowAncestor = currentElement
        break
      }

      // 如果当前元素是 <html>，提前退出循环
      if (currentElement === document.documentElement) {
        break
      }

      // 继续向上查找父节点
      currentElement = currentElement.parentNode
    }
    if (overflowAncestor) {
      return overflowAncestor
    }
  }

  _findPopupRoot(target) {
    let flag = true
    const popupRef = target.closest('.nom-popup').component
    if (popupRef.opener && popupRef.opener.element) {
      const ele = popupRef.opener.element
      if (ele.closest('.nom-grid') === this.element) {
        flag = false
      } else if (ele.closest('.nom-popup')) {
        flag = this._findPopupRoot(ele)
      }
    }
    return flag
  }

  getColumns() {
    return this.props.columns
  }

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
  }

  getMappedColumns(columns) {
    const arr = []
    function mapColumns(data) {
      data.forEach(function (item) {
        if (item.children) {
          mapColumns(item.children)
        }
        arr.push(item.field)
      })
    }
    mapColumns(columns || this.originColumns)

    return arr
  }

  setSortDirection(sorter) {
    const c = this.getColumns().map(this._setColumnItemDire(sorter))

    this.originColumns = this.originColumns.map(this._setColumnItemDire(sorter))

    // onSort外部会触发 update, 此时无需autoScroll
    if (!isFunction(sorter.sortable) && !isString(sorter.sortable)) {
      this._shouldAutoScroll = false
    }
    this.setProps({ columns: c })
    !this.firstRender && this.render()
  }

  // 设置每一列的排序状态
  _setColumnItemDire(sorter) {
    return (item) => {
      if (!sorter) {
        return { ...item, sortDirection: null }
      }
      if (item.field === sorter.field) {
        return { ...item, sortDirection: sorter.sortDirection }
      }
      if (item.children) {
        item.children = item.children.map(this._setColumnItemDire(sorter))
      }
      return { ...item, sortDirection: null }
    }
  }

  handleSort(sorter) {
    this.props.sortCacheable && this.saveSortInfo(sorter)
    const key = sorter.field
    if (!sorter.sortDirection && !this.props.forceSort) return

    if (isFunction(sorter.sortable)) {
      let arr = []
      if (this.lastSortField === key) {
        arr = this.props.data.reverse()
      } else {
        arr = this.props.data.sort(sorter.sortable)
      }

      this.setProps({ data: arr })

      this.setSortDirection(sorter)

      this.lastSortField = key
      return
    }

    if (nomui.utils.isString(sorter.sortable)) {
      let arr = []
      if (this.lastSortField === key) {
        arr = this.props.data.reverse()
      } else if (sorter.sortable === 'string') {
        arr = this.props.data.sort((a, b) => localeCompareString(b, a, sorter.field))
      } else if (sorter.sortable === 'number') {
        arr = this.props.data.sort((a, b) => {
          return b[sorter.field] - a[sorter.field]
        })
      } else {
        arr = this.props.data.sort((a, b) => ascCompare(b, a, sorter.field))
      }
      this.setProps({ data: arr })

      this.setSortDirection(sorter)

      this.lastSortField = key
      return
    }

    this._callHandler(this.props.onSort, {
      field: sorter.field,
      sortDirection: sorter.sortDirection,
    })

    this.setSortDirection(sorter)
    this.lastSortField = key
  }

  resetSort() {
    if (this.lastSortField) {
      this.header.table.thRefs[this.lastSortField].resetSort()
    }
    this.lastSortField = null
    this.saveSortInfo(null)
  }

  saveSortInfo(sorter) {
    localStorage.setItem(`${this.key}-sort-info`, JSON.stringify(sorter))
    this.sortInfo = sorter
  }

  getSortInfo() {
    return JSON.parse(localStorage.getItem(`${this.key}-sort-info`))
  }

  checkSortInfo() {
    // 已经处理过 || 正在处理 直接返回
    if (!this.firstRender || this.sortUpdated || this.startSort) return

    // 排序缓存
    const _sortInfo = this.getSortInfo()
    if (this.props.sortCacheable && _sortInfo) {
      this.startSort = true
      this.setSortDirection(_sortInfo)
      this._callHandler(this.props.onSort, {
        field: _sortInfo.field,
        sortDirection: _sortInfo.sortDirection,
      })
    } else if (this.props.defaultSort && this.firstRender) {
      // 默认排序
      this.startSort = true
      this.setSortDirection(this.props.defaultSort)
    }
    this.sortUpdated = true
  }

  // 外部主动记录下当前滚动（下次update时会回到当前位置）
  setScrollPlace(callback) {
    this._shouldAutoScroll = true
    const info = this._setScrollPlace()
    if (callback) {
      callback(info)
    }
  }

  // 记录上一次滚动到的位置
  _setScrollPlace() {
    // grid自身的 header和body的宽度
    const headerEl = this.header.element
    const bodyEl = this.body.element
    // grid设置了 sticky相对父元素
    const { scrollParent } = this.header

    // 表格的竖向滚动分为3种
    // 1.设置了sticky, 此时的scrollTop 需从 header.scrollParent中获取
    // 2.Grid自身设置了height, scrollTop从 body中取
    // 3.以上两种情况都不成立, 则从表格最近的overflow元素中取

    const headerLeft = headerEl.scrollLeft
    const headerTop = scrollParent && scrollParent.element ? scrollParent.element.scrollTop : 0
    const bodyLeft = bodyEl.scrollLeft
    const bodyTop = bodyEl.scrollTop

    let parentTop = null

    if (!this.props.sticky && !this.element.style.height && this.overflowAncestor) {
      parentTop = this.overflowAncestor.scrollTop
    }

    this._headerScrollInfo = {
      top: headerTop,
      left: headerLeft,
    }
    this._bodyScrollInfo = {
      top: bodyTop,
      left: bodyLeft,
    }

    this._parentScrollInfo = {
      top: parentTop,
    }

    return {
      header: this._headerScrollInfo,
      body: this._bodyScrollInfo,
      parent: this._parentScrollInfo,
    }
  }

  resetColumnsCustom() {
    if (this._gridColumsStoreKey) {
      localStorage.removeItem(this._gridColumsStoreKey)
    }
    this.setProps({ columns: this.originColumns })
    this._processColumns()
    this._calcMinWidth()
    this.render()
  }

  handleFilter(isReset) {
    const that = this
    if (
      !isReset &&
      Object.keys(this.filter).filter(function (key) {
        return key !== 'sender' && that.filter[key] !== null
      }) < 1
    ) {
      return
    }
    this.props.onFilter && this._callHandler(this.props.onFilter, this.filter)
  }

  getRow(param) {
    let result = null

    if (param instanceof Component) {
      return param
    }

    if (isFunction(param)) {
      for (const key in this.rowsRefs) {
        if (this.rowsRefs.hasOwnProperty(key)) {
          if (param.call(this.rowsRefs[key]) === true) {
            result = this.rowsRefs[key]
            break
          }
        }
      }
    } else if (isPlainObject(param)) {
      return this.rowsRefs[param[this.props.keyField]]
    } else {
      return this.rowsRefs[param]
    }

    return result
  }

  removeRow(param, options = {}) {
    const row = this.getRow(param)
    row.remove(options)
  }

  getCheckedRows(options = { includePartialChecked: true }) {
    const arr = Object.keys(this.checkedRowRefs).map((key) => {
      return this.checkedRowRefs[key]
    })

    if (
      options.includePartialChecked !== false &&
      this.props.rowCheckable &&
      this.props.rowCheckable.includePartialChecked !== false
    ) {
      const partCheckedRows = Object.keys(this.partCheckedRowRefs).map((key) => {
        return this.partCheckedRowRefs[key]
      })
      arr.push(...partCheckedRows)
    }

    return arr.filter((rowRef) => !isNullish(rowRef.key))
  }

  getCheckedRowKeys(options = { includePartialChecked: true }) {
    const arr = Object.keys(this.checkedRowRefs).map((key) => {
      return this.checkedRowRefs[key].key
    })

    if (
      options.includePartialChecked !== false &&
      this.props.rowCheckable &&
      this.props.rowCheckable.includePartialChecked !== false
    ) {
      const partCheckedKeys = Object.keys(this.partCheckedRowRefs).map((key) => {
        return this.partCheckedRowRefs[key].key
      })
      arr.push(...partCheckedKeys)
    }

    return arr.filter((key) => !isNullish(key))
  }

  // 遍历 rowTr 实例，调用其check方法
  checkAllRows(options) {
    const { rowsRefs } = this

    Object.keys(rowsRefs).forEach((key) => {
      const refItem = rowsRefs[key]
      const { props } = refItem._checkboxRef
      // _checkboxRef disabled || hidden, 则跳出循环
      if (!props || props.disabled || props.hidden) return

      if (refItem.props && !isNullish(refItem.props.data[this.props.keyField])) {
        refItem.check(options)
      }
    })
  }

  uncheckAllRows(options) {
    const { rowsRefs } = this
    Object.keys(rowsRefs).forEach((key) => {
      const refItem = rowsRefs[key]
      const { props } = refItem._checkboxRef

      // _checkboxRef disabled || hidden, 则跳出循环
      if (!props || props.disabled || props.hidden) return

      if (refItem.props && !isNullish(refItem.props.data[this.props.keyField])) {
        refItem.uncheck(options)
      }
    })
  }

  checkRows(rows, options) {
    rows = Array.isArray(rows) ? rows : [rows]
    rows.forEach((row) => {
      const rowRef = this.getRow(row)
      rowRef && rowRef.check(options)
    })
  }

  changeCheckAllState() {
    const checkedRowsLength = Object.keys(this.checkedRowRefs).length
    if (checkedRowsLength === 0) {
      this._checkboxAllRef.setValue(false, false)
    } else {
      const allRowsLength = Object.keys(this.rowsRefs).filter((key) => {
        const refItem = this.rowsRefs[key]
        const { props } = refItem._checkboxRef

        // 过滤 _checkboxRef 存在 && disabled 和 hidden为false
        return props && !props.disabled && !props.hidden
      }).length

      if (allRowsLength <= checkedRowsLength) {
        this._checkboxAllRef.setValue(true, false)
      } else {
        this._checkboxAllRef.partCheck(false)
      }
    }
  }

  getKeyValue(rowData) {
    return rowData[this.props.keyField]
  }

  showSetting() {
    // 列设置弹窗 tree的数据
    this.popupTreeData = this.originColumns
    this.popup = new GridSettingPopup({
      align: 'center',
      alignTo: window,
      grid: this,
      // fit: true,
    })
  }

  _updateOriginColumns(data) {
    this.popupTreeData = this.originColumns = data
  }

  handleColumnsSetting(params, frozenCount) {
    const tree = params

    const that = this

    let treeInfo = null
    function findTreeInfo(origin, key) {
      origin.forEach(function (item) {
        if (item.children) {
          findTreeInfo(item.children, key)
        }
        if (item.field === key) {
          treeInfo = item
        }
      })

      if (treeInfo !== null) return treeInfo
    }

    function addTreeInfo(data) {
      data.forEach(function (item) {
        if (item.children) {
          addTreeInfo(item.children)
        }

        const myinfo = findTreeInfo(that.originColumns, item.key)
        if (myinfo) {
          Object.keys(myinfo).forEach(function (key) {
            if (key !== 'children') {
              item[key] = myinfo[key]
            }
          })
        }
      })
    }

    addTreeInfo(tree)
    const { columnsCustomizable } = this.props
    if (this._gridColumsStoreKey) {
      localStorage.setItem(this._gridColumsStoreKey, JSON.stringify(this.getMappedColumns(tree)))
    }
    const rowCheckerCount =
      this.props.rowCheckable && !this.props.rowCheckable.checkboxOnNodeColumn ? 1 : 0
    this._customColumnFlag = false
    this._processPinColumnFromSetting(tree)
    this.setProps({ columns: tree })
    if (this.props.allowFrozenCols) {
      this.setProps({
        frozenLeftCols: frozenCount < 1 ? 0 : frozenCount + rowCheckerCount,
      })
    }

    this._processColumns()
    this._calcMinWidth()
    this.render()
    this.popup.hide()
    columnsCustomizable.callback && this._callHandler(columnsCustomizable.callback(tree))
  }

  // 自定义列设置后。更新 pinColumns
  _processPinColumnFromSetting(columns) {
    if (!this._gridColumsFixedStoreKey) return
    const { frozenLeftCols } = this.props

    if (frozenLeftCols) {
      this.pinColumns = columns.slice(0, frozenLeftCols - this._fixedCount)
      localStorage.setItem(
        this._gridColumsFixedStoreKey,
        JSON.stringify(this.pinColumns.map((col) => col.field)),
      )
    }
  }

  handleDrag({ item, oldIndex, newIndex }) {
    this._resortExpandedTr({ item, oldIndex, newIndex })
    if (this.props.rowSortable && this.props.rowSortable.onEnd) {
      this._callHandler(this.props.rowSortable.onEnd)
    }
  }

  _resortExpandedTr({ item }) {
    const row = item.component
    if (!row) {
      return
    }
    // 重新调整 expandedRows的位置
    this._adjustExpandedRows()
  }

  _adjustExpandedRows() {
    const table = this.body.table.element
    const mainRows = Array.from(table.querySelectorAll('tr[data-key]'))
    const expandedRows = Array.from(table.querySelectorAll('tr.nom-expanded-tr'))

    mainRows.forEach((mainRow) => {
      const dataKey = mainRow.getAttribute('data-key')

      const correspondingExpandedRow = expandedRows.find(
        (row) => row.getAttribute('data-key') === dataKey,
      )

      if (correspondingExpandedRow) {
        mainRow.insertAdjacentElement('afterend', correspondingExpandedRow)
      }
    })
  }

  getData(options = {}) {
    if (!this.props.data || !this.props.data.length) {
      return []
    }
    if (options.saveEdit) {
      this.saveEditData()
    }
    const that = this
    const keys = this.getDataKeys()
    const data = keys.map(function (key) {
      return that.props.data.filter(function (item) {
        return `${item[that.props.keyField]}` === `${key}`
      })[0]
    })
    if (this.props.lazyLoadLimit && this._storedData.length) {
      return [...data, ...this._storedData]
    }
    return data
  }

  getDataKeys() {
    const order = []
    const trs = this.body.table.element.rows
    for (let i = 0; i < trs.length; i++) {
      if (!!this.props.rowExpandable && order.indexOf(trs[i].dataset.key) > -1) {
        continue
      }
      order.push(trs[i].dataset.key)
    }
    return order
  }

  appendRow(rowProps) {
    this.emptyRef && this.emptyRef.props && this.emptyRef.hide()
    this.body.table.appendRow(rowProps)
    if (rowProps.data && rowProps.data[this.props.keyField]) {
      this._processAddedRows(rowProps.data[this.props.keyField])
    }
  }

  checkChildren(row) {
    const { checked } = row.props
    const { cascadeCheckChildren } = this.props.treeConfig

    cascadeCheckChildren === true &&
      Object.keys(row.childrenNodes).forEach((key) => {
        this.checkChildren(row.childrenNodes[key])
      })

    if (checked === true) {
      return
    }

    row.check()
  }

  // 统一的状态传播方法
  propagateParentState(node, isCheckOperation) {
    if (!node || !node.parentNode) return

    const parent = node.parentNode

    // 计算当前父节点应该具有的状态
    const newState = this.calculateParentState(parent, isCheckOperation)

    // 应用状态变化
    if (newState === 'checked' && !parent.props.checked) {
      this.check(parent, true, false)
    } else if (newState === 'unchecked' && (parent.props.checked || parent.props.partChecked)) {
      this.uncheck(parent, true)
    } else if (newState === 'partial' && !parent.props.partChecked) {
      parent.partCheck()
    }

    // 继续向上传播
    this.propagateParentState(parent, isCheckOperation)
  }

  calculateParentState(parent, isCheckOperation) {
    const siblings = parent.childrenNodes
    let hasChecked = false
    let hasUnchecked = false

    for (const k in siblings) {
      const sibling = siblings[k]
      if (sibling.props.checked) {
        hasChecked = true
      } else if (sibling.props.partChecked) {
        return 'partial' // 发现任何半选中子节点立即返回
      } else {
        hasUnchecked = true
      }

      // 发现混合状态立即返回
      if (hasChecked && hasUnchecked) {
        return 'partial'
      }
    }

    // 根据操作类型决定最终状态
    return isCheckOperation
      ? hasChecked
        ? 'checked'
        : 'unchecked'
      : hasUnchecked
      ? 'unchecked'
      : 'checked'
  }

  // check方法
  check(row, fromChild, isPartCheck) {
    const { checked, partChecked } = row.props
    const { cascadeCheckChildren, cascadeCheckParent } = this.props.treeConfig

    // 级联向下
    cascadeCheckChildren &&
      !fromChild &&
      Object.keys(row.childrenNodes).forEach((key) => this.checkChildren(row.childrenNodes[key]))

    // 更新当前节点
    if (isPartCheck ? !partChecked : !checked) {
      isPartCheck ? row.partCheck() : row.check()
    } else {
      return false
    }

    // 级联向上（受cascadeCheckParent控制）
    cascadeCheckParent && this.propagateParentState(row, true)
  }

  // uncheck方法
  uncheck(row, fromChild) {
    const { checked, partChecked } = row.props
    const { cascadeUncheckChildren, cascadeUncheckParent } = this.props.treeConfig

    // 级联向下
    cascadeUncheckChildren &&
      !fromChild &&
      Object.keys(row.childrenNodes).forEach((key) => this.uncheck(row.childrenNodes[key]))

    // 更新当前节点
    if (checked || partChecked) {
      row.uncheck()
    } else {
      return false
    }

    // 级联向上（受cascadeUncheckParent控制）
    cascadeUncheckParent && this.propagateParentState(row, false)
  }

  _processCheckableColumn() {
    const { rowCheckable } = this.props
    let { columns } = this.props
    if (rowCheckable) {
      // 每次都重新渲染 checkbox列
      columns = columns.filter((item) => !item.isChecker)

      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { checkedRowKeys = [], toolbar } = normalizedRowCheckable
      const checkedRowKeysHash = {}
      checkedRowKeys.forEach((rowKey) => {
        checkedRowKeysHash[rowKey] = true
      })
      if (!rowCheckable.checkboxOnNodeColumn) {
        columns.unshift({
          width: rowCheckable.width || 50,
          isChecker: true,
          resizable: false,
          field: 'nom-grid-row-checker',
          classes: {
            'nom-grid-checkbox': true,
          },
          toolbar,
        })
      }
      this.setProps({
        columns: columns,
      })
    }
  }

  // 处理列宽
  _processColumnsWidth() {
    const { columnResizable } = this.props
    const { cache } = columnResizable
    this._gridColumsWidthStoreKey = this._getStoreKey(cache, STORAGE_KEY_GRID_COLS_WIDTH)
    const colWithString = localStorage.getItem(this._gridColumsWidthStoreKey)

    const _widthInfo = JSON.parse(colWithString) || {}

    // 配置了 autoWidth的列，主动触发其col.update
    this.originColumns.forEach((col) => {
      if (col.autoWidth) {
        _widthInfo[col.field] = 0
      }
    })

    Object.keys(_widthInfo).forEach((key) => {
      const data = { field: key, width: _widthInfo[key] }
      this.resizeCol(data)
    })
  }

  // 自动滚动到上次的位置
  _processAutoScroll() {
    // 排序后自动滚动到之前的位置
    this._shouldAutoScroll && this.autoScrollGrid()
    this._shouldAutoScroll = true
  }

  autoMergeCols() {
    const that = this
    this.props.autoMergeColumns.forEach(function (key) {
      that._mergeColumn(key)
    })
  }

  _mergeColumn(key) {
    const el = this.body.element.getElementsByTagName('table')[0]
    function getIndex(data) {
      for (let i = 0; i < el.rows[0].cells.length; i++) {
        if (el.rows[0].cells[i].getAttribute('data-field') === data) {
          return i
        }
      }
    }
    const index = getIndex(key)

    for (let i = el.rows.length - 1; i > 0; i--) {
      el.rows[i].cells[index].rowSpan = el.rows[i].cells[index].rowSpan || 1
      if (el.rows[i].cells[index].innerHTML === el.rows[i - 1].cells[index].innerHTML) {
        el.rows[i - 1].cells[index].rowSpan = el.rows[i].cells[index].rowSpan + 1
        el.rows[i].cells[index].rowSpan = 0
        el.rows[i].cells[index].style.display = 'none'
      }
    }
  }

  autoScrollGrid(param) {
    let { _headerScrollInfo, _bodyScrollInfo, _parentScrollInfo } = this
    if (param) {
      _headerScrollInfo = param.header
      _bodyScrollInfo = param.body
      _parentScrollInfo = param.parent
    }

    if (_headerScrollInfo) {
      if (this.header.scrollParent) {
        this.header.scrollParent.element.scrollTop = _headerScrollInfo.top || 0
      }
      this.header.element.scrollLeft = _headerScrollInfo.left || 0
    }

    if (_bodyScrollInfo) {
      this.body.element.scrollLeft = _bodyScrollInfo.left || 0
      this.body.element.scrollTop = _bodyScrollInfo.top || 0
    }

    if (_parentScrollInfo && this.overflowAncestor) {
      this.overflowAncestor.scrollTop = _parentScrollInfo.top || 0
    }

    this._headerScrollInfo = null
    this._bodyScrollInfo = null
    this._parentScrollInfo = null
  }

  /**
   * 根据偏移量计算出width后再赋值
   * @param {*} data {field, distance}
   */
  calcResizeCol(data, thRef) {
    this.header && this.header.calcResizeCol(data, thRef)
    if (this.props.data && this.props.data.length) {
      this.body && this.body.calcResizeCol(data, thRef)
    }
    this.footer && this.footer.calcResizeCol(data, thRef)
  }

  /**
   * 直接传入width设置宽度
   * @param {*} data {field, width}
   */
  resizeCol(data) {
    this.header && this.header.resizeCol(data)
    this.body && this.body.resizeCol(data)
    this.footer && this.footer.resizeCol(data)
  }

  /**
   * 由设置了 autoWidth的Td触发，刷新对应的col的maxTdWidth变量
   * @param {*} data {field, maxTdWidth}
   */
  setAllTableColMaxTdWidth(data) {
    this.header && this.header.setColMaxTdWidth(data)
    this.body && this.body.setColMaxTdWidth(data)
    this.footer && this.footer.setColMaxTdWidth(data)
  }

  // 存储设置的列的宽度
  storeColsWidth(field) {
    const { _gridColumsWidthStoreKey: _storeKey } = this
    if (!_storeKey) return
    // storeKey优先 _gridKey, cache 次之
    const colWithString = localStorage.getItem(_storeKey)
    const _widthInfo = colWithString ? JSON.parse(colWithString) : {}
    const col = this.header.table.colRefs[field]

    _widthInfo[field] = col.props.column.width
    localStorage.setItem(_storeKey, JSON.stringify(_widthInfo))
  }

  /**
   *  重置col的width本地缓存
   * @param {string} field 需要重置的对应col 为空则清除所有数据
   */
  resetColsWidth(field = null) {
    const { _gridColumsWidthStoreKey: _storeKey } = this
    if (!_storeKey) return

    // originColumns中拥有最原始的width数据
    let resetCols = this.originColumns.filter((item) => item.resizable || isNullish(item.resizable))

    if (!field) {
      localStorage.removeItem(_storeKey)
    } else {
      resetCols = [this.originColumns.find((col) => col.field === field)]
      const colWithString = localStorage.getItem(_storeKey)
      const _widthInfo = colWithString ? JSON.parse(colWithString) : {}
      delete _widthInfo[field]
      if (Object.keys(_widthInfo).length) {
        localStorage.setItem(_storeKey, JSON.stringify(_widthInfo))
      } else {
        localStorage.removeItem(_storeKey)
      }
    }

    resetCols.forEach((col) => {
      const data = { field: col.field, width: col.width }
      this.resizeCol(data)
    })
  }

  _getColsFromSelectCols(originCols = [], selectCols = []) {
    return selectCols.reduce((acc, curr) => {
      const sameCol = originCols.find((originCol) => originCol.field === curr.field)

      if (sameCol) {
        acc.push({
          ...curr,
          children: this._getColsFromSelectCols(sameCol.children, curr.children),
        })
      }
      return acc
    }, [])
  }

  // 引用传递，实现对对应 columns的排序
  _sortColumnsFromFields(columns, fields = []) {
    if (!fields || !fields.length) return

    // 因Array.prototype.sort 在Firefox在的表现不同，改为使用for循环
    for (let i = 0; i < fields.length; i++) {
      for (let j = i; j < columns.length; j++) {
        // 未设置 field的列都排在最后面
        if (isNullish(columns[j].field)) {
          const nullCol = columns.splice(j, 1)
          columns.push(nullCol[0])
        } else if (columns[j].field === fields[i]) {
          // 将fields 中存在的列全部排在最前面
          const sameCol = columns.splice(j, 1)
          columns.splice(i, 0, sameCol[0])
        }
      }
    }
  }

  _getColsFromFields(columns = [], fields = [], includeNullish = true) {
    return columns.reduce((acc, curr) => {
      // 无field的列，列设置后会消失
      if (isNullish(curr.field) && includeNullish) {
        acc.push(curr)
      } else if (fields.includes(curr.field)) {
        acc.push({ ...curr, children: this._getColsFromFields(curr.children, fields) })
      }
      return acc
    }, [])
  }

  _processExpandableColumn() {
    const { rowExpandable } = this.props
    let { columns } = this.props
    if (rowExpandable) {
      columns = columns.filter((item) => !item.isTreeMark)
      this.setProps({
        columns: [
          {
            width: 50,
            isTreeMark: true,
            resizable: false,
            cellRender: ({ row, rowData }) => {
              if (!row.expandedRow) {
                row.expandedRow = row.after({
                  component: ExpandedTr,
                  data: rowData,
                  hidden: true,
                  parentRow: row,
                })
              } else {
                row.expandedRow.update({ data: rowData })
              }

              return {
                component: ExpandIndicator,
                ref: (c) => {
                  row.expandIndicotorIconRef = c
                },
                grid: this,
                row,
                hidden: true,
                expandable: {
                  ...{
                    expandedProps: {
                      type: 'up-circle',
                    },
                    collapsedProps: {
                      type: 'down-circle',
                    },
                  },
                  ...rowExpandable,
                  ...{
                    byClick: true,
                    expanded: rowExpandable.expanded,
                    target: () => {
                      if (!row.expandedRow) {
                        row.expandedRow = row.after({
                          component: ExpandedTr,
                          data: rowData,
                        })
                      }
                      return row.expandedRow
                    },
                  },
                },
              }
            },
          },
          ...columns,
        ],
      })
    }
  }

  _onRowCheck(row) {
    const { rowCheckable } = this.props
    if (rowCheckable) {
      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { onCheck } = normalizedRowCheckable
      this._callHandler(onCheck, { row: row })
    }
  }

  _onRowUncheck(row) {
    const { rowCheckable } = this.props
    if (rowCheckable) {
      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { onUncheck } = normalizedRowCheckable
      this._callHandler(onUncheck, { row: row })
    }
  }

  getRows() {
    return this.body.table.getRows()
  }

  handlePinClick(data) {
    if (this.pinColumns.length >= this.props.frozenLimit && !data.fixed) {
      new nomui.Message({
        content: `最多只能冻结${this.props.frozenLimit}项`,
        type: 'warning',
      })
      return
    }

    // 取消初始化固定列时(无缓存配置时)
    if (data.fixed && this.pinColumns.length < 1) {
      let num = this.props.frozenLeftCols
      if (num - 1 > this._fixedCount) {
        this.fixPinOrder(data)
        num--
      } else {
        num = 0
      }

      this.setProps({ frozenLeftCols: num })
      // 未对columns进行增删或排序，无需触发 config
      this._processFrozenColumn()
      this.render()
      return
    }

    if (this.pinColumns.find((n) => n.field === data.field)) {
      this.pinColumns = this.removeColumn(this.pinColumns, data)
    } else {
      this.pinColumns.push(data)
    }

    this._gridColumsFixedStoreKey &&
      localStorage.setItem(
        this._gridColumsFixedStoreKey,
        JSON.stringify(this.pinColumns.map((col) => col.field)),
      )
    this.setProps({
      columns: this.getPinOrderColumns(),
      frozenLeftCols: this.pinColumns.length ? this.pinColumns.length + this._fixedCount : 0,
    })
    this._needSortColumnsFlag = !data.lastLeft
    this._processColumns()
    this.render()
  }

  fixPinOrder(data) {
    const { columns } = this.props
    const num = this.props.frozenLeftCols
    if (columns[num - 1].field === data.field) {
      return
    }
    let idx
    for (let i = 0; i < columns.length; i++) {
      if (data.field === columns[i].field) {
        idx = i
        break
      }
    }
    const c = this.props.columns
    const item = c.splice(idx, 1)
    c.splice(num - 1, 0, item[0])

    this.setProps({ columns: c })
  }

  removeColumn(array, data) {
    if (array.length < 1) {
      return []
    }
    return array.filter((n) => {
      return n.field !== data.field
    })
  }

  getPinOrderColumns() {
    if (!this.pinColumns.length) {
      return this.props.columns
    }

    let arr = []

    this.pinColumns
      .slice()
      .reverse()
      .forEach((n) => {
        const arr2 = arr.length > 0 ? arr : this.props.columns
        arr = this.removeColumn(arr2, n)
        arr.unshift(n)
      })
    return arr
  }
}

Grid.defaults = {
  columns: [],
  data: null,
  frozenHeader: false,
  frozenLeftCols: null,
  frozenRightCols: null,
  allowFrozenCols: true,
  frozenLimit: 5, // 最大允许固定左侧列数目
  onSort: null,
  forceSort: false,
  sortCacheable: false,
  onFilter: null,
  rowSelectable: false,
  rowCheckable: false,
  keyField: 'id',
  treeConfig: {
    flatData: false, // 数据源是否为一维数组
    parentField: 'parentKey',
    childrenField: 'children',
    treeNodeColumn: null,
    initExpandLevel: -1,
    indentSize: 16,
    cascadeCheckParent: true,
    cascadeCheckChildren: true,
    cascadeUncheckParent: true,
    cascadeUncheckChildren: true,
    cascade: false,
  },
  columnsCustomizable: false,
  // columnsCustomizable.selected: 若存在，则展示selected 的列数据
  // columnsCustomizable.cache: 设置列的结果保存至localstorage，cache的值为对应的key
  // columnsCustomizable.callback: 设置列保存回调
  autoMergeColumns: null,
  columnResizable: false,
  // columnResizable.cache: boolean 设置的列宽保存至localstorage
  // columnResizable.allowFixedCol: 固定列是否允许被拖动(当 data太多时拖动，会造成渲染卡顿, 此时可设置false关闭)

  columnFrozenable: false, // 允许固定列
  // columnFrozenable.cache: boolean 固定列的结果保存至localstorage
  highlightModifiedRows: true, // 数据被编辑（或新增）的行是否高亮显示
  striped: false,
  showTitle: false,
  ellipsis: false,
  sticky: false,
  line: 'row',
  bordered: false,
  scrollbarWidth: false,
  summary: null,
  showEmpty: true,
  columnAlign: 'left',
  columnSettingText: '列设置',
  totalizeText: '总计',
  okText: '确定',
  cancelText: '取消',
  columnsLimitTitle: '提示',
  columnsLimitDescription: '请至少保留一列',
  selectAllText: '全选',
  clearText: '清空',
  deselectAllText: '取消全选',
  frozenText: '已冻结',
  unfreezeText: '未冻结',
  searchAllText: '搜索所有列',
  searchAddedText: '搜索已添加列',
  shownColumnText: '已显示列（拖动可进行排序）',
  maxColumnText: '最多只能冻结{{limit}}项',
  noGroupFronzeText: '不支持冻结群组',
  columnStatsText: '{{current}}/{{total}}项',
  onRowClick: null,
  excelMode: false, // excel编辑模式
  editable: false, // 传统编辑模式
  lazyLoadRemote: false,
  lazyLoadLimit: false,
}
Grid._loopSetValue = function (key, arry) {
  if (key === undefined || key.cascade === undefined) return false
  arry.forEach(function (currentValue) {
    if (key[currentValue] === undefined) {
      key[currentValue] = key.cascade
    }
  })
}
Component.register(Grid)

export default Grid
