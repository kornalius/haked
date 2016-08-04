export default {

  initSelect (selected = false) {
    this.define('selected', { type: Boolean, default: selected })
  },

  select (selected) {
    this.selected = selected
    return this
  },

  toggleSelect () {
    this.selected = !this.selected
    return this
  },

}
