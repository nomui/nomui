import { isNumeric, isPlainObject, isString } from '../util/index'
import { IMAGE_FILE, POSITIVE_INTEGER } from '../util/reg'

export const DEFAULT_ACCEPT =
  'image/*,application/msword,application/pdf,application/x-rar-compressed,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.ms-works,application/zip,audio/*,video/*,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.wordprocessingml.template,application/vnd.ms-word.document.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.template.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.ms-powerpoint.addin.macroEnabled.12,application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.ms-powerpoint.slideshow.macroEnabled.12,application/csv'

const types = [
  'accdb',
  'as',
  'asm',
  'aspx',
  'avi',
  'bmp',
  'c',
  'cab',
  'chm',
  'cpp',
  'cs',
  'css',
  'csv',
  'db',
  'dll',
  'doc',
  'docx',
  'exe',
  'fla',
  'flv',
  'gif',
  'h',
  'html',
  'jpg',
  'js',
  'mdb',
  'mp3',
  'mp3g',
  'mpg',
  'msi',
  'pdf',
  'php',
  'png',
  'ppt',
  'pptx',
  'psd',
  'rar',
  'rtf',
  'swf',
  'tif',
  'txt',
  'vb',
  'wav',
  'wma',
  'wmv',
  'xls',
  'xlsx',
  'xml',
  'zip',
  'gz',
]

export const fileType = new Set(types)

export function emptyFn() {}

export function getUUID() {
  return `nom-upload-${Math.random().toString().substr(2)}`
}

export function getDate(timestamp) {
  if (isNumeric(timestamp) && POSITIVE_INTEGER.test(timestamp.toString())) {
    const date = new Date(timestamp)
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${date.getFullYear()}-${month > 9 ? month : `0${month}`}-${day > 9 ? day : `0${day}`}`
  }
  return null
}

export function getFileSize(number) {
  if (!isNumeric(number)) {
    return 'NA bytes'
  }
  if (number < 1024) {
    return `${number} bytes`
  }
  if (number > 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(2)} KB`
  }
  if (number > 1048576) {
    return `${(number / 1048576).toFixed(2)} MB`
  }
}

export function isImage(type) {
  return IMAGE_FILE.test(type)
}

export function isEmptyObj(obj) {
  if (!isPlainObject(obj)) return true
  return JSON.stringify(obj) === '{}'
}

export function isPromiseLike(promiseLike) {
  return (
    promiseLike !== null &&
    (typeof promiseLike === 'object' || typeof promiseLike === 'function') &&
    typeof promiseLike.then === 'function'
  )
}

export function isBlobFile(file) {
  const ft = Object.prototype.toString.call(file)
  return ft === '[object File]' || ft === '[object Blob]'
}

export function getFileFromList(file, fileList) {
  return fileList.find((e) => e.uuid === file.uuid)
}

export function cloneFileWithInfo(file) {
  return {
    ...file,
    lastModified: file.lastModified,
    lastModifiedDate: file.lastModifiedDate,
    name: file.name,
    size: file.size,
    type: file.type,
    uuid: file.uuid,
    percent: 0,
    originFile: file,
  }
}

export function removeFile(file, fileList) {
  const remains = fileList.filter((item) => item.uuid !== file.uuid)
  if (remains.lenth === fileList.length) {
    return null
  }
  return remains
}

export function getFileExtension(filename) {
  if (!isString(filename)) return ''
  const idx = filename.lastIndexOf('.')
  if (idx === -1) return ''
  return filename.substr(idx + 1)
}
