import { _, EE, EventEmitter } from '../utils'

export default {

  sup (name, ...args) {
    let mixins = this._mixins
    if (_.isArray(mixins)) {
      for (let i = mixins.length - 1; i >= 0; i--) {
        let m = mixins[i]
        if (_.isFunction(m[name])) {
          m[name].call(this, ...args)
        }
      }
    }
    return this
  },

  _setupBase () {
    this._ee = new EventEmitter({ delimiter: '.' })
    this.sup('init')
    this.emit('object.create')
  },

  destroy () {
    this.sup('shut')

    this.emit('object.destroy')
    this._ee.removeAllListeners()
    this._ee = null

    return this
  },

  on (name, fn) {
    this._ee.on(name, fn)
    return this
  },

  off (name, fn) {
    this._ee.off(name, fn)
    return this
  },

  emit (name, ...args) {
    if (this._ee) {
      this._ee.emit(name, ...args)
      EE.emit(name, ...args)
    }
    return this
  },

  clone () {
    return _.clone(this)
  },

  defer (cb, delay) {
    var that = this
    setTimeout(() => {
      cb.call(that)
    }, delay)
    return this
  },

}
