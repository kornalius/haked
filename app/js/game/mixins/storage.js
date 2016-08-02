export default {

  init () {
    this.define('size', { type: Number })
    this.define('used', { type: Number })
  },

  get available () { return this.size - this.used },

  alloc (sz) {
    if (this.canFit(sz)) {
      this.used += sz
    }
  },

  free (sz) {
    this.used = Math.max(0, this.used - sz)
  },

  canFit (sz) { return sz <= this.available },

}
