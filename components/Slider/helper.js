import Component from '../Component/index'
import { isNumeric } from '../util/index'

export function getValidMax(value) {
  if (!isNumeric(value)) return 100
  if (value <= 0) return 100
  return value
}

export function getValidValue(val, max = 100) {
  if (!val || !isNumeric(val) || val < 0) return 0
  if (val > max) return max
  return val
}

export function getValidStep(step, max) {
  if (!isNumeric(step) || !isNumeric(max) || step < 0) return 1

  if (!(max % step === 0)) return 1
  return step
}

export function getOffset(container, offset, max = 100) {
  let _container = container
  if (!_container) {
    return null
  }

  if (_container instanceof Component) {
    _container = container.element
  }

  if (!(_container instanceof HTMLElement)) {
    return null
  }

  const { left, width } = _container.getBoundingClientRect()
  let result = ((offset - left) * max) / width

  result = Math.min(max, result)
  result = Math.max(0, result)
  return result
}
