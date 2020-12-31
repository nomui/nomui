import less from 'rollup-plugin-less'

export default {
  input: 'components/index.js',
  output: [
    {
      file: 'dist/nomui.js',
      format: 'umd',
      name: 'nomui',
    },
  ],
  plugins: [
    less({
      output: `dist/nomui.css`,
      include: `components/index.less`,
    }),
  ],
}
