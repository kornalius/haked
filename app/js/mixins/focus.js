export default {

  init () {
    this.define('focused', { type: Boolean })
  },

  get focused () {
    if (this.element) {
      this._focused = document.activeElement === this.element
    }
    return this._focused
  },

  set focused (value) {
    this._focused = value
    if (this.element) {
      this.element[value ? 'focus' : 'blur']()
    }
    if (_.isFunction(this.emit)) {
      this.emit('object.' + value ? 'focus' : 'blur')
    }
  },

  focus () {
    this.focused = true
    return this
  },

  blur () {
    this.focused = false
    return this
  },

}
