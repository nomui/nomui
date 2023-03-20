import Checkbox from '../Checkbox/index'
import Component from '../Component/index'
import Icon from '../Icon/index'
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
  isBrowerSupportSticky,
  isFunction,
  isNullish,
  isPlainObject,
  isString,
  localeCompareString,
} from '../util/index'
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
    this._shouldAutoScroll = true
    this._customColumnFlag = false // 是否已经自定义处理过列
    this._pinColumnFlag = false // 是否已经处理过列缓存

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

    if (this.props.frozenLeftCols > 0) {
      this.props.rowCheckable && this.props.frozenLeftCols++
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
      const { treeConfig } = this.props
      // data更新, flatData需要重新组装成Tree结构
      if (treeConfig && treeConfig.flatData) {
        this._alreadyProcessedFlat = false
      }
    }
    if (props.hasOwnProperty('rowCheckable') || props.hasOwnProperty('rowExpandable')) {
      this._resetFixCount()
    }
  }

  _resetFixCount() {
    this._fixedCount = 0
    this.props.rowCheckable && this._fixedCount++
    this.props.rowExpandable && this._fixedCount++
  }

  _config() {
    this.nodeList = {}

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

    this._processData()
    // 更新列的排序部分内容
    this.checkSortInfo()

    this._processColumns()

    this._calcMinWidth()

    const { line, rowDefaults } = this.props
    this.setProps({
      classes: {
        'm-frozen-header': this.props.frozenHeader,
        'm-with-setting': !!this.props.columnsCustomizable,
      },
      children: [
        {
          classes: {
            'nom-grid-setting': true,
          },
          children: {
            component: 'Button',
            ref: (c) => {
              this.settingBtn = c
            },
            icon: 'setting',
            size: 'small',
            renderIf: this.props.columnsCustomizable,
            // type: 'text',
            classes: {
              'nom-grid-setting-btn': true,
            },
            tooltip: '列设置',
            onClick: () => {
              this.showSetting()
            },
          },
        },
        { component: GridHeader, line: line },
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

      this.setProps({ columns: this._getColsFromFields(this.originColumns, storeFields) })
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

  _rendered() {
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }

    if (this.props.rowCheckable && this._checkboxAllRef) {
      this.changeCheckAllState()
    }

    if (this.props.data && this.props.autoMergeColumns && this.props.autoMergeColumns.length > 0) {
      this.autoMergeCols()
    }

    this._processColumnsWidth()
    this._processAutoScroll()

    this.props.rowSortable && defaultSortableOndrop()
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
  _setScrollPlace(isEmpty) {
    // grid自身的 header和body的宽度
    const headerEl = this.header.element
    const bodyEl = this.body.element
    // grid设置了 sticky相对父元素
    const { scrollParent } = this.header

    // body的body的宽度
    const tableBodyEl = this.body.table.element

    // 表格的竖向滚动分为两种
    // 1.设置了sticky, 此时的scrollTop 需从 header.scrollParent中获取
    // 2.Grid自身设置了height, scrollTop从 body中取
    let headerLeft = headerEl.scrollLeft
    const headerTop = scrollParent && scrollParent.element ? scrollParent.element.scrollTop : 0
    let bodyLeft = bodyEl.scrollLeft
    const bodyTop = bodyEl.scrollTop

    // 表格的宽度 / 2 - svg图标的一半
    if (isEmpty) {
      headerLeft = (tableBodyEl.offsetWidth - headerEl.offsetWidth) / 2
      bodyLeft = (tableBodyEl.offsetWidth - bodyEl.offsetWidth) / 2
    }
    this._headerScrollInfo = {
      top: headerTop,
      left: headerLeft,
    }
    this._bodyScrollInfo = {
      top: bodyTop,
      left: bodyLeft,
    }

    return {
      header: this._headerScrollInfo,
      body: this._bodyScrollInfo,
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

  getCheckedRows() {
    return Object.keys(this.checkedRowRefs)
      .map((key) => {
        return this.checkedRowRefs[key]
      })
      .filter((rowRef) => !isNullish(rowRef.key))
  }

  getCheckedRowKeys() {
    return Object.keys(this.checkedRowRefs)
      .map((key) => {
        return this.checkedRowRefs[key].key
      })
      .filter((key) => !isNullish(key))
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

  handleColumnsSetting(params) {
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

    this._customColumnFlag = false
    this._processPinColumnFromSetting(tree)
    this.setProps({ columns: tree })
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

  handleDrag() {
    if (this.props.rowSortable && this.props.rowSortable.onEnd) {
      this._callHandler(this.props.rowSortable.onEnd)
    }
  }

  getData() {
    if (!this.props.data || !this.props.data.length) {
      return []
    }
    const that = this
    const keys = this.getDataKeys()
    const data = keys.map(function (key) {
      return that.props.data.filter(function (item) {
        return `${item[that.props.keyField]}` === `${key}`
      })[0]
    })
    return data
  }

  getDataKeys() {
    const order = []
    const trs = this.body.table.element.rows
    for (let i = 0; i < trs.length; i++) {
      order.push(trs[i].dataset.key)
    }
    return order
  }

  appendRow(rowProps) {
    this.body.table.appendRow(rowProps)
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

  check(row) {
    const { checked } = row.props
    const { cascadeCheckParent, cascadeCheckChildren } = this.props.treeConfig

    cascadeCheckChildren === true &&
      Object.keys(row.childrenNodes).forEach((key) => {
        this.checkChildren(row.childrenNodes[key])
      })

    cascadeCheckParent === true && row.parentNode && this.check(row.parentNode)

    if (checked === true) {
      return false
    }

    row.check()
  }

  uncheck(row) {
    const { checked } = row.props
    const { cascadeUncheckChildren } = this.props.treeConfig

    cascadeUncheckChildren === true &&
      Object.keys(row.childrenNodes).forEach((key) => {
        this.uncheck(row.childrenNodes[key])
      })

    if (checked === false) {
      return false
    }

    row.uncheck()
  }

  _processCheckableColumn() {
    const grid = this
    const { rowCheckable } = this.props
    let { columns } = this.props
    if (rowCheckable) {
      // 每次都重新渲染 checkbox列
      columns = columns.filter((item) => !item.isChecker)

      let normalizedRowCheckable = rowCheckable
      if (!isPlainObject(rowCheckable)) {
        normalizedRowCheckable = {}
      }
      const { checkedRowKeys = [], checkboxRender } = normalizedRowCheckable
      const checkedRowKeysHash = {}
      checkedRowKeys.forEach((rowKey) => {
        checkedRowKeysHash[rowKey] = true
      })
      this.setProps({
        columns: [
          {
            width: 50,
            isChecker: true,
            resizable: false,
            field: 'nom-grid-row-checker',
            classes: {
              'nom-grid-checkbox': true,
            },
            header: {
              component: Checkbox,
              plain: true,
              _created: (inst) => {
                grid._checkboxAllRef = inst
              },
              onValueChange: (args) => {
                if (args.newValue === true) {
                  grid.checkAllRows(false)
                } else {
                  grid.uncheckAllRows(false)
                }
              },
            },
            cellRender: ({ row, rowData, index }) => {
              let _checkboxProps = {}
              // 根据传入的 checkboxRender 计算出对应的 props: {hidden, value, disabled}
              if (checkboxRender && isFunction(checkboxRender)) {
                _checkboxProps = checkboxRender({ row, rowData, index })
              }

              // 计算得到当前的 checkbox的状态
              _checkboxProps.value = _checkboxProps.value || checkedRowKeysHash[row.key] === true

              if (checkedRowKeysHash[row.key] === true || _checkboxProps.value) {
                grid.checkedRowRefs[grid.getKeyValue(rowData)] = row
              }

              const { keyField } = this.props
              const { parentField } = this.props.treeConfig
              this.nodeList[`__key${rowData[keyField]}`] = row
              row.childrenNodes = {}
              row.parentNode = this.nodeList[`__key${rowData[parentField]}`]
              if (row.parentNode) {
                row.parentNode.childrenNodes[`__key${rowData[keyField]}`] = row
              }

              return {
                component: Checkbox,
                classes: {
                  'nom-grid-checkbox': true,
                },
                plain: true,
                _created: (inst) => {
                  row._checkboxRef = inst
                },
                _config() {
                  this.setProps(_checkboxProps)
                },
                attrs: {
                  'data-key': row.key,
                },
                onValueChange: (args) => {
                  if (args.newValue === true) {
                    grid.check(row)
                  } else {
                    grid.uncheck(row)
                  }
                  grid.changeCheckAllState()
                },
              }
            },
          },
          ...columns,
        ],
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
    const { data } = this.props
    if (!data || !data.length) {
      this._shouldAutoScroll = true
      this._setScrollPlace(true)
    }
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
    let { _headerScrollInfo, _bodyScrollInfo } = this
    if (param) {
      _headerScrollInfo = param.header
      _bodyScrollInfo = param.body
    }
    if (!_headerScrollInfo || !_bodyScrollInfo) return
    if (_headerScrollInfo.top) {
      this.header.scrollParent.element.scrollTop = _headerScrollInfo.top || 0
    }
    this.header.element.scrollLeft = _headerScrollInfo.left || 0
    this.body.element.scrollLeft = _bodyScrollInfo.left || 0
    this.body.element.scrollTop = _bodyScrollInfo.top || 0

    this._headerScrollInfo = null
    this._bodyScrollInfo = null
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
              return {
                component: Icon,
                expandable: {
                  byClick: true,
                  expandedProps: {
                    type: 'minus-square',
                  },
                  collapsedProps: {
                    type: 'plus-square',
                  },
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
  allowFrozenCols: false,
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

  striped: false,
  showTitle: false,
  ellipsis: false,
  sticky: false,
  line: 'row',
  bordered: false,
  scrollbarWidth: 8,
  summary: null,
  showEmpty: true,
  columnAlign: 'left',
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
