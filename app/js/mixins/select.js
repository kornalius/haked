export default {

  init () {
    this.define('selected', { type: Boolean })
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
