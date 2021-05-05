define([
  './basic.js',
  './with-subtitle.js',
  './with-icon.js',
  './subtitle-wrap.js',
  './with-image.js',
  './with-title-level.js',
], function (...demos) {
  return {
    title: 'Caption',
    subtitle: '标题',
    demos: demos,
  }
})
