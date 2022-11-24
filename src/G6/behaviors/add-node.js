
export default {
  name: 'addNode',
  options: {
    getEvents() {
      return {
        'editor:addNode': 'addNode',
        'canvas:mouseenter': 'onCanvasMouseEnter',
        'canvas:mouseleave': 'onCanvasMouseLeave',
        'mouseup': 'onMouseUp',
        'mousemove': 'onMouseMove'
      }
    },
    addNode(node) {
      this._info = {
        ...node
      }
    },
    onMouseUp(e) {
      if (this._hasInfo()) {
        this.graph.addItem('node', {
          ...this._info,
          x: e.x,
          y: e.y
        })
        this._clear()
      }
    },
    onMouseMove(e) {
      if (this._hasInfo()) {
        const { width, height } = this._info
        this._dashOutline.attr({
          x: e.x - width / 2,
          y: e.y - height / 2
        })
      }
    },
    onCanvasMouseEnter(e) {
      if (this._hasInfo()) {
        this._drawOutline(e)
      }
    },
    onCanvasMouseLeave(e)  {
      this._clear()
    },
    _hasInfo() {
      return this._info && Object.keys(this._info).length
    },
    // 拖拽节点到编辑器的虚线轮廓
    _drawOutline(e) {
      const { width, height } = this._info
      let mode = {
        name: 'dottedNode',
        attrs: {
          width,
          height,
          fill: '#FFFFFF',
          fillOpacity: 1,
          stroke: '#1890FF',
          strokeOpacity: 1,
          lineDash: [ 5, 5 ],
          x: e.x - width / 2,
          y: e.y - height / 2
        }
      }
      const group = this.graph.get('group')
      this._dashOutline = group.addShape('rect', mode)
    },
    _clear() {
      this._info = null
      this._dashOutline && this._dashOutline.remove();
      this._dashOutline = null;
    }
  }
}
