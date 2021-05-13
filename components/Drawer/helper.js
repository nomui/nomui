import { VALID_INTEGER } from '../util/reg'

export const settles = ['top', 'right', 'bottom', 'left']

export function isValidZIndex(index) {
  return VALID_INTEGER.test(index)
}
