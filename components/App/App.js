/* eslint-disable no-shadow */
import Component from '../Component/index'
import { pathCombine } from '../util/index'
import { Route } from './Route'
import View from './View'

class App extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      tag: 'body',
      placement: 'replace',
      defaultPath: '!',
      viewsDir: '/',
      isFixedLayout: true,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.lastLevel = 0
    this.previousRoute = null
    this.currentRoute = new Route(this.props.defaultPath)

    this.views = {}

    Object.defineProperty(Component.prototype, '$app', {
      get: function () {
        return this.root
      },
    })

    Object.defineProperty(Component.prototype, '$route', {
      get: function () {
        return this.$app.currentRoute
      },
    })
  }

  _config() {
    this.setProps({
      children: { component: View },
    })

    if (this.props.isFixedLayout === true) {
      document.documentElement.setAttribute('class', 'app')
    }
  }

  _rendered() {
    const that = this
    window.addEventListener('hashchange', function () {
      that.handleRoute()
    })
  }

  handleRoute() {
    const route = new Route()
    console.info(JSON.stringify(route))

    let changedLevel = null
    let queryChanged = false

    this.previousRoute = this.currentRoute
    this.currentRoute = route

    if (this.previousRoute !== null) {
      const currentRoutePaths = this.currentRoute.paths
      const previousRoutePaths = this.previousRoute.paths

      if (currentRoutePaths[0] !== previousRoutePaths[0]) {
        changedLevel = 0
      } else if (currentRoutePaths[1] !== previousRoutePaths[1]) {
        changedLevel = 1
      } else if (currentRoutePaths[2] !== previousRoutePaths[2]) {
        changedLevel = 2
      } else if ((this.previousRoute.queryStr || '') !== this.currentRoute.queryStr) {
        queryChanged = true
      }
    }

    this.trigger('hashChange', { changedLevel, queryChanged })
  }

  routeView(level, element, defaultPath) {
    if (defaultPath) {
      if (!this.currentRoute.paths[level]) {
        this.currentRoute.paths[level] = defaultPath
      }
    }

    let url = this.getRouteUrl(level)
    url = `${pathCombine(this.props.viewsDir, url)}.js`

    require([url], (viewOptions) => {
      if (viewOptions.documentTitle) {
        document.title = viewOptions.documentTitle
      }
      const extOptions = {
        reference: element,
        placement: 'replace',
      }
      viewOptions = Component.extendProps(viewOptions, extOptions)
      this.views[level] = Component.create(viewOptions)
    })
  }

  getRouteUrl(level) {
    const paths = this.currentRoute.paths
    const maxLevel = this.currentRoute.maxLevel
    let path = paths[level]

    if (level < maxLevel) {
      path = pathCombine(path, '_layout')
    }

    path = prefix(path, level)

    function prefix(path, level) {
      if (level === 0) {
        return path
      }
      if (path[0] !== '/') {
        path = pathCombine(paths[level - 1], path)
        return prefix(path, level - 1)
      }

      return path
    }

    return path
  }
}

Component.register(App)

export default App
