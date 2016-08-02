export default {

  init () {
    this.define('states', { type: Array })
    this.define('state', { type: Object })
    this.define('rollStates', { type: Boolean })
  },

  get hasState () { return this.state !== null },
  get hasStates () { return this.states.length > 0 },

  stateIndex (state = this.state) { return this.states.indexOf(state) },

  validState (state = this.state) { return this._stateIndex(state) !== -1 },

  hasNextState (state = this.state) { return this._stateIndex(state) + 1 <= this.states.length - 1 },

  hasPrevState (state = this.state) { return this._stateIndex(state) - 1 >= 0 },

  prevState () {
    if (this.hasPrevState()) {
      this.state = this.states[this._stateIndex() - 1]
    }
    else if (this.rollStates) {
      this.state = _.last(this.states)
    }
    else {
      this.state = null
      return false
    }
    return true
  },

  nextState () {
    if (this.hasNextState()) {
      this.state = this.states[this._stateIndex() + 1]
    }
    else if (this.rollStates) {
      this.state = _.first(this.states)
    }
    else {
      this.state = null
      return false
    }
    return true
  },

  addState (state) {
    if (_.isArray(state)) {
      _.each(state, s => this.addState(s))
    }
    else if (!this.validState(state)) {
      this.states.push(state)
      this.emit('states.add', state)
    }
    return this
  },

  removeState (state) {
    if (_.isArray(state)) {
      _.each(state, s => this.removeState(s))
    }
    else if (this.validState(state)) {
      _.pull(this.states, state)
      this.emit('states.remove', state)
    }
    return this
  },

  clearStates () {
    this.state = null
    for (let s of this.states) {
      this.emit('states.remove', s)
    }
    this.states = []
    return this
  },

}
