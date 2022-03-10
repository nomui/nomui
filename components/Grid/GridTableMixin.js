export default {
  methods: {
    calcResizeCol: function (data, thRef) {
      const col = this.table.colRefs[data.field]
      const tdWidth = this.table.element.rows[0].cells[col.props.index].offsetWidth
      const colWidth = col.props.column.width || tdWidth

      let result = colWidth + data.distance

      if (result < 60) {
        result = 60
      }
      col.update({ column: { width: result } })
      if (this.componentType === 'GridHeader' && col.props.column.fixed) {
        // 只在Header 调用 无需放在 mixin 中
        this._processFixedColumnSticky(thRef)
      }
    },

    resizeCol: function ({ field, width = 0 }) {
      const col = this.table.colRefs[field]
      col && col.update({ column: { width } })
    },

    setColMaxTdWidth: function ({ field, maxTdWidth }) {
      const col = this.table.colRefs[field]
      col && col.setMaxTdWidth(maxTdWidth)
    },
  },
}
