import { isString, parseToQueryString } from '../util/index'

export class Route {
  constructor(defaultPath) {
    const that = this

    this.hash = window.location.hash
    if (!this.hash) {
      this.hash = `#${defaultPath}`
    }
    this.path = this.hash.substring(1)
    this.paths = [null, null, null]
    this.query = {}
    this.queryStr = ''
    const queryIndex = this.hash.indexOf('?')

    if (this.hash.length > 1) {
      if (queryIndex > -1) {
        this.path = this.hash.substring(1, queryIndex)

        const paramStr = (this.queryStr = this.hash.substring(queryIndex + 1))
        const paramArr = paramStr.split('&')

        paramArr.forEach(function (e) {
          const item = e.split('=')
          const key = item[0]
          const val = item[1]
          if (key !== '') {
            that.query[key] = decodeURIComponent(val)
          }
        })
      }
    }

    const pathArr = this.path.split('!')

    this.maxLevel = pathArr.length - 1

    pathArr.forEach(function (path, index) {
      that.paths[index] = path
    })
  }

  push(route) {
    if (isString(route)) {
      window.location.href = `#${route}`
    } else {
      const pathname = route.pathname || this.path
      let strQuery = parseToQueryString(route.query || {})
      if (strQuery) {
        strQuery = `?${strQuery}`
      }
      window.location.href = `#${pathname}${strQuery}`
    }
  }
}
