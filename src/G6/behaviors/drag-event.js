export default {
  name: 'dragEvent',
  options: {
    getDefaultCfg() {
      return {
        // 拖拽的类型
        dragType: 'node',
        dragStartNode: {}
      }

    },
    getEvents() {
      return {
        'node:mousedown': 'onNodeMouseDown',
        'node:mouseup': 'onNodeMouseUp',
        'node:dragstart': 'onDragStart',
        'node:drag':      'onDrag',
        'node:dragend':   'onDragEnd',
        'node:drop':      'onDrop',
      }
    },
    onNodeMouseDown(e) {
      if (e.target.get('anchor')) {
        this.dragType = 'anchor'

        this.dragStartNode = {
          target: e.item,
          anchor: e.target
        }
        console.log(e.item)

        this._controlAnchor(true)
      }
    },
    onNodeMouseUp(e) {
      if (this.dragType === 'anchor') {
        this._controlAnchor(false)
      }
    },
    onDragStart(e) {
      if (e.target.get('anchor')) {
        // 拖拽锚点, 记录当前点击的锚点 index
      } else {
        // 拖拽节点
        e.item.toFront();
        this.dragType = 'node';
        const { width, height, centerX, centerY } = e.item.getBBox();
        this.distance = [e.x - centerX, e.y - centerY];

        // 初始化对齐线
        this.alignLine.start.call(this)
      }
    },
    onDrag(e) {
      if (this.dragType === 'node') {
        e.item.setState('anchorActive', false)
        e.item.updatePosition({
          x: e.x - this.distance[0],
          y: e.y - this.distance[1]
        })
        // 当节点位置发生变化时，刷新所有节点位置，并重计算边的位置
        this.graph.refreshPositions();

        // 绘制对齐线
        this.alignLine.move.call(this,e.item)
      }

    },
    onDragEnd(e) {
      if (this.dragType === 'anchor') {
        this._controlAnchor(false)
      } else {
        e.item.updatePosition({
          x: e.x - this.distance[0],
          y: e.y - this.distance[1]
        })
        e.item.setState('anchorActive', true)
        this.alignLine._clear.call(this)
      }
    },
    onDrop(e) {
      if (this.dragType === 'anchor' && e.target.get('anchor')) {
        let source = this.dragStartNode.target
        let target = e.item
        this.graph.addItem('edge', {
          source: source.get('id'),
          target: target.get('id'),
          sourceAnchor: this.dragStartNode.anchor.get('index'),
          targetAnchor: e.target.get('index'),
        })
      }
    },
    _controlAnchor(type) {
      const nodes = this.graph.findAll('node', node => node)
      nodes.forEach(node => {
        if (type) {
          node.setState('anchorActive', true)
          node.setState('anchorBgActive', true)
        } else {
          node.clearStates(['anchorActive', 'anchorBgActive'])
        }
      });

    },
    alignLine: {
      // 对齐线列表
      lineList: [],
      // 最大距离
      maxDistance: 2,
      start () {
        this.alignLine._clear.call(this)
      },
      stop () {
        this.alignLine._clear.call(this)
      },
      _clear () {
        this.alignLine.lineList.forEach(line => {
          line.remove()
        })
        this.alignLine.lineList = []
      },
      move(item) {
        let _t = this
        // 先清空已有对齐线
        this.alignLine._clear.call(this)

        const bbox = item.getBBox()
        /**
         *0，0---------0,0.5----------0,1
         * |                          |
         * |                          |
         * |                          |
         * 0.5,0                      0.5,1
         * |                          |
         * |                          |
         * |                          |
         * 1,0---------1,0.5----------1,1
         *
         * */
        // 中上
        const ct = { x: bbox.x + bbox.width / 2, y: bbox.y }
        // 中心
        const cc = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height / 2 }
        // 中下
        const cb = { x: bbox.x + bbox.width / 2, y: bbox.y + bbox.height }
        // 左中
        const lc = { x: bbox.x, y: bbox.y + bbox.height / 2 }
        // 右中
        const rc = { x: bbox.x + bbox.width, y: bbox.y + bbox.height / 2 }
        // 计算距离
        const getDistance = function (line, point) {
          // 归一向量
          function normalize (out, a) {
            const x = a[0]
            const y = a[1]
            let len = x * x + y * y
            if (len > 0) {
              // TODO: evaluate use of glm_invsqrt here?
              len = 1 / Math.sqrt(len)
              out[0] = a[0] * len
              out[1] = a[1] * len
            }
            return out
          }

          function dot (a, b) {
            return a[0] * b[0] + a[1] * b[1]
          }

          const pointLineDistance = function (lineX1, lineY1, lineX2, lineY2, pointX, pointY) {
            const lineLength = [lineX2 - lineX1, lineY2 - lineY1]
            if (lineLength[0] === 0 && lineLength[1] === 0) {
              return NaN
            }
            const s = [-lineLength[1], lineLength[0]]
            normalize(s, s)
            return Math.abs(dot([pointX - lineX1, pointY - lineY1], s))
          }

          return {
            line,
            point,
            dis: pointLineDistance(line[0], line[1], line[2], line[3], point.x, point.y)
          }
        }

        const nodes = _t.graph.getNodes()

        nodes.forEach(node => {
          let horizontalLines = []
          let verticalLines = []
          // 对齐线信息
          const info = {
            horizontals: [],
            verticals: []
          }
          const bbox1 = node.getBBox()
          // 水平线
          const horizontalInfo = [
            // 左上 右上 tltr
            [bbox1.minX, bbox1.minY, bbox1.maxX, bbox1.minY],
            // 左中 右中 lcrc
            [bbox1.minX, bbox1.centerY, bbox1.maxX, bbox1.centerY],
            // 左下 右下 blbr
            [bbox1.minX, bbox1.maxY, bbox1.maxX, bbox1.maxY]
          ]
          // 垂直线
          const verticalInfo = [
            // 左上 左下 tlbl
            [bbox1.minX, bbox1.minY, bbox1.minX, bbox1.maxY],
            // 上中 下中 tcbc
            [bbox1.centerX, bbox1.minY, bbox1.centerX, bbox1.maxY],
            // 上右 下右 trbr
            [bbox1.maxX, bbox1.minY, bbox1.maxX, bbox1.maxY]
          ]
          horizontalInfo.forEach(line => {
            horizontalLines.push(getDistance(line, ct))
            horizontalLines.push(getDistance(line, cc))
            horizontalLines.push(getDistance(line, cb))
          })
          verticalInfo.forEach(line => {
            verticalLines.push(getDistance(line, lc))
            verticalLines.push(getDistance(line, cc))
            verticalLines.push(getDistance(line, rc))
          })
          horizontalLines.sort((a, b) => a.dis - b.dis)
          verticalLines.sort((a, b) => a.dis - b.dis)
          // 过滤掉距离为0的线条
          horizontalLines = horizontalLines.filter(lineItem => lineItem.dis !== 0)

          if (horizontalLines.length && horizontalLines[0].dis < _t.alignLine.maxDistance) {
            // 取前3个距离相等的线条
            for (let i = 0; i < 3; i++) {
              if (horizontalLines[0].dis === horizontalLines[i].dis) {
                info.horizontals.push(horizontalLines[i])
              }
            }
          }

          // 过滤掉距离为0的线条
          verticalLines = verticalLines.filter(lineItem => lineItem.dis !== 0)

          if (verticalLines.length && verticalLines[0].dis < _t.alignLine.maxDistance) {
            // 取前3个距离相等的线条
            for (let i = 0; i < 3; i++) {
              if (verticalLines[0].dis === verticalLines[i].dis) {
                info.verticals.push(verticalLines[i])
              }
            }
          }
          // 添加对齐线
          const group = _t.graph.get('group')
          // 对齐线样式
          const lineStyle = {
            stroke: '#FA8C16',
            lineWidth: 1
          }
          // 处理水平线
          if (info.horizontals.length) {
            info.horizontals.forEach(lineObj => {
              const line = lineObj.line
              const point = lineObj.point
              const lineHalf = (line[0] + line[2]) / 2
              let x1
              let x2
              if (point.x < lineHalf) {
                x1 = point.x - bbox.width / 2
                x2 = Math.max(line[0], line[2])
              } else {
                x1 = point.x + bbox.width / 2
                x2 = Math.min(line[0], line[2])
              }
              const shape = group.addShape('line', {
                name: 'alignLineHorizontal',
                attrs: {
                  x1,
                  y1: line[1],
                  x2,
                  y2: line[1],
                  ...lineStyle
                },
                // 是否拾取及触发该元素的交互事件
                capture: false
              })
              _t.alignLine.lineList.push(shape)
            })
          }
          // 处理垂直线
          if (info.verticals.length) {
            info.verticals.forEach(lineObj => {
              const line = lineObj.line
              const point = lineObj.point
              const lineHalf = (line[1] + line[3]) / 2
              let y1
              let y2
              if (point.y < lineHalf) {
                y1 = point.y - bbox.height / 2
                y2 = Math.max(line[1], line[3])
              } else {
                y1 = point.y + bbox.height / 2
                y2 = Math.min(line[1], line[3])
              }
              const shape = group.addShape('line', {
                name: 'alignLineVertical',
                attrs: {
                  x1: line[0],
                  y1,
                  x2: line[0],
                  y2,
                  ...lineStyle
                },
                capture: false
              })
              _t.alignLine.lineList.push(shape)
            })
          }
        })
      }
    }

  }
}
