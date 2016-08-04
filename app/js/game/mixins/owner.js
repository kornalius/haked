export default {

  initOwner (owner = null) {
    this.define('owner', { type: Object, linked: true, default: owner })
  },

}
