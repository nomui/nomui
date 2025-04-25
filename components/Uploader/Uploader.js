import Component from '../Component/index'
import Field from '../Field/index'
import { isFunction, isNotEmptyArray } from '../util/index'
import FileList from './FileList'
import {
  DEFAULT_ACCEPT,
  cloneFileWithInfo,
  getFileFromList,
  getUUID,
  isBlobFile,
  isPromiseLike,
  removeFile,
} from './helper'
import Request from './request'

class Uploader extends Field {
  constructor(props, ...mixins) {
    super(Component.extendProps(Uploader.defaults, props), ...mixins)
    this.reqs = {}
    this.onChange.bind(this)
    this._changeUploadMode.bind(this)
  }

  _created() {
    // this.fileList = this.props.fileList || this.props.defaultFileList
    this._updateFile = null
    this._updateFileIcon = []
    super._created()
  }

  _config() {
    const that = this
    // const { disabled, accept, button: cButton, multiple, files } = this.props;
    const {
      disabled,
      accept,
      button,
      multiple,
      extraAction,
      display,
      allowUpdate,
      onRemove,
      renderer,
      customizeInfo,
      actionRender,
      showList,
      value,
    } = this.props
    const customTrigger = actionRender || button
    this.fileList = this.props.fileList || this.props.defaultFileList

    if (value) {
      // 统一转为数组
      const files = Array.isArray(value) ? value : [value]

      files.forEach((file) => {
        if (!file || typeof file !== 'object') return

        // 直接传入原始file对象，_isInArray内部会处理比较逻辑
        if (!this._isInArray(this.fileList, file)) {
          const newFile = { ...file }
          if (newFile.status === undefined) {
            newFile.status = 'done'
          }
          this.fileList.push(newFile)
        }
      })
    }

    this.acceptList = accept ? this.getAcceptList() : ''

    let initializing = true
    if (isPromiseLike(that.fileList)) {
      that.fileList.then((fs) => {
        initializing = false
        that.fileList = fs

        if (!disabled && this.customTrigger) {
          that.customTrigger.enable()
        }
        that.list && that.list.update({ initializing: false, files: this.fileList })
      })
    } else {
      initializing = false
    }
    const children = []

    const defaultButtonProps = {
      component: 'Button',
      text: this.props.uploadText,
      icon: 'upload',
    }

    const inputUploader = {
      tag: 'input',
      hidden: true,
      _created() {
        that.inputFile = this
      },
      attrs: {
        type: 'file',
        multiple: multiple,
        accept: accept || DEFAULT_ACCEPT,
        onchange: that._onChange.bind(that),
        onclick: (e) => {
          e.stopPropagation()
        },
      },
    }

    children.push(inputUploader)
    let triggerButton = customTrigger
    if (!triggerButton && triggerButton !== false) triggerButton = defaultButtonProps

    const defaults = {
      disabled: disabled || initializing,
      // disabled,
      ref: (c) => {
        that.customTrigger = c
      },
      attrs: {
        onclick() {
          that._handleClick()
        },
        onKeyDown(e) {
          that._onKeyDowne(e)
        },
      },
    }
    if (triggerButton !== false) {
      if (isFunction(customTrigger)) {
        triggerButton = customTrigger()
      }
      triggerButton = Component.extendProps(defaults, triggerButton)
      children.push(triggerButton)
    }
    if (showList) {
      if (display) {
        if (initializing || (this.fileList && this.fileList.length > 0)) {
          children.push({
            component: FileList,
            classes: {
              'nom-file-list-only': triggerButton === false,
            },
            ref: (c) => {
              that.list = c
            },
            initializing,
            files: this._getDisplayFileList,
            renderer,
            onRemove: onRemove &&
              isFunction(onRemove.action) && {
                ...onRemove,
                action: that.handleRemove.bind(that),
              },
            allowUpdate,
            extraAction,
            customizeInfo,
          })
        }
      }
    } else if (this.fileList && this.fileList.length) {
      if (this.fileList[0].status === 'uploading' && !this._updateFileIcon.includes('loading')) {
        triggerButton.children.push({
          component: 'Icon',
          type: 'loading',
          classes: {
            'file-loading-img': true,
          },
        })
        this._updateFileIcon.push('loading')
      } else if (
        this.fileList[0].status === 'done' &&
        !this._updateFileIcon.includes('close-circle')
      ) {
        triggerButton.tooltip = this.props.reUploadText
        this._updateFileIcon.push('close-circle')
        this._updateFileIcon.splice(this._updateFileIcon.indexOf('error'), 1)
        this.deleteIcon('loading', triggerButton)
      } else if (this.fileList[0].status === 'error' && !this._updateFileIcon.includes('error')) {
        this.deleteIcon('loading', triggerButton)
        new nomui.Message({
          content: this.props.uploadFailText,
          type: 'error',
        })
      }
      if (this.fileList[0].status !== 'uploading') {
        this._updateFileIcon.splice(this._updateFileIcon.indexOf('loading'), 1)
      }
    } else {
      this.deleteIcon('close-circle', triggerButton)
    }
    this.setProps({
      control: {
        children,
      },
    })

    super._config()
  }

  _getDisplayFileList() {
    const { display, multiple, showList } = this.props

    if ((display === 'replace' && !multiple) || !showList) {
      return this.fileList.length > 0 ? this.fileList.slice(-1) : []
    }

    return this.fileList
  }

  _isInArray(arr, target) {
    const { fileResponseAsValue } = this.props

    return arr.some((item) => {
      if (fileResponseAsValue) {
        // 直接比较整个对象
        return this._isEqual(item, target)
      }
      // 比较response对象
      return (
        item.response !== undefined &&
        target.response !== undefined &&
        this._isEqual(item.response, target.response)
      )
    })
  }

  /**
   * 检查对象 a 是否包含对象 b 的所有字段且值相同
   * @param {Object} a - 源对象
   * @param {Object} b - 目标对象（以它的 keys 为基准）
   * @returns {boolean} 是否匹配
   */
  _isEqual(a, b) {
    // 如果 b 是 undefined/null，直接返回 false
    if (b === undefined || b === null) return false

    const keys = Object.keys(b)
    // 如果 b 是空对象，默认返回 false
    if (keys.length === 0) return false

    return keys.every((key) => {
      // 检查 a 是否存在该 key，且值是否与 b 相同
      return a !== undefined && a !== null && a[key] === b[key]
    })
  }

  deleteIcon(name, file) {
    this._updateFileIcon.splice(this._updateFileIcon.indexOf(name), 1)
    const index = file.children.findIndex((element) => element.type === name)
    if (index > 0) file.children.splice(index, 1)
  }

  getAcceptList() {
    if (this.props.accept) {
      return this.props.accept
        .replace('image/*', '.jpg,.png,.gif,.jpeg,.jp2,.jpe,.bmp,.tif,.tiff')
        .replace('video/*', '.3gpp,.mp2,.mp3,.mp4,.mpeg,.mpg')
        .replace('audio/*', '.3gpp,.ac3,.asf,.au,.mp2,.mp3,.mp4,.ogg')
    }
  }

  checkType(file) {
    if (!this.props.accept) {
      return true
    }
    if (!file || !file.name) {
      return false
    }
    const { name } = file
    const type = name.substring(name.lastIndexOf('.')).toLowerCase()
    if (this.acceptList.toLowerCase().includes(type)) {
      return true
    }
    return false
  }

  _onChange(e) {
    const { files } = e.target
    const uploadedFiles = this.fileList
    this.uploadFiles(files, uploadedFiles)
  }

  uploadFiles(files, uploadedFiles) {
    // 转为数组
    let fileList = Array.from(files)
    const uploadedFileList = Array.from(uploadedFiles)

    if (this._updateFile) {
      fileList = fileList.map((e) => {
        e.uuid = this._updateFile
        e.uploadTime = new Date().getTime()
        return e
      })

      uploadedFiles.map((file) => {
        if (file.uuid === this._updateFile) {
          const f = fileList[0] || []
          f.uuid = this._updateFile
          return f
        }
        return file
      })
    } else {
      fileList = fileList.map((e) => {
        if (!e.uuid) {
          e.uuid = getUUID()
        }
        e.uploadTime = new Date().getTime()
        return e
      })
    }

    fileList.forEach((file) => {
      this.upload(file, [...uploadedFileList, ...fileList])
    })
  }

  upload(file, fileList) {
    const beforeUpload = this.props.beforeUpload
    if (!this.checkType(file)) {
      new nomui.Alert({
        title: this.props.unSupportedTypeText,
      })
      return
    }
    if (!beforeUpload) {
      Promise.resolve().then(() => this.post(file))
      return
    }

    const before = beforeUpload(file, fileList)
    if (this.inputFile && this.inputFile.element) this.inputFile.element.value = ''
    if (isPromiseLike(before)) {
      before.then((pFile) => {
        if (isBlobFile(pFile)) {
          this.post(pFile)
          return
        }
        this.post(file)
      })
    } else if (before !== false) {
      Promise.resolve().then(() => {
        this.post(file)
      })
    }
  }

  post(file) {
    if (!this.rendered) {
      return
    }

    const that = this
    const { props } = this
    new Promise((resolve) => {
      const actionRet = this.props.action
      resolve(isFunction(actionRet) ? actionRet(file) : actionRet)
    }).then((action) => {
      const { data, method, headers, withCredentials } = props
      const option = {
        action,
        data,
        file,
        filename: props.fileFieldName || props.name,
        method,
        headers,
        withCredentials,
        onProgress: (e) => {
          that.onProgress(e, file)
        },
        onSuccess: (ret, xhr) => {
          that.onSuccess(ret, file, xhr)
        },
        onError: (err, ret) => {
          that.onError(err, ret, file)
        },
      }
      this.onStart(file)
      this.reqs[file.uuid] = Request(option)
      this._updateFile = null
      this._changeUploadMode()
    })
  }

  onChange(info) {
    // 更新列表
    this.fileList = info.fileList
    const { onChange: onChangeProp } = this.props
    this.update({ fileList: [...info.fileList] })

    if (this.customTrigger) {
      const disableBtn = this.fileList.some((file) =>
        ['removing', 'uploading', 'updating'].includes(file.status),
      )

      if (!this.props.disabled) {
        disableBtn ? this.customTrigger.disable() : this.customTrigger.enable()
      }
    }

    if (onChangeProp) {
      onChangeProp({
        ...info,
        sender: this,
        fileList: [...this.fileList],
      })
    }
  }

  onStart(file) {
    const uploadFile = cloneFileWithInfo(file)
    uploadFile.status = this._updateFile ? 'updating' : 'uploading'

    // 这里要改
    const nextFileList = Array.from(this.fileList)

    const findIndex = nextFileList.findIndex((f) => f.uuid === uploadFile.uuid)
    if (findIndex === -1) {
      nextFileList.push(uploadFile)
    } else {
      nextFileList[findIndex] = uploadFile
    }

    this.onChange({
      file: uploadFile,
      fileList: nextFileList,
    })
  }

  onProgress(e, file) {
    const uploadingFile = getFileFromList(file, this.fileList)
    if (!uploadingFile) {
      return
    }

    uploadingFile.percent = e.percent
    this.onChange({
      event: e,
      file: uploadingFile,
      fileList: [...this.fileList],
    })
  }

  onSuccess(response, file, xhr) {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }

    const uploadFile = getFileFromList(file, this.fileList)
    if (!uploadFile) {
      return
    }

    uploadFile.response = response
    uploadFile.status = 'done'
    uploadFile.xhr = xhr

    this.onChange({
      file: uploadFile,
      fileList: [...this.fileList],
    })
    this._onValueChange()
  }

  onError(error, response, file) {
    const uploadFile = getFileFromList(file, this.fileList)
    if (!uploadFile) {
      return
    }

    uploadFile.error = error
    uploadFile.status = 'error'
    uploadFile.response = response

    this.onChange({
      file: uploadFile,
      fileList: [...this.fileList],
    })
  }

  handleRemove({ sender, file }) {
    const {
      onRemove: { action },
    } = this.props
    // removing
    file.status = 'removing'
    this.fileList = this.fileList.map((f) =>
      f.uuid === file.uuid ? { ...f, status: 'removing' } : f,
    )
    this.onChange({
      file,
      fileList: this.fileList,
    })

    Promise.resolve(isFunction(action) ? action({ sender, file }) : action).then((ret) => {
      if (ret === false) {
        return
      }

      const remainsFileList = removeFile(file, this.fileList)
      if (remainsFileList) {
        file.status = 'removed'
        this.fileList = remainsFileList
        if (this.reqs[file.uuid]) {
          this.reqs[file.uuid].abort()
          delete this.reqs[file.uuid]
        }
      }

      this.onChange({
        file,
        fileList: remainsFileList,
      })
      this._onValueChange()
    })
  }

  _handleUpdate({ file }) {
    if (file && file.uuid) {
      this._updateFile = file.uuid
    }
    this._changeUploadMode()
    this._handleClick(file)
  }

  _changeUploadMode() {
    if (this.inputFile && this.inputFile.element) {
      if (this._updateFile) {
        this.inputFile.element.multiple = false
      } else {
        this.inputFile.element.multiple = this.props.multiple
      }
    }
  }

  _handleClick() {
    if (this.inputFile) {
      this.inputFile.element.click()
    }
  }

  _onkeyDown(e) {
    if (e.eky === 'Enter') {
      this._handleClick()
    }
  }

  _getValue() {
    const { fileResponseAsValue, multiple } = this.props
    if (fileResponseAsValue === true) {
      if (isNotEmptyArray(this.fileList)) {
        if (!multiple) {
          return this.fileList[0].response || null
        }
        return this.fileList.map((item) => item.response)
      }
    }

    const _result = this.fileList.filter(({ status }) => status === 'done')
    if (!_result.length) {
      return null
    }
    return _result
  }

  focus() {
    this.element.scrollIntoView()
    super.focus()
  }
}

Uploader.defaults = {
  // 测试地址
  action: '',
  disabled: false,
  beforeUpload: null,
  button: null,
  defaultFileList: [],
  multiple: false,
  name: 'file',
  fileFieldName: 'file',
  display: true,
  data: {},
  // request option
  method: 'post',
  headers: {},
  withCredentials: false,
  allowUpdate: false,
  onRemove: null,
  renderer: null,
  extraAction: [],
  customizeInfo: null,
  actionRender: null,
  showList: true,
  uploadText: '上传',
  uploadFailText: '上传失败！',
  reUploadText: '重新上传可完成覆盖。',
  unSupportedTypeText: '不支持此格式，请重新上传。',
  removeText: '删除',
  updateText: '更新',
  updateTimeText: '更新日期',
  fileResponseAsValue: false,
  getValueAsArray: true,
}

Component.register(Uploader)

export default Uploader
