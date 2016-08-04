export default {

  initSet (valids = {}, sets = {}) {
    this.define('valids', { type: Object, default: valids })
    this.define('sets', { type: Object, default: sets })
  },

  get hasSets () { return Object.keys(this.sets).length > 0 },

  isSet (name) { return this.sets[name] !== undefined },

  validSet (name) { return this.valids[name] !== undefined },

  addValidSet (...names) {
    for (let name of names) {
      this.valids[name] = true
    }
    return this
  },

  set (...names) {
    for (let name of names) {
      if (this.validSet(name) && !this.isSet(name)) {
        this.sets[name] = true
        Object.defineProperty(this, name, {
          enumerable: true,
          configurable: true,
          // writable:     true,
          get: () => { return this.isSet(name) },
          set: value => {
            if (!value) {
              this.unset(name)
            }
          },
        })
      }
    }
    return this
  },

  unset (...names) {
    for (let name of names) {
      if (this.validSet(name) && this.isSet(name)) {
        delete this.sets[name]
        delete this[name]
      }
    }
    return this
  },

  toggle (...names) {
    for (let name of names) {
      if (this.validSet(name)) {
        if (this.isSet(name)) {
          this.unset(name)
        }
        else {
          this.set(name)
        }
      }
    }
    return this
  },

  clearSets () {
    for (let name of Object.keys(this.sets)) {
      this.unset(name)
    }
    return this
  },

}
