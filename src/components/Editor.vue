<template>
  <div id="editor" class="editor"></div>
</template>

<script>
import G6 from "../G6/index";

export default {
  name: "Editor",
  methods: {
    init() {
      this.Grid = new G6.Grid();
      this.Graph = new G6.Graph({
        container: "editor",
        width: window.innerWidth - 100,
        height: window.innerHeight,
        modes: {
          default: [
            "addNode",
            "hoverEvent",
            "dragEvent",
            // 'itemAlign'
          ],
        },
        defaultEdge: {
          type: "polyline",
          style: {
            radius: 6,
            offset: 15,
            stroke: "#aab7c3",
            lineAppendWidth: 10, // 防止线太细没法点中
            endArrow: {
              path: "M 0,0 L 8,4 L 7,0 L 8,-4 Z",
              fill: "#aab7c3",
            },
          },
        },
        plugins: [this.Grid],
      });
      this.Graph.data([]);
      this.Graph.render();
    },
    // 添加节点
    addNode(node) {
      this.Graph.emit("editor:addNode", node);
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style scoped>
.editor {
  flex: 1;
  height: 100vh;
}
</style>
