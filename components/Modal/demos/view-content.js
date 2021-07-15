define([], function () {
  return ({ modal, args }) => {
    const { name, description } = args
    return {
      header: {
        caption: { title: name },
      },
      body: {
        children: description,
      },
      onOk: () => {
        modal.close()
      },
    }
  }
})
