define([], function () {
  return {
    title: '裸水印层',
    file: 'watermarkmask',
    description: '',
    demo: function () {
      return {
        attrs: {
          style: {
            height: '500px'
          }
        },
        watermarkMask: {
          image: null,
          text: 'NomUI Watermark Mask',
        },
        children: 'NomUI Watermark',
      }
    },
  }
})
