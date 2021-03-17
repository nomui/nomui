import Component from '../Component/index'
import Field from '../Field/index'
import { isFunction } from '../util/index'
import FileList from './FileList'
import {
  cloneFileWithInfo,
  DEFAULT_ACCEPT,
  getFileFromList,
  getUUID,
  isBlobFile,
  isPromiseLike,
  removeFile,
} from './helper'
import Request from './request'

class Uploader extends Field {
  constructor(props, ...mixins) {
    const defaults = {
      // 测试地址
      action: '',
      disabled: false,
      beforeUpload: null,
      button: null,
      defaultFileList: [],
      multiple: true,
      name: 'file',
      display: true,
      data: {},
      // request option
      method: 'post',
      headers: {},
      withCredentials: false,
      onRemove: null,
      renderer: null,
      extraAction: [],
    }
    super(Component.extendProps(defaults, props), ...mixins)
    this.reqs = {}
  }

  _created() {
    this.fileList = this.props.defaultFileList
  }

  _config() {
    const that = this
    // const { disabled, accept, button: cButton, multiple, files } = this.props;
    const {
      disabled,
      accept,
      button: cButton,
      multiple,
      extraAction,
      display,
      onRemove,
      renderer,
    } = this.props

    let initializing = true
    if (isPromiseLike(this.fileList)) {
      this.fileList.then((fs) => {
        initializing = false
        this.fileList = fs

        if (!disabled && this.button) {
          this.button._enable()
        }
        this.list.update({ initializing: false, files: this.fileList })
      })
    } else {
      initializing = false
    }
    const children = []

    const defaultButtonProps = {
      component: 'Button',
      text: '上传',
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

    let button = cButton
    if (!button && button !== false) button = defaultButtonProps

    if (button !== false) {
      button = {
        ...button,
        disabled: disabled || initializing,
        // disabled,
        ref: (c) => {
          this.button = c
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
      children.push(button)
    }

    // if (display && files && files.length > 0) {
    //   console.log('display')
    //   children.push({
    //     component: FileList,
    //     initializing,
    //     files,
    //     onRemove: this.handleRemove.bind(that),
    //     extraAction,
    //   })
    // }
    if (display) {
      if (initializing || (this.fileList && this.fileList.length > 0)) {
        children.push({
          component: FileList,
          classes: {
            'nom-file-list-only': button === false,
          },
          ref: (c) => {
            this.list = c
          },
          initializing,
          files: this.fileList,
          renderer,
          onRemove: onRemove &&
            isFunction(onRemove.action) && {
              ...onRemove,
              action: that.handleRemove.bind(that),
            },
          extraAction,
        })
      }
    }

    this.setProps({
      control: {
        children,
      },
    })

    super._config()
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
    fileList = fileList.map((e) => {
      if (!e.uuid) {
        e.uuid = getUUID()
      }
      e.uploadTime = new Date().getTime()
      return e
    })

    fileList.forEach((file) => {
      this.upload(file, [...uploadedFileList, ...fileList])
    })
  }

  upload(file, fileList) {
    const beforeUpload = this.props.beforeUpload
    if (!beforeUpload) {
      Promise.resolve().then(() => this.post(file))
      return
    }

    const before = beforeUpload(file, fileList)
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
        filename: props.name,
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
    })
  }

  onChange(info) {
    // 更新列表
    this.fileList = info.fileList

    const { onChange: onChangeProp } = this.props
    this.update({ fileList: [...info.fileList] })

    if (this.button) {
      const disableBtn = this.fileList.some((file) =>
        ['removing', 'uploading'].includes(file.status),
      )

      if (!this.props.disabled) {
        disableBtn ? this.button._disable() : this.button._enable()
      }
    }

    if (onChangeProp) {
      onChangeProp({
        ...info,
        fileList: [...this.fileList],
      })
    }
  }

  onStart(file) {
    const uploadFile = cloneFileWithInfo(file)
    uploadFile.status = 'uploading'

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

  handleRemove(e, file) {
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

    Promise.resolve(isFunction(action) ? action(e, file) : action).then((ret) => {
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
    })
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
}

Component.register(Uploader)

export default Uploader
