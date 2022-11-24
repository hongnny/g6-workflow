import styleConfig from '../config/style.config'
import anchorControl from './anchor-control'

export default {
  initDrawAnchor(cfg, group) {
    group.anchorShapes = []

    group.drawAnchor = () => {
      this.drawAnchor(cfg, group)
    }

    group.clearAnchor = () => {
      group.anchorShapes.forEach(p => p.remove())
      group.anchorShapes = []
    }
    // 查找指定的锚点背景
    group.getAnchorBgByIndex = (index) => {
      return group.anchorShapes.filter(p => p.get('name') === 'anchorBg' && p.get('index') === index);
    }
  },
  drawAnchor(cfg, group) {

    const anchors = this.getAnchorPoints(cfg)

    let w = cfg.width, h = cfg.height, x = 0, y = 0

    anchors && anchors.forEach((p, i) => {
      x = w * (p[0] - 0.5)
      y = h * (p[1] - 0.5)

      // anchor锚点背景色
      const anchorBg = group.addShape('marker', {
        name: 'anchorBg',
        anchor: true,
        nodeId: group.get('id'),
        draggable: true,
        zIndex: 0,
        index: i,
        attrs: {
          x,
          y,
          ...styleConfig.anchorStyles.anchorBgStyles
        }
      })
      anchorBg.animate({ r: 10 }, {
        duration: 200,
      });

      // anchor锚点
      const anchor = group.addShape('marker', {
        name: 'anchor',
        anchor: true,
        nodeId: group.get('id'),
        draggable: true,
        zIndex: 1,
        index: i,
        attrs: {
          x,
          y,
          ...styleConfig.anchorStyles.anchorDefaultStyles
        }
      })

      // anchor的事件绑定元素
      const anchorLayer = group.addShape('marker', {
        name: 'anchorLayer',
        anchor: true,
        nodeId: group.get('id'),
        draggable: true,
        zIndex: 2,
        index: i,
        attrs: {
          x,
          y,
          ...styleConfig.anchorStyles.anchorLayerStyles
        },
      })


      group.anchorShapes.push(anchorBg)
      group.anchorShapes.push(anchor)
      group.anchorShapes.push(anchorLayer)

      anchorControl(anchorLayer, group, p)


    })

  }
}
