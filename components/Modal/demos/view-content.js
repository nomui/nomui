define([], function () {

  return function (modal) {

    return {
      header: {
        caption: { title: '标题' },
      },
      body: {
        children: '内容',
      },
      onOk: () => {
        modal.close()
      }
    }

  }

})
