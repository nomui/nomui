export const nomGlobalContexts = new Map() // 使用 Map 结构存储所有组件的 context
export const nomComponentStack = [] // 组件栈用于维护组件树关系

// 添加获取祖先组件 context 的方法
export function getAncestorContexts(component, contextKey) {
  const contexts = []
  let current = component.parent

  while (current) {
    const context = nomGlobalContexts.get(current.key)
    if (context && (!contextKey || context[contextKey] !== undefined)) {
      contexts.push(context)
    }
    current = current.parent
  }

  return contexts
}
