export default {

  initQty (qty = 0) {
    this.define('qty', { type: Number, default: qty })
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
