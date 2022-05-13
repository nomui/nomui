// 初始化时存下浏览器的版本信息
window.BROWSER_INFO = getBrowser()

/**
 * 获取浏览器的版本信息
 * @returns {type: string, version: number}
 */
function getBrowser() {
  const UserAgent = navigator.userAgent.toLowerCase()
  const browserInfo = {}
  const browserArray = {
    IE: window.ActiveXObject || 'ActiveXObject' in window, // IE
    Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1, // Chrome浏览器
    Firefox: UserAgent.indexOf('firefox') > -1, // 火狐浏览器
    Opera: UserAgent.indexOf('opera') > -1, // Opera浏览器
    Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') === -1, // safari浏览器
    Edge: UserAgent.indexOf('edge') > -1, // Edge浏览器
    QQBrowser: /qqbrowser/.test(UserAgent), // qq浏览器
    WeixinBrowser: /MicroMessenger/i.test(UserAgent), // 微信浏览器
  }
  for (const i in browserArray) {
    if (browserArray[i]) {
      let version = ''
      if (i === 'IE') {
        version = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2]
      } else if (i === 'Chrome') {
        version = UserAgent.match(/chrome\/([\d.]+)/)[1]
      } else if (i === 'Firefox') {
        version = UserAgent.match(/firefox\/([\d.]+)/)[1]
      } else if (i === 'Opera') {
        version = UserAgent.match(/opera\/([\d.]+)/)[1]
      } else if (i === 'Safari') {
        version = UserAgent.match(/version\/([\d.]+)/)[1]
      } else if (i === 'Edge') {
        version = UserAgent.match(/edge\/([\d.]+)/)[1]
      } else if (i === 'QQBrowser') {
        version = UserAgent.match(/qqbrowser\/([\d.]+)/)[1]
      }
      browserInfo.type = i
      browserInfo.version = parseInt(version, 10)
    }
  }
  return browserInfo
}

// 支持 position: sticky 属性的最小版本
// 参考 https://caniuse.com/?search=sticky
const SUPPORT_STICKY_MIN_BROWSER_VERSION_MAP = {
  Chrome: 56,
  Firefox: 59,
  Opera: 42,
  Safari: 6,
  Edge: 16,
  QQBrowser: 10,
}
// 浏览器是否支持sticky
export function isBrowerSupportSticky() {
  if (window.BROWSER_INFO.type === 'IE') return false //
  // 低于 minVersion 版本的浏览器，都不支持
  const minVersion = SUPPORT_STICKY_MIN_BROWSER_VERSION_MAP[window.BROWSER_INFO.type]
  if (minVersion && minVersion > window.BROWSER_INFO.version) {
    return false
  }
  // 未知的浏览器版本都默认支持
  return true
}

export function isChrome49() {
  return window.BROWSER_INFO.type === 'Chrome' && window.BROWSER_INFO.version === 49
}
