
import setState from "../states/setState"
import anchor from '../anchor/draw-anchor'

export default {
  draw(cfg, group) {

    let attrs = this.getShapeStyle(cfg)
    const shape = group.addShape(this.shapeType, {
      name: 'path-node',
      draggable: true,
      attrs: attrs
    })

    return shape
  },
  afterDraw(cfg, group) {
    this.initDrawAnchor(cfg, group)
  },
  setState(name, value, item) {
    console.log(name, value);
    let group = item.getContainer()
    setState[name] && setState[name](value, group)
  },
  getAnchorPoints(cfg) {
    return cfg.anchorPoints || [
      [0.5, 0],
      [1, 0.5],
      [0.5, 1],
      [0, 0.5]
    ]
  },
  ...anchor
}
