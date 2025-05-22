export const nomGlobalContexts = new WeakMap()

export const nomComponentStack = []

export const nomuiContextWatchers = {}

/**
 * 清理不存在于DOM树中的组件context
 * 使用防抖避免频繁调用
 */
let cleanupDebounce
export function cleanupStaleContexts() {
  clearTimeout(cleanupDebounce)
  cleanupDebounce = setTimeout(() => {
    _performCleanup()
  }, 500)
}

/**
 * 实际执行清理的方法
 */
function _performCleanup() {
  // 遍历组件栈(从后往前)
  for (let i = nomComponentStack.length - 1; i >= 0; i--) {
    const componentRef = nomComponentStack[i]
    const component = componentRef.deref() // 获取组件实例

    // 检查组件是否应该被清理
    if (!component || !_isComponentInDOM(component)) {
      // 从全局context中移除
      if (component) {
        nomGlobalContexts.delete(component)
      }
      // 从栈中移除
      nomComponentStack.splice(i, 1)
    }
  }
}

/**
 * 检查组件是否仍在DOM树中
 */
function _isComponentInDOM(component) {
  try {
    // 检查组件是否有element并且仍在文档中
    return component.element && document.contains(component.element)
  } catch (e) {
    // 某些情况下可能会抛出异常，视为不在DOM中
    return false
  }
}

/**
 * 注册新组件的context
 */
export function registerComponentContext(component, context) {
  nomGlobalContexts.set(component, context)
  // eslint-disable-next-line no-undef
  nomComponentStack.push(new WeakRef(component))
}
