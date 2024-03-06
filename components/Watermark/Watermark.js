import Component from '../Component/index';
import getClips from './useClips';

class Watermark extends Component {
  constructor(props, ...mixins) {
    super(Component.extendProps(Watermark.defaults, props), ...mixins)
  }

  _created() {
    this.fontGap = 3
  }

  _config() {

    const { content, rotate, ratio, font } = this.props


    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const [markWidth, markHeight] = this._getMarkSize(ctx)

    const result = getClips(
      {
        content: content,
        rotate,
        ratio,
        width: markWidth,
        height: markHeight,
        font,
        gapX: 50,
        gapY: 50
      }
    )


    this.setProps({
      attrs: {
        style: {
          backgroundImage: `url('${result[0]}')`
        }
      }
    })


  }


  _getMarkSize(ctx) {
    const { content, font } = this.props
    const { fontSize, fontFamily } = font
    let defaultWidth = 120;
    let defaultHeight = 64;
    if (!this.props.image && ctx.measureText) {
      ctx.font = `${Number(fontSize)}px ${fontFamily}`;
      const contents = Array.isArray(content) ? content : [content];
      const sizes = contents.map((item) => {
        const metrics = ctx.measureText(item);

        return [metrics.width, metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent];
      });
      defaultWidth = Math.ceil(Math.max(...sizes.map((size) => size[0])));
      defaultHeight =
        Math.ceil(Math.max(...sizes.map((size) => size[1]))) * contents.length +
        (contents.length - 1) * this.fontGap;
    }
    return [defaultWidth, defaultHeight]
  };
}

Watermark.defaults = {
  content: 'NomUI Design',
  ratio: 1,
  rotate: -35,
  font: {
    color: 'rgba(0,0,0,.15)',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontFamily: 'sans-serif ',
    textAlign: 'left'
  }


}

Component.register(Watermark)

export default Watermark
