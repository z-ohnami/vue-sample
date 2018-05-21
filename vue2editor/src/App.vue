<template>
  <div id="app">
    <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
    <textarea v-model="content"></textarea>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor'

export default {
  name: 'App',
  components: {
    VueEditor
  },
  data() {
    return {
      content: '<h1>Some initial content</h1>',
      customToolbar: [
        [{ 'header': [false, 3, 4, 5, 6, ] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image']
      ]
    }
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
