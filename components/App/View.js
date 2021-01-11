import Component from '../Component/index'
import { pathCombine } from '../util/index'

class View extends Component {
  constructor(props, ...mixins) {
    const defaults = {
      defaultPath: null,
    }

    super(Component.extendProps(defaults, props), ...mixins)
  }

  _created() {
    this.currentView = null
    this.level = this.$app.lastLevel
    this.$app.views[this.level] = this
  }

  render() {
    this._mountElement()
    this.routeView(this.$app.lastLevel, this.element, this.props.defaultPath)
    this.$app.lastLevel++
  }

  hashChange(changed) {
    this._callHandler(this.props.onHashChange) // 可以在这里做路由变更前处理

    if (changed.queryChanged && (changed.changedLevel === null || this.level < changed.changedLevel)) {
      this._callHandler(this.props.onQueryChange)
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
    this.$app.off('hashChange', this.hashChange)
    delete this.$app.views[this.viewLevel]
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

    let url = this.getRouteUrl(level)
    url = `${pathCombine(this.$app.props.viewsDir, url)}.js`

    require([url], (viewOptionsFunc) => {
      const viewOptions = viewOptionsFunc.call(this)
      if (viewOptions.documentTitle) {
        document.title = viewOptions.documentTitle
      }
      const extOptions = {
        reference: element,
        placement: 'replace',
      }
      const viewContentOptions = Component.extendProps(viewOptions.view.call(this), extOptions)
      this.currentView = Component.create(viewContentOptions)
      this.element = this.currentView.element
      this.setProps(viewOptions)
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

Component.register(View)

export default View
