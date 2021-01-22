define(['./_service.js'], function (service) {
  const { generate, check } = service

  let slideCaptchaRef

  function refreshSlideImage() {
    generate().then((result) => {
      slideCaptchaRef.update({
        token: result.token,
        bgSrc: result.normal,
        captchSrc: result.small,
        width: result.imgx,
        height: result.imgy,
        top: result.y,
      })
    })
  }

  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'SlideCaptcha',
        ref: (c) => {
          slideCaptchaRef = c
        },
        onRefresh: function () {
          refreshSlideImage()
        },
        validate: function (result) {
          return check(result)
        },
        onFinish: function () {},
        _created: function () {
          refreshSlideImage()
        },
      }
    },
  }
})
