function getError(option, xhr) {
  const msg = `Can't ${option.method} ${option.action} ${xhr.status}`
  const err = new Error(msg)
  return {
    ...err,
    status: xhr.status,
    method: option.method,
    url: option.action,
  }
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}

export default function upload(option) {
  const xhr = new XMLHttpRequest()

  if (option.onProgress && xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = (e.loaded / e.total) * 100
      }
      option.onProgress(e)
    }
  }

  const formData = new FormData()

  if (option.data) {
    Object.keys(option.data).forEach((key) => {
      const value = option.data[key]
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(`${key}[]`, item)
        })
        return
      }

      formData.append(key, option.data[key])
    })
  }

  if (option.file instanceof Blob) {
    formData.append(option.filename, option.file, option.file.name)
  } else {
    formData.append(option.filename, option.file)
  }

  xhr.onerror = function error(e) {
    option.onError(e)
  }

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(option, xhr), getBody(xhr))
    }

    return option.onSuccess(getBody(xhr), xhr)
  }

  xhr.open(option.method, option.action, true)

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true
  }

  const headers = option.headers || {}

  if (headers['X-Requested-With'] !== null) {
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
  }

  Object.keys(headers).forEach((header) => {
    if (headers[header] !== null) {
      xhr.setRequestHeader(header, headers[header])
    }
  })

  xhr.send(formData)

  return {
    abort() {
      xhr.abort()
    },
  }
}
