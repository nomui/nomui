define([], function () {
  return {
    title: '弹出其他视图',
    file: 'view',
    description:
      '当 `content` 配置的值为字符串时，代表一个指向某个 js 模块（视图）的 url，当模态框的内容比较复杂或者可多处复用时，将模态框内容分离到独立的 js 模块是一个好的代码实践，这样模态框的内容低耦合高内聚，方便维护。独立出来的 js 模块返回一个函数，函数的参数是一个对象`{ modal, args }` 其中 modal 是模态框自身的实例，args 是模态框调用方传递的参数（通过 args prop）。',
    demo: function () {
      return {
        component: 'Flex',
        gap: 'small',
        rows: [
          {
            children: '金庸小说介绍',
          },
          {
            gap: 'small',
            cols: [
              {
                component: 'Button',
                name: 'button',
                text: '笑傲江湖',
                attrs: {
                  onclick: function () {
                    new nomui.Modal({
                      content: '/components/Modal/demos/view-content.js',
                      args: {
                        name: '笑傲江湖',
                        description:
                          '《笑傲江湖》是中国现代作家金庸创作的一部长篇武侠小说，开始创作于1967年并连载于《明报》，1969年完成。这部小说通过叙述华山派大弟子令狐冲的江湖经历，反映了武林各派争霸夺权的历程。作品没有设置时代背景，“类似的情景可以发生在任何朝代”，折射出中国人独特的政治斗争状态，同时也表露出对斗争的哀叹，具有一定的政治寓意。小说情节跌宕起伏，波谲云诡，人物形象个性鲜明，生动可感。',
                      },
                    })
                  },
                },
              },
              {
                component: 'Button',
                name: 'button',
                text: '神雕侠侣',
                attrs: {
                  onclick: function () {
                    new nomui.Modal({
                      content: '/components/Modal/demos/view-content.js',
                      args: {
                        name: '神雕侠侣',
                        description:
                          ' 《神雕侠侣》的主脉写的是杨康之遗孤杨过与其师小龙女之间的爱情故事。杨过14岁起师从18岁的小龙女，于古墓派之中苦练武功，师徒二人情深义重、日久生情，却无奈于江湖阴鸷险恶、蒙古铁骑来犯使得有情之人难成眷属。历经一番坎坷与磨难的考验，杨过冲破封建礼教之禁锢，最终与小龙女由师徒变为“侠侣”。同时，在这段磨难经历中，杨过也消除了对郭靖、黄蓉夫妇的误会，在家仇与国难间作出抉择，成为真正的“侠之大者”。',
                      },
                    })
                  },
                },
              },
              {
                component: 'Button',
                name: 'button',
                text: '天龙八部',
                attrs: {
                  onclick: function () {
                    new nomui.Modal({
                      content: '/components/Modal/demos/view-content.js',
                      args: {
                        name: '天龙八部',
                        description:
                          '《天龙八部》以宋哲宗时代为背景，通过宋、辽、大理、西夏、吐蕃等王国之间的武林恩怨和民族矛盾，从哲学的高度对人生和社会进行审视和描写，展示了一幅波澜壮阔的生活画卷。其故事之离奇曲折、涉及人物之众多、历史背景之广泛、武侠战役之庞大、想象力之丰富当属“金书”之最。作品风格宏伟悲壮，是一部写尽人性、悲剧色彩浓厚的史诗巨著。',
                      },
                    })
                  },
                },
              },
            ],
          },
        ],
      }
    },
  }
})
