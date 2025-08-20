define([], function () {
  return {
    title: '实例',
    file: 'basic',
    demo: function () {
      let carouselRef = null
      return {
        component: 'Flex',
        rows: [
          {
            component: 'Carousel',
            ref: (c) => {
              carouselRef = c
            },
            imgs: [
              'https://pic2.zhimg.com/80/v2-0fb7738fb1c8ed2e4c0782a8344fa9b1_r.jpg',
              'https://pic4.zhimg.com/80/v2-66b950756852a81cbfb89617c6bb52fa_r.jpg',
              'https://pic1.zhimg.com/80/v2-46bcf5ceb1c4ee767b2b53c152532f4b_r.jpg',
            ],
            height: 500,
            arrows: true,
            autoplay: true,
            autoplaySpeed: 8000,

            triggerType: 'click',
          },
          {
            component: 'Button',
            text: 'change',
            onClick: () => {
              carouselRef.update({
                imgs: [
                  'https://pic1.zhimg.com/80/v2-46bcf5ceb1c4ee767b2b53c152532f4b_r.jpg',
                  'https://pic4.zhimg.com/80/v2-c9b1cd29bbd3230fe30b9ef078a3de4e_r.jpg',
                  'https://pic1.zhimg.com/80/v2-c589a8fd036cf547de7fc79dc05e6109_r.jpg',
                ],
              })
            },
          },
        ],
      }
    },
  }
})
