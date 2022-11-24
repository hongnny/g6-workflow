
export default {
  name: 'hoverEvent',
  options: {
    getCfg(){
      
    },
    getEvents() {
      return {
        'canvas:click': 'onCanvasClick',
        'node:mouseenter': 'onNodeMouseEnter',
        'node:mouseleave': 'onNodeMouseLeave',
        'node:click': 'onNodeClick',
      }
    },
    onCanvasClick() {
      this._clearAllNodeSelect()
    },
    onNodeClick(e) {
      this._clearAllNodeSelect()
      e.item.setState('selected', true)
    },
    onNodeMouseEnter(e) {
      e.item.setState('hover', true)
      e.item.setState('anchorActive', true)
    },
    onNodeMouseLeave(e){
      if (!e.item.hasState('selected')) {
        e.item.clearStates('hover')
      }
      e.item.clearStates(['anchorActive'])
    },
    _clearAllNodeSelect() {
      const nodes = this.graph.findAllByState('node', 'selected');
      nodes.forEach(node => {
        node.clearStates(['hover', 'selected']);
      });
    },
  }
}
