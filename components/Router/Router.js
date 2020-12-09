import Component from '../Component/index'

String.prototype.trim = function (characters) {
    return this.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '')
}

String.prototype.startWith = function (str) {
    var reg = new RegExp("^" + str)
    return reg.test(this)
}

String.prototype.trimEnd = function (characters) {
    return this.replace(new RegExp(characters + '+$', 'g'), '')
}

String.prototype.prepend = function (character) {
    if (this[0] !== character) {
        return (character + this).toString()
    }
    else {
        return this.toString()
    }
}

class Router extends Component {
    constructor(props, ...mixins) {
        const defaults = {
            defaultPath: null
        }

        super(Component.extendProps(defaults, props), ...mixins)
    }

    _create() {
        var that = this
        this.level = this.app.lastLevel
        this.app.lastLevel++
        this.app.routers[this.level] = this
        this.app.on('hashChange', function (p) {
            that.view.trigger('hashChange')
            if (p.queryChanged) {
                that.view.trigger('queryChange')
            }
            if (that.level === p.changedLevel + 1) {
                that.view.trigger('subpathChange')
            }
            if (that.level === p.changedLevel) {
                that.routeView()
            }
        })
    }

    _render() {
        this.routeView()
    }

    destroy() {

    }

    routeView() {
        var that = this

        var level = this.level
        if (this.props.defaultPath) {
            if (!this.app.currentRoute.paths[level]) {
                this.app.currentRoute.paths[level] = this.props.defaultPath
            }
        }

        var url = this.getRouteUrl(level)
        url = this.pathCombine(this.app.props.viewsDir, url) + '.js';

        require([url], function (viewOptions) {
            var extOptions = {
                reference: that.element,
                placement: 'replace',
                $scoped: true
            }
            viewOptions = Component.extendProps(viewOptions, extOptions)
            that.view = Component.create(viewOptions);
            that.element = that.view.element;
        })
    }

    getRouteUrl(level) {
        var that = this;
        var paths = this.app.currentRoute.paths
        var maxLevel = this.app.currentRoute.maxLevel
        var path = paths[level]

        if (level < maxLevel) {
            path = this.pathCombine(path, '_layout')
        }

        path = prefix(path, level)

        function prefix(path, level) {
            if (level === 0) {
                return path;
            }
            if (path[0] !== '/') {
                path = that.pathCombine(paths[level - 1], path)
                return prefix(path, level - 1)
            }
            else {
                return path
            }
        }

        return path
    }

    pathCombine() {
        var path = ''
        var args = Array.from(arguments)

        args.forEach(function (item, index) {
            if (index > 0) {
                path += '/' + item.trim('/')
            }
            else {
                path += item.trimEnd('/')
            }
        })

        return path
    }
}

Component.register(Router)

export default Router