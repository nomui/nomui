import Component from '../Component/index'
import Loading from '../Loading/index'
import ColGroup from './ColGroup'
import Tbody from './Tbody'
import Thead from './Thead'
import { isFunction, isPlainObject } from '../util/index'

class Table extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'table',
      columns: [],
      rowDefaults: {},
      onlyHead: false,
      onlyBody: false,
      keyField: 'id',
      treeConfig: {
        childrenField:'children',
        treeNodeColumn: null,
        initExpandLevel: -1,
        indentSize: 6
      },
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    super._created()

    this.hasGrid = this.parent.parent.componentType === 'Grid'

    if (this.hasGrid) {
      this.grid = this.parent.parent
    }

    this.rowRefs = {}
  }

  _config() {
    this._propStyleClasses = ['line', 'bordered']
    this.setProps({
      tag: 'table',
      children: [
        { component: ColGroup },
        this.props.onlyBody !== true && { component: Thead },
        this.props.onlyHead !== true && { component: Tbody },
      ],
    })
  }

  _rendered() {
    if (this.loadingInst) {
      this.loadingInst.remove()
      this.loadingInst = null
    }
  }

  getRow(param) {
    let result = null

    if (param instanceof Component) {
      return param
    }

    if (isFunction(param)) {
      for (const key in this.rowRefs) {
        if (this.rowRefs.hasOwnProperty(key)) {
          if (param.call(this.rowRefs[key]) === true) {
            result = this.rowRefs[key]
            break
          }
        }
      }
    } else if (isPlainObject(param)) {
      return this.rowRefs[param[this.props.keyField]]
    } else {
      return this.rowRefs[param]
    }

    return result
  }

  loading() {
    this.loadingInst = new Loading({
      container: this.parent,
    })
  }
}

Component.register(Table)

export default Table
