define([], function () {
  return {
    title: '实例',
    file: 'basic',
    demo: function () {
      return {
        component: 'Carousel',
        imgs: [
          'https://i.ibb.co/drkfvC7/1b43a2d12152d91d2053f32e1c73ef3c.jpg',
          'https://i.ibb.co/85pc4hd/3c910376717d86c4f65bb8893e3cdf8c.jpg',
          'https://i.ibb.co/nL48Ryv/607874157c7262319df60c60828c0136.jpg',
          'https://i.ibb.co/nzPj3N3/S.jpg',
          'https://i.ibb.co/b6RQXrD/7c37f209b6a696a58d6a5a52b2833d1d.jpg',
        ],
        height: 500,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 1000,
        speed: 300,
        dots: true,
        defaultActiveIndex: 1,
        easing: 'linear',
        pauseOnHover: true,
        triggerType: 'click',
      }
    },
  }
})
