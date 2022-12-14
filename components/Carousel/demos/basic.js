define([], function () {
  return {
    title: '实例',
    file: 'basic',
    demo: function () {
      return {
        component: 'Carousel',
        imgs: [
          'https://pic2.zhimg.com/80/v2-0fb7738fb1c8ed2e4c0782a8344fa9b1_r.jpg',
          'https://pic4.zhimg.com/80/v2-66b950756852a81cbfb89617c6bb52fa_r.jpg',
          'https://pic1.zhimg.com/80/v2-46bcf5ceb1c4ee767b2b53c152532f4b_r.jpg',
          'https://pic4.zhimg.com/80/v2-c9b1cd29bbd3230fe30b9ef078a3de4e_r.jpg',
          'https://pic1.zhimg.com/80/v2-c589a8fd036cf547de7fc79dc05e6109_r.jpg',
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
    description:
      '当内容空间不足时，可以用走马灯的形式进行收纳，进行轮播展现',

  }
})
