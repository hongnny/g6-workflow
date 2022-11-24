import styleConfig from '../config/style.config'

let sourceId = {}
let dashLine = {}
export default (anchor, group, p) => {

  anchor.on('mouseenter', e => {
    anchor.attr({
      cursor: 'crosshair'
    })
  })
  // 拖拽事件
  anchor.on('dragstart', e => {
    sourceId = group.get('item').get('id')
    
    let {width, height} = group.get('item').get('model')
    const point = [
      width * (p[0] - 0.5), // x
      height * (p[1] - 0.5), // y
    ];
    // 添加线条
    dashLine = group.addShape('path', {
      attrs: {
        stroke:   '#1890FF',
        lineDash: [5, 5],
        path:     [
          ['M', ...point],
          ['L', ...point],
        ],
      },
      zIndex: 0,
      name:  'dashed-line',
      pointStart: point,
    });

    // group.toFront();
    // dashLine.toFront(); // 最后把这条线层级提升至最高
  })
  // 拖拽中
  anchor.on('drag', e => {

    const bbox = group.getFirst().get('canvasBBox');

    const pointStart = dashLine.get('pointStart');
    const endPoint = [e.x - bbox.x - bbox.width / 2, e.y - bbox.y - bbox.height / 2];

    // dashLine.toFront();

    dashLine.attr({
      path: [
        ['M', ...pointStart],
        ['L', endPoint[0], endPoint[1]],
      ],
    });
  })
  // 拖拽结束
  anchor.on('dragend', e => {
    dashLine.remove()
  })

  // 进入
  anchor.on('dragenter', e => {
    group.toFront();
    if (sourceId != e.target.get('nodeId')) {
      let index = e.target.get('index')
      let p = group.getAnchorBgByIndex(index)
      p[0] && p[0].attr(styleConfig.anchorStyles.anchorBgHoverStyles)
    }

  })

  // 离开
  anchor.on('dragleave', e => {
    let index = e.target.get('index')
    let p = group.getAnchorBgByIndex(index)
    p[0] && p[0].attr(styleConfig.anchorStyles.anchorBgActiveStyles)
  })
}
