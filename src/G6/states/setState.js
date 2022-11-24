export default {
  // 节点的[hover|unHover]样式
  hover: (value, group) => {
    const _node = group.getFirst()
    const attrs = _node.attr();

    if(value) {
      _node.attr({
        ...attrs.hover
      })
    } else {
      _node.attr({
        ...attrs.default
      })
    }
  },
  // 节点的[选择｜取消]样式
  selected: (value, group) => {
    const _node = group.getFirst()
    const attrs = _node.attr();
    if(value) {
      _node.attr({
        ...attrs.selected
      })
    } else {
      _node.attr({
        ...attrs.default
      })
    }
  },
  // 锚点激活
  anchorActive: (value, group) => {
    if(value) {
      group.drawAnchor()
    }else {
      group.clearAnchor()
    }
  },
  // 锚点背景色激活
  anchorBgActive: (value, group) => {
    const attrs = group.getFirst().attr()
    const child = group.getChildren()
    child.forEach(p => {
      if (p.get('name') === 'anchorBg') {
        if (value) {
          p.attr(attrs.anchorBgActiveStyles)
        } else {
          p.attr(attrs.anchorBgStyles)
        }
      }
    })
  }
}
