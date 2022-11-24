<template>
  <div id="app">
    <MenuItems @addNode="addNode"></MenuItems>
    <Editor ref="editor"></Editor>
  </div>
</template>

<script>
import MenuItems from './components/menuItem'
import Editor from './components/Editor'
export default {
  name: 'App',
  methods: {
    // 通知编辑器添加节点
    addNode(node) {
      this.$refs.editor.addNode(node)
    }
  },
  components: {
    MenuItems,
    Editor
  }
}
</script>

<style>
html,body,ul,li{
  list-style: none;
  padding: 0;
  margin: 0;
}
#app {
  display: flex;
}
</style>
