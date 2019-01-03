//import { VueEditor } from 'vue2-editor'
import NamiEditor from '../NamiEditor'

export default {
  name: 'Editor',
  components: {
    NamiEditor
  },
  data() {
    return {
      content: '<h1>Some initial content</h1>'  
    }
  }
}
