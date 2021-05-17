import { VALID_INTEGER } from '../util/reg'

export const settles = ['top', 'right', 'bottom', 'left']

export function isValidZIndex(index) {
  return VALID_INTEGER.test(index)
}

// /**
//  *
//  * @param container dom容器
//  * @param direction 方位(top,right,bottom,left)
//  */
// export function getRelativePosition(container) {
//   if (container instanceof HTMLElement) {
//     const { top, left, width, height } = container.getBoundingClientRect()
//     return { width: `${width}px`, height: `${height}px`, left: `${left}px`, top: `${top}px` }
//   }
//   return null
// }
