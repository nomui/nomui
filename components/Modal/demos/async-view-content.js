define([], function () {
  return () => {
    let info = null

    const asyncGetInfo = () => {
      const p = new Promise(function (resolve) {
        resolve({ title: '我是标题', content: '我是内容' })
      })

      return p.then((result) => {
        info = result
      })
    }

    return asyncGetInfo().then(() => {
      return {
        header: {
          caption: { title: info.title },
        },
        body: {
          children: info.content,
        },
      }
    })
  }
})
