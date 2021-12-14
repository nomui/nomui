骨架屏，在数据加载需要一定时间时可以先用骨架屏占位，数据更新后骨架屏会自动销毁

- 注意：本功能仅适用于组件没有配置 autoRender:false 的情况下

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| rows | 骨架屏数据重复行数 | `number` | - |
| cols | 骨架屏数据重复列数 | `number` | - |
| avatar | 是否显示头像，以及头像的尺寸 | `booean` \| `{size:'large'}` | `false` |
| title | 是否显示标题，以及标题的宽度 | `booean` \| `{width:200}` | `true` |
| paragraph | 是否显示段落，以及的行数 | `booean` \| `number` | `3` |
| image | 是否显示占位图，以及图片的尺寸 | `booean` \| `{width,height}` | `false` |
| type | 骨架屏单独使用的时候可以配置类型 | `'avatar'` \| `'paragraph'`\| `'title'`\| `'image'` | - |
