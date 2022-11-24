
/**
 * 自定义的节点
 *
 * */

import styleConfig from '../config/style.config'
import base from './base'

function _getShapeStyle(cfg,  options) {
  const width = cfg.width || 60
  const height = cfg.height || 60
  return {
    ...options,
    ...cfg.style,
    // 绘制节点的属性
    ...styleConfig.nodeStyles,
      // 节点的多值样式
    ...styleConfig.nodeStateStyles,
    ...styleConfig.anchorStyles,
    // 标签文本样式
    labelCfg: styleConfig.labelCfg,
    width,
    height,
    // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
    x: -width / 2,
    y: -height / 2,
  }
}

const rect = {
  name: 'rect',
  extendName:'single-node',
  options: {
    ...base,
    // g6提供的基础图形
    shapeType: 'rect',
    // 当前节点的样式集合
    getShapeStyle(cfg) {
      const width = cfg.width || 100
      const height = cfg.height || 50
      return {
        ...cfg.style,
        // 绘制节点的属性
        ...styleConfig.nodeStyles,
        // 节点的多值样式
        ...styleConfig.nodeStateStyles,
        ...styleConfig.anchorStyles,
        // 标签文本样式
        labelCfg: styleConfig.labelCfg,
        width,
        height,
        // 将图形中心坐标移动到图形中心, 用于方便鼠标位置计算
        x: -width / 2,
        y: -height / 2,
      }
    }
  }

}

const square = {
  name: 'square',
  extendName:'single-node',
  options: {
    ...base,
    // g6提供的基础图形
    shapeType: 'rect',
    // 当前节点的样式集合
    getShapeStyle(cfg) {
      return _getShapeStyle(cfg)
    }
  }
}

const angleNode = {
  name: 'angleNode',
  extendName: 'single-node',
  options: {
    ...base,
    shapeType:'path',
    // 当前节点的样式集合
    getShapeStyle(cfg) {
      let {width, height} = cfg
      const path  = [ 
        // 左上顶点
        [ 'M', -width / 2, -height / 2 ],
        // 右上顶点
        [ 'L', width / 2, -height / 2 ],
        // 下顶点
        [ 'L', 0, height / 2 ],
        [ 'Z' ]
      ]
      return _getShapeStyle(cfg, {path})
    }
  }
}

const circleNode = {
  name: 'circleNode',
  extendName: 'single-node',
  options: {
    ...base,
    shapeType:'path',
    // 当前节点的样式集合
    getShapeStyle(cfg) {
      let {width, height} = cfg
      const path  = [ 
          // 左顶点
         [ 'M', -width / 2, 0 ],
         // 上弧
         [ 'A', width / 4, height / 4, 0, 1, 0, width / 2, 0 ],
         // 下弧
         [ 'A', width / 4, height / 4, 0, 1, 0, -width / 2, 0 ]
      ]
      return _getShapeStyle(cfg, {path})
    }
  }
}

const diamondNode = {
  name: 'diamondNode',
  extendName: 'single-node',
  options: {
    ...base,
    shapeType:'path',
    // 当前节点的样式集合
    getShapeStyle(cfg) {
      let {width, height} = cfg
      /***
       *     
       * 以图形中心进行绘制
       * 
       */
      const path  = [ 
        //  上顶点
         [ 'M', 0, -height / 2 ],
         // 右顶点
         [ 'L', width / 2, 0],
         // 下顶点
         [ 'L', 0, height / 2],
         //右顶点
         [ 'L', -width / 2, 0],
         [ 'Z']
      ]
      return _getShapeStyle(cfg, {path})
    }
  }
}

export default {
  rect,
  square,
  angleNode,
  circleNode,
  diamondNode,
}
