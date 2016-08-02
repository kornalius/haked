export default {

  init () {
    this.define('qty', { type: Number })
  },

  incQty (value) {
    this.qty += value
    return this
  },

  decQty (value) {
    this.qty = Math.max(0, this.qty - value)
    return this
  },

}
