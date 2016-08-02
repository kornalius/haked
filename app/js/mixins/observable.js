import { _, raf, ObjectObserver, ArrayObserver, PathObserver } from '../utils'

var _observers = []
var _delivering = false

const _deliverChanges = () => {
  _delivering = true
  for (let o of _observers) {
    o.deliver()
  }
  _delivering = false
  raf(_deliverChanges)
}
raf(_deliverChanges)

export default {

  init () {
    this.define('observers', { type: [Object], private: true })
  },

  shut () {
    for (let o of this.observers) {
      _.remove(_observers, o)
      o.close()
    }
    this._observers = null
  },

  observe (path, fn = null) {
    let observer
    var that = this
    var o = _.get(this, path)
    if (_.isArray(o)) {
      observer = new ArrayObserver(o)
      observer.open(splices => {
        for (let splice in splices) {
          // if (splice.removed) {
          //   console.log(_.template('OBSERVE: {{r}} removed at {{i}}', { r: JSON.stringify(splice.removed), i: splice.index }))
          // }
          // else {
          //   console.log(_.template('OBSERVE: {{r}} removed at {{i}}', { r: JSON.stringify(o.slice(splice.index, splice.addedCount)), i: splice.index }))
          // }
          if (fn) {
            fn.call(that, { observer, path, splice, splices })
          }
          that.emit('object.changed.' + path, splice, splices)
          that.emit('object.changed', path, splice, splices)
        }
      })
    }
    else if (_.isObject(o)) {
      observer = new ObjectObserver(o)
      observer.open((added, removed, changed, getOldValueFn) => {
        // for (let k in added) {
        //   console.log(_.template('OBSERVE: {{k}} = {{v}} added', { k, v: added[k] }))
        // }
        // for (let k in removed) {
        //   console.log(_.template('OBSERVE: {{k}} removed ({{v}})', { k, v: getOldValueFn(k) }))
        // }
        // for (let k in changed) {
        //   console.log(_.template('OBSERVE: {{k}} = {{v}} changed ({{v}})', { k, v: getOldValueFn(k) }))
        // }
        if (fn) {
          fn.call(that, { observer, path, added, removed, changed, getOldValueFn })
        }
        that.emit('object.changed.' + path, added, removed, changed, getOldValueFn)
        that.emit('object.changed', path, added, removed, changed, getOldValueFn)
      })
    }
    else {
      observer = new PathObserver(this, path)
      observer.open((newValue, oldValue) => {
        // console.log(_.template('OBSERVE: {{path}} changed from {{oldValue}} to {{newValue}}', { path, oldValue, newValue }))
        if (fn) {
          fn.call(that, { observer, path, newValue, oldValue })
        }
        that.emit('object.changed.' + path, newValue, oldValue)
        that.emit('object.changed', path, newValue, oldValue)
      })
    }
    this._observers.push(observer)
    _observers.push(observer)
    return observer
  },

  stopObserve (path) {
    let oo = _.clone(this._observers)
    for (let o of oo) {
      if (o instanceof PathObserver && o.path === path) {
        o.close()
        _.remove(_observers, o)
        _.remove(this._observers, o)
      }
    }
    return this
  },

}
