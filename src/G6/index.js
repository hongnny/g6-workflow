import G6 from '@antv/G6'

// 行为
import Behaviors from './behaviors/'

// 节点
import Nodes from './node/'

// 边
import Edges from './edge/edge'


registerBehavior(Behaviors)
registerNode(Nodes)
registerEdge(Edges)



//注册behavior
function registerBehavior(obj){
  Object.values(obj).forEach(item => {
    G6.registerBehavior(item.name, item.options)
  })
}

//注册node
function registerNode(obj){
  Object.values(obj).forEach(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}

//注册edge
function registerEdge(obj){
  Object.values(obj).forEach(item => {
    G6.registerEdge(item.name, item.options)
  })
}


export default G6
