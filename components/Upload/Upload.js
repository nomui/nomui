import Component from '../Component/index'
import { isFunction, isString } from '../util/index'
import { DEFAULT_ACCEPT, cloneFileWithInfo, getFileFromList, getUUID, isBlobFile } from './helper'
import Request from './request'

class Upload extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Upload.defaults, props), ...mixins)
  }

  _created() {
    this.reqs = {}
    this.failedFileList = []
    this.unSupportedFileList = []
    this.inQueueIds = []
  }

  _config() {
    const that = this

    const { disabled, accept, multiple, trigger, draggable } = this.props

    this.fileList = this.props.fileList || this.props.defaultFileList

    this.acceptList = accept ? this._getAcceptList() : ''

    let initializing = true
    if (nomui.utils.isPromiseLike(that.fileList)) {
      that.fileList.then((res) => {
        initializing = false
        that.fileList = res

        that.props.onChange &&
          that._callHandler(that.props.onChange, { file: null, fileList: that.fileList })
        if (!disabled && this.triggerRef) {
          that.triggerRef.enable()
        }
      })
    } else {
      initializing = false
    }

    this._watchStatus()

    const defaults = {
      disabled: disabled || initializing,
      // disabled,
      ref: (c) => {
        that.triggerRef = c
      },
      classes: {
        'nom-upload-trigger': true,
      },
      attrs: {
        onclick() {
          !disabled && that._handleClick()
        },
        ondrop(e) {
          !disabled && draggable && that._onFileDrop(e)
        },
        ondragover(e) {
          e.preventDefault()
        },
      },
    }

    const defaultBtn = {
      component: 'Button',
      text: this.props.uploadText,
    }

    const triggerProps = Component.extendProps(defaults, trigger || defaultBtn)

    const folderAttrs = this.props.folder
      ? {
          webkitdirectory: true,
          mozdirectory: true,
          msdirectory: true,
          odirectory: true,
          directory: true,
        }
      : {}

    this.setProps({
      children: [
        {
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
            ...folderAttrs,
          },
        },
        triggerProps,
      ],
    })
  }

  getData() {
    return this.fileList
  }

  disable() {
    this.triggerRef.disable()
  }

  enable() {
    this.triggerRef.enable()
  }

  pickFile() {
    this._handleClick()
  }

  _watchStatus(file) {
    if (file) {
      const currentStatus = file.status
      const allList = this.fileList || []
      const allStats = allList.map((n) => {
        return n.status
      })
      const noUploading = !allStats.includes('uploading')
      if (currentStatus === 'uploading') {
        this._showLoading()
      } else if (currentStatus === 'done') {
        this._cancleLoading(noUploading)
      } else if (currentStatus === 'error') {
        this._cancleLoading(noUploading)
        if (this.props.showErrorMsg) {
          new nomui.Message({
            content:
              isString(file.response) && file.response.length
                ? file.response
                : this.props.uploadFailText,
            type: 'error',
          })
        }
      }
    } else {
      this._cancleLoading(true)
    }
  }

  _showLoading() {
    if (!this.loading) {
      this.loading = new nomui.Loading({
        container: this.triggerRef,
      })
    }
  }

  _cancleLoading(flag) {
    if (flag && this.loading) {
      this.loading.remove()
      this.loading = null
    }
  }

  _getAcceptList() {
    if (this.props.accept) {
      return this.props.accept
        .replace('image/*', '.jpg,.png,.gif,.jpeg,.jp2,.jpe,.bmp,.tif,.tiff')
        .replace('video/*', '.3gpp,.mp2,.mp3,.mp4,.mpeg,.mpg')
        .replace('audio/*', '.3gpp,.ac3,.asf,.au,.mp2,.mp3,.mp4,.ogg')
    }
  }

  _checkType(file) {
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
    this._uploadFiles(files, uploadedFiles)

    if (this.inputFile && this.inputFile.element) {
      this.inputFile.element.value = ''
    }
  }

  _uploadFiles(files, uploadedFiles) {
    this.inQueueIds = []
    // 转为数组
    let fileList = Array.from(files)
    const uploadedFileList = Array.from(uploadedFiles)

    fileList = fileList.map((e) => {
      if (!e.uuid) {
        e.uuid = getUUID()
      }
      e.uploadTime = new Date().getTime()
      this.inQueueIds.push(e.uuid)
      return e
    })

    this.failedFileList = []
    this.unSupportedFileList = []

    this.props.onStart && this._callHandler(this.props.onStart, { files: fileList, uploadedFiles })

    fileList.forEach((file) => {
      this._upload(file, [...uploadedFileList, ...fileList])
    })
  }

  _upload(file, fileList) {
    const beforeUpload = this.props.beforeUpload
    if (!this._checkType(file)) {
      if (this.props.showErrorMsg) {
        new nomui.Alert({
          title: this.props.unSupportedTypeText,
        })
      }
      this.unSupportedFileList.push(file)
      this._callHandler(this.props.onTypeCheckFailed, { file, list: this.unSupportedFileList })

      let status = 'pending'

      if (
        this.fileList.filter((x) => {
          return x.status === 'done' && this.inQueueIds.includes(x.uuid)
        }).length +
          this.failedFileList.length +
          this.unSupportedFileList.length ===
        this.inQueueIds.length
      ) {
        status = 'done'
      }

      if (this.props.onChange) {
        this._callHandler(this.props.onChange, {
          file: file,
          fileList: [...this.fileList],
          failedFileList: this.failedFileList,
          unSupportedFileList: this.unSupportedFileList,
          status,
        })
      }

      return
    }
    if (!beforeUpload) {
      Promise.resolve().then(() => this._post(file))
      return
    }

    const before = beforeUpload(file, fileList)
    if (this.inputFile && this.inputFile.element) this.inputFile.element.value = ''
    if (nomui.utils.isPromiseLike(before)) {
      before.then((pFile) => {
        if (isBlobFile(pFile)) {
          this._post(pFile)
          return
        }
        this._post(file)
      })
    } else if (before !== false) {
      Promise.resolve().then(() => {
        this._post(file)
      })
    }
  }

  _post(file) {
    if (!this.rendered) {
      return
    }

    const that = this
    const { props } = this
    const { uuid } = file
    new Promise((resolve) => {
      const actionRet = this.props.action
      resolve(isFunction(actionRet) ? actionRet(file) : actionRet)
    }).then((action) => {
      const { data, method, headers, withCredentials } = props
      const option = {
        action,
        file,
        filename: props.name,
        data,
        method,
        headers,
        withCredentials,
        onProgress: (e) => {
          that._onProgress(e, file)
        },
        onSuccess: (ret, xhr) => {
          that._onSuccess(ret, file, xhr)
        },
        onError: (err, ret) => {
          that._onError(err, ret, file)
          that.reqs[uuid] && delete that.reqs[uuid]
        },
      }
      this._onStart(file)
      this.reqs[uuid] = Request(option)
    })
  }

  _watchChange({ file, fileList }) {
    // 更新列表
    this.fileList = fileList

    this._watchStatus(file)

    if (this.triggerRef) {
      const disableBtn = this.fileList.some((n) => ['removing', 'uploading'].includes(n.status))

      if (!this.props.disabled) {
        disableBtn ? this.triggerRef.disable() : this.triggerRef.enable()
      }
    }

    let status = 'pending'

    if (
      this.fileList.filter((x) => {
        return x.status === 'done' && this.inQueueIds.includes(x.uuid)
      }).length +
        this.failedFileList.length +
        this.unSupportedFileList.length ===
      this.inQueueIds.length
    ) {
      status = 'done'
    }

    if (this.props.onChange) {
      this._callHandler(this.props.onChange, {
        file,
        fileList: [...this.fileList],
        failedFileList: this.failedFileList,
        unSupportedFileList: this.unSupportedFileList,
        status,
      })
    }
  }

  _onStart(file) {
    const currentFile = cloneFileWithInfo(file)
    currentFile.status = 'uploading'

    // 这里要改
    const fileList = Array.from(this.fileList)

    const findIndex = fileList.findIndex((f) => f.uuid === currentFile.uuid)
    if (findIndex === -1) {
      fileList.push(currentFile)
    } else {
      fileList[findIndex] = currentFile
    }

    this._watchChange({
      file: currentFile,
      fileList: fileList,
    })
  }

  _onProgress(e, file) {
    const currentFile = getFileFromList(file, this.fileList)
    if (!currentFile) {
      return
    }

    currentFile.percent = e.percent
    this._watchChange({
      event: e,
      file: currentFile,
      fileList: [...this.fileList],
    })
  }

  _onSuccess(response, file, xhr) {
    try {
      if (typeof response === 'string') {
        response = JSON.parse(response)
      }
    } catch (e) {
      /* do nothing */
    }

    const currentFile = getFileFromList(file, this.fileList)
    if (!currentFile) {
      return
    }

    currentFile.response = response
    currentFile.status = 'done'
    currentFile.xhr = xhr

    this._watchChange({
      file: currentFile,
      fileList: [...this.fileList],
    })
  }

  _onError(error, response, file) {
    const currentFile = getFileFromList(file, this.fileList)
    if (!currentFile) {
      return
    }

    this.fileList = this.fileList.filter((n) => {
      return n.uuid !== file.uuid
    })

    currentFile.error = error
    currentFile.status = 'error'
    currentFile.response = response

    if (
      this.failedFileList.findIndex((x) => {
        return x.uuid === file.uuid
      }) === -1
    ) {
      this.failedFileList.push({ ...currentFile, response })
    }

    this._watchChange({
      file: currentFile,
      fileList: [...this.fileList],
    })
  }

  _handleClick() {
    if (this.inputFile) {
      this.inputFile.element.click()
    }
  }

  _onFileDrop = (e) => {
    const { multiple } = this.props
    e.preventDefault()
    if (e.type === 'dragover') {
      return
    }
    let files = [...e.dataTransfer.files]
    if (multiple === false) {
      files = files.slice(0, 1)
    }
    this._uploadFiles(files, this.fileList)
  }
}

Upload.defaults = {
  reference: 'body',
  action: '',
  disabled: false,
  beforeUpload: null,
  trigger: null, // 按钮界面
  draggable: false, // 拖拽界面
  defaultFileList: [], // 默认上传文件列表
  multiple: false,
  folder: false,
  name: 'file',
  data: {},
  // request option
  method: 'post',
  headers: {},
  withCredentials: false,
  onChange: null,
  onStart: null,
  uploadText: '上传',
  uploadFailText: '上传失败！',
  showErrorMsg: true,
  onTypeCheckFailed: null,
  unSupportedTypeText: '不支持此格式，请重新上传。',
}

Component.register(Upload)

export default Upload
