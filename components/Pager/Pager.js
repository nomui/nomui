import Component from '../Component/index'
import List from '../List/index'

class Pager extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            pageIndex: 1,
            pageSize: 10,
            totalCount: 0,
            displayItemCount: 5,
            edgeItemCount: 1,

            prevShowAlways: true,
            nextShowAlways: true,

            texts: {
                prev: '上一页',
                next: '下一页',
                ellipse: "..."
            }
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _config() {
        var pager = this

        this.setProps({
            children: {
                component: List,
                gutter: 'md',
                items: pager.getPageItems(),
                itemDefaults: {
                    tag: 'a',
                    key() {
                        return this.props.pageNumber
                    },
                    _config: function () {
                        this.setProps({
                            children: this.props.text + ''
                        })
                    },
                },
                itemSelectable: {
                    byClick: true
                },
                selectedItems: pager.props.pageIndex,
                events: {
                    itemSelectionChange: function () {
                        pager.props.pageIndex = this.selectedItem.props.pageNumber
                        pager.trigger("pageChange", {
                            pageIndex: pager.props.pageIndex,
                            pageSize: pager.props.pageSize,
                        })
                    }
                }
            }
        })
    }

    /**
    * 极端分页的起始和结束点，取决于pageIndex 和 displayItemCount.
    * @返回 {数组(Array)}
    */
    _getInterval() {
        var props = this.props
        var pageIndex = props.pageIndex
        var displayItemHalf = Math.floor(props.displayItemCount / 2)
        var pageCount = this._getPageCount()
        var upper_limit = pageCount - props.displayItemCount
        var start = pageIndex > displayItemHalf ? Math.max(Math.min(pageIndex - displayItemHalf, upper_limit), 1) : 1
        var end = pageIndex > displayItemHalf ? Math.min(pageIndex + displayItemHalf, pageCount) : Math.min(props.displayItemCount, pageCount)
        return [start, end]
    }

    _getPageCount() {
        return Math.ceil(this.props.totalCount / this.props.pageSize)
    }

    getPageItems() {
        var items = []
        var props = this.props
        if (props.totalCount === 0) {
            return items
        }
        var pageIndex = props.pageIndex
        var interval = this._getInterval()
        var pageCount = this._getPageCount()

        // 产生"Previous"-链接
        if (props.texts.prev && (pageIndex > 1 || props.prevShowAlways)) {
            items.push({
                pageNumber: pageIndex - 1,
                text: props.texts.prev,
                classes: { 'prev': true }
            })
        }
        // 产生起始点
        if (interval[0] > 1 && props.edgeItemCount > 0) {
            var end = Math.min(props.edgeItemCount, interval[0] - 1)
            for (var i = 1; i <= end; i++) {
                items.push({
                    pageNumber: i,
                    text: i,
                    classes: ''
                });
            }
            if (props.edgeItemCount < interval[0] - 1 && props.texts.ellipse) {
                items.push({
                    pageNumber: null,
                    text: props.texts.ellipse,
                    classes: { 'space': true },
                    space: true
                })
            }
        }

        // 产生内部的那些链接
        for (var i = interval[0]; i <= interval[1]; i++) {
            items.push({
                pageNumber: i,
                text: i,
                classes: ''
            })
        }
        // 产生结束点
        if (interval[1] < pageCount && props.edgeItemCount > 0) {
            if (pageCount - props.edgeItemCount > interval[1] && props.texts.ellipse) {
                items.push({
                    pageNumber: null,
                    text: props.texts.ellipse,
                    classes: { 'space': true },
                    space: true
                })
            }
            var begin = Math.max(pageCount - props.edgeItemCount + 1, interval[1]);
            for (var i = begin; i <= pageCount; i++) {
                items.push({
                    pageNumber: i,
                    text: i,
                    classes: ''
                })
            }

        }
        // 产生 "Next"-链接
        if (props.texts.next && (pageIndex < pageCount || props.nextShowAlways)) {
            items.push({
                pageNumber: pageIndex + 1,
                text: props.texts.next,
                classes: { 'next': true },
            })
        }

        return items
    }
}

Component.register(Pager)

export default Pager