import Component from '../Component/index'
import { Route } from './Route'
import { pathCombine } from '../util/index'
import View from './View'
import ViewMixin from './ViewMixin'

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

    _create() {
        this.lastLevel = 0
        this.previousRoute = null
        this.currentRoute = new Route(this.props.defaultPath)

        this.views = {}

        Object.defineProperty(Component.prototype, '$app', {
            get: function () { return this.root; }
        })

        Object.defineProperty(Component.prototype, 'route', {
            get: function () { return this.$app.currentRoute; }
        })
    }

    _config() {
        this.setProps({
            children: { component: View }
        })

        if (this.props.isFixedLayout === true) {
            document.documentElement.setAttribute('class', 'app')
        }
    }

    _render() {
        var that = this;
        window.addEventListener('hashchange', function () {
            that.handleRoute();
        })
    }

    handleRoute() {
        var route = new Route()
        console.info(JSON.stringify(route))

        var changedLevel = null
        var queryChanged = false

        this.previousRoute = this.currentRoute
        this.currentRoute = route

        if (this.previousRoute !== null) {
            var currentRoutePaths = this.currentRoute.paths
            var previousRoutePaths = this.previousRoute.paths

            if (currentRoutePaths[0] !== previousRoutePaths[0]) {
                changedLevel = 0
            }
            else if (currentRoutePaths[1] !== previousRoutePaths[1]) {
                changedLevel = 1
            }
            else if (currentRoutePaths[2] !== previousRoutePaths[2]) {
                changedLevel = 2
            }
            else if ((this.previousRoute.queryStr || '') !== this.currentRoute.queryStr) {
                queryChanged = true
            }
        }

        for (var i = 0; i <= this.currentRoute.maxLevel; i++) {
            var view = this.views[i]
            view.trigger('hashChange')
            if (queryChanged) {
                view.trigger('queryChange')
            }
            if (i === changedLevel - 1) {
                view.trigger('subpathChange')
            }
            if (i === changedLevel) {
                this.lastLevel = i
                this.routeView(i, view.element)
                break
            }
        }
    }

    routeView(level, element, defaultPath) {
        if (defaultPath) {
            if (!this.currentRoute.paths[level]) {
                this.currentRoute.paths[level] = defaultPath
            }
        }

        var url = this.getRouteUrl(level)
        url = pathCombine(this.props.viewsDir, url) + '.js';

        require([url], (viewOptions) => {
            if (viewOptions.documentTitle) {
                document.title = viewOptions.documentTitle
            }
            var extOptions = {
                reference: element,
                placement: 'replace',
            }
            viewOptions = Component.extendProps(viewOptions, extOptions)
            this.views[level] = Component.create(viewOptions, ViewMixin)
        })
    }

    getRouteUrl(level) {
        var paths = this.currentRoute.paths
        var maxLevel = this.currentRoute.maxLevel
        var path = paths[level]

        if (level < maxLevel) {
            path = pathCombine(path, '_layout')
        }

        path = prefix(path, level)

        function prefix(path, level) {
            if (level === 0) {
                return path;
            }
            if (path[0] !== '/') {
                path = pathCombine(paths[level - 1], path)
                return prefix(path, level - 1)
            }
            else {
                return path
            }
        }

        return path
    }
}

Component.register(App)

export default App

