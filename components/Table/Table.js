import Component from '../Component/index'
import Loading from '../Loading/index'
import ColGroup from './ColGroup'
import Tbody from './Tbody'
import Thead from './Thead'

class Table extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Table.defaults, props), ...mixins)
  }

  _created() {
    super._created()
    this.colRefs = []
    this.thRefs = []
    this.hasGrid = ['GridHeader', 'GridBody', 'GridFooter'].some(
      (item) => this.parent.componentType === item,
    )

    if (this.hasGrid) {
      this.grid = this.parent.parent
      this.parent.table = this
    }
    this.hasRowGroup = false
    this.hasMultipleThead = false
  }

  _config() {
    const that = this
    this._propStyleClasses = ['line', 'bordered']
    const isStriped =
      (this.hasGrid && this.grid.props.striped === true) || this.props.striped === true || false

    let hasMask = false
    if (this.hasGrid) {
      this.props.ellipsis = this.grid.props.ellipsis
      hasMask = this.grid.props.highlightCol
    }

    this.setProps({
      tag: 'table',
      classes: {
        'nom-table-striped': isStriped,
      },
      children: [
        { component: ColGroup },
        this.props.onlyBody !== true && { component: Thead },
        this.props.onlyHead !== true && { component: Tbody },
        hasMask &&
          this.parent.componentType === 'GridBody' && {
            tag: 'div',
            classes: { 'nom-table-th-hover-mask': true },
            _created() {
              that.grid.highlightMask = this
            },
          },
      ],
    })
  }

  _rendered() {
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }

    if ((this.hasGrid && this.grid.props.autoMergeColumns) || this.hasRowGroup) {
      this.grid.setProps({
        classes: {
          'nom-table-has-row-group': true,
        },
      })
    }
  }

  _hideRelatedTr({ item }) {
    const grid = this.grid
    const relatedMap = grid._relatedMap

    if (!grid || !grid.props.relatedRowField) {
      return
    }

    const ele = this.tbody.element

    const relatedTrs = ele.querySelectorAll(`:scope > tr[data-related-to]`)

    const showKeys = new Set()
    const hideKeys = new Set()

    const currentKey = item.getAttribute('data-key')
    const parentKey = item.getAttribute('data-related-to')

    // 查找父节点
    const findParent = (targetKey) => {
      for (const [key, children] of relatedMap) {
        if (children.includes(targetKey)) {
          return key
        }
      }

      return null
    }

    // 1. 当前节点 + 所有祖先显示

    let key = currentKey

    while (key) {
      showKeys.add(key)

      key = findParent(key)
    }

    // 2. 当前节点兄弟显示

    const siblings = relatedMap.get(parentKey) || []

    siblings.forEach((n) => {
      showKeys.add(n)
    })

    // 3. 当前节点子孙隐藏
    // 4. 兄弟节点子孙隐藏

    const addHideChildren = (n) => {
      const children = relatedMap.get(n)

      if (!children?.length) {
        return
      }

      children.forEach((childKey) => {
        hideKeys.add(childKey)

        addHideChildren(childKey)
      })
    }

    // 当前节点下面
    addHideChildren(currentKey)

    // 兄弟节点下面
    siblings.forEach((siblingKey) => {
      if (siblingKey !== currentKey) {
        addHideChildren(siblingKey)
      }
    })

    // 5. 控制显示隐藏

    relatedTrs.forEach((tr) => {
      const k = tr.getAttribute('data-key')

      if (showKeys.has(k) && !hideKeys.has(k)) {
        tr.classList.remove('nom-grid-tr-hidden')
      } else {
        tr.classList.add('nom-grid-tr-hidden')
      }
    })
  }

  _showRelatedTr() {
    const ele = this.tbody.element
    const hiddenExpandedRows = ele.querySelectorAll(':scope > tr.nom-grid-tr-hidden')

    hiddenExpandedRows.forEach((row) => {
      row.classList.remove('nom-grid-tr-hidden')
    })
  }

  _hideExpandedTr() {
    const ele = this.tbody.element

    const expandedRows = ele.querySelectorAll(':scope > tr.nom-expanded-tr')

    expandedRows.forEach((row) => {
      row.classList.add('nom-grid-tr-hidden')
    })
  }

  _showExpandedTr() {
    const ele = this.tbody.element

    const hiddenExpandedRows = ele.querySelectorAll(
      ':scope > tr.nom-expanded-tr.nom-grid-tr-hidden',
    )

    hiddenExpandedRows.forEach((row) => {
      row.classList.remove('nom-grid-tr-hidden')
    })
  }

  _hideTreeTr({ item }) {
    const ele = this.tbody.element
    const currentLevel = Number(item.getAttribute('level'))

    const subNodes = Array.from(ele.querySelectorAll(':scope > tr[level]')).filter((tr) => {
      return Number(tr.getAttribute('level')) > currentLevel
    })

    subNodes.forEach((sub) => {
      sub.classList.add('nom-grid-tr-hidden')
    })
  }

  _showTreeTr() {
    const ele = this.tbody.element
    ele.querySelectorAll('tr.nom-grid-tr-hidden').forEach((sub) => {
      sub.classList.remove('nom-grid-tr-hidden')
    })
  }

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
  }

  appendRow(rowProps) {
    if (!this.props.data) {
      this.props.data = []
    }
    if (!this.props.data.length) {
      this.tbody.update({
        showEmpty: false,
      })
    }
    const row = this.tbody.appendChild({ ...rowProps, ...{ index: this.props.data.length } })
    this.props.data.push(rowProps.data)
    if (this.hasGrid) {
      this.grid.rowsRefs[row.key] = row
    }
  }

  getRows() {
    return this.tbody.getChildren()
  }

  selectTr(tr) {
    if (this.activeTr) {
      this.activeTr.element.classList.remove('nom-tr-selected')
    }
    this.activeTr = tr
    this.activeTr.element.classList.add('nom-tr-selected')

    this.hasGrid &&
      this.grid.props.rowSelectable &&
      this.grid.props.rowSelectable.onSelect &&
      this.grid._callHandler(this.grid.props.rowSelectable.onSelect, {
        row: tr,
        rowData: tr.props.data,
      })
  }
}

Table.defaults = {
  tag: 'table',
  columns: [],
  rowDefaults: {},
  onlyHead: false,
  onlyBody: false,
  keyField: 'id',
  striped: false,
  treeConfig: {
    childrenField: 'children',
    treeNodeColumn: null,
    initExpandLevel: -1,
    indentSize: 6,
  },
  showTitle: false,
  ellipsis: false,
  showEmpty: true,
  emptyText: '暂无内容',
  okText: '确定',
  resetText: '重置',
  freezeText: '固定列',
  unfreezeText: '取消固定',
}

Component.register(Table)

export default Table
