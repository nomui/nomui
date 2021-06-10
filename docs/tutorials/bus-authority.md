# 权限

页面可以通过 accessable 定义准入权限

## accessable 取值情况

1. 准入权限字符串
2. boolean 类型，返回 false 为无权限
3. 纯函数(不能是 promise) 返回 boolean 或者一个无权限时显示的页面

- 简单案例

```js
define([], function () {
  return function () {
    const title = '权限测试页面'

    return {
      accessable: 'CTS.StudySiteAdmin.HomePageManagement', // false,'CTS.StudySiteAdmin.HomePageManagement1',()=>{return false}
      title: title,
      view: {
        children: [
          {
            component: 'Button',
            text: '有权限才显示的按钮',
            renderIf: nomui.WetrialAccess.check('CTS.StudySiteAdmin.HomePageManagement'),
          },
        ],
      },
    }
  }
})
```

- 自定义无权限访问页面

```js
define([], function () {
  return function () {
    const title = '权限测试页面'

    return {
      accessable: () => {
        if (nomui.WetrialAccess.check('CTS.StudySiteAdmin.HomePageManagement')) {
          return true
        }
        // 无权限的时候返回一个组件页面
        return {
          component: ProLayout,
          title: title,
          // 内容区
          content: {
            component: 'Message',
            type: 'info',
            content:
              '欢迎使用本系统，您可以从左边的菜单启动要使用的功能。如果您没有看到任何菜单，可能是因为您没有获得任何一项授权，您可以联系您的系统管理员获得授权.',
            duration: false,
            position: null,
            showClose: false,
          },
        }
      },
      title: title,
      view: {
        children: [
          {
            component: 'Button',
            text: '有权限才显示的按钮',
            renderIf: nomui.WetrialAccess.check('CTS.StudySiteAdmin.HomePageManagement'),
          },
        ],
      },
    }
  }
})
```

### sis 端权限插件的代码如下

```js
/**
 * wetrial 权限校验插件
 */
;(function (factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory)
  } else {
    // Browser globals
    factory()
  }
})(function () {
  const exports = {}

  exports.install = function (nomui) {
    nomui.Router.plugins.push(function (routerProps) {
      const accessable = routerProps.accessable
      if (accessable !== undefined) {
        let hasPermission = true
        if (typeof accessable === 'boolean') {
          hasPermission = accessable
        } else if (
          nomui.utils.isString(accessable) ||
          Object.prototype.toString.call(accessable) === '[object Array]'
        ) {
          hasPermission = nomui.WetrialAccess.check(accessable)
        } else if (nomui.utils.isFunction(accessable)) {
          hasPermission = accessable()
          if (typeof hasPermission !== 'boolean') {
            routerProps.view = hasPermission
            return
          }
        } else {
          console.error(`不支持的accessable:${accessable}`)
        }

        if (!hasPermission) {
          routerProps.view = {
            children: {
              component: 'Result',
              status: '403',
              title: '403',
              subTitle: '对不起，您没有权限访问该页面！！！',
            },
          }
        }
      }
    })
  }

  return exports
})
```

全局入口页面注册插件，并设置当前权限

```js
// 注册插件
nomui.use(PermissionPlugin)
// 设置权限
nomui.WetrialAccess.setPermissions(win.nomapp.context.Permissions || {})
```
