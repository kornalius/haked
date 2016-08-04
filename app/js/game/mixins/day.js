export default {

  initDay (day = 0) {
    this.define('day', { type: Number, default: day })
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
