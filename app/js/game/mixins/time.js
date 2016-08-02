export default {

  init () {
    this.define('time', { type: Number })
  },

  timeBefore (time) {
    return time - this.time
  },

  timeAfter (time) {
    return this.time - time
  },

  isPast (time) {
    return time < this.time
  },

  isFuture (time) {
    return time > this.time
  },

}
