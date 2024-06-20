define([], function () {
  return {
    title: '基础用法',
    file: 'basic',
    demo: function () {
      return {
        component: 'AutoComplete',
        value: 'a',
        optionFields: { value: 'name' },
        optionDefaults: {
          alert: true,
          onConfig: ({ inst }) => {
            inst.setProps({
              children: {
                component: 'Flex',
                align: 'center',
                cols: [
                  {
                    component: 'Avatar',
                    size: 'small',
                    text: inst.props.value
                  },
                  {
                    component: 'StaticText',
                    value: inst.props.value
                  }
                ]
              }
            })
          }
        },
        options: [
          { name: 'a' },
          { name: 'aa' },
          { name: 'ab' },
          { name: 'aba' },
          { name: 'ac' },
          { name: 'aad' },
          { name: 'aef' },
          { name: 'ag' },
          { name: 'ai' },
          { name: 'bo' },
          { name: 'ffc' },
        ],
      }
    },
  }
})
