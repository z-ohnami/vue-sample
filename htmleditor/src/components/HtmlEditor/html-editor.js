import { VueEditor } from 'vue2-editor'

export default {
  name: 'HtmlEditor',
  props: ['editorId'],
  components: {
    VueEditor
  },
  data() {
    return {
      content: 'test',
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
