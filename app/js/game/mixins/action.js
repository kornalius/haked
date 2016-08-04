import Action from '../classes/action'

export default {

  initAction (action = null) {
    this.define('action', { type: Action, default: action })
  },

}
