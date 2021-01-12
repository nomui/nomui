define(['/docs/DemoPanel.js'], function (demoPanel) {
  return {
    component: demoPanel,
    autoRender: false,
    _created: function () {
      const { type, cat, demo } = this.$route.query
      let url = `/components/${type}/demos/${demo}.js`
      if (cat) {
        url = `/components/${type}/demos/${cat}/${demo}.js`
      }

      require([url], (props) => {
        this.update(props)
      })
    },
  }
})
