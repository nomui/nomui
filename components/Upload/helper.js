import { isNumeric } from '../util/index'

export const DEFAULT_ACCEPT =
  'image/*,application/msword,application/pdf,application/x-rar-compressed,application/vnd.ms-excel,application/vnd.ms-powerpoint,application/vnd.ms-works,application/zip,audio/*,video/*,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.wordprocessingml.template,application/vnd.ms-word.document.macroEnabled.12,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.openxmlformats-officedocument.spreadsheetml.template,application/vnd.ms-excel.sheet.macroEnabled.12,application/vnd.ms-excel.template.macroEnabled.12,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.openxmlformats-officedocument.presentationml.template,application/vnd.openxmlformats-officedocument.presentationml.slideshow,application/vnd.ms-powerpoint.addin.macroEnabled.12,application/vnd.ms-powerpoint.presentation.macroEnabled.12,application/vnd.ms-powerpoint.slideshow.macroEnabled.12,application/csv'

export function getUUID() {
  return `nom-upload-${Math.random().toString().substr(2)}`
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
