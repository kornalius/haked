export default {

  initTime (time = 0) {
    this.define('time', { type: Number, default: time })
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
