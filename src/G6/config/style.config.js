export default {
  // 定义节点的样式
  nodeStyles: {
    fill: '#E7F7FE', // 浅蓝
    stroke: '#1890FF', // 深蓝
    lineWidth: 1,
    radius: 5
  },
  // 节点的多值样式
  nodeStateStyles: {
    default: {
      fill: '#E7F7FE',
      stroke: '#1890FF',
      opacity: 1,
      lineWidth: 1
    },
    hover: {
      cursor: 'pointer',
      shadowOffsetX: 5,
      shadowOffsetY: 4,
      shadowBlur: 5,
      opacity: 0.8,
    },
    selected: {
      opacity: 1,
      lineWidth: 2
    }
  },
  // 标签文本样式
  labelCfg: {
    cursor: 'default',
    fill: '#666',
    textAlign: 'center',
    textBaseline: 'middle',
    fontSize: 12,
  },
  // 锚点的基础样式
  anchorBaseStyles: {
    fill: '#fefefe',
    stroke: '#1890FF',
    lineWidth: 1,
  },
  // 锚点的多值样式
  anchorStyles: {
    // 底层锚点样式
    anchorBgStyles: {
      fill: '#1890ff',
      stroke: '#1890FF',
      lineWidth: 1,
      r: 4,
      fillOpacity:0,
      strokeOpacity:0
    },
    // 中间层锚点的样式
    anchorDefaultStyles: {
      fill: '#fefefe',
      stroke: '#1890FF',
      lineWidth: 1,
      r: 4,
    },
    // layer锚点的样式
    anchorLayerStyles: {
      fill: '#fefefe',
      stroke: '#1890FF',
      lineWidth: 1,
      r: 10,
      opacity: 0,
      fillOpacity:0,
      strokeOpacity:0
    },
    // 显示锚点的激活样式
    anchorActiveStyles: {
      fillOpacity:1,
      strokeOpacity:1
    },
    // 底层锚点的激活样式
    anchorBgActiveStyles: {
      fillOpacity:0.5,
      strokeOpacity: 0.5
    },
    // 底层锚点的hover样式
    anchorBgHoverStyles: {
      fillOpacity:1,
      strokeOpacity: 0.5,
    },

  }
}

