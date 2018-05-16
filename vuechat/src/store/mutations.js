import { SET_MESSAGES, GET_CHANNELS } from './mutation-types'

export default {
  [SET_MESSAGES](state, messages) {
    state.messages = messages
  },
  [GET_CHANNELS](state, channels) {
    state.channels = channels
  }
}
