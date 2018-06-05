<template>
  <div id="app">
    <html-editor editorId="editor1"></html-editor>
    <html-editor editorId="editor2"></html-editor>
  </div>
</template>

<script>
import HtmlEditor from './components/HtmlEditor'

export default {
  name: 'App',
  components: {
    HtmlEditor
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
