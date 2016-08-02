export default {

  init () {
    this.define('day', { type: Number })
  },

  daysBefore (day) {
    return day - this.day
  },

  daysAfter (day) {
    return this.day - day
  },

  isPast (day) {
    return day < this.day
  },

  isFuture (day) {
    return day > this.day
  },

}
