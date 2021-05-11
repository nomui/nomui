// 正整数
export const POSITIVE_INTEGER = /^[1-9]\d*$/

export const IMAGE_FILE = /^image\/[A-Za-z*]+/i

export const CHINESE = /[\u4e00-\u9fa5]+/g

// 不支持cm mm in pt pc等单位
export const CSS_UNIT = /^(-)?\d+(.)?\d+[px|rem|em|vw|vh|%]*$/i

export const VALID_INTEGER = /^[-]?\d+$/
