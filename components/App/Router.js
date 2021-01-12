import Component from '../Component/index'
import { isFunction, pathCombine } from '../util/index'

class Router extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      defaultPath: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.currentView = null
    this.subpath = null
    this.path = null
    this.level = this.$app.lastLevel
    this.$app.routers[this.level] = this
    this.handleHashChange = this.handleHashChange.bind(this)
    this.$app.on('hashChange', this.handleHashChange, this)
  }

  render() {
    this._mountElement()
    this.routeView()
    this.$app.lastLevel++
  }

  handleHashChange(changed) {
    this._callHandler(this.props.onHashChange) // 可以在这里做路由变更前处理

    if (changed.queryChanged && (changed.changedLevel === null || this.level < changed.changedLevel)) {
      this._callHandler(this.props.onQueryChange)
    }

    if (changed.changedLevel === null) {
      return
    }

    if (this.level > changed.changedLevel) {
      this.remove()
    }
    else if (this.level === changed.changedLevel) {
      this.routeView(this.level, this.element)
      this.$app.lastLevel = this.level + 1
    }
    else if (this.level === changed.changedLevel - 1) {
      this._callHandler(this.props.onSubpathChange)
    }
  }

  _removeCore() {
  }

  remove() {
    this.$app.off('hashChange', this.handleHashChange)
    delete this.$app.routers[this.level]
    for (const p in this) {
      if (this.hasOwnProperty(p)) {
        delete this[p]
      }
    }
  }

  routeView() {
    const level = this.level
    const element = this.element
    const defaultPath = this.props.defaultPath

    if (defaultPath) {
      if (!this.$app.currentRoute.paths[level]) {
        this.$app.currentRoute.paths[level] = defaultPath
      }
    }

    if (this.level < this.$app.currentRoute.maxLevel) {
      this.subpath = this.$app.currentRoute.paths[level + 1]
    }

    let url = this.getRouteUrl(level)
    url = `${pathCombine(this.$app.props.viewsDir, url)}.js`

    require([url], (viewOptionsFunc) => {
      let routerOptions = {}
      if (isFunction(viewOptionsFunc)) {
        routerOptions = viewOptionsFunc.call(this)
      }
      else {
        routerOptions.view = viewOptionsFunc
      }
      const extOptions = {
        reference: element,
        placement: 'replace',
      }
      const viewOptions = Component.extendProps(routerOptions.view, extOptions)
      this.currentView = Component.create(viewOptions)
      this.element = this.currentView.element
      this.setProps(routerOptions)
      this._callRendered()
    })
  }

  getRouteUrl(level) {
    const paths = this.$app.currentRoute.paths
    const maxLevel = this.$app.currentRoute.maxLevel
    let path = paths[level]

    if (level < maxLevel) {
      path = pathCombine(path, '_layout')
    }

    path = prefix(path, level)

    function prefix(patharg, levelarg) {
      if (levelarg === 0) {
        return patharg
      }
      if (patharg[0] !== '/') {
        patharg = pathCombine(paths[levelarg - 1], patharg)
        return prefix(patharg, levelarg - 1)
      }

      return patharg
    }

    return path
  }
}

Component.register(Router)

export default Router
