export default {

  initTarget (target = null) {
    this.define('target', { type: Object, linked: true, default: target })
  },

}
