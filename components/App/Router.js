import Component from '../Component/index'
import { isFunction, isString, pathCombine } from '../util/index'

class Router extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      defaultPath: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.currentView = null
    this.path = null
    this.level = this.$app.lastLevel
    this.$app.routers[this.level] = this
    this.handleHashChange = this.handleHashChange.bind(this)
    this.$app.on('hashChange', this.handleHashChange, this)
  }

  render() {
    this._mountElement()
    this.routeView()
  }

  handleHashChange(changed) {
    this._callHandler(this.props.onHashChange, changed) // 可以在这里做路由变更前处理
    if (
      changed.queryChanged &&
      (changed.changedLevel === null || this.level < changed.changedLevel)
    ) {
      this._callHandler(this.props.onQueryChange, changed)
    }

    if (changed.changedLevel === null) {
      return
    }

    if (this.level > changed.changedLevel) {
      this.remove()
    } else if (this.level === changed.changedLevel) {
      this.routeView()
    } else if (this.level === changed.changedLevel - 1) {
      this._callHandler(this.props.onSubpathChange, changed)
    }
  }

  getSubpath() {
    let subpath = null
    const { paths } = this.$app.currentRoute
    if (this.level < paths.length) {
      subpath = paths[this.level + 1]
    }

    return subpath
  }

  _removeCore() {}

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
    this.emptyChildren()
    this.$app.lastLevel = this.level + 1
    const level = this.level
    const defaultPath = this.props.defaultPath
    const { paths } = this.$app.currentRoute

    if (defaultPath) {
      if (!paths[level]) {
        paths[level] = defaultPath
      }
    }

    let url = this.getRouteUrl(level)
    url = `${pathCombine(this.$app.props.viewsDir, url)}.js`

    require([url], (viewPropsOrRouterPropsFunc) => {
      let routerProps = {}
      if (isFunction(viewPropsOrRouterPropsFunc)) {
        routerProps = viewPropsOrRouterPropsFunc.call(this, {
          route: this.$app.currentRoute,
          app: this.$app,
          router: this,
          context: this.$app.context,
        })
        if (routerProps.then) {
          routerProps.then((result) => {
            routerProps = result
            this.processProps(routerProps)
          })
        } else {
          this.processProps(routerProps)
        }
      } else {
        routerProps.view = viewPropsOrRouterPropsFunc
        this.processProps(routerProps)
      }
    })
  }

  processProps(routerProps) {
    const that = this
    const defaultPath = this.props.defaultPath
    const element = this.element
    Router.plugins.forEach((plugin) => {
      plugin(routerProps)
    })
    if (isString(routerProps.title)) {
      document.title = routerProps.title
    }
    if (isFunction(routerProps.view)) {
      routerProps.view = routerProps.view.call(this)
    }
    const viewOptions = Component.extendProps(routerProps.view, {
      reference: element,
      placement: 'replace',
    })
    this.currentView = Component.create(viewOptions, {
      _rendered: function () {
        that.element = this.element
      },
    })

    delete this.props
    this.props = { defaultPath: defaultPath }
    this.setProps(routerProps)

    this._callRendered()
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

Router.plugins = []

Component.register(Router)

export default Router
