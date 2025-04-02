/* eslint-disable no-shadow */
import Component from '../Component/index'
import { isFunction } from '../util/index'
import { Route } from './Route'
import Router from './Router'

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

    this.routers = {}
    this.contextGetted = false

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

    const { context } = this.props
    if (isFunction(context)) {
      const contextResult = context({ route: this.currentRoute })
      if (contextResult.then) {
        contextResult.then((result) => {
          this.context = result
          this.contextGetted = true
          this.update()
        })
      } else {
        this.context = context
        this.contextGetted = true
      }
    } else {
      this.context = context
      this.contextGetted = true
    }
  }

  _config() {
    if (this.contextGetted === true) {
      this.setProps({
        children: { component: Router },
      })

      if (this.props.isFixedLayout === true) {
        document.documentElement.setAttribute('class', 'app')
      }
    }
  }

  _rendered() {
    const that = this
    window.addEventListener('hashchange', function () {
      that.handleRoute()
    })
  }

  handleRoute() {
    const route = new Route(this.props.defaultPath)

    /* console.info(JSON.stringify(route))

    route.iterateHash((hash) => {
      console.log(hash)
    }) */

    let changedLevel = null
    let queryChanged = false

    this.previousRoute = this.currentRoute
    this.currentRoute = route

    if (this.previousRoute !== null) {
      const currentRoutePaths = this.currentRoute.paths
      const previousRoutePaths = this.previousRoute.paths

      const length = Math.min(previousRoutePaths.length, currentRoutePaths.length)
      for (let i = 0; i < length; i++) {
        if (previousRoutePaths[i] !== currentRoutePaths[i]) {
          changedLevel = i
          break
        }
      }
      if ((this.previousRoute.queryStr || '') !== this.currentRoute.queryStr) {
        queryChanged = true
      }
    }

    this.trigger('hashChange', { changedLevel, queryChanged, route: this.currentRoute, app: this })
  }

  getLastRouter() {
    if (this.lastLevel > 0) {
      return this.routers[this.lastLevel - 1]
    }
  }

  /**
   * 刷新最后一个路由对象的视图
   */
  refreshLastRouter() {
    const lastRouter = this.getLastRouter();
    if (lastRouter) {
      try {
        lastRouter.refreshView();
      } catch (error) {
        console.error('Failed to refresh last router view:', error);
      }
    }
  }
}

Component.register(App)

export default App
