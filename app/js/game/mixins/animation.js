export default {

  init () {
    this._loops = 1
    this._duration = 0
    this._clock = 0
    this._steps = null
    this._completed = false
    this._paused = false
    this._timePerFrame = 0
    this._frames = 0
    this.emit('animation.init')
  },

  get duration () { return this._duration },
  set duration (value) {
    let oldValue = this._duration
    this._duration = value
    this.emit('animation.duration.change', value, oldValue)
  },

  get steps () { return this._steps },
  set steps (value) {
    let oldValue = this._steps
    this._steps = value
    this.emit('animation.steps.change', value, oldValue)
  },

  get completed () { return this._completed },

  get paused () { return this._paused },

  standardEasingFunctions: {
    linear:        (t) => t,
    smoothStep:    (t) => (3 - 2 * t) * t * t,
    smootherStep:  (t) => (6 * t * t - 15 * t + 10) * t * t * t,
    easeInQuad:    (t) => t * t,
    easeOutQuad:   (t) => t * (2 - t),
    easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : (4 - 2 * t) * t - 1,
  },

  easing (duration, easingFn) {
    this._timePerFrame = 1000 / window.game.fps
    this.duration = duration
    if (_.isFunction(easingFn)) {
      this.easing_function = easingFn
    }
    else if (_.isString(easingFn) && this.standardEasingFunctions[easingFn]) {
      this.easing_function = this.standardEasingFunctions[easingFn]
    }
    else {
      this.easing_function = this.standardEasingFunctions.linear
    }
    this.resetAnimation()
    return this
  },

  resetAnimation () {
    this._loops = 1
    this._clock = 0
    this._completed = false
    this._paused = false
    this.emit('animation.reset')
    return this
  },

  repeat (loopCount) {
    this._loops = loopCount
    return this
  },

  setProgress (progress, loopCount) {
    this._clock = this._duration * progress
    if (loopCount) {
      this._loops = loopCount
    }
    return this
  },

  play () {
    this._paused = false
    this._completed = false
    this.emit('animation.play')
    return this
  },

  pause () {
    this._paused = true
    this.emit('animation.pause')
    return this
  },

  resume () {
    this._paused = false
    this._completed = false
    this.emit('animation.resume')
    return this
  },

  tick (dt) {
    this.emit('animation.tick', dt)
    if (!this._paused && !this._completed) {
      this._clock += dt
      this._frames = Math.floor(this._clock / this._timePerFrame)
      while (this._clock >= this._duration && !this._completed) {
        this._loops--
        if (this._loops > 0) {
          this._clock -= this._duration
        }
        else {
          this._completed = true
          this.emit('animation.complete')
        }
      }
    }
    return this
  },

  get time () { return Math.min(this._clock / this._duration, 1) },

  get value () { return this.easing_function(this.time) },

}
