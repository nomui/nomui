/* eslint-disable no-shadow */
import Component from '../Component/index'
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
      children: { component: Router },
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
}

Component.register(App)

export default App
