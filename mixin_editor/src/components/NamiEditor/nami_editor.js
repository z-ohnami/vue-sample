import { VueEditor } from 'vue2-editor'

export default {
  name: 'NamiEditor',
  mixins: [VueEditor],
  methods: {
    customImageHandler(image, callback) {
      alert('hoo')
    },
  }
}
