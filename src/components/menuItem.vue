<template>
  <ul>
    <li v-for="item in list"
        :key="item.type"
        @click="addNode(item)">{{item.name}}</li>
  </ul>
</template>

<script>
export default {
  name: "menuItem",
  data(){
    return {
      list: [
        {
          type: 'rect',
          name: '矩形',
          width: 100,
          height: 50
        },
        {
          type: 'square',
          name: '正方形',
          width: 60,
          height: 60
        },
        {
          type: 'angleNode',
          name: '三角形',
          width: 80,
          height: 60,
          anchorPoints: [
            [0,0],
            [0.5,0],
            [1,0],
            [0.5,1]
          ]
        },
        {
          type: 'circleNode',
          name: '圆形',
          width: 60,
          height: 60
        },
        {
          type: 'diamondNode',
          name: '菱形',
          width: 80,
          height: 60,
          anchorPoints: [
            [0.5,0],
            [1,0.5],
            [0.5,1],
            [0,0.5]
          ]
        }
      ]
    }
  },
  methods: {
    // 通知编辑器添加节点
    addNode(item) {
      let model = {
        type: item.type,
        width: item.width,
        height: item.height,
        anchorPoints: item.anchorPoints
      }
      this.$emit('addNode', model)
    }
  }
}
</script>

<style scoped>
ul {
  width: 100px;
  height: 100vh;
  background-color: #eee;
}

li {
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
}

li:hover {
  background-color: #338eff;
  color: #fff;
}
</style>
