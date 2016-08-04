import now from 'performance-now'

export default {

  initTimer (duration = 0, interval = 0, repeats = 0) {
    this.define('interval', { type: Number, default: interval })
    this.define('duration', { type: Number, default: duration })
    this.define('repeats', { type: Number, default: repeats })

    this.define('timeleft', { type: Number, private: true })
    this.define('repeatsleft', { type: Number, private: true })
    this.define('timer', { type: Number, private: true })
    this.define('timerstate', { type: Number, private: true })
    this.define('lastTick', { type: Number, private: true })
  },

  get hasInterval () { return this.interval > 0 },
  get hasDuration () { return this.duration > 0 },
  get hasRepeats () { return this.repeats > 0 },
  get hasTimeLeft () { return this._timeleft > 0 },
  get hasRepeatsLeft () { return this._repeatsleft > 0 },

  get isTimerRunning () { return this._timerstate === 1 },
  get isTimerPaused () { return this._timerstate === 2 },

  startTimer (interval, duration, repeats) {
    if (!this.isTimerRunning) {
      this.interval = interval || this.interval
      this.duration = duration || this.duration
      this.repeats = repeats || this.repeats
      this._repeatsleft = this.repeats
      this._timeleft = this.duration
      this._timerstate = 1
      this._timer = setInterval(this.tick.bind(this), this.interval)
      this.emit('timer.started')
    }
    return this
  },

  pauseTimer () {
    if (this.isTimerRunning) {
      this._timerstate = 2
      this.emit('timer.paused')
    }
    return this
  },

  resumeTimer () {
    if (this.isTimerPaused) {
      this._timerstate = 1
      this.emit('timer.resumed')
    }
    return this
  },

  stopTimer () {
    if (this._timer !== null) {
      clearInterval(this._timer)
      this._timer = null
      this._timerstate = 0
      this.emit('timer.stopped')
    }
    return this
  },

  tick (elapsed) {
    if (!this.isTimerPaused) {
      this._lastTick = now()

      this.emit('timer.tick', elapsed)

      if (this.hasDuration) {
        this._timeleft -= elapsed
        if (this._timeleft <= 0) {
          this.stopTimer()
        }
      }

      if (this.hasRepeats) {
        this._repeatsleft--
        if (this._repeatsleft <= 0) {
          this.stopTimer()
        }
      }
    }
  },

}
